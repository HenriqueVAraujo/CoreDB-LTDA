import { createHash, randomBytes } from 'node:crypto'
import { lstat, mkdir, readdir, realpath, rename, stat, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { CvKind } from './careers-upload'

/**
 * Armazenamento do currículo por ADAPTADOR. Padrão: 'off' (nada é gravado).
 *  - 'local': pasta PRIVADA FIXA `<cwd>/.careers-uploads` (somente dev/preview local; recusado na
 *    Vercel e, em NODE_ENV=production, exige CAREERS_CV_LOCAL_ALLOW=true). Sem override de caminho.
 *  - 'blob' : Vercel Blob PRIVADO (desligado por padrão; exige aprovação, dependência e token).
 * Nenhum adaptador envia e-mail nem expõe leitura pública. O nome gravado é derivado do SHA-256
 * do conteúdo e, para novos envios, do ID da candidatura. O nome original nunca vira caminho.
 * Reenvios com novos IDs preservam vínculos independentes. Chamadores antigos mantêm nomes por hash.
 */
export type StorageMode = 'off' | 'local' | 'blob'

export type StoredCv = { id: string; mode: 'local' | 'blob'; size: number; sha256: string; existed: boolean }

export class StorageUnavailableError extends Error {}

export const LOCAL_DIR_NAME = '.careers-uploads'
export const LOCAL_QUOTA_BYTES = 200 * 1024 * 1024
export const LOCAL_QUOTA_FILES = 500

export function getStorageMode(): StorageMode {
  const v = (process.env.CAREERS_CV_STORAGE || 'off').trim().toLowerCase()
  return v === 'local' || v === 'blob' ? v : 'off'
}

export type CvMetadata = {
  applicationId?: string
  kind: CvKind
  area: string
  originalName: string
  consentCvAt: string
}

/** Nome determinístico a partir do conteúdo (idempotência). */
export function storedNameFor(kind: CvKind, bytes: Uint8Array, applicationId?: string): { id: string; sha256: string; fileName: string } {
  const sha256 = createHash('sha256').update(bytes).digest('hex')
  if (applicationId && !/^[a-f0-9-]{36}$/.test(applicationId)) throw new StorageUnavailableError('ID de candidatura inválido')
  const id = applicationId ? applicationId + '-' + sha256 : sha256
  return { id, sha256, fileName: id + '.' + kind }
}

/** Compara caminhos respeitando a caixa do sistema de arquivos (Windows/macOS: insensível). */
function norm(p: string): string {
  const r = path.resolve(p)
  return process.platform === 'win32' || process.platform === 'darwin' ? r.toLowerCase() : r
}
export function isInside(child: string, parent: string): boolean {
  const c = norm(child)
  const p = norm(parent)
  return c === p || c.startsWith(p.endsWith(path.sep) ? p : p + path.sep)
}

/** Garante que o diretório local fixo existe, não é link e, por realpath, está dentro do projeto e fora de public/. */
export async function resolvePrivateDir(cwd = process.cwd()): Promise<string> {
  if (process.env.VERCEL) throw new StorageUnavailableError('local indisponível neste ambiente')
  if (process.env.NODE_ENV === 'production' && process.env.CAREERS_CV_LOCAL_ALLOW !== 'true') {
    throw new StorageUnavailableError('local não autorizado neste ambiente')
  }
  const root = await realpath(cwd)
  const dir = path.join(root, LOCAL_DIR_NAME)
  try {
    const st = await lstat(dir)
    if (st.isSymbolicLink() || !st.isDirectory()) throw new StorageUnavailableError('pasta privada inválida (link ou não-diretório)')
  } catch (e) {
    if (e instanceof StorageUnavailableError) throw e
    await mkdir(dir, { mode: 0o700 })
  }
  const real = await realpath(dir)
  if (!isInside(real, root) || norm(real) !== norm(dir)) throw new StorageUnavailableError('pasta privada fora do projeto')
  // nenhuma pasta "public" pode conter ou ser a pasta (comparação canônica, não por texto)
  const publicDir = path.join(root, 'public')
  let realPublic = publicDir
  try {
    realPublic = await realpath(publicDir)
  } catch {
    /* public inexistente: nada a comparar */
  }
  if (isInside(real, realPublic) || isInside(realPublic, real)) throw new StorageUnavailableError('pasta privada não pode envolver public')
  return real
}

async function exists(p: string): Promise<boolean> {
  try {
    await stat(p)
    return true
  } catch {
    return false
  }
}

async function storeLocal(bytes: Uint8Array, meta: CvMetadata): Promise<StoredCv> {
  const dir = await resolvePrivateDir()
  const { id, sha256, fileName } = storedNameFor(meta.kind, bytes, meta.applicationId)
  const finalFile = path.join(dir, fileName)
  const finalMeta = path.join(dir, `${id}.json`)
  const result: StoredCv = { id, mode: 'local', size: bytes.byteLength, sha256, existed: false }

  // Idempotência: conteúdo já guardado e confirmado (metadado presente) = sucesso sem regravar.
  const hasFile = await exists(finalFile)
  if (hasFile && (await exists(finalMeta))) return { ...result, existed: true }

  // Quota total (só conta o que ainda será criado).
  if (!hasFile) {
    const names = await readdir(dir)
    let total = 0
    let files = 0
    for (const n of names) {
      if (n.endsWith('.json') || n.endsWith('.tmp')) continue
      files += 1
      total += (await stat(path.join(dir, n))).size
    }
    if (files >= LOCAL_QUOTA_FILES || total + bytes.byteLength > LOCAL_QUOTA_BYTES) {
      throw new StorageUnavailableError('quota de armazenamento esgotada')
    }
  }

  // Escrita atômica: temporários -> rename; o metadado é o "commit". Em falha, desfaz só o que ESTA chamada criou.
  const tag = randomBytes(6).toString('hex')
  const tmpFile = path.join(dir, `.${fileName}.${tag}.tmp`)
  const tmpMeta = path.join(dir, `.${id}.${tag}.json.tmp`)
  const created: string[] = []
  try {
    if (!hasFile) {
      await writeFile(tmpFile, bytes, { flag: 'wx', mode: 0o600 })
      created.push(tmpFile)
    }
    await writeFile(
      tmpMeta,
      JSON.stringify({ id, applicationId: meta.applicationId, kind: meta.kind, size: bytes.byteLength, sha256, area: meta.area, originalName: meta.originalName, consentCvAt: meta.consentCvAt }),
      { flag: 'wx', mode: 0o600 },
    )
    created.push(tmpMeta)
    if (!hasFile) {
      await rename(tmpFile, finalFile)
      created.splice(created.indexOf(tmpFile), 1, finalFile)
    }
    await rename(tmpMeta, finalMeta)
    created.splice(created.indexOf(tmpMeta), 1)
    return result
  } catch (err) {
    for (const f of created) await unlink(f).catch(() => undefined)
    throw err
  }
}

async function storeBlob(bytes: Uint8Array, meta: CvMetadata): Promise<StoredCv> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new StorageUnavailableError('token do Blob ausente')
  // Import dinâmico por variável: a dependência @vercel/blob NÃO está instalada (exige aprovação).
  const moduleName = '@vercel/blob'
  let blob: { put: (p: string, b: Buffer, o: Record<string, unknown>) => Promise<unknown> }
  try {
    blob = await import(/* webpackIgnore: true */ moduleName)
  } catch {
    throw new StorageUnavailableError('@vercel/blob não instalado')
  }
  const { id, sha256, fileName } = storedNameFor(meta.kind, bytes, meta.applicationId)
  let existed = false
  try {
    await blob.put(`careers/cv/${fileName}`, Buffer.from(bytes), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: 'application/octet-stream',
    })
  } catch (e) {
    // Mesmo conteúdo = mesmo caminho: "já existe" é idempotência, não erro.
    if (/already exists/i.test(String((e as Error)?.message))) existed = true
    else throw e
  }
  return { id, mode: 'blob', size: bytes.byteLength, sha256, existed }
}

/** Retorna null quando o modo é 'off' (nada gravado). Lança StorageUnavailableError se o adaptador não puder operar. */
export async function storeCv(bytes: Uint8Array, meta: CvMetadata): Promise<StoredCv | null> {
  const mode = getStorageMode()
  if (mode === 'local') return storeLocal(bytes, meta)
  if (mode === 'blob') return storeBlob(bytes, meta)
  return null
}
