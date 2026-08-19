/**
 * =============================================================================
 * API CONFIGURATION — EVERY NETWORK CALL IS DECLARED HERE
 * =============================================================================
 * `lib/api/client.ts` is the only module that performs fetches, and it reads
 * its base URL, timeouts, retry policy and endpoint paths from this file.
 * Nothing in `components/` or `app/` should ever contain a raw URL string.
 *
 * Adding an endpoint:
 *   1. Add a path to `endpoints` below (functions for dynamic segments).
 *   2. Add a typed wrapper in `lib/api/services/`.
 *   3. Call that wrapper from your component or route handler.
 * =============================================================================
 */
import { env } from './env'

export const apiConfig = {
  /** Base URL prepended to every relative endpoint path. */
  baseUrl: env.apiBaseUrl,
  /** Abort a request after this many milliseconds. */
  timeoutMs: env.apiTimeoutMs,
  /** Retry attempts for idempotent requests / retryable status codes. */
  retries: env.apiRetries,
  /** Exponential backoff base; delay = backoffMs * 2^attempt (plus jitter). */
  backoffMs: 400,
  /** Status codes worth retrying. */
  retryStatusCodes: [408, 425, 429, 500, 502, 503, 504] as const,
  /** Headers merged into every request. */
  defaultHeaders: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  } as Record<string, string>,
  /** Default Next.js caching behaviour for GET requests. */
  cache: {
    /** Seconds before a cached response is revalidated. */
    revalidate: 300,
    /** Cache tags used with `revalidateTag`. */
    tags: {
      services: 'services',
      testimonials: 'testimonials',
      gallery: 'gallery',
      faqs: 'faqs',
    },
  },
} as const

/**
 * Endpoint registry. Values are either literal paths or builder functions for
 * paths with dynamic segments.
 */
export const endpoints = {
  contact: {
    submit: '/contact',
  },
  appointments: {
    create: '/appointments',
    availability: (isoDate: string) => `/appointments/availability?date=${encodeURIComponent(isoDate)}`,
  },
  services: {
    list: '/services',
    detail: (slug: string) => `/services/${encodeURIComponent(slug)}`,
  },
  testimonials: {
    list: '/testimonials',
  },
  newsletter: {
    subscribe: '/newsletter/subscribe',
  },
} as const

export type Endpoints = typeof endpoints
export type ApiConfig = typeof apiConfig
