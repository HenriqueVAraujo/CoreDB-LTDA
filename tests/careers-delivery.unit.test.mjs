// Exercita o handler real com fronteiras Next/Zod/SMTP/storage substituídas.
// Validação documental usa os módulos reais. Validação Zod é coberta pelos smokes HTTP.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'
import { randomUUID } from 'node:crypto'
import * as upload from '../src/lib/careers-upload.ts'
import { inspectCvStructure } from '../src/lib/careers-inspect.ts'
import { StorageUnavailableError, storedNameFor } from '../src/lib/careers-storage.ts'
import { pdf, doc, docx, pdfOfSize, pdfJs, docm, MIME } from './fixtures-cv.mjs'

let source = readFileSync(new URL('../src/app/api/trabalhe-conosco/route.ts', import.meta.url), 'utf8')
source = source.replace(/^import .*\r?\n/gm, '')
source = source.replace(/const schema = z[\s\S]*?\.strict\(\)/, `const schema = { safeParse: value => ({ success: value.consent === true, data: value }) }`)
source = stripTypeScriptTypes(source).replace('export async function POST', 'async function POST')
const factory = new Function('deps', `const { randomUUID, NextResponse, nodemailer, careersSmtpEnabled, careersProduction, createRateLimiter, RATE_LIMIT_WINDOW_MS, CV_MAX_BYTES, CV_MESSAGES, sanitizeOriginalName, validateCvFile, StorageUnavailableError, storeCv, inspectCvStructure } = deps; ${source}; return POST`)

function setup({ production = true, smtp = true, storage = 'ok', mail = 'ok' } = {}) {
  const files = [], emails = []
  const post = factory({
    ...upload, randomUUID, inspectCvStructure, StorageUnavailableError,
    NextResponse: { json: (body, init) => Response.json(body, init) },
    careersSmtpEnabled: () => smtp, careersProduction: () => production,
    createRateLimiter: () => () => false, RATE_LIMIT_WINDOW_MS: 60000,
    storeCv: async (bytes, meta) => {
      if (storage === 'off') return null
      if (storage === 'fail') throw new Error('synthetic storage failure')
      files.push(meta)
      return storedNameFor(meta.kind, bytes, meta.applicationId)
    },
    nodemailer: { createTransport: () => ({ sendMail: async email => {
      emails.push(email)
      if (mail === 'fail') throw new Error('synthetic SMTP failure')
      return { accepted: mail === 'reject' ? [] : ['recruiter@example.invalid'] }
    } }) },
  })
  async function send(bytes, kind = 'pdf', consentCv = true) {
    const fd = new FormData()
    for (const [k, v] of Object.entries({ name: 'Pessoa Ficticia', email: 'test@example.invalid', area: 'dba', message: '', consent: 'true', consentCv: String(consentCv) })) fd.append(k, v)
    if (bytes) fd.append('cv', new Blob([bytes], { type: MIME[kind] }), `cv.${kind}`)
    const r = await post(new Request('http://localhost/api/trabalhe-conosco', { method: 'POST', body: fd }))
    return { status: r.status, ...await r.json() }
  }
  return { send, files, emails }
}

test('entrega real sem anexo e com PDF/DOC/DOCX, ID no email e arquivo', async () => {
  const previous = process.env.CAREERS_RECEIVER_EMAIL
  process.env.CAREERS_RECEIVER_EMAIL = 'recruiter@example.invalid'
  try {
    const s = setup()
    assert.equal((await s.send()).success, true)
    for (const [bytes, kind] of [[pdf(), 'pdf'], [doc(), 'doc'], [docx(), 'docx']]) {
      const r = await s.send(bytes, kind)
      assert.equal(r.success, true)
      assert.equal(s.files.at(-1).applicationId, r.applicationId)
      assert.ok(s.emails.at(-1).text.includes(r.applicationId))
      assert.ok(s.emails.at(-1).text.includes(storedNameFor(kind, bytes, r.applicationId).fileName))
    }
    const a = await s.send(pdf()), b = await s.send(pdf())
    assert.notEqual(a.applicationId, b.applicationId)
  } finally {
    if (previous === undefined) delete process.env.CAREERS_RECEIVER_EMAIL
    else process.env.CAREERS_RECEIVER_EMAIL = previous
  }
})

test('produção falha com storage off/falho e SMTP falho/rejeitado/desligado', async () => {
  for (const options of [{ storage: 'off' }, { storage: 'fail' }, { mail: 'fail' }, { mail: 'reject' }, { smtp: false }]) {
    const r = await setup(options).send(pdf())
    assert.equal(r.success, false)
    assert.ok(r.status >= 500)
  }
})

test('simulação valida sem armazenar ou enviar; consentimento e conteúdo ativo', async () => {
  const s = setup({ production: false, smtp: false })
  assert.equal((await s.send(pdf())).dryRun, true)
  assert.equal(s.files.length, 0)
  assert.equal(s.emails.length, 0)
  assert.equal((await s.send(pdf(), 'pdf', false)).code, 'CONSENT_CV')
  assert.equal((await s.send(new Uint8Array([1, 2]))).code, 'BAD_SIGNATURE')
  assert.equal((await s.send(pdfJs())).code, 'ACTIVE_CONTENT')
  assert.equal((await s.send(docm(), 'docx')).code, 'ACTIVE_CONTENT')
  assert.equal((await s.send(pdfOfSize(4 * 1024 * 1024))).success, true)
  assert.equal((await s.send(pdfOfSize(4 * 1024 * 1024 + 1))).status, 413)
})
