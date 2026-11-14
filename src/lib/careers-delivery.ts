import { createHmac, randomBytes } from 'node:crypto'
import nodemailer from 'nodemailer'
import { careersSchema } from './careers-schema'
import { appendCareersRecord, createCareersReference, type CareersRecord } from './careers-record'

type Env = Record<string, string | undefined>
type Mail = { from: string; to: string; replyTo: string; subject: string; text: string }
type Acceptance = { accepted?: Array<string | { address: string }> }
type Dependencies = {
  env?: Env
  sendMail?: (mail: Mail) => Promise<Acceptance>
  record?: (record: CareersRecord) => Promise<void>
  now?: () => number
}

const MAX_BYTES = 16 * 1024
const WINDOW = 60_000
const response = (body: unknown, status = 200, headers = {}) => Response.json(body, {
  status, headers: { 'Cache-Control': 'no-store', ...headers },
})
const invalid = (campo: string, mensagem: string, status = 400) =>
  response({ ok: false, erros: { [campo]: mensagem } }, status)

// Adapted from PR #13: bounded stream, timeout, strict schema, SMTP acceptance.
async function readBody(req: Request): Promise<string> {
  if (Number(req.headers.get('content-length')) > MAX_BYTES) throw new Error('413')
  if (!req.body) return ''
  const reader = req.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  const reading = (async () => {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BYTES) throw new Error('413')
      chunks.push(value)
    }
    return new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks))
  })()
  try {
    return await Promise.race([reading, new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('408')), 15_000)
    })])
  } finally {
    clearTimeout(timer)
    void reader.cancel().catch(() => undefined)
  }
}

export function createCareersHandler(deps: Dependencies = {}) {
  const buckets = new Map<string, { count: number; until: number }>()
  const secret = randomBytes(32)
  const now = deps.now ?? Date.now
  return async (req: Request): Promise<Response> => {
    const env = deps.env ?? process.env
    // Best-effort per worker; no raw IP is retained, and keys die on restart.
    const time = now()
    for (const [key, value] of buckets) if (value.until <= time) buckets.delete(key)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
    const key = createHmac('sha256', secret).update(ip).digest('hex')
    const bucket = buckets.get(key)
    if (bucket && bucket.count >= 5) return response({ ok: false, mensagem: 'Muitas solicitações. Tente novamente mais tarde.' }, 429, {
      'Retry-After': String(Math.max(1, Math.ceil((bucket.until - time) / 1000))),
    })
    if (bucket) bucket.count++
    else {
      // Fail closed at capacity rather than evict active limits.
      if (buckets.size >= 500) return response({ ok: false, mensagem: 'Servidor ocupado.' }, 429, { 'Retry-After': '60' })
      buckets.set(key, { count: 1, until: time + WINDOW })
    }
    if (req.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
      return invalid('corpo', 'Envie JSON, sem arquivos.', 415)
    }
    let payload: unknown
    try { payload = JSON.parse(await readBody(req)) } catch (error) {
      const status = error instanceof Error && ['408', '413'].includes(error.message) ? Number(error.message) : 400
      return invalid('corpo', 'Solicitação inválida ou acima do limite.', status)
    }
    const parsed = careersSchema.safeParse(payload)
    if (!parsed.success) {
      const erros: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? 'corpo')
        erros[field] ??= issue.message
      }
      return response({ ok: false, erros }, 400)
    }
    const { website: _website, ...data } = parsed.data
    const production = env.VERCEL_ENV === 'production' || (!env.VERCEL_ENV && env.NODE_ENV === 'production')
    const configured = Boolean(env.SMTP_USER?.trim() && env.SMTP_PASS && env.CAREERS_RECEIVER_EMAIL?.trim())
    if (production && !configured) return response({ ok: false, codigo: 'sem_destino', mensagem: 'Recebimento de candidaturas indisponível.' }, 503)
    const real = configured && (production || env.CAREERS_FORCE_REAL === '1')
    const timestamp = new Date(time).toISOString()
    const referencia = createCareersReference(new Date(time))
    const modo = real ? 'real' : 'simulado'
    if (real) {
      try {
        // Validate configured headers too; never allow CR/LF in SMTP addresses.
        const sender = careersSchema.shape.email.parse(env.SMTP_USER)
        const receiver = careersSchema.shape.email.parse(env.CAREERS_RECEIVER_EMAIL)
        const send = deps.sendMail ?? (async (mail: Mail) => {
          const transport = nodemailer.createTransport({
            host: env.SMTP_HOST?.trim() || 'smtp.gmail.com',
            port: Number(env.SMTP_PORT || '465'),
            secure: (env.SMTP_SECURE || 'true').toLowerCase() === 'true',
            auth: { user: sender, pass: env.SMTP_PASS },
            connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 15_000,
          })
          try { return await transport.sendMail(mail) } finally { transport.close() }
        })
        const result = await send({
          from: sender, to: receiver, replyTo: data.email,
          subject: `Candidatura CoreDB ${referencia}`,
          text: [`Referência: ${referencia}`, `Timestamp: ${timestamp}`,
            ...Object.entries(data).map(([field, value]) => `${field}: ${Array.isArray(value) ? value.join(', ') : value}`),
          ].join('\n'),
        })
        if (!result.accepted?.some(address => (typeof address === 'string' ? address : address.address).toLowerCase() === receiver.toLowerCase())) {
          throw new Error('Destinatário não aceito')
        }
      } catch { return response({ ok: false, codigo: 'falha_entrega', mensagem: 'Não foi possível enviar a candidatura.' }, 503) }
    }
    if (!env.VERCEL) {
      try { await (deps.record ?? appendCareersRecord)({ referencia, timestamp, campos: data }) }
      catch {
        // An accepted SMTP message is already a receipt; do not invite duplicate retries.
        if (!real) return response({ ok: false, codigo: 'falha_registro', mensagem: 'Não foi possível registrar a simulação.' }, 503)
      }
    }
    return response({ ok: true, modo, recebido: real, referencia,
      mensagem: real ? 'Candidatura aceita para entrega ao RH.' : 'SIMULADO: nada foi enviado ao RH',
    })
  }
}
