import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { createRateLimiter, RATE_LIMIT_WINDOW_MS } from '@/lib/rate-limit'

const MAX_PAYLOAD_BYTES = 16 * 1024
const isRateLimited = createRateLimiter(5)

/**
 * Modo de envio: DRY-RUN por padrão. Nenhum e-mail é enviado e nenhum dado
 * pessoal é registrado em log. O envio real só ocorre se
 * CAREERS_SMTP_ENABLED=true E CAREERS_RECEIVER_EMAIL estiver definido
 * (mesmas variáveis SMTP_* do formulário comercial).
 */
function isSmtpEnabled(): boolean {
  return (
    (process.env.CAREERS_SMTP_ENABLED || '').toLowerCase() === 'true' &&
    Boolean(process.env.CAREERS_RECEIVER_EMAIL?.trim())
  )
}

const schema = z
  .object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().min(1).max(254).email(),
    phone: z.string().trim().max(32).optional(),
    area: z.enum(['dba', 'protheus', 'rm', 'fluig', 'desenvolvimento', 'infra', 'outra']),
    profileUrl: z.string().trim().max(300).url().optional().or(z.literal('')),
    message: z.string().trim().max(4000),
    consent: z.literal(true),
    website: z.string().max(256).optional(),
  })
  .strict()

const areaLabels: Record<string, string> = {
  dba: 'DBA (SQL Server, Oracle, PostgreSQL, MySQL)',
  protheus: 'Protheus / ADVPL',
  rm: 'RM',
  fluig: 'Fluig',
  desenvolvimento: 'Desenvolvimento e integrações',
  infra: 'Infraestrutura e monitoramento',
  outra: 'Outra área',
}

function json(body: { success: boolean; dryRun?: boolean; error?: string }, status = 200, extra?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...extra } })
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase()
  if (contentType !== 'application/json') {
    return json({ success: false, error: 'Formato de conteúdo não suportado.' }, 415)
  }

  const contentLength = Number(req.headers.get('content-length'))
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return json({ success: false, error: 'Solicitação muito grande.' }, 413)
  }

  const reader = req.body?.getReader()
  if (!reader) {
    return json({ success: false, error: 'Solicitação inválida.' }, 400)
  }

  const decoder = new TextDecoder('utf-8', { fatal: true })
  let rawBody = ''
  let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_PAYLOAD_BYTES) {
        await reader.cancel().catch(() => undefined)
        return json({ success: false, error: 'Solicitação muito grande.' }, 413)
      }
      rawBody += decoder.decode(value, { stream: true })
    }
    rawBody += decoder.decode()
  } catch {
    await reader.cancel().catch(() => undefined)
    return json({ success: false, error: 'Solicitação inválida.' }, 400)
  } finally {
    reader.releaseLock()
  }

  let payload: unknown
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return json({ success: false, error: 'Solicitação inválida.' }, 400)
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    return json({ success: false, error: 'Solicitação inválida. Confirme o consentimento e os campos obrigatórios.' }, 400)
  }

  const { website, ...data } = parsed.data

  // Honeypot: responde sucesso sem processar, sem consumir cota.
  if ((website ?? '').trim()) {
    return json({ success: true })
  }

  if (isRateLimited(req)) {
    return json(
      { success: false, error: 'Muitas solicitações. Tente novamente em instantes.' },
      429,
      { 'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)) },
    )
  }

  if (!isSmtpEnabled()) {
    return json({ success: true, dryRun: true })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST?.trim() || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || '465'),
      secure: (process.env.SMTP_SECURE || 'true').toLowerCase() === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    const text = [
      'Nova candidatura (Trabalhe Conosco)',
      '',
      `Nome: ${data.name}`,
      `E-mail: ${data.email}`,
      `Telefone: ${data.phone || '-'}`,
      `Área: ${areaLabels[data.area]}`,
      `Perfil/portfólio: ${data.profileUrl || '-'}`,
      'Consentimento LGPD: sim',
      '',
      data.message || 'Sem mensagem adicional.',
    ].join('\n')

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CAREERS_RECEIVER_EMAIL,
      replyTo: data.email,
      subject: `Candidatura - ${areaLabels[data.area]}`,
      text,
    })
    return json({ success: true })
  } catch {
    return json({ success: false, error: 'Não foi possível enviar a candidatura.' }, 500)
  }
}
