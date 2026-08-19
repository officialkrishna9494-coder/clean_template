/**
 * Minimal in-memory rate limiter for the bundled route handlers.
 *
 * Deliberately dependency-free and per-instance: it stops casual form spam on
 * a single-instance deployment. For multi-instance or serverless hosting,
 * swap the `hits` map for Redis / Upstash — the exported signature is designed
 * so nothing else has to change.
 */

type Bucket = { count: number; resetAt: number }

const hits = new Map<string, Bucket>()

/** Evicts expired buckets so the map cannot grow without bound. */
function sweep(now: number): void {
  if (hits.size < 512) return
  for (const [key, bucket] of hits) {
    if (bucket.resetAt <= now) hits.delete(key)
  }
}

export type RateLimitResult = {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

export function checkRateLimit(
  key: string,
  options: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now()
  sweep(now)

  const bucket = hits.get(key)

  if (!bucket || bucket.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + options.windowMs })
    return { allowed: true, remaining: options.limit - 1, retryAfterSeconds: 0 }
  }

  bucket.count += 1
  const allowed = bucket.count <= options.limit

  return {
    allowed,
    remaining: Math.max(0, options.limit - bucket.count),
    retryAfterSeconds: allowed ? 0 : Math.ceil((bucket.resetAt - now) / 1000),
  }
}

/** Best-effort client IP from proxy headers. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}
