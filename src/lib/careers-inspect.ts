import { inflateRawSync, inflateSync } from 'node:zlib'
import type { CvKind } from './careers-upload'

/**
 * Inspeção ESTRUTURAL do anexo (somente servidor, sem dependências externas).
 * Valida que o arquivo é de fato PDF / CFB (DOC) / OPC-ZIP (DOCX) bem formado e
 * recusa conteúdo ativo (macros, scripts, OLE/anexos embutidos, vínculos externos).
 * Tudo com limites de tamanho/entradas/descompressão/tempo; qualquer exceção = rejeita.
 * LIMITE HONESTO: não é antivírus. Não detecta exploits de parser nem malware sem
 * marcadores estruturais; a quarentena/CDR/antivírus continua recomendada (ver APROVACOES).
 */
export type InspectResult =
  | { ok: true }
  | { ok: false; code: 'BAD_STRUCTURE' | 'ACTIVE_CONTENT'; reason: string }

export const LIMITS = {
  zipMaxEntries: 300,
  zipMaxEntryBytes: 20 * 1024 * 1024,
  zipMaxTotalBytes: 30 * 1024 * 1024,
  zipMaxRatio: 100, // só vale para entradas > 64 KB
  pdfMaxInflatedTotal: 20 * 1024 * 1024,
  cfbMaxDirEntries: 4096,
  timeBudgetMs: 3000,
} as const

class Reject extends Error {
  code: 'BAD_STRUCTURE' | 'ACTIVE_CONTENT'
  reason: string
  constructor(code: 'BAD_STRUCTURE' | 'ACTIVE_CONTENT', reason: string) {
    super(reason)
    this.code = code
    this.reason = reason
  }
}
const bad = (reason: string): never => {
  throw new Reject('BAD_STRUCTURE', reason)
}
const active = (reason: string): never => {
  throw new Reject('ACTIVE_CONTENT', reason)
}

export function inspectCvStructure(kind: CvKind, bytes: Uint8Array): InspectResult {
  const deadline = Date.now() + LIMITS.timeBudgetMs
  try {
    const buf = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength)
    if (kind === 'pdf') inspectPdf(buf, deadline)
    else if (kind === 'doc') inspectDoc(buf, deadline)
    else inspectDocx(buf, deadline)
    return { ok: true }
  } catch (e) {
    if (e instanceof Reject) return { ok: false, code: e.code, reason: e.reason }
    return { ok: false, code: 'BAD_STRUCTURE', reason: 'falha ao inspecionar (fail-closed)' }
  }
}

function checkTime(deadline: number) {
  if (Date.now() > deadline) bad('tempo de inspeção excedido')
}

/* ---------------------------------- PDF ---------------------------------- */

/** Nomes PDF que indicam ação/conteúdo ativo ou arquivos embutidos. */
const PDF_ACTIVE = ['JavaScript', 'JS', 'Launch', 'OpenAction', 'AA', 'EmbeddedFile', 'EmbeddedFiles', 'RichMedia', 'SubmitForm', 'ImportData', 'GoToR', 'GoToE', 'XFA', 'Movie', 'Sound', 'Rendition', 'FileAttachment']

/** Decodifica escapes #hh em nomes (/J#61vaScript) e devolve o conjunto de nomes presentes. */
function pdfNames(text: string): Set<string> {
  const out = new Set<string>()
  const re = /\/([^\s/<>[\]()%{}]+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    out.add(m[1].replace(/#([0-9a-fA-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16))))
  }
  return out
}

function scanPdfNames(text: string) {
  const names = pdfNames(text)
  for (const n of PDF_ACTIVE) if (names.has(n)) active(`PDF com /${n}`)
  if (names.has('Encrypt')) bad('PDF criptografado (não inspecionável)')
}

function inspectPdf(buf: Buffer, deadline: number) {
  if (buf.length < 32 || buf.toString('latin1', 0, 5) !== '%PDF-' || !/^%PDF-1\.[0-7]|^%PDF-2\.0/.test(buf.toString('latin1', 0, 8))) {
    bad('cabeçalho PDF inválido')
  }
  const text = buf.toString('latin1')
  const tail = text.slice(Math.max(0, text.length - 2048))
  if (!/%%EOF\s*$/.test(tail)) bad('PDF sem %%EOF final')
  const sx = /startxref\s+(\d{1,10})\s+%%EOF\s*$/.exec(tail)
  if (!sx) bad('PDF sem startxref')
  const xrefOffset = Number(sx![1])
  if (!(xrefOffset > 8 && xrefOffset < buf.length)) bad('startxref fora do arquivo')
  const atXref = text.slice(xrefOffset, xrefOffset + 4096)
  let rootNum: number | null = null
  if (/^xref\s/.test(atXref)) {
    // tabela clássica: confere subseções e o trailer com /Root
    const trailerIdx = text.indexOf('trailer', xrefOffset)
    if (trailerIdx < 0) bad('PDF sem trailer')
    const trailer = text.slice(trailerIdx, trailerIdx + 2048)
    const r = /\/Root\s+(\d+)\s+(\d+)\s+R/.exec(trailer)
    if (!r) bad('trailer sem /Root')
    rootNum = Number(r![1])
    const body = text.slice(xrefOffset + 4, trailerIdx)
    const sub = /\s*(\d+)\s+(\d+)\s*\r?\n/y
    let pos = 0
    let seen = 0
    for (;;) {
      checkTime(deadline)
      sub.lastIndex = pos
      const m = sub.exec(body)
      if (!m) break
      const first = Number(m[1])
      const count = Number(m[2])
      if (count > 200_000) bad('xref grande demais')
      const start = sub.lastIndex
      if (start + count * 20 > body.length + 2) bad('xref truncada')
      if (rootNum >= first && rootNum < first + count) {
        const entry = body.slice(start + (rootNum - first) * 20, start + (rootNum - first) * 20 + 20)
        const e = /^(\d{10}) (\d{5}) ([nf])/.exec(entry)
        if (!e || e[3] !== 'n') bad('entrada /Root inválida na xref')
        const off = Number(e![1])
        if (!new RegExp(`^${rootNum}\\s+\\d+\\s+obj`).test(text.slice(off, off + 64))) bad('/Root não aponta para um objeto')
        seen += 1
      }
      pos = start + count * 20
    }
    if (seen === 0) bad('/Root fora da xref')
  } else if (/^\d+\s+\d+\s+obj/.test(atXref)) {
    // xref stream
    if (!/\/Type\s*\/XRef/.test(atXref) || !/\/Root\s+\d+\s+\d+\s+R/.test(atXref)) bad('xref stream inválida')
  } else {
    bad('startxref não aponta para xref')
  }
  if (!/\/Type\s*\/Catalog/.test(text) && !/\/Type\s*\/ObjStm/.test(text)) bad('PDF sem Catalog')
  if (!/\/Type\s*\/Pages/.test(text) && !/\/Type\s*\/ObjStm/.test(text)) bad('PDF sem árvore de páginas')

  scanPdfNames(text)

  // Streams de objetos (ObjStm) escondem dicionários: infla (limitado) e varre o conteúdo.
  let inflated = 0
  let from = 0
  for (;;) {
    checkTime(deadline)
    const i = text.indexOf('stream', from)
    if (i < 0) break
    from = i + 6
    if (text.startsWith('endstream', i - 3)) continue
    const dictText = text.slice(Math.max(0, i - 1024), i)
    const lastObj = dictText.lastIndexOf('obj')
    const dict = lastObj >= 0 ? dictText.slice(lastObj) : dictText
    if (!/\/Type\s*\/ObjStm/.test(dict)) continue
    const filters = [...dict.matchAll(/\/(FlateDecode|Fl|[A-Za-z0-9]+Decode)\b/g)].map((m) => m[1])
    if (filters.length !== 1 || filters[0] !== 'FlateDecode') bad('ObjStm com filtro não suportado')
    let s = i + 6
    if (text[s] === '\r') s += 1
    if (text[s] === '\n') s += 1
    const end = text.indexOf('endstream', s)
    if (end < 0) bad('stream sem endstream')
    const remaining = LIMITS.pdfMaxInflatedTotal - inflated
    let out: Buffer
    try {
      out = inflateSync(buf.subarray(s, end), { maxOutputLength: Math.max(1, remaining) })
    } catch {
      bad('ObjStm inválido ou grande demais')
      return
    }
    inflated += out.length
    scanPdfNames(out.toString('latin1'))
  }
}

/* ---------------------------------- ZIP / DOCX ---------------------------------- */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
export function crc32(b: Uint8Array): number {
  let c = 0xffffffff
  for (let i = 0; i < b.length; i += 1) c = CRC_TABLE[(c ^ b[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

type ZipEntry = { name: string; method: number; csize: number; usize: number; crc: number; lho: number }

const DOCX_MAIN = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml'
const REL_BAD = /^(oleObject|package|vbaProject|control|macrosheet|attachedTemplate|externalLink|frame|subDocument|webExtension|customUI|activeX)$/i
const NAME_BAD = /(^|\/)(vbaProject[^/]*|vbaData\.xml|activeX\/|embeddings\/|customUI\/|macrosheets\/|.*\.(exe|dll|js|vbs|bat|cmd|ps1|lnk|scr|jar|html?|swf))/i

function readZip(buf: Buffer, deadline: number): { entries: ZipEntry[]; files: Map<string, Buffer> } {
  if (buf.length < 22) bad('ZIP curto demais')
  const minEocd = Math.max(0, buf.length - 22 - 0xffff)
  let eocd = -1
  for (let i = buf.length - 22; i >= minEocd; i -= 1) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i
      break
    }
  }
  if (eocd < 0) bad('ZIP sem EOCD')
  const disk = buf.readUInt16LE(eocd + 4)
  const diskCd = buf.readUInt16LE(eocd + 6)
  const total = buf.readUInt16LE(eocd + 10)
  const cdSize = buf.readUInt32LE(eocd + 12)
  const cdOff = buf.readUInt32LE(eocd + 16)
  const commentLen = buf.readUInt16LE(eocd + 20)
  if (disk !== 0 || diskCd !== 0) bad('ZIP multi-disco')
  if (eocd + 22 + commentLen !== buf.length) bad('dados após o fim do ZIP')
  if (total === 0xffff || cdSize === 0xffffffff || cdOff === 0xffffffff) bad('ZIP64 não suportado')
  if (total < 1 || total > LIMITS.zipMaxEntries) bad('quantidade de entradas fora do limite')
  if (cdOff + cdSize !== eocd) bad('diretório central inconsistente')

  const entries: ZipEntry[] = []
  const names = new Set<string>()
  let p = cdOff
  let declaredTotal = 0
  for (let n = 0; n < total; n += 1) {
    checkTime(deadline)
    if (p + 46 > eocd || buf.readUInt32LE(p) !== 0x02014b50) bad('entrada do diretório central inválida')
    const flags = buf.readUInt16LE(p + 8)
    const method = buf.readUInt16LE(p + 10)
    const crc = buf.readUInt32LE(p + 16)
    const csize = buf.readUInt32LE(p + 20)
    const usize = buf.readUInt32LE(p + 24)
    const nlen = buf.readUInt16LE(p + 28)
    const elen = buf.readUInt16LE(p + 30)
    const clen = buf.readUInt16LE(p + 32)
    const lho = buf.readUInt32LE(p + 42)
    if (p + 46 + nlen + elen + clen > eocd) bad('entrada ultrapassa o diretório central')
    const name = buf.toString('utf8', p + 46, p + 46 + nlen)
    p += 46 + nlen + elen + clen
    if (flags & 1 || flags & 0x40) bad('ZIP criptografado')
    if (method !== 0 && method !== 8) bad('método de compressão não suportado')
    if (!name || name.includes('\\') || name.includes('\0') || name.startsWith('/') || name.split('/').some((s) => s === '..' || s === '.')) bad('nome de entrada inseguro')
    if (name.length > 255) bad('nome de entrada longo demais')
    const key = name.toLowerCase()
    if (names.has(key)) bad('entradas duplicadas')
    names.add(key)
    if (usize > LIMITS.zipMaxEntryBytes) bad('entrada descomprimida grande demais')
    if (usize > 65536 && usize / Math.max(1, csize) > LIMITS.zipMaxRatio) bad('razão de compressão suspeita (bomba de descompressão)')
    declaredTotal += usize
    if (declaredTotal > LIMITS.zipMaxTotalBytes) bad('total descomprimido acima do limite')
    entries.push({ name, method, csize, usize, crc, lho })
  }
  if (p !== eocd) bad('lixo no diretório central')

  const files = new Map<string, Buffer>()
  let actualTotal = 0
  for (const e of entries) {
    checkTime(deadline)
    if (e.lho + 30 > cdOff || buf.readUInt32LE(e.lho) !== 0x04034b50) bad('cabeçalho local inválido')
    const lnlen = buf.readUInt16LE(e.lho + 26)
    const lelen = buf.readUInt16LE(e.lho + 28)
    if (buf.toString('utf8', e.lho + 30, e.lho + 30 + lnlen) !== e.name) bad('nome local diverge do central')
    const ds = e.lho + 30 + lnlen + lelen
    if (ds + e.csize > cdOff) bad('dados da entrada fora dos limites')
    const raw = buf.subarray(ds, ds + e.csize)
    let data: Buffer
    if (e.method === 0) {
      if (e.csize !== e.usize) bad('entrada armazenada com tamanho divergente')
      data = raw
    } else {
      try {
        data = inflateRawSync(raw, { maxOutputLength: e.usize + 1 })
      } catch {
        bad('entrada comprimida inválida ou maior que o declarado')
        return { entries, files }
      }
    }
    if (data.length !== e.usize) bad('tamanho descomprimido diverge do declarado')
    actualTotal += data.length
    if (actualTotal > LIMITS.zipMaxTotalBytes) bad('total descomprimido acima do limite')
    if (crc32(data) !== e.crc) bad('CRC32 divergente')
    files.set(e.name, data)
  }
  return { entries, files }
}

function inspectDocx(buf: Buffer, deadline: number) {
  const { entries, files } = readZip(buf, deadline)
  for (const e of entries) {
    if (NAME_BAD.test(e.name)) active(`parte OOXML ativa/embutida: ${e.name.slice(0, 60)}`)
    if (/\.bin$/i.test(e.name) && !/^word\/printerSettings\//i.test(e.name)) active(`parte binária: ${e.name.slice(0, 60)}`)
    if (/^xl\/|^ppt\//i.test(e.name)) bad('pacote não é Word')
  }
  const ct = files.get('[Content_Types].xml')
  const rels = files.get('_rels/.rels')
  const doc = files.get('word/document.xml')
  if (!ct || !rels || !doc) bad('partes OPC obrigatórias ausentes')
  const ctText = ct!.toString('utf8')
  if (/macroEnabled|vbaProject|activeX|oleObject|template\.main/i.test(ctText)) active('tipo de conteúdo com macro/ActiveX/OLE/modelo')
  const main = /<Override\b[^>]*PartName="\/word\/document\.xml"[^>]*>/i.exec(ctText)
  if (!main || !main[0].includes(`ContentType="${DOCX_MAIN}"`)) bad('document.xml sem tipo de conteúdo Word padrão')
  const relsText = rels!.toString('utf8')
  if (!/Type="[^"]*\/officeDocument"[^>]*Target="\/?word\/document\.xml"|Target="\/?word\/document\.xml"[^>]*Type="[^"]*\/officeDocument"/i.test(relsText)) {
    bad('relacionamento officeDocument ausente')
  }
  for (const [name, data] of files) {
    checkTime(deadline)
    if (!/\.(xml|rels)$/i.test(name)) continue
    const txt = data.toString('utf8')
    if (/<!DOCTYPE|<!ENTITY/i.test(txt)) active(`DTD/entidade em ${name.slice(0, 60)}`)
    if (name.endsWith('.rels')) {
      for (const m of txt.matchAll(/<Relationship\b[^>]*>/gi)) {
        const r = m[0]
        const type = /Type="([^"]*)"/i.exec(r)?.[1] ?? ''
        if (REL_BAD.test(type.split('/').pop() ?? '')) active(`relacionamento ativo (${type.split('/').pop()})`)
        if (/TargetMode="External"/i.test(r) && !/\/hyperlink$/i.test(type)) active('relacionamento externo não-hiperlink')
      }
    }
    if (name.startsWith('word/') && name.endsWith('.xml')) {
      if (/<w:object\b|<o:OLEObject|<w:altChunk|<w:control\b|<w:macro|<w:docVars/i.test(txt)) active('objeto OLE/altChunk/controle no documento')
      for (const m of txt.matchAll(/<w:instrText[^>]*>([^<]*)<|w:instr="([^"]*)"/gi)) {
        const instr = (m[1] ?? m[2] ?? '').trim().toUpperCase()
        if (/^(DDE|DDEAUTO|MACROBUTTON|INCLUDETEXT|INCLUDEPICTURE|LINK|IMPORT|AUTOTEXT|DATABASE|AUTOTEXTLIST)\b/.test(instr)) active(`campo ativo ${instr.split(/\s/)[0]}`)
      }
    }
  }
}

/* ---------------------------------- CFB / DOC ---------------------------------- */

const FREE = 0xffffffff
const ENDCHAIN = 0xfffffffe
const ACTIVE_STORAGES = new Set(['macros', 'vba', '_vba_project', '_vba_project_cur', 'project', 'projectwm', 'objectpool', '\u0001ole10native', '\u0001ole', '\u0003objinfo'])

function inspectDoc(buf: Buffer, deadline: number) {
  if (buf.length < 1536) bad('CFB curto demais')
  const major = buf.readUInt16LE(0x1a)
  const sshift = buf.readUInt16LE(0x1e)
  if (buf.readUInt16LE(0x1c) !== 0xfffe) bad('ordem de bytes CFB inválida')
  if (!((major === 3 && sshift === 9) || (major === 4 && sshift === 12))) bad('versão/tamanho de setor CFB inválido')
  if (buf.readUInt16LE(0x20) !== 6) bad('mini setor inválido')
  const ssize = 1 << sshift
  const sectorCount = Math.floor((buf.length - 512) / ssize)
  if (sectorCount < 2) bad('CFB sem setores')
  const sectorAt = (id: number): Buffer => {
    if (id >= sectorCount) bad('setor fora do arquivo')
    const off = 512 + id * ssize
    return buf.subarray(off, off + ssize)
  }
  const nFat = buf.readUInt32LE(0x2c)
  const firstDir = buf.readUInt32LE(0x30)
  const cutoff = buf.readUInt32LE(0x38)
  const firstMini = buf.readUInt32LE(0x3c)
  const nMini = buf.readUInt32LE(0x40)
  const firstDifat = buf.readUInt32LE(0x44)
  const nDifat = buf.readUInt32LE(0x48)
  if (cutoff !== 4096) bad('cutoff do ministream inválido')
  if (nFat < 1 || nFat > sectorCount) bad('FAT inválida')
  if (nDifat > sectorCount) bad('DIFAT inválida')

  // Lista de setores da FAT (cabeçalho: 109 + cadeia DIFAT).
  const fatSectors: number[] = []
  for (let i = 0; i < 109 && fatSectors.length < nFat; i += 1) {
    const id = buf.readUInt32LE(0x4c + i * 4)
    if (id !== FREE) fatSectors.push(id)
  }
  let d = firstDifat
  for (let k = 0; k < nDifat && fatSectors.length < nFat; k += 1) {
    if (d === ENDCHAIN || d === FREE) break
    const sec = sectorAt(d)
    for (let i = 0; i < ssize / 4 - 1 && fatSectors.length < nFat; i += 1) {
      const id = sec.readUInt32LE(i * 4)
      if (id !== FREE) fatSectors.push(id)
    }
    d = sec.readUInt32LE(ssize - 4)
  }
  if (fatSectors.length !== nFat) bad('FAT incompleta')
  const fat: number[] = []
  for (const id of fatSectors) {
    const sec = sectorAt(id)
    for (let i = 0; i < ssize / 4; i += 1) fat.push(sec.readUInt32LE(i * 4))
  }

  const chain = (start: number, maxBytes: number): Buffer => {
    const parts: Buffer[] = []
    const seen = new Set<number>()
    let id = start
    let total = 0
    while (id !== ENDCHAIN) {
      checkTime(deadline)
      if (id >= fat.length || id >= sectorCount || seen.has(id)) bad('cadeia de setores inválida')
      seen.add(id)
      parts.push(sectorAt(id))
      total += ssize
      if (total > maxBytes + ssize) bad('cadeia maior que o permitido')
      id = fat[id]
    }
    return Buffer.concat(parts)
  }

  const dirBuf = chain(firstDir, LIMITS.cfbMaxDirEntries * 128)
  const nEntries = dirBuf.length / 128
  type Ent = { name: string; type: number; start: number; size: number }
  const ents: Ent[] = []
  for (let i = 0; i < nEntries; i += 1) {
    const o = i * 128
    const type = dirBuf[o + 66]
    if (type === 0) {
      ents.push({ name: '', type: 0, start: 0, size: 0 })
      continue
    }
    const nlen = dirBuf.readUInt16LE(o + 64)
    if (nlen < 2 || nlen > 64 || nlen % 2) bad('nome de entrada CFB inválido')
    const name = dirBuf.toString('utf16le', o, o + nlen - 2)
    const size = major === 3 ? dirBuf.readUInt32LE(o + 120) : Number(dirBuf.readBigUInt64LE(o + 120))
    ents.push({ name, type, start: dirBuf.readUInt32LE(o + 116), size })
  }
  if (!ents.length || ents[0].type !== 5) bad('raiz CFB ausente')

  for (const e of ents) {
    if (e.type === 0) continue
    if (ACTIVE_STORAGES.has(e.name.toLowerCase())) active(`DOC com ${e.name.replace(/[\u0000-\u001f]/g, '').slice(0, 40)} (macro/objeto embutido)`)
  }
  const wd = ents.find((e) => e.type === 2 && e.name === 'WordDocument')
  if (!wd) bad('stream WordDocument ausente')
  if (wd!.size < 68 || wd!.size < cutoff) bad('stream WordDocument inválido')
  const fib = chain(wd!.start, wd!.size).subarray(0, 68)
  if (fib.length < 68 || fib.readUInt16LE(0) !== 0xa5ec) bad('FIB do Word inválido')
  const flags = fib.readUInt16LE(0x0a)
  if (flags & 0x0100) bad('DOC criptografado (não inspecionável)')
  const tableName = flags & 0x0200 ? '1Table' : '0Table'
  if (!ents.some((e) => e.type === 2 && e.name === tableName)) bad(`stream ${tableName} ausente`)
  // minifat só é referenciado por streams pequenos; valida consistência do cabeçalho
  if (nMini > 0 && firstMini === ENDCHAIN) bad('miniFAT inconsistente')
}
