// Achado 7: validar o nome ORIGINAL antes de sanear; Object.hasOwn.
// Uso: node --experimental-strip-types --test tests/careers-name.unit.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateFileName } from '../src/lib/careers-upload.ts'

const code = (r) => (r.ok ? 'OK' : r.code)

test('nome original com separadores/caracteres invalidos e rejeitado (nao saneado)', () => {
  for (const n of ['cv.ex?e.pdf', 'a/b.pdf', 'a\\b.pdf', '..\\cv.pdf', 'cv<1>.pdf', 'cv:x.pdf', 'cv|x.pdf', 'cv"x.pdf', 'cv*.pdf', ' cv.pdf', 'cv.pdf ']) {
    assert.equal(code(validateFileName(n)), 'BAD_NAME', JSON.stringify(n))
  }
})

test('extensao proibida alem do truncamento de 120 chars e detectada no nome original', () => {
  assert.equal(code(validateFileName('a'.repeat(130) + '.exe.pdf')), 'FORBIDDEN_EXTENSION')
  assert.equal(code(validateFileName('x'.repeat(250) + '.pdf')), 'OK')
  assert.equal(code(validateFileName('x'.repeat(252) + '.pdf')), 'BAD_NAME') // > 255
})

test('segmentos com espaco em volta nao escondem extensao proibida', () => {
  assert.equal(code(validateFileName('cv.exe .pdf')), 'FORBIDDEN_EXTENSION')
  assert.equal(code(validateFileName('cv. pdf.docx')), 'DOUBLE_EXTENSION')
})

test('Object.hasOwn: propriedades herdadas de Object.prototype nao contam como extensao permitida', () => {
  for (const n of ['cv.constructor', 'cv.toString', 'cv.__proto__', 'cv.hasOwnProperty', 'cv.valueOf']) {
    assert.equal(code(validateFileName(n)), 'BAD_EXTENSION', n)
  }
  assert.equal(code(validateFileName('cv.constructor.pdf')), 'OK')
  assert.equal(code(validateFileName('cv.toString.pdf')), 'OK') // segmento do meio herdado nao e dupla extensao
})
