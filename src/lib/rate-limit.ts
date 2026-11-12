import type { NextRequest } from 'next/server'

/**
 * Rate limiting best-effort, em memória, por instância serverless.
 * Extraído de /api/contact para ser reaproveitado (mesma lógica; cada
 * limitador criado tem seus próprios buckets). Não é um teto distribuído;
 * fail-open deliberado: erro interno libera a requisição.
 */
export const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_TRACKED_KEYS = 500

type RateLimitBucket = { count: number; resetAt: number }

export function createRateLimiter(maxRequests = 5) {
  const buckets = new Map<string, RateLimitBucket>()

  function getClientKey(req: NextRequest): string {
    const forwardedFor = req.headers.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
    let hash = 0
    for (let i = 0; i < ip.length; i += 1) {
      hash = (hash * 31 + ip.charCodeAt(i)) | 0
    }
    return hash.toString(36)
  }

  return function isRateLimited(req: NextRequest): boolean {
    try {
      const now = Date.now()
      if (buckets.size >= RATE_LIMIT_MAX_TRACKED_KEYS) {
        for (const [key, bucket] of buckets) {
          if (now > bucket.resetAt) buckets.delete(key)
        }
      }

      const key = getClientKey(req)
      const bucket = buckets.get(key)

      if (!bucket || now > bucket.resetAt) {
        if (!bucket && buckets.size >= RATE_LIMIT_MAX_TRACKED_KEYS) {
          const oldestKey = buckets.keys().next().value as string | undefined
          if (oldestKey) buckets.delete(oldestKey)
        }
        buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
        return false
      }

      bucket.count += 1
      return bucket.count > maxRequests
    } catch {
      return false
    }
  }
}
