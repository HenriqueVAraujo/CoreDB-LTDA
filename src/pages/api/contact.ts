import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const data = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const priority =
      data.leadType === "critical"
        ? "🚨 LEAD CRÍTICO"
        : data.leadType === "strategic"
        ? "⚡ LEAD ESTRATÉGICO"
        : "Novo Lead";

    await transporter.sendMail({
      from: `"CoreDB Site" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `${priority} - ${data.company}`,
      html: `
        <h2>Novo Lead Recebido</h2>
        <hr/>
        <p><strong>Classificação:</strong> ${data.leadType}</p>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefone:</strong> ${data.phone}</p>
        <p><strong>Empresa:</strong> ${data.company}</p>
        <p><strong>Porte:</strong> ${data.companySize}</p>
        <p><strong>Cenário:</strong> ${data.environment}</p>
        <p><strong>Urgência:</strong> ${data.urgency}</p>
        <br/>
        <p><strong>Mensagem:</strong></p>
        <p>${data.message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return res.status(500).json({ success: false });
  }
}