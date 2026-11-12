// Smoke do endpoint (servidor em loopback): achados 1,2,3,7 no nivel HTTP. Somente dados sinteticos.
//   BASE_URL=http://127.0.0.1:3208 node --test tests/careers-hardening-smoke.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as F from './fixtures-cv.mjs'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3000'
if (!['127.0.0.1', 'localhost', '::1', '[::1]'].includes(new URL(BASE).hostname)) throw new Error('somente loopback')

let n = 20
const ip = () => `192.0.2.${n++}`
function send({ file, fileName = 'curriculo.pdf', type = F.MIME.pdf, forwarded = ip() } = {}) {
  const fd = new FormData()
  for (const [k, v] of Object.entries({ name: 'Candidato Ficticio', email: 'candidato.ficticio@example.invalid', area: 'dba', message: 'sintetico', website: '', consent: 'true', consentCv: 'true' })) fd.append(k, v)
  if (file) fd.append('cv', new Blob([file], { type }), fileName)
  return fetch(`${BASE}/api/trabalhe-conosco`, { method: 'POST', body: fd, headers: { 'x-forwarded-for': forwarded } })
}
const body = async (r) => ({ status: r.status, ...(await r.json()) })

test('achado 1: documentos estruturalmente validos -> 200', async () => {
  assert.equal((await send({ file: F.pdf() })).status, 200)
  assert.equal((await send({ file: F.doc(), fileName: 'cv.doc', type: F.MIME.doc })).status, 200)
  assert.equal((await send({ file: F.docx(), fileName: 'cv.docx', type: F.MIME.docx })).status, 200)
})

test('achado 1: falsos documentos com cabecalho/marcadores -> 400 BAD_STRUCTURE', async () => {
  for (const [file, fileName, type] of [[F.pdfFake(), 'cv.pdf', F.MIME.pdf], [F.docFake(), 'cv.doc', F.MIME.doc], [F.docxFake(), 'cv.docx', F.MIME.docx], [F.zipBombLiar(), 'cv.docx', F.MIME.docx]]) {
    const j = await body(await send({ file, fileName, type }))
    assert.equal(j.status, 400, fileName)
    assert.equal(j.code, 'BAD_STRUCTURE', fileName)
  }
})

test('achado 2: .docm renomeado, macro em DOC e PDF com JavaScript -> 400 ACTIVE_CONTENT', async () => {
  for (const [file, fileName, type] of [[F.docm(), 'cv.docx', F.MIME.docx], [F.docMacros(), 'cv.doc', F.MIME.doc], [F.pdfJs(), 'cv.pdf', F.MIME.pdf], [F.docxTemplateInjection(), 'cv.docx', F.MIME.docx]]) {
    const j = await body(await send({ file, fileName, type }))
    assert.equal(j.status, 400, fileName)
    assert.equal(j.code, 'ACTIVE_CONTENT', fileName)
  }
})

test('achado 7: nome original invalido (cv.ex?e.pdf) -> 400 BAD_NAME', async () => {
  const j = await body(await send({ file: F.pdf(), fileName: 'cv.ex?e.pdf' }))
  assert.equal(j.status, 400)
  assert.equal(j.code, 'BAD_NAME')
})

test('achado 3: JSON acima de 16 KB -> 413 e NAO consome o rate limit', async () => {
  const same = ip()
  const big = JSON.stringify({ name: 'x', email: 'x@example.invalid', area: 'dba', message: 'a'.repeat(20000), consent: true })
  for (let i = 0; i < 8; i++) {
    const r = await fetch(`${BASE}/api/trabalhe-conosco`, { method: 'POST', body: big, headers: { 'content-type': 'application/json', 'x-forwarded-for': same } })
    assert.equal(r.status, 413)
  }
  const ok = await fetch(`${BASE}/api/trabalhe-conosco`, { method: 'POST', body: JSON.stringify({ name: 'x', email: 'x@example.invalid', area: 'dba', message: '', consent: true }), headers: { 'content-type': 'application/json', 'x-forwarded-for': same } })
  assert.equal(ok.status, 200)
})

test('achado 3: JSON em streaming (sem Content-Length) acima do teto e cortado -> 413', async () => {
  const chunk = new TextEncoder().encode('{"message":"' + 'a'.repeat(8000))
  let sent = 0
  const stream = new ReadableStream({
    pull(c) {
      if (sent++ < 6) c.enqueue(chunk)
      else c.close()
    },
  })
  const r = await fetch(`${BASE}/api/trabalhe-conosco`, { method: 'POST', body: stream, duplex: 'half', headers: { 'content-type': 'application/json', 'x-forwarded-for': ip() } })
  assert.equal(r.status, 413)
})

test('achado 3: multipart acima do teto -> 413 ANTES de interpretar; requisicoes invalidas contam no rate limit', async () => {
  const huge = Buffer.concat([F.pdf(), Buffer.alloc(6 * 1024 * 1024)])
  assert.equal((await send({ file: huge })).status, 413)
  const same = ip()
  const codes = []
  for (let i = 0; i < 8; i++) {
    const r = await fetch(`${BASE}/api/trabalhe-conosco`, { method: 'POST', body: '{"invalido":true}', headers: { 'content-type': 'application/json', 'x-forwarded-for': same } })
    codes.push(r.status)
  }
  assert.ok(codes.includes(429), `invalidas deveriam chegar ao limitador: ${codes}`)
})

test('achado 6: reenvio do mesmo arquivo continua 200 (idempotente, sem erro)', async () => {
  const same = ip()
  assert.equal((await send({ file: F.pdf(), forwarded: same })).status, 200)
  assert.equal((await send({ file: F.pdf(), forwarded: same })).status, 200)
})
