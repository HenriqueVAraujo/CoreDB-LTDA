import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { careersSmtpEnabled } from '@/lib/careers-delivery'
import { createRateLimiter, RATE_LIMIT_WINDOW_MS } from '@/lib/rate-limit'
import { CV_MAX_BYTES, CV_MESSAGES, sanitizeOriginalName, validateCvFile } from '@/lib/careers-upload'
import { StorageUnavailableError, storeCv } from '@/lib/careers-storage'
import { inspectCvStructure } from '@/lib/careers-inspect'

const MAX_PAYLOAD_BYTES = 16 * 1024
// Arquivo (5 MB) + campos/limites do multipart.
const MAX_MULTIPART_BYTES = CV_MAX_BYTES + 128 * 1024
const isRateLimited = createRateLimiter(5)
// Teto de tempo de leitura do corpo (uploads lentos) e de requisições simultâneas (corpo fica em memória).
const BODY_READ_TIMEOUT_MS = 15_000
const MAX_CONCURRENT = 4
let inFlight = 0

const schema = z
  .object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().min(1).max(254).email(),
    phone: z.string().trim().max(32).optional(),
    area: z.enum(['dba', 'protheus', 'rm', 'fluig', 'desenvolvimento', 'infra', 'outra']),
    profileUrl: z.string().trim().max(300).url().optional().or(z.literal('')),
    message: z.string().trim().max(4000),
    consent: z.literal(true),
    consentCv: z.literal(true).optional(),
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

function json(body: { success: boolean; dryRun?: boolean; cvStored?: boolean; code?: string; error?: string }, status = 200, extra?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...extra } })
}

/**
 * Lê o corpo com teto de bytes ANTES de interpretá-lo (JSON e multipart). Não confia em
 * Content-Length (confere e também conta os bytes lidos), aborta ao exceder e impõe tempo máximo.
 * Retorna 'too_large' | 'timeout' | 'error' em vez de lançar.
 */
async function readLimited(req: NextRequest, limit: number): Promise<Uint8Array | 'too_large' | 'timeout' | 'error'> {
  const declared = Number(req.headers.get('content-length') || '0')
  if (Number.isFinite(declared) && declared > limit) return 'too_large'
  if (!req.body) return new Uint8Array(0)
  const reader = req.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  let timedOut = false
  const timer = setTimeout(() => {
    timedOut = true
    void reader.cancel().catch(() => undefined)
  }, BODY_READ_TIMEOUT_MS)
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      total += value.byteLength
      if (total > limit) {
        await reader.cancel().catch(() => undefined)
        return 'too_large'
      }
      chunks.push(value)
    }
  } catch {
    return timedOut ? 'timeout' : 'error'
  } finally {
    clearTimeout(timer)
  }
  if (timedOut) return 'timeout'
  const out = new Uint8Array(total)
  let off = 0
  for (const c of chunks) {
    out.set(c, off)
    off += c.byteLength
  }
  return out
}

const rateLimited = () =>
  json(
    { success: false, error: 'Muitas solicitações. Tente novamente em instantes.' },
    429,
    { 'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)) },
  )

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase()
  const isMultipart = contentType === 'multipart/form-data'
  if (contentType !== 'application/json' && !isMultipart) {
    return json({ success: false, error: 'Formato de conteúdo não suportado.' }, 415)
  }

  // Concorrência limitada: o corpo é mantido em memória (até ~5 MB) por requisição.
  if (inFlight >= MAX_CONCURRENT) {
    return json({ success: false, error: 'Servidor ocupado. Tente novamente em instantes.' }, 503, { 'Retry-After': '5' })
  }
  inFlight += 1
  try {
    return await handle(req, isMultipart)
  } finally {
    inFlight -= 1
  }
}

async function handle(req: NextRequest, isMultipart: boolean) {
  // 1) Teto de bytes ANTES de interpretar o corpo e antes do rate limit (JSON e multipart).
  const raw = await readLimited(req, isMultipart ? MAX_MULTIPART_BYTES : MAX_PAYLOAD_BYTES)
  if (raw === 'too_large') {
    return isMultipart
      ? json({ success: false, code: 'TOO_LARGE', error: CV_MESSAGES.TOO_LARGE }, 413)
      : json({ success: false, error: 'Solicitação muito grande.' }, 413)
  }
  if (raw === 'timeout') return json({ success: false, error: 'Tempo esgotado ao receber a solicitação.' }, 408)
  if (raw === 'error') return json({ success: false, error: 'Solicitação inválida.' }, 400)

  // 2) Rate limit (conta também requisições inválidas), antes de parsear/validar/inspecionar.
  if (isRateLimited(req)) return rateLimited()

  // 3) Interpretação.
  let payload: unknown
  let file: File | null = null

  if (isMultipart) {
    let form: FormData
    try {
      form = await new Response(raw as BodyInit, { headers: { 'content-type': req.headers.get('content-type')! } }).formData()
    } catch {
      return json({ success: false, error: 'Solicitação inválida.' }, 400)
    }
    const obj: Record<string, unknown> = {}
    for (const [key, value] of form.entries()) {
      if (key === 'cv') {
        if (typeof value !== 'string') file = value
        continue
      }
      if (typeof value !== 'string') return json({ success: false, error: 'Solicitação inválida.' }, 400)
      obj[key] = key === 'consent' || key === 'consentCv' ? (value === 'true' ? true : value) : value
    }
    // Campo de arquivo vazio (nenhum arquivo escolhido) = sem anexo.
    if (file && file.size === 0 && !file.name) file = null
    payload = obj
  } else {
    try {
      payload = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(raw))
    } catch {
      return json({ success: false, error: 'Solicitação inválida.' }, 400)
    }
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    return json({ success: false, error: 'Solicitação inválida. Confirme o consentimento e os campos obrigatórios.' }, 400)
  }

  const { website, consentCv, ...data } = parsed.data

  // Honeypot: responde sucesso sem processar.
  if ((website ?? '').trim()) {
    return json({ success: true })
  }

  let cvStored = false
  if (file) {
    if (consentCv !== true) {
      return json(
        { success: false, code: 'CONSENT_CV', error: 'Para anexar o currículo, marque a autorização específica para guardá-lo.' },
        400,
      )
    }
    const bytes = new Uint8Array(await file.arrayBuffer())
    const check = validateCvFile({ name: file.name, size: file.size, type: file.type }, bytes)
    if (!check.ok) {
      return json({ success: false, code: check.code, error: check.message }, check.code === 'TOO_LARGE' ? 413 : 400)
    }
    // Estrutura real (PDF/CFB/OOXML), limites de descompressão e conteúdo ativo (fail-closed).
    const inspected = inspectCvStructure(check.kind, bytes)
    if (!inspected.ok) {
      return json({ success: false, code: inspected.code, error: CV_MESSAGES[inspected.code] }, 400)
    }
    try {
      const stored = await storeCv(bytes, {
        kind: check.kind,
        area: data.area,
        originalName: sanitizeOriginalName(file.name),
        consentCvAt: new Date().toISOString(),
      })
      cvStored = stored !== null
    } catch (err) {
      const msg = err instanceof StorageUnavailableError ? 'O armazenamento de currículos está indisponível no momento.' : 'Não foi possível guardar o currículo.'
      return json({ success: false, code: 'STORAGE', error: msg }, 503)
    }
  }

  if (!careersSmtpEnabled()) {
    return json({ success: true, dryRun: true, ...(file ? { cvStored } : {}) })
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
    return json({ success: true, ...(file ? { cvStored } : {}) })
  } catch {
    return json({ success: false, error: 'Não foi possível enviar a candidatura.' }, 500)
  }
}
