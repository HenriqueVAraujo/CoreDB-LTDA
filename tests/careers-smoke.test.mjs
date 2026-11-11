// Teste de fumaca do formulario Trabalhe Conosco (sintetico, sem SMTP).
// Uso: BASE_URL=http://127.0.0.1:3207 node --test tests/careers-smoke.test.mjs
// Somente loopback; exige servidor `next start` com CAREERS_SMTP_ENABLED desligado (dry-run).
import { test } from 'node:test'
import assert from 'node:assert/strict'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3000'
const host = new URL(BASE).hostname
if (!['127.0.0.1', 'localhost', '::1', '[::1]'].includes(host)) {
  throw new Error(`BASE_URL deve ser loopback (recebido: ${host}); teste sintetico nao roda contra ambientes remotos.`)
}

const valid = {
  name: 'Candidato Ficticio',
  email: 'candidato.ficticio@example.invalid',
  phone: '11 90000-0000',
  area: 'dba',
  profileUrl: 'https://example.invalid/perfil',
  message: 'Mensagem sintetica de teste.',
  consent: true,
  website: '',
}
// IP distinto por teste evita interferencia do rate limit entre casos.
let n = 10
const post = (body, { raw, type = 'application/json' } = {}) =>
  fetch(`${BASE}/api/trabalhe-conosco`, {
    method: 'POST',
    headers: { 'content-type': type, 'x-forwarded-for': `203.0.113.${n++}` },
    body: raw ?? JSON.stringify(body),
  })

test('pagina /trabalhe-conosco responde 200 com 1 h1', async () => {
  const r = await fetch(`${BASE}/trabalhe-conosco`)
  assert.equal(r.status, 200)
  const html = await r.text()
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1)
})

test('envio valido -> 200 dryRun (nenhum e-mail enviado)', async () => {
  const r = await post(valid)
  assert.equal(r.status, 200)
  assert.deepEqual(await r.json(), { success: true, dryRun: true })
})

test('sem consentimento LGPD -> 400', async () => {
  assert.equal((await post({ ...valid, consent: false })).status, 400)
})

test('campos extras / area invalida -> 400', async () => {
  assert.equal((await post({ ...valid, extra: 1 })).status, 400)
  assert.equal((await post({ ...valid, area: 'xyz' })).status, 400)
})

test('honeypot preenchido -> 200 sem dryRun (nao processa)', async () => {
  const r = await post({ ...valid, website: 'http://spam.invalid' })
  assert.equal(r.status, 200)
  assert.deepEqual(await r.json(), { success: true })
})

test('content-type errado -> 415; JSON quebrado -> 400; corpo grande -> 413', async () => {
  assert.equal((await post(null, { raw: 'x', type: 'text/plain' })).status, 415)
  assert.equal((await post(null, { raw: '{oops' })).status, 400)
  assert.equal((await post({ ...valid, message: 'a'.repeat(20000) })).status, 413)
})

test('rajada de 7 do mesmo IP -> aparece 429 com Retry-After', async () => {
  const ip = '198.51.100.77'
  const codes = []
  let retry
  for (let i = 0; i < 7; i++) {
    const r = await fetch(`${BASE}/api/trabalhe-conosco`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
      body: JSON.stringify(valid),
    })
    codes.push(r.status)
    if (r.status === 429) retry = r.headers.get('retry-after')
  }
  assert.ok(codes.includes(429), `esperava 429, obtido ${codes}`)
  assert.equal(retry, '60')
})
