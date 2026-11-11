// Testes unitarios dos validadores de anexo.
// Uso: node --experimental-strip-types --test tests/careers-upload.unit.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  CV_MAX_BYTES, validateFileName, validateFileMeta, validateCvFile, detectKind, sanitizeOriginalName, getExtension,
} from '../src/lib/careers-upload.ts'
import { pdf, doc, docx, exe, xlsLikeOle, plainZip, MIME } from './fixtures-cv.mjs'

const code = (r) => (r.ok ? 'OK' : r.code)
const file = (name, buf, type) => ({ name, size: buf.length, type })

test('nomes validos', () => {
  for (const n of ['cv.pdf', 'Curriculo Fulano.DOCX', 'cv.v2.doc', 'joão_silva.pdf']) assert.equal(code(validateFileName(n)), 'OK', n)
})

test('extensao nao permitida / ausente', () => {
  assert.equal(code(validateFileName('cv.txt')), 'BAD_EXTENSION')
  assert.equal(code(validateFileName('cv')), 'BAD_EXTENSION')
  assert.equal(code(validateFileName('.pdf')), 'BAD_NAME')
})

test('executaveis e dupla extensao rejeitados', () => {
  assert.equal(code(validateFileName('cv.exe')), 'FORBIDDEN_EXTENSION')
  assert.equal(code(validateFileName('cv.pdf.exe')), 'FORBIDDEN_EXTENSION')
  assert.equal(code(validateFileName('cv.exe.pdf')), 'FORBIDDEN_EXTENSION')
  assert.equal(code(validateFileName('cv.php.docx')), 'FORBIDDEN_EXTENSION')
  assert.equal(code(validateFileName('cv.html.pdf')), 'FORBIDDEN_EXTENSION')
  assert.equal(code(validateFileName('cv.docm')), 'FORBIDDEN_EXTENSION')
  assert.equal(code(validateFileName('cv.pdf.docx')), 'DOUBLE_EXTENSION')
  assert.equal(code(validateFileName('cv.doc.pdf')), 'DOUBLE_EXTENSION')
})

test('nomes maliciosos: controle, null byte, bidi, ponto final', () => {
  assert.equal(code(validateFileName('cv\u0000.pdf')), 'BAD_NAME')
  assert.equal(code(validateFileName('cv‮fdp.exe')), 'BAD_NAME')
  assert.equal(code(validateFileName('cv.pdf.')), 'BAD_NAME')
  assert.equal(code(validateFileName('')), 'BAD_NAME')
})

test('sanitizeOriginalName remove caminho e controle', () => {
  assert.equal(sanitizeOriginalName('..\\..\\etc/passwd\u0001.pdf'), 'passwd.pdf')
  assert.equal(getExtension('A.B.PDF'), 'pdf')
})

test('tamanho: vazio, limite exato e acima', () => {
  assert.equal(code(validateFileMeta({ name: 'a.pdf', size: 0, type: MIME.pdf })), 'EMPTY')
  assert.equal(code(validateFileMeta({ name: 'a.pdf', size: CV_MAX_BYTES, type: MIME.pdf })), 'OK')
  assert.equal(code(validateFileMeta({ name: 'a.pdf', size: CV_MAX_BYTES + 1, type: MIME.pdf })), 'TOO_LARGE')
})

test('MIME: divergente rejeitado; vazio/octet-stream delegam a assinatura', () => {
  assert.equal(code(validateFileMeta({ name: 'a.pdf', size: 10, type: MIME.docx })), 'BAD_MIME')
  assert.equal(code(validateFileMeta({ name: 'a.pdf', size: 10, type: 'text/html' })), 'BAD_MIME')
  assert.equal(code(validateFileMeta({ name: 'a.pdf', size: 10, type: '' })), 'OK')
  assert.equal(code(validateFileMeta({ name: 'a.docx', size: 10, type: 'application/octet-stream' })), 'OK')
})

test('assinaturas reais aceitas', () => {
  assert.equal(detectKind(pdf()), 'pdf')
  assert.equal(detectKind(doc()), 'doc')
  assert.equal(detectKind(docx()), 'docx')
  assert.equal(code(validateCvFile(file('a.pdf', pdf(), MIME.pdf), pdf())), 'OK')
  assert.equal(code(validateCvFile(file('a.doc', doc(), MIME.doc), doc())), 'OK')
  assert.equal(code(validateCvFile(file('a.docx', docx(), MIME.docx), docx())), 'OK')
})

test('assinatura divergente / executavel / XLS / ZIP renomeados rejeitados', () => {
  assert.equal(code(validateCvFile(file('a.pdf', exe(), MIME.pdf), exe())), 'BAD_SIGNATURE')
  assert.equal(code(validateCvFile(file('a.pdf', docx(), MIME.pdf), docx())), 'BAD_SIGNATURE')
  assert.equal(code(validateCvFile(file('a.docx', pdf(), MIME.docx), pdf())), 'BAD_SIGNATURE')
  assert.equal(code(validateCvFile(file('a.doc', xlsLikeOle(), MIME.doc), xlsLikeOle())), 'BAD_SIGNATURE')
  assert.equal(code(validateCvFile(file('a.docx', plainZip(), MIME.docx), plainZip())), 'BAD_SIGNATURE')
  assert.equal(code(validateCvFile(file('a.pdf', pdf(), MIME.pdf), Buffer.alloc(3))), 'BAD_SIGNATURE')
})
