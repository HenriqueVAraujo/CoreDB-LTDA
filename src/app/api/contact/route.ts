import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const MAX_PAYLOAD_BYTES = 16 * 1024

/**
 * Rate limiting best-effort, em memória, por instância serverless.
 *
 * Não há Redis/KV/Upstash configurado neste projeto e adicionar um exigiria
 * nova dependência e nova infraestrutura fora da autorização desta frente.
 * Este limitador NÃO garante um teto distribuído: cada instância Vercel tem
 * seu próprio mapa, que é zerado em cold start, então um cliente pode
 * eventualmente exceder o limite nominal se atingir instâncias diferentes.
 * É uma camada parcial somada ao honeypot existente, não uma garantia dura.
 *
 * Fail-open deliberado: qualquer erro interno do limitador libera a
 * requisição em vez de bloquear — nunca queremos perder um lead legítimo
 * por causa de um bug no rate limiter.
 */
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_MAX_TRACKED_KEYS = 500

type RateLimitBucket = { count: number; resetAt: number }
const rateLimitBuckets = new Map<string, RateLimitBucket>()

function getClientKey(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'

  let hash = 0
  for (let i = 0; i < ip.length; i += 1) {
    hash = (hash * 31 + ip.charCodeAt(i)) | 0
  }
  return hash.toString(36)
}

function pruneExpiredBuckets(now: number): void {
  if (rateLimitBuckets.size < RATE_LIMIT_MAX_TRACKED_KEYS) return

  for (const [key, bucket] of rateLimitBuckets) {
    if (now > bucket.resetAt) {
      rateLimitBuckets.delete(key)
    }
  }
}

function isRateLimited(req: NextRequest): boolean {
  try {
    const now = Date.now()
    pruneExpiredBuckets(now)

    const key = getClientKey(req)
    const bucket = rateLimitBuckets.get(key)

    if (!bucket || now > bucket.resetAt) {
      rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
      return false
    }

    bucket.count += 1
    return bucket.count > RATE_LIMIT_MAX_REQUESTS
  } catch {
    return false
  }
}

const leadTypeByUrgency = {
  planning: 'standard',
  short: 'strategic',
  immediate: 'critical',
} as const

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().min(1).max(254).email(),
  phone: z.string().trim().min(7).max(32),
  company: z.string().trim().min(1).max(160),
  environment: z.enum(['instability', 'monitoring', 'database', 'support', 'project']),
  urgency: z.enum(['planning', 'short', 'immediate']),
  message: z.string().trim().max(4000),
  leadType: z.enum(['standard', 'strategic', 'critical']),
  website: z.string().max(256).optional(),
}).strict().superRefine((data, context) => {
  if (leadTypeByUrgency[data.urgency] !== data.leadType) {
    context.addIssue({
      code: 'custom',
      path: ['leadType'],
      message: 'Classificação incompatível com a urgência.',
    })
  }
})

const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => htmlEscapes[character])
}

function jsonResponse(body: { success: boolean; error?: string }, status = 200, extraHeaders?: Record<string, string>) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...extraHeaders },
  })
}

const traducoes: Record<string, string> = {
  instability: 'Instabilidade ou lentidão recorrente no ERP',
  monitoring: 'Sem monitoramento estruturado (Zabbix / Grafana)',
  database: 'Banco de dados sem DBA dedicado (SQL Server / Oracle)',
  support: 'Suporte reativo — precisam de SLA contratual',
  project: 'Projeto crítico: customização, integração ou migração',
  planning: 'Planejamento estratégico (30+ dias)',
  short: 'Necessidade no curto prazo (até 30 dias)',
  immediate: 'Situação crítica — ação imediata',
}

export async function POST(req: NextRequest) {
  if (isRateLimited(req)) {
    return jsonResponse(
      { success: false, error: 'Muitas solicitações. Tente novamente em instantes.' },
      429,
      { 'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)) },
    )
  }

  const contentType = req.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase()

  if (contentType !== 'application/json') {
    return jsonResponse({ success: false, error: 'Formato de conteúdo não suportado.' }, 415)
  }

  const contentLengthHeader = req.headers.get('content-length')
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : 0

  if (Number.isFinite(contentLength) && contentLength > MAX_PAYLOAD_BYTES) {
    return jsonResponse({ success: false, error: 'Solicitação muito grande.' }, 413)
  }

  let rawBody: string

  try {
    rawBody = await req.text()
  } catch {
    return jsonResponse({ success: false, error: 'Solicitação inválida.' }, 400)
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_PAYLOAD_BYTES) {
    return jsonResponse({ success: false, error: 'Solicitação muito grande.' }, 413)
  }

  let payload: unknown

  try {
    payload = JSON.parse(rawBody)
  } catch {
    return jsonResponse({ success: false, error: 'Solicitação inválida.' }, 400)
  }

  const validation = contactSchema.safeParse(payload)

  if (!validation.success) {
    return jsonResponse({ success: false, error: 'Solicitação inválida.' }, 400)
  }

  const { website, ...data } = validation.data

  if ((website ?? '').trim()) {
    return jsonResponse({ success: true })
  }

  const translatedEnvironment = traducoes[data.environment] ?? data.environment
  const translatedUrgency = traducoes[data.urgency] ?? data.urgency
  const escaped = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone),
    company: escapeHtml(data.company),
    environment: escapeHtml(translatedEnvironment),
    urgency: escapeHtml(translatedUrgency),
    leadType: escapeHtml(data.leadType),
    message: data.message
      ? escapeHtml(data.message).replace(/\r\n|\r|\n/g, '<br>')
      : 'Sem mensagem adicional.',
  }
  const subjectCompany = data.company.replace(/[\r\n]+/g, ' ')
  const plainText = [
    'Novo Lead Recebido',
    '',
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.phone}`,
    `Empresa: ${data.company}`,
    `Principal Dor: ${translatedEnvironment}`,
    `Urgência: ${translatedUrgency}`,
    `Classificação: ${data.leadType}`,
    '',
    'Mensagem:',
    data.message || 'Sem mensagem adicional.',
    '',
    'Gerado automaticamente pelo formulário do site CoreDB.',
  ].join('\n')

  try {

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const priority =
      data.urgency === 'immediate' ? '🚨 CRÍTICO' :
      data.urgency === 'short'     ? '⚡ ESTRATÉGICO' : 'Novo Lead'

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.RECEIVER_EMAIL,
      replyTo: data.email,
      subject: `${priority} - ${subjectCompany || 'Lead Site'}`,
      text: plainText,
      html: `
        <div style="font-family:sans-serif;color:#333;line-height:1.6;max-width:600px;border:1px solid #e0e0e0;padding:20px;border-radius:10px;">
          <h2 style="color:#0B1C2D;border-bottom:2px solid #1DAEFF;padding-bottom:10px;">Novo Lead Recebido</h2>
          <p><strong>Nome:</strong> ${escaped.name}</p>
          <p><strong>E-mail:</strong> ${escaped.email}</p>
          <p><strong>Telefone:</strong> ${escaped.phone}</p>
          <p><strong>Empresa:</strong> ${escaped.company}</p>
          <div style="background:#f9f9f9;padding:15px;border-radius:5px;margin-top:20px;">
            <p style="margin:5px 0;"><strong>Principal Dor:</strong> ${escaped.environment}</p>
            <p style="margin:5px 0;"><strong>Urgência:</strong> ${escaped.urgency}</p>
            <p style="margin:5px 0;"><strong>Classificação:</strong> ${escaped.leadType}</p>
          </div>
          <p style="margin-top:20px;"><strong>Mensagem:</strong></p>
          <div style="background:#fff;border-left:4px solid #1DAEFF;padding:10px 15px;font-style:italic;">
            ${escaped.message}
          </div>
          <p style="font-size:12px;color:#888;margin-top:30px;text-align:center;border-top:1px solid #eee;padding-top:10px;">
            Gerado automaticamente pelo formulário do site CoreDB.
          </p>
        </div>
      `,
    })

    return jsonResponse({ success: true })
  } catch {
    return jsonResponse({ success: false, error: 'Não foi possível enviar a solicitação.' }, 500)
  }
}
