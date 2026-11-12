// POST multipart sintetico no endpoint (servidor next start em loopback). Uso:
//   BASE_URL=http://127.0.0.1:3208 EXPECT_STORED=true|false node --test tests/careers-attach-smoke.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pdf, pdfOfSize, doc, docx, exe, MIME } from './fixtures-cv.mjs'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3000'
if (!['127.0.0.1', 'localhost', '::1', '[::1]'].includes(new URL(BASE).hostname)) throw new Error('somente loopback')

let n = 100
function send({ file, fileName = 'curriculo.pdf', type = MIME.pdf, consent = 'true', consentCv = 'true', extra = {} } = {}) {
  const fd = new FormData()
  const f = { name: 'Candidato Ficticio', email: 'candidato.ficticio@example.invalid', area: 'dba', message: 'sintetico', website: '', ...extra }
  for (const [k, v] of Object.entries(f)) fd.append(k, v)
  if (consent !== null) fd.append('consent', consent)
  if (consentCv !== null) fd.append('consentCv', consentCv)
  if (file) fd.append('cv', new Blob([file], { type }), fileName)
  return fetch(`${BASE}/api/trabalhe-conosco`, { method: 'POST', body: fd, headers: { 'x-forwarded-for': `203.0.113.${n++}` } })
}

test('PDF valido em simulacao -> 200, sem armazenamento', async () => {
  const r = await send({ file: pdf() })
  assert.equal(r.status, 200)
  const j = await r.json()
  assert.equal(j.success, true)
  assert.equal(j.dryRun, true)
  assert.equal(j.cvStored, false)
  assert.ok(!/careers-uploads|[\\/]/.test(JSON.stringify(j)), 'resposta nao vaza caminho')
})

test('DOC e DOCX validos -> 200', async () => {
  assert.equal((await send({ file: doc(), fileName: 'cv.doc', type: MIME.doc })).status, 200)
  assert.equal((await send({ file: docx(), fileName: 'cv.docx', type: MIME.docx })).status, 200)
})

test('sem arquivo (multipart) -> 200 sem anexo', async () => {
  const j = await (await send({ consentCv: null })).json()
  assert.equal(j.success, true)
  assert.ok(!j.cvStored)
})

test('.exe renomeado para .pdf (assinatura MZ) -> 400 BAD_SIGNATURE', async () => {
  const r = await send({ file: exe() })
  assert.equal(r.status, 400)
  assert.equal((await r.json()).code, 'BAD_SIGNATURE')
})

test('cv.pdf.exe -> 400 FORBIDDEN_EXTENSION; cv.exe -> 400', async () => {
  assert.equal((await (await send({ file: pdf(), fileName: 'cv.pdf.exe' })).json()).code, 'FORBIDDEN_EXTENSION')
  assert.equal((await send({ file: exe(), fileName: 'cv.exe', type: 'application/x-msdownload' })).status, 400)
})

test('assinatura divergente (DOCX com extensao .pdf) -> 400', async () => {
  const r = await send({ file: docx(), fileName: 'cv.pdf' })
  assert.equal(r.status, 400)
  assert.equal((await r.json()).code, 'BAD_SIGNATURE')
})

test('MIME divergente -> 400 BAD_MIME', async () => {
  const r = await send({ file: pdf(), type: 'text/html' })
  assert.equal(r.status, 400)
  assert.equal((await r.json()).code, 'BAD_MIME')
})

test('arquivo grande (6 MB) -> 413', async () => {
  const big = Buffer.concat([pdf(), Buffer.alloc(6 * 1024 * 1024)])
  assert.equal((await send({ file: big })).status, 413)
})

test('4 MB + 1 byte -> 413 (validador); 4 MB exatos -> 200', async () => {
  const limit = 4 * 1024 * 1024
  const over = Buffer.concat([pdf(), Buffer.alloc(limit + 1 - pdf().length)])
  assert.equal(over.length, limit + 1)
  assert.equal((await send({ file: over })).status, 413)
  const exact = pdfOfSize(limit)
  assert.equal((await send({ file: exact })).status, 200)
})

test('arquivo vazio com nome -> 400 EMPTY', async () => {
  const r = await send({ file: Buffer.alloc(0) })
  assert.equal(r.status, 400)
  assert.equal((await r.json()).code, 'EMPTY')
})

test('sem consentimento especifico do curriculo -> 400 CONSENT_CV', async () => {
  const r = await send({ file: pdf(), consentCv: null })
  assert.equal(r.status, 400)
  assert.equal((await r.json()).code, 'CONSENT_CV')
})

test('sem consentimento LGPD geral -> 400', async () => {
  assert.equal((await send({ file: pdf(), consent: null })).status, 400)
})

test('honeypot multipart -> 200 sem processar', async () => {
  const j = await (await send({ file: pdf(), extra: { website: 'http://spam.invalid' } })).json()
  assert.deepEqual(j, { success: true })
})

test('rate limit preservado (multipart): rajada de 7 -> 429', async () => {
  const codes = []
  for (let i = 0; i < 7; i++) {
    const fd = new FormData()
    for (const [k, v] of [['name', 'x'], ['email', 'x@example.invalid'], ['area', 'dba'], ['message', ''], ['consent', 'true']]) fd.append(k, v)
    const r = await fetch(`${BASE}/api/trabalhe-conosco`, { method: 'POST', body: fd, headers: { 'x-forwarded-for': '198.51.100.88' } })
    codes.push(r.status)
  }
  assert.ok(codes.includes(429), String(codes))
})
