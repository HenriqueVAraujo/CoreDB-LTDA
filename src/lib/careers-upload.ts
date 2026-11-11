/**
 * Validação do anexo de currículo (Trabalhe Conosco).
 * Módulo PURO (sem imports, sem Node/DOM): roda idêntico no cliente
 * (UX) e no servidor (autoridade). A validação do cliente nunca substitui a do servidor.
 */

export const CV_MAX_BYTES = 5 * 1024 * 1024
export const CV_MAX_BYTES_LABEL = '5 MB'

export type CvKind = 'pdf' | 'doc' | 'docx'

export const CV_ALLOWED: Record<CvKind, { mime: string; label: string }> = {
  pdf: { mime: 'application/pdf', label: 'PDF' },
  doc: { mime: 'application/msword', label: 'DOC' },
  docx: {
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    label: 'DOCX',
  },
}

export const CV_ACCEPT_ATTR = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

/** MIME "desconhecido": alguns navegadores/SO enviam vazio ou genérico; a assinatura decide. */
const UNKNOWN_MIMES = new Set(['', 'application/octet-stream'])

/** Extensões que nunca podem aparecer em nenhum segmento do nome (dupla extensão / executáveis / scripts / web). */
const FORBIDDEN_EXTENSIONS = new Set([
  'exe', 'dll', 'com', 'scr', 'bat', 'cmd', 'msi', 'msp', 'pif', 'cpl', 'lnk', 'reg', 'jar', 'apk',
  'js', 'mjs', 'cjs', 'jse', 'vbs', 'vbe', 'wsf', 'wsh', 'ps1', 'psm1', 'sh', 'bash', 'py', 'pl', 'rb',
  'php', 'phtml', 'asp', 'aspx', 'jsp', 'cgi', 'html', 'htm', 'xhtml', 'svg', 'xml', 'hta',
  'docm', 'dotm', 'xlsm', 'pptm', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar', '7z', 'iso', 'img',
])

export type CvErrorCode =
  | 'EMPTY'
  | 'TOO_LARGE'
  | 'BAD_NAME'
  | 'BAD_EXTENSION'
  | 'DOUBLE_EXTENSION'
  | 'FORBIDDEN_EXTENSION'
  | 'BAD_MIME'
  | 'BAD_SIGNATURE'
  | 'BAD_STRUCTURE'
  | 'ACTIVE_CONTENT'

export type CvCheck = { ok: true; kind: CvKind } | { ok: false; code: CvErrorCode; message: string }

const fail = (code: CvErrorCode, message: string): CvCheck => ({ ok: false, code, message })

export const CV_MESSAGES: Record<CvErrorCode, string> = {
  EMPTY: 'O arquivo está vazio. Escolha outro arquivo.',
  TOO_LARGE: `O arquivo é maior que ${CV_MAX_BYTES_LABEL}. Reduza o tamanho ou envie outro arquivo.`,
  BAD_NAME: 'O nome do arquivo é inválido. Renomeie o arquivo e tente novamente.',
  BAD_EXTENSION: 'Formato não aceito. Envie o currículo em PDF, DOC ou DOCX.',
  DOUBLE_EXTENSION: 'O nome do arquivo tem mais de uma extensão. Renomeie para algo como "curriculo.pdf".',
  FORBIDDEN_EXTENSION: 'Este tipo de arquivo não é permitido. Envie o currículo em PDF, DOC ou DOCX.',
  BAD_MIME: 'O tipo do arquivo não corresponde à extensão. Envie um PDF, DOC ou DOCX verdadeiro.',
  BAD_SIGNATURE: 'O conteúdo do arquivo não corresponde ao formato informado. Envie um PDF, DOC ou DOCX verdadeiro.',
  BAD_STRUCTURE: 'Não foi possível validar o documento (estrutura inválida, corrompida ou protegida). Salve novamente como PDF, DOC ou DOCX comum.',
  ACTIVE_CONTENT: 'O documento contém macros, scripts, anexos ou conteúdo ativo, que não são aceitos. Exporte uma versão em PDF simples.',
}

/** Remove caminho, caracteres de controle e separadores; limita o comprimento. Só para exibição/metadados — nunca para o nome gravado. */
export function sanitizeOriginalName(name: string): string {
  const base = String(name ?? '').split(/[\\/]/).pop() ?? ''
  // eslint-disable-next-line no-control-regex
  const cleaned = base.replace(/[\u0000-\u001f\u007f<>:"|?*‪-‮⁦-⁩]/g, '').trim()
  return cleaned.slice(0, 120)
}

/** Extensão final em minúsculas, ou '' se não houver. */
export function getExtension(name: string): string {
  const idx = name.lastIndexOf('.')
  return idx > 0 && idx < name.length - 1 ? name.slice(idx + 1).toLowerCase() : ''
}

/**
 * Valida o nome ORIGINAL, exatamente como recebido (nunca o nome já saneado/truncado):
 * rejeita separadores de caminho e caracteres inválidos/de controle/bidi, depois valida
 * todos os segmentos (extensão permitida, dupla extensão e extensões proibidas).
 * O nome de exibição é gerado à parte por sanitizeOriginalName().
 */
export function validateFileName(rawName: string): CvCheck {
  const raw = String(rawName ?? '')
  // eslint-disable-next-line no-control-regex
  if (!raw.trim() || raw.length > 255 || /[\u0000-\u001f\u007f<>:"|?*\\/‪-‮⁦-⁩]/.test(raw)) {
    return fail('BAD_NAME', CV_MESSAGES.BAD_NAME)
  }
  if (raw !== raw.trim() || raw.endsWith('.') || raw.startsWith('.')) {
    return fail('BAD_NAME', CV_MESSAGES.BAD_NAME)
  }
  const parts = raw.toLowerCase().split('.').map((p) => p.trim())
  if (parts.length < 2) return fail('BAD_EXTENSION', CV_MESSAGES.BAD_EXTENSION)
  const ext = parts[parts.length - 1]
  const middle = parts.slice(1, -1)

  if (FORBIDDEN_EXTENSIONS.has(ext) || middle.some((p) => FORBIDDEN_EXTENSIONS.has(p))) {
    return fail('FORBIDDEN_EXTENSION', CV_MESSAGES.FORBIDDEN_EXTENSION)
  }
  if (!Object.hasOwn(CV_ALLOWED, ext)) return fail('BAD_EXTENSION', CV_MESSAGES.BAD_EXTENSION)
  // Dupla extensão: "cv.pdf.docx", "cv.doc.pdf" etc.
  if (middle.some((p) => Object.hasOwn(CV_ALLOWED, p))) return fail('DOUBLE_EXTENSION', CV_MESSAGES.DOUBLE_EXTENSION)
  return { ok: true, kind: ext as CvKind }
}

/** Metadados declarados (nome, tamanho, MIME). Não olha o conteúdo. */
export function validateFileMeta(file: { name: string; size: number; type?: string }): CvCheck {
  if (!Number.isFinite(file.size) || file.size <= 0) return fail('EMPTY', CV_MESSAGES.EMPTY)
  if (file.size > CV_MAX_BYTES) return fail('TOO_LARGE', CV_MESSAGES.TOO_LARGE)
  const byName = validateFileName(file.name)
  if (!byName.ok) return byName
  const mime = (file.type ?? '').split(';', 1)[0].trim().toLowerCase()
  if (!UNKNOWN_MIMES.has(mime) && mime !== CV_ALLOWED[byName.kind].mime) {
    return fail('BAD_MIME', CV_MESSAGES.BAD_MIME)
  }
  return byName
}

function startsWith(bytes: Uint8Array, sig: number[]): boolean {
  if (bytes.length < sig.length) return false
  for (let i = 0; i < sig.length; i += 1) if (bytes[i] !== sig[i]) return false
  return true
}

function includesAscii(bytes: Uint8Array, text: string): boolean {
  const n = text.length
  outer: for (let i = 0; i + n <= bytes.length; i += 1) {
    for (let j = 0; j < n; j += 1) if (bytes[i + j] !== text.charCodeAt(j)) continue outer
    return true
  }
  return false
}

function includesUtf16le(bytes: Uint8Array, text: string): boolean {
  const n = text.length * 2
  outer: for (let i = 0; i + n <= bytes.length; i += 1) {
    for (let j = 0; j < text.length; j += 1) {
      if (bytes[i + 2 * j] !== text.charCodeAt(j) || bytes[i + 2 * j + 1] !== 0) continue outer
    }
    return true
  }
  return false
}

/** Detecta o formato real pelos magic bytes. Retorna null se não for PDF/DOC/DOCX. */
export function detectKind(bytes: Uint8Array): CvKind | null {
  // PDF: "%PDF-" no início.
  if (startsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d])) return 'pdf'
  // DOC (OLE2/CFB) com o stream "WordDocument" (descarta XLS/PPT/MSI renomeados).
  if (startsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) {
    return includesUtf16le(bytes, 'WordDocument') ? 'doc' : null
  }
  // DOCX (ZIP/OPC) com [Content_Types].xml e word/document.xml (descarta ZIP/JAR/XLSX/PPTX).
  if (startsWith(bytes, [0x50, 0x4b, 0x03, 0x04])) {
    return includesAscii(bytes, '[Content_Types].xml') && includesAscii(bytes, 'word/document.xml') ? 'docx' : null
  }
  return null
}

/** Valida que o conteúdo corresponde à extensão declarada. */
export function validateSignature(expected: CvKind, bytes: Uint8Array): CvCheck {
  if (bytes.length === 0) return fail('EMPTY', CV_MESSAGES.EMPTY)
  const real = detectKind(bytes)
  if (real !== expected) return fail('BAD_SIGNATURE', CV_MESSAGES.BAD_SIGNATURE)
  return { ok: true, kind: real }
}

/** Validação completa (meta + assinatura) — usada no servidor e no cliente. */
export function validateCvFile(file: { name: string; size: number; type?: string }, bytes: Uint8Array): CvCheck {
  const meta = validateFileMeta(file)
  if (!meta.ok) return meta
  if (bytes.length !== file.size) return fail('BAD_SIGNATURE', CV_MESSAGES.BAD_SIGNATURE)
  return validateSignature(meta.kind, bytes)
}
