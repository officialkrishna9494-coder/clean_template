/**
 * =============================================================================
 * ENVIRONMENT CONFIGURATION
 * =============================================================================
 * Typed, validated access to environment variables.
 *
 * - Never read `process.env` directly anywhere else in the app.
 * - Client-visible values MUST be prefixed `NEXT_PUBLIC_`; everything else is
 *   server-only and is stripped from the client bundle.
 * - Validation runs once at module load. In production a missing required
 *   variable throws at boot; in development it warns and falls back so the
 *   template still runs out of the box.
 *
 * See `.env.example` for the full list.
 * =============================================================================
 */

type EnvSpec = {
  /** Fallback used when the variable is unset (development convenience). */
  fallback?: string
  /** When true, a missing value throws in production. */
  required?: boolean
  description: string
}

const missing: string[] = []

function read(name: string, raw: string | undefined, spec: EnvSpec): string {
  const value = raw?.trim()
  if (value) return value
  if (spec.required) missing.push(`${name} — ${spec.description}`)
  return spec.fallback ?? ''
}

function bool(raw: string | undefined, fallback = false): boolean {
  if (raw == null || raw.trim() === '') return fallback
  return ['1', 'true', 'yes', 'on'].includes(raw.trim().toLowerCase())
}

function int(raw: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(raw ?? '', 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

/**
 * `NEXT_PUBLIC_*` values are inlined at build time, so they must be referenced
 * as full static property accesses (not `process.env[name]`).
 */
const publicEnv = {
  siteUrl: read('NEXT_PUBLIC_SITE_URL', process.env.NEXT_PUBLIC_SITE_URL, {
    fallback: 'http://localhost:3000',
    description: 'Canonical origin used for metadata, sitemap and OG images.',
  }),
  apiBaseUrl: read('NEXT_PUBLIC_API_BASE_URL', process.env.NEXT_PUBLIC_API_BASE_URL, {
    fallback: '/api',
    description: 'Base URL of the backend API consumed by lib/api.',
  }),
  assetBaseUrl: read('NEXT_PUBLIC_ASSET_BASE_URL', process.env.NEXT_PUBLIC_ASSET_BASE_URL, {
    fallback: '',
    description: 'CDN origin for images/media. Empty = serve from /public.',
  }),
  googleMapsEmbedKey: read(
    'NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY',
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY,
    { fallback: '', description: 'Google Maps Embed API key (optional).' },
  ),
  gaMeasurementId: read('NEXT_PUBLIC_GA_MEASUREMENT_ID', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    fallback: '',
    description: 'Google Analytics 4 measurement ID (optional).',
  }),
  bookingUrl: read('NEXT_PUBLIC_BOOKING_URL', process.env.NEXT_PUBLIC_BOOKING_URL, {
    fallback: '',
    description: 'External scheduling URL. Empty = use the built-in form.',
  }),
} as const

const serverEnv = {
  apiKey: read('API_KEY', process.env.API_KEY, {
    fallback: '',
    description: 'Bearer token sent by the server-side API client.',
  }),
  apiTimeoutMs: int(process.env.API_TIMEOUT_MS, 15_000),
  apiRetries: int(process.env.API_RETRIES, 2),
  contactRecipient: read('CONTACT_FORM_RECIPIENT', process.env.CONTACT_FORM_RECIPIENT, {
    fallback: '',
    description: 'Inbox that receives contact-form submissions.',
  }),
  smtpUrl: read('SMTP_URL', process.env.SMTP_URL, {
    fallback: '',
    description: 'SMTP connection string for transactional email.',
  }),
} as const

const nodeEnv = (process.env.NODE_ENV ?? 'development') as 'development' | 'production' | 'test'

export const env = {
  ...publicEnv,
  ...serverEnv,
  nodeEnv,
  isProduction: nodeEnv === 'production',
  isDevelopment: nodeEnv === 'development',
  isTest: nodeEnv === 'test',
  /** Feature flags — flip behaviour per environment without code changes. */
  features: {
    analytics: bool(process.env.NEXT_PUBLIC_FEATURE_ANALYTICS, false),
    liveChat: bool(process.env.NEXT_PUBLIC_FEATURE_LIVE_CHAT, false),
    onlineBooking: bool(process.env.NEXT_PUBLIC_FEATURE_ONLINE_BOOKING, true),
    blog: bool(process.env.NEXT_PUBLIC_FEATURE_BLOG, false),
  },
} as const

if (missing.length > 0) {
  const message = `[env] Missing required environment variables:\n  - ${missing.join('\n  - ')}`
  if (env.isProduction) throw new Error(message)
  console.warn(`${message}\n[env] Using development fallbacks.`)
}

export type Env = typeof env
