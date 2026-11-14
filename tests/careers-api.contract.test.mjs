import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Transpile in memory using the existing devDependency; no server, network or build.
const require = createRequire(import.meta.url)
const ts = require('typescript')
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
require.extensions['.ts'] = (module, filename) => {
  const source = readFileSync(filename, 'utf8').replaceAll("'@/lib/", "'" + path.join(root, 'src/lib/').replaceAll('\\', '/'))
  module._compile(ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true,
  } }).outputText, filename)
}
const { careersSchema, careerAreas } = require('../src/lib/careers-schema.ts')
const { createCareersHandler } = require('../src/lib/careers-delivery.ts')
const { createCareersReference, appendCareersRecord } = require('../src/lib/careers-record.ts')
const valid = () => ({ nome: 'Pessoa Teste', email: 'pessoa@example.org', telefone: '+55 (11) 99999-0000',
  cidade: 'São Paulo', estado: 'SP', areas: ['dba_postgresql'], experiencia: 'pleno',
  modalidade: 'remoto', disponibilidade: 'a_combinar', perfilUrl: 'https://example.org/perfil',
  resumo: 'Experiência técnica em ambientes sintéticos.', consentimentoAnalise: true,
  consentimentoBanco: false, website: '',
})
const request = (payload = valid(), headers = {}) => new Request('http://localhost/api/trabalhe-conosco', {
  method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(payload),
})
const realEnv = { VERCEL: '1', VERCEL_ENV: 'production', SMTP_USER: 'site@example.org',
  SMTP_PASS: 'synthetic-test-password', CAREERS_RECEIVER_EMAIL: 'rh@example.org' }

test('schema: limites, enums, UF, áreas, URL, consentimentos e campos desconhecidos', () => {
  assert.equal(careersSchema.safeParse(valid()).success, true)
  for (const field of ['telefone', 'perfilUrl']) {
    const data = valid(); delete data[field]
    assert.equal(careersSchema.safeParse(data).success, true)
  }
  const failures = { nome: ['', 'x'.repeat(121)], email: ['inválido', 'x'.repeat(255)],
    telefone: ['123abc', '1'.repeat(33)], cidade: ['', 'x'.repeat(81)], estado: ['ZZ', 'sp', 'SP '],
    areas: [[], Array(7).fill('fluig'), ['invalida']], experiencia: ['lead'], modalidade: ['flex'],
    disponibilidade: ['amanha'], perfilUrl: ['ftp://example.org', 'javascript:alert(1)', 'https://example.org/' + 'a'.repeat(300)],
    resumo: ['', 'x'.repeat(1501)], consentimentoAnalise: [false, 'true', undefined],
    consentimentoBanco: ['true', undefined], website: ['bot', ' ', undefined],
  }
  for (const [field, values] of Object.entries(failures)) for (const value of values) {
    assert.equal(careersSchema.safeParse({ ...valid(), [field]: value }).success, false, `${field}: ${String(value)}`)
  }
  for (const area of careerAreas) assert.equal(careersSchema.safeParse({ ...valid(), areas: [area] }).success, true)
  assert.equal(careersSchema.safeParse({ ...valid(), areas: careerAreas.slice(0, 6) }).success, true)
  for (const [field, max] of [['nome', 120], ['cidade', 80], ['resumo', 1500]]) {
    assert.equal(careersSchema.safeParse({ ...valid(), [field]: 'a'.repeat(max) }).success, true)
  }
  for (const field of ['cpf', 'rg', 'dataNascimento', 'foto', 'estadoCivil', 'dadoSensivel', 'curriculo']) {
    assert.equal(Object.hasOwn(careersSchema.shape, field), false)
    assert.equal(careersSchema.safeParse({ ...valid(), [field]: 'não solicitado' }).success, false)
  }
})

test('schema: rejeita CR/LF e controles antes de normalizar todos os textos', () => {
  for (const [field, value] of Object.entries(valid())) {
    if (typeof value !== 'string') continue
    for (const control of ['\r', '\n', '\t', '\0', '\x7f', '\x85', '\u2028']) {
      assert.equal(careersSchema.safeParse({ ...valid(), [field]: value + control }).success, false, field)
    }
  }
  assert.equal(careersSchema.safeParse({ ...valid(), areas: ['fluig\r\n'] }).success, false)
})

test('simulado: falso recebimento, referência e registro verificável; Vercel não grava', async () => {
  const records = []
  const handler = createCareersHandler({ env: {}, record: async item => records.push(item) })
  const response = await handler(request())
  assert.equal(response.status, 200)
  const data = await response.json()
  assert.deepEqual(Object.keys(data).sort(), ['ok', 'modo', 'recebido', 'referencia', 'mensagem'].sort())
  assert.equal(data.ok, true); assert.equal(data.modo, 'simulado'); assert.equal(data.recebido, false)
  assert.match(data.mensagem, /SIMULADO: nada foi enviado ao RH/)
  assert.match(data.referencia, /^TC-\d{8}-[A-Z0-9]{6}$/)
  assert.equal(records[0].referencia, data.referencia)
  assert.equal(records[0].campos.consentimentoBanco, false)
  assert.equal(records[0].campos.consentimentoAnalise, true)
  assert.equal(Object.hasOwn(records[0].campos, 'website'), false)
  assert.ok(Number.isFinite(Date.parse(records[0].timestamp)))
  const vercel = createCareersHandler({ env: { ...realEnv, VERCEL_ENV: 'preview' },
    sendMail: async () => { assert.fail('Preview não deve enviar') },
    record: async () => { assert.fail('Vercel não deve gravar') },
  })
  assert.equal((await (await vercel(request())).json()).recebido, false)
})

test('real: transporte falso recebe texto puro, reply-to validado e assunto com referência', async () => {
  let mail
  const handler = createCareersHandler({ env: realEnv, sendMail: async input => {
    mail = input; return { accepted: [{ address: 'RH@example.org' }] }
  } })
  const response = await handler(request({ ...valid(), resumo: '<script>apenas texto</script>' }))
  assert.equal(response.status, 200)
  const data = await response.json()
  assert.equal(data.recebido, true); assert.equal(data.modo, 'real')
  assert.ok(mail.subject.includes(data.referencia))
  assert.equal(mail.replyTo, valid().email); assert.equal(mail.to, realEnv.CAREERS_RECEIVER_EMAIL)
  assert.equal(Object.hasOwn(mail, 'html'), false)
  assert.ok(mail.text.includes('<script>apenas texto</script>'))
})

test('fail-closed: ausência de destino, SMTP recusado/erro e registro indisponível', async () => {
  for (const missing of ['SMTP_USER', 'SMTP_PASS', 'CAREERS_RECEIVER_EMAIL']) {
    const env = { ...realEnv }; delete env[missing]
    const handler = createCareersHandler({ env })
    const response = await handler(request())
    assert.equal(response.status, 503)
    assert.equal((await response.json()).codigo, 'sem_destino')
  }
  for (const sendMail of [async () => ({}), async () => ({ accepted: ['other@example.org'] }), async () => { throw Error('smtp') }]) {
    const response = await createCareersHandler({ env: realEnv, sendMail })(request())
    assert.equal(response.status, 503); assert.equal((await response.json()).ok, false)
  }
  const response = await createCareersHandler({ env: {}, record: async () => { throw Error('disk') } })(request())
  assert.equal(response.status, 503)
})

test('force real requer credenciais; configuração e candidato com CR/LF não enviam', async () => {
  let sent = 0
  const sendMail = async () => { sent++; return { accepted: ['rh@example.org'] } }
  const env = { ...realEnv, VERCEL_ENV: 'preview', CAREERS_FORCE_REAL: '1' }
  assert.equal((await (await createCareersHandler({ env, sendMail })(request())).json()).recebido, true)
  assert.equal(sent, 1)
  const badConfig = await createCareersHandler({ env: { ...realEnv, CAREERS_RECEIVER_EMAIL: 'rh@example.org\r\n' }, sendMail })(request())
  assert.equal(badConfig.status, 503)
  const badCandidate = await createCareersHandler({ env: realEnv, sendMail })(request({ ...valid(), email: 'pessoa@example.org\r\nBcc:x@example.org' }))
  assert.equal(badCandidate.status, 400); assert.equal(sent, 1)
})

test('honeypot retorna erros por campo e nunca entrega ou registra', async () => {
  const handler = createCareersHandler({ env: realEnv,
    sendMail: async () => assert.fail('honeypot'), record: async () => assert.fail('honeypot'),
  })
  const response = await handler(request({ ...valid(), website: 'bot' }))
  assert.equal(response.status, 400)
  assert.equal(typeof (await response.json()).erros.website, 'string')
})

test('rate limit: cinco por minuto, erros contam e expiração libera (somente memória)', async () => {
  let time = Date.UTC(2026, 10, 14)
  const handler = createCareersHandler({ env: { VERCEL: '1' }, now: () => time })
  for (let i = 0; i < 5; i++) assert.equal((await handler(request({}))).status, 400)
  const limited = await handler(request())
  assert.equal(limited.status, 429); assert.equal(limited.headers.get('retry-after'), '60')
  assert.equal((await handler(request(valid(), { 'x-forwarded-for': '192.0.2.1' }))).status, 200)
  time += 60_000
  assert.equal((await handler(request())).status, 200)
})

test('payload: JSON inválido, tipo, tamanho declarado e real', async () => {
  const handler = () => createCareersHandler({ env: { VERCEL: '1' } })
  for (const [body, headers, status] of [
    ['{', { 'content-type': 'application/json' }, 400],
    ['{}', { 'content-type': 'multipart/form-data' }, 415],
    ['{}', { 'content-type': 'application/json', 'content-length': '20000' }, 413],
    ['x'.repeat(17000), { 'content-type': 'application/json' }, 413],
  ]) assert.equal((await handler()(new Request('http://localhost', { method: 'POST', headers, body }))).status, status)
})

test('referências distintas em 10 mil gerações no mesmo instante', () => {
  const date = new Date('2026-11-14T12:00:00Z')
  const refs = new Set(Array.from({ length: 10000 }, () => createCareersReference(date)))
  assert.equal(refs.size, 10000)
  for (const ref of refs) assert.match(ref, /^TC-20261114-[A-Z0-9]{6}$/)
})

test('JSONL real em diretório temporário; Vercel recusa filesystem', async () => {
  const previousCwd = process.cwd()
  const previousVercel = process.env.VERCEL
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'careers-api-'))
  try {
    process.chdir(temporary); delete process.env.VERCEL
    const response = await createCareersHandler({ env: {} })(request())
    assert.equal(response.status, 200)
    const line = JSON.parse((await readFile(path.join(temporary, '.careers-data/candidaturas.jsonl'), 'utf8')).trim())
    assert.equal(line.referencia, (await response.json()).referencia)
    assert.equal(line.campos.email, valid().email)
    process.env.VERCEL = '1'
    await assert.rejects(appendCareersRecord(line), /Vercel/)
  } finally {
    process.chdir(previousCwd)
    if (previousVercel === undefined) delete process.env.VERCEL
    else process.env.VERCEL = previousVercel
    assert.ok(path.resolve(temporary).startsWith(path.resolve(os.tmpdir()) + path.sep))
    assert.ok(path.basename(temporary).startsWith('careers-api-'))
    await rm(temporary, { recursive: true, force: true })
  }
})

test('route exporta o handler POST em runtime nodejs', () => {
  const route = require('../src/app/api/trabalhe-conosco/route.ts')
  assert.equal(route.runtime, 'nodejs'); assert.equal(typeof route.POST, 'function')
})
