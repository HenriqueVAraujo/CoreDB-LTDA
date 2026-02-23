import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // 1. Bloqueia métodos que não sejam POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const data = req.body;

    // 2. Configuração do Transmissor (SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465", // True para 465, False para 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 3. Lógica de Prioridade (Lead Scoring)
    const priority =
      data.urgency === "immediate"
        ? "🚨 LEAD CRÍTICO"
        : data.urgency === "short"
        ? "⚡ LEAD ESTRATÉGICO"
        : "Novo Lead";

    // 4. Envio do E-mail
    await transporter.sendMail({
      from: `"CoreDB Site" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `${priority} - ${data.company || "Empresa não informada"}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Novo Lead Recebido pelo Site</h2>
          <hr/>
          <p><strong>Nome:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefone:</strong> ${data.phone}</p>
          <p><strong>Empresa:</strong> ${data.company}</p>
          <p><strong>Porte:</strong> ${data.companySize}</p>
          <p><strong>Cenário:</strong> ${data.environment}</p>
          <p><strong>Urgência:</strong> ${data.urgency}</p>
          <br/>
          <p><strong>Mensagem:</strong></p>
          <div style="background: #f4f4f4; pading: 15px; border-radius: 5px;">
            ${data.message}
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    // Log detalhado que aparecerá no painel da Vercel
    console.error("ERRO NO ENVIO DE EMAIL:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}