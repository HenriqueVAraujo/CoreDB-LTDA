// Armazenamento local: diretorio privado fixo + realpath, idempotencia, rollback sem orfaos.
// Uso: node --experimental-strip-types --test tests/careers-storage.unit.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import path from 'node:path'
import { storeCv, resolvePrivateDir, isInside, LOCAL_DIR_NAME, storedNameFor } from '../src/lib/careers-storage.ts'
import { pdf, doc } from './fixtures-cv.mjs'

const META = { kind: 'pdf', area: 'dba', originalName: 'cv.pdf', consentCvAt: '2026-11-11T00:00:00.000Z' }
const testDirectory = path.resolve('tests')

test('candidaturas distintas com mesmo currículo preservam seus metadados', () => sandbox(async (root) => {
  const first = '11111111-1111-4111-8111-111111111111'
  const second = '22222222-2222-4222-8222-222222222222'
  const a = await storeCv(pdf(), { ...META, applicationId: first })
  const b = await storeCv(pdf(), { ...META, applicationId: second })
  assert.notEqual(a.id, b.id)
  for (const [result, applicationId] of [[a, first], [b, second]]) {
    const meta = JSON.parse(readFileSync(path.join(root, LOCAL_DIR_NAME, `${result.id}.json`), 'utf8'))
    assert.equal(meta.applicationId, applicationId)
    assert.ok(existsSync(path.join(root, LOCAL_DIR_NAME, `${result.id}.pdf`)))
  }
}))

// Cada teste roda em um tmp proprio (removido ao final: so o que o proprio teste criou).
async function sandbox(fn) {
  const root = mkdtempSync(path.join(testDirectory, 'tc-store-'))
  const prev = { cwd: process.cwd(), mode: process.env.CAREERS_CV_STORAGE, node: process.env.NODE_ENV, vercel: process.env.VERCEL, allow: process.env.CAREERS_CV_LOCAL_ALLOW }
  process.chdir(root)
  process.env.CAREERS_CV_STORAGE = 'local'
  delete process.env.VERCEL
  try {
    await fn(root)
  } finally {
    process.chdir(prev.cwd)
    for (const [k, v] of [['CAREERS_CV_STORAGE', prev.mode], ['NODE_ENV', prev.node], ['VERCEL', prev.vercel], ['CAREERS_CV_LOCAL_ALLOW', prev.allow]]) {
      if (v === undefined) delete process.env[k]
      else process.env[k] = v
    }
    rmSync(root, { recursive: true, force: true })
  }
}

test('achado 4: pasta fixa dentro do projeto; variavel de caminho e ignorada', () => sandbox(async (root) => {
  process.env.CAREERS_CV_LOCAL_DIR = path.join(root, 'public', 'x')
  const dir = await resolvePrivateDir()
  assert.ok(isInside(dir, root))
  assert.equal(path.basename(dir), LOCAL_DIR_NAME)
  assert.ok(!existsSync(path.join(root, 'public')))
  delete process.env.CAREERS_CV_LOCAL_DIR
}))

test('achado 4: symlink/junction da pasta privada apontando para fora e recusado', () => sandbox(async (root) => {
  const outside = mkdtempSync(path.join(testDirectory, 'tc-out-'))
  try {
    try { symlinkSync(outside, path.join(root, LOCAL_DIR_NAME), 'junction') } catch { return } // sem permissao de link: pula
    await assert.rejects(() => storeCv(pdf(), META), /pasta privada/)
    assert.deepEqual(readdirSync(outside), [])
  } finally {
    rmSync(outside, { recursive: true, force: true })
  }
}))

test('achado 4: link para public/ e recusado; comparacao respeita a caixa do sistema', () => sandbox(async (root) => {
  mkdirSync(path.join(root, 'public'))
  let linked = true
  try { symlinkSync(path.join(root, 'public'), path.join(root, LOCAL_DIR_NAME), 'junction') } catch { linked = false }
  if (linked) {
    await assert.rejects(() => storeCv(pdf(), META), /pasta privada/)
    assert.deepEqual(readdirSync(path.join(root, 'public')), [])
  }
  if (process.platform === 'win32') assert.ok(isInside('C:\\A\\Public\\x', 'c:\\a\\public'))
  else assert.ok(!isInside('/a/Public/x', '/a/public'))
}))

test('achado 4: ambiente nao autorizado (VERCEL; production sem ALLOW) e recusado', () => sandbox(async () => {
  process.env.VERCEL = '1'
  await assert.rejects(() => storeCv(pdf(), META), /indisponível/)
  delete process.env.VERCEL
  process.env.NODE_ENV = 'production'
  await assert.rejects(() => storeCv(pdf(), META), /não autorizado/)
  process.env.CAREERS_CV_LOCAL_ALLOW = 'true'
  const r = await storeCv(pdf(), META)
  assert.equal(r.mode, 'local')
}))

test('achado 6: upload repetido e idempotente (mesmo id, sem copia)', () => sandbox(async (root) => {
  const a = await storeCv(pdf(), META)
  const b = await storeCv(pdf(), META)
  assert.equal(a.id, b.id)
  assert.equal(a.existed, false)
  assert.equal(b.existed, true)
  assert.deepEqual(readdirSync(path.join(root, LOCAL_DIR_NAME)).sort(), [`${a.id}.json`, `${a.id}.pdf`].sort())
  const c = await storeCv(doc(), { ...META, kind: 'doc' })
  assert.notEqual(c.id, a.id)
  assert.equal(readdirSync(path.join(root, LOCAL_DIR_NAME)).length, 4)
}))

test('achado 6: falha ao gravar metadados nao deixa arquivo orfao nem temporarios', () => sandbox(async (root) => {
  const bytes = pdf()
  const { id } = storedNameFor('pdf', bytes)
  mkdirSync(path.join(root, LOCAL_DIR_NAME))
  mkdirSync(path.join(root, LOCAL_DIR_NAME, `${id}.json`)) // um DIRETORIO no lugar do metadado final: o rename falha
  await assert.rejects(() => storeCv(bytes, META))
  assert.deepEqual(readdirSync(path.join(root, LOCAL_DIR_NAME)), [`${id}.json`]) // so o que o teste plantou
}))

test('achado 6: orfao anterior (arquivo sem metadado) e completado, nao duplicado', () => sandbox(async (root) => {
  const bytes = pdf()
  const { id } = storedNameFor('pdf', bytes)
  mkdirSync(path.join(root, LOCAL_DIR_NAME))
  writeFileSync(path.join(root, LOCAL_DIR_NAME, `${id}.pdf`), bytes)
  const r = await storeCv(bytes, META)
  assert.equal(r.id, id)
  assert.deepEqual(readdirSync(path.join(root, LOCAL_DIR_NAME)).sort(), [`${id}.json`, `${id}.pdf`].sort())
}))
