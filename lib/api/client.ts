/**
 * =============================================================================
 * API CLIENT — THE ONLY PLACE THE APP CALLS `fetch`
 * =============================================================================
 * Adds, in one place, everything a production fetch needs:
 *   - base URL resolution from `config/api.config.ts`
 *   - a request timeout via `AbortSignal`
 *   - exponential backoff with jitter for retryable failures
 *   - JSON encoding/decoding with typed errors
 *   - the server-side bearer token (never exposed to the browser)
 *   - Next.js cache tags and revalidation on GET
 *
 * Components never call this directly; they call a service in
 * `lib/api/services/`, which gives every endpoint a typed signature.
 * =============================================================================
 */
import { apiConfig } from '@/config'
import { ApiError, ApiNetworkError, ApiTimeoutError } from './errors'

export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
  /** Overrides `apiConfig.timeoutMs` for this call. */
  timeoutMs?: number
  /** Overrides `apiConfig.retries` for this call. */
  retries?: number
  /** Next.js cache tags, for `revalidateTag`. */
  tags?: string[]
  /** Seconds until revalidation. `false` disables caching for this call. */
  revalidate?: number | false
  signal?: AbortSignal
}

const isServer = typeof window === 'undefined'

function resolveUrl(endpoint: string): string {
  if (/^https?:\/\//.test(endpoint)) return endpoint
  const base = apiConfig.baseUrl.replace(/\/$/, '')
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`

  // Relative bases only work in the browser; on the server we need an origin.
  if (base.startsWith('/') && isServer) {
    const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000'
    return `${origin}${base}${path}`
  }
  return `${base}${path}`
}

function retryDelay(attempt: number): number {
  const exponential = apiConfig.backoffMs * 2 ** attempt
  // Jitter prevents a thundering herd when many clients retry at once.
  return exponential + Math.random() * apiConfig.backoffMs
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function parseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    return response.json().catch(() => null)
  }
  return response.text().catch(() => null)
}

/**
 * Performs a single request with a timeout. Retries are handled by `request`.
 */
async function attempt(url: string, endpoint: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  // Honour a caller-supplied signal alongside our timeout.
  const external = init.signal
  if (external) {
    if (external.aborted) controller.abort()
    else external.addEventListener('abort', () => controller.abort(), { once: true })
  }

  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } catch (error) {
    if (controller.signal.aborted && !external?.aborted) {
      throw new ApiTimeoutError(endpoint, timeoutMs)
    }
    throw new ApiNetworkError(endpoint, error)
  } finally {
    clearTimeout(timer)
  }
}

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    timeoutMs = apiConfig.timeoutMs,
    retries = apiConfig.retries,
    tags,
    revalidate,
    signal,
  } = options

  const url = resolveUrl(endpoint)

  const init: RequestInit & { next?: { tags?: string[]; revalidate?: number | false } } = {
    method,
    headers: {
      ...apiConfig.defaultHeaders,
      // The API key never reaches the browser bundle.
      ...(isServer && process.env.API_KEY ? { Authorization: `Bearer ${process.env.API_KEY}` } : {}),
      ...headers,
    },
    signal,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  }

  if (method === 'GET') {
    init.next = {
      ...(tags ? { tags } : {}),
      revalidate: revalidate ?? apiConfig.cache.revalidate,
    }
  } else {
    init.cache = 'no-store'
  }

  // Only idempotent methods are retried; a failed POST may already have landed.
  const maxAttempts = method === 'GET' ? retries + 1 : 1
  let lastError: unknown

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await attempt(url, endpoint, init, timeoutMs)

      if (response.ok) {
        if (response.status === 204) return undefined as T
        return (await parseBody(response)) as T
      }

      const payload = await parseBody(response)
      const error = new ApiError(
        `Request to ${endpoint} failed with ${response.status}`,
        { status: response.status, endpoint, body: payload },
      )

      const retryable = (apiConfig.retryStatusCodes as readonly number[]).includes(response.status)
      if (!retryable || i === maxAttempts - 1) throw error
      lastError = error
    } catch (error) {
      // Timeouts and network failures are retryable; API errors already decided.
      const retryable = error instanceof ApiTimeoutError || error instanceof ApiNetworkError
      if (!retryable || i === maxAttempts - 1) throw error
      lastError = error
    }

    await sleep(retryDelay(i))
  }

  throw lastError
}

/** Convenience wrappers so services read cleanly. */
export const api = {
  get: <T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(endpoint, { ...options, method: 'POST', body }),
  put: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(endpoint, { ...options, method: 'PUT', body }),
  patch: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body }),
  delete: <T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
}
