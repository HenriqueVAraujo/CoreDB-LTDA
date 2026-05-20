import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const traducoes: Record<string, string> = {
  small: 'Até 100 colaboradores',
  medium: '100 a 500 colaboradores',
  large: 'Acima de 500 colaboradores',
  instability: 'Instabilidade ou lentidão recorrente',
  monitoring: 'Falta de monitoramento estruturado',
  project: 'Projeto crítico em andamento',
  database: 'Revisão completa de banco de dados',
  support: 'Sustentação especializada contínua',
  planning: 'Planejamento estratégico (30+ dias)',
  short: 'Necessidade no curto prazo (até 30 dias)',
  immediate: 'Situação crítica / ação imediata',
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

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
      subject: `${priority} - ${data.company || 'Lead Site'}`,
      html: `
        <div style="font-family:sans-serif;color:#333;line-height:1.6;max-width:600px;border:1px solid #e0e0e0;padding:20px;border-radius:10px;">
          <h2 style="color:#0B1C2D;border-bottom:2px solid #1DAEFF;padding-bottom:10px;">Novo Lead Recebido</h2>
          <p><strong>Nome:</strong> ${data.name}</p>
          <p><strong>E-mail:</strong> ${data.email}</p>
          <p><strong>Telefone:</strong> ${data.phone}</p>
          <p><strong>Empresa:</strong> ${data.company}</p>
          <div style="background:#f9f9f9;padding:15px;border-radius:5px;margin-top:20px;">
            <p style="margin:5px 0;"><strong>Porte:</strong> ${traducoes[data.companySize] ?? data.companySize}</p>
            <p style="margin:5px 0;"><strong>Cenário:</strong> ${traducoes[data.environment] ?? data.environment}</p>
            <p style="margin:5px 0;"><strong>Urgência:</strong> ${traducoes[data.urgency] ?? data.urgency}</p>
          </div>
          <p style="margin-top:20px;"><strong>Mensagem:</strong></p>
          <div style="background:#fff;border-left:4px solid #1DAEFF;padding:10px 15px;font-style:italic;">
            ${data.message || 'Sem mensagem adicional.'}
          </div>
          <p style="font-size:12px;color:#888;margin-top:30px;text-align:center;border-top:1px solid #eee;padding-top:10px;">
            Gerado automaticamente pelo formulário do site CoreDB.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    console.error('ERRO SMTP:', message)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
