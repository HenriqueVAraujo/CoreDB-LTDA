import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const MAX_PAYLOAD_BYTES = 16 * 1024

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
  const contentType = req.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase()

  if (contentType !== 'application/json') {
    return NextResponse.json(
      { success: false, error: 'Formato de conteúdo não suportado.' },
      { status: 415 },
    )
  }

  const contentLengthHeader = req.headers.get('content-length')
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : 0

  if (Number.isFinite(contentLength) && contentLength > MAX_PAYLOAD_BYTES) {
    return NextResponse.json(
      { success: false, error: 'Solicitação muito grande.' },
      { status: 413 },
    )
  }

  let rawBody: string

  try {
    rawBody = await req.text()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Solicitação inválida.' },
      { status: 400 },
    )
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_PAYLOAD_BYTES) {
    return NextResponse.json(
      { success: false, error: 'Solicitação muito grande.' },
      { status: 413 },
    )
  }

  let payload: unknown

  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json(
      { success: false, error: 'Solicitação inválida.' },
      { status: 400 },
    )
  }

  const validation = contactSchema.safeParse(payload)

  if (!validation.success) {
    return NextResponse.json(
      { success: false, error: 'Solicitação inválida.' },
      { status: 400 },
    )
  }

  const data = validation.data
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

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Não foi possível enviar a solicitação.' },
      { status: 500 },
    )
  }
}
