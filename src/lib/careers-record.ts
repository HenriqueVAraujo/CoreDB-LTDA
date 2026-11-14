import { randomInt } from 'node:crypto'
import { mkdir, open } from 'node:fs/promises'
import path from 'node:path'
import type { CareersData } from './careers-schema'

let lastDay = ''
let sequence = 0
// A random start plus a process-local sequence prevents repeats within a worker.
export function createCareersReference(now = new Date()): string {
  const day = now.toISOString().slice(0, 10).replace(/-/g, '')
  if (day !== lastDay) { lastDay = day; sequence = randomInt(0, 36 ** 6) }
  sequence = (sequence + 1) % (36 ** 6)
  return `TC-${day}-${sequence.toString(36).toUpperCase().padStart(6, '0')}`
}

export type CareersRecord = { referencia: string; timestamp: string; campos: CareersData }

export async function appendCareersRecord(record: CareersRecord): Promise<void> {
  if (process.env.VERCEL) throw new Error('Registro local indispon??vel na Vercel')
  const directory = path.join(process.cwd(), '.careers-data')
  await mkdir(directory, { recursive: true, mode: 0o700 })
  const file = await open(path.join(directory, 'candidaturas.jsonl'), 'a', 0o600)
  try {
    await file.writeFile(`${JSON.stringify(record)}\n`, 'utf8')
    await file.sync()
  } finally { await file.close() }
}
