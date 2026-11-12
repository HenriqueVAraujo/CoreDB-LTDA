// Testes da inspecao estrutural (PDF/CFB/OOXML, conteudo ativo, limites de descompressao).
// Uso: node --experimental-strip-types --test tests/careers-inspect.unit.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { inspectCvStructure } from '../src/lib/careers-inspect.ts'
import { validateCvFile } from '../src/lib/careers-upload.ts'
import * as F from './fixtures-cv.mjs'

const res = (kind, buf) => { const r = inspectCvStructure(kind, buf); return r.ok ? 'OK' : r.code }
const reason = (kind, buf) => { const r = inspectCvStructure(kind, buf); return r.ok ? '' : r.reason }

test('achado 1: documentos reais minimos sao aceitos (PDF, DOC, DOCX)', () => {
  assert.equal(res('pdf', F.pdf()), 'OK', reason('pdf', F.pdf()))
  assert.equal(res('doc', F.doc()), 'OK', reason('doc', F.doc()))
  assert.equal(res('docx', F.docx()), 'OK', reason('docx', F.docx()))
  assert.equal(res('docx', F.docxHyperlinkOk()), 'OK', reason('docx', F.docxHyperlinkOk())) // hiperlink externo permitido
})

test('achado 1: falsos documentos (so cabecalho/marcadores) sao rejeitados', () => {
  assert.equal(res('pdf', F.pdfFake()), 'BAD_STRUCTURE')
  assert.equal(res('pdf', F.pdfNoXref()), 'BAD_STRUCTURE')
  assert.equal(res('doc', F.docFake()), 'BAD_STRUCTURE')
  assert.equal(res('doc', F.docTruncated()), 'BAD_STRUCTURE')
  assert.equal(res('doc', F.docBadFib()), 'BAD_STRUCTURE')
  assert.equal(res('doc', F.docNoTable()), 'BAD_STRUCTURE')
  assert.equal(res('docx', F.docxFake()), 'BAD_STRUCTURE')
  assert.equal(res('docx', F.docxNoContentTypes()), 'BAD_STRUCTURE')
  assert.equal(res('docx', F.xlsxLike()), 'BAD_STRUCTURE')
  assert.equal(res('docx', F.plainZip()), 'BAD_STRUCTURE')
  assert.equal(res('docx', F.docxBadCrc()), 'BAD_STRUCTURE')
  assert.equal(res('docx', F.zipSlip()), 'BAD_STRUCTURE')
  assert.equal(res('pdf', Buffer.alloc(64)), 'BAD_STRUCTURE')
})

test('achado 1: PDF com startxref corrompido e rejeitado', () => {
  const b = F.pdf().toString('latin1').replace(/startxref\n\d+/, 'startxref\n999999')
  assert.equal(res('pdf', Buffer.from(b, 'latin1')), 'BAD_STRUCTURE')
})

test('achado 1: limites de descompressao (bomba declarada e mentirosa)', () => {
  assert.equal(res('docx', F.zipBombDeclared()), 'BAD_STRUCTURE')
  assert.match(reason('docx', F.zipBombDeclared()), /(total|entrada|razão)/)
  assert.equal(res('docx', F.zipBombLiar()), 'BAD_STRUCTURE') // declara 100 B, infla 2 MB
})

test('achado 2: .docm renomeado para .docx -> ACTIVE_CONTENT', () => {
  assert.equal(res('docx', F.docm()), 'ACTIVE_CONTENT')
  assert.equal(res('docx', F.docxWithVbaPart()), 'ACTIVE_CONTENT')
  assert.equal(res('docx', F.docxOle()), 'ACTIVE_CONTENT')
})

test('achado 2: injecao de modelo remoto, DDE e DTD em DOCX -> ACTIVE_CONTENT', () => {
  assert.equal(res('docx', F.docxTemplateInjection()), 'ACTIVE_CONTENT')
  assert.equal(res('docx', F.docxDde()), 'ACTIVE_CONTENT')
  assert.equal(res('docx', F.docxDoctype()), 'ACTIVE_CONTENT')
})

test('achado 2: DOC com macros / VBA / objetos embutidos -> ACTIVE_CONTENT; criptografado -> BAD_STRUCTURE', () => {
  assert.equal(res('doc', F.docMacros()), 'ACTIVE_CONTENT')
  assert.equal(res('doc', F.docVbaProject()), 'ACTIVE_CONTENT')
  assert.equal(res('doc', F.docObjectPool()), 'ACTIVE_CONTENT')
  assert.equal(res('doc', F.docEncrypted()), 'BAD_STRUCTURE')
})

test('achado 2: PDF com JavaScript/OpenAction/Launch/EmbeddedFile (inclusive ofuscado e em ObjStm) -> ACTIVE_CONTENT', () => {
  assert.equal(res('pdf', F.pdfJs()), 'ACTIVE_CONTENT')
  assert.equal(res('pdf', F.pdfObfuscated()), 'ACTIVE_CONTENT') // /J#61vaScript e /#4aavaScript
  assert.equal(res('pdf', F.pdfLaunch()), 'ACTIVE_CONTENT')
  assert.equal(res('pdf', F.pdfEmbedded()), 'ACTIVE_CONTENT')
  assert.equal(res('pdf', F.pdfObjStmJs()), 'ACTIVE_CONTENT') // escondido em stream comprimido
  assert.equal(res('pdf', F.pdfEncrypted()), 'BAD_STRUCTURE')
})

test('a assinatura leve sozinha aprova um .docm; por isso a inspecao existe', () => {
  const b = F.docm()
  assert.equal(validateCvFile({ name: 'a.docx', size: b.length, type: F.MIME.docx }, b).ok, true)
  assert.equal(res('docx', b), 'ACTIVE_CONTENT')
})
