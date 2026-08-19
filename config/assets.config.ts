/**
 * =============================================================================
 * ASSET REGISTRY — SINGLE SOURCE OF TRUTH FOR EVERY IMAGE, LOGO AND ICON
 * =============================================================================
 * No component hard-codes an image path. Everything goes through `asset()` or
 * the `assets` map below, so swapping placeholder artwork for real photography
 * is a one-line edit per asset — no component changes, no missing references.
 *
 * Replacing a placeholder:
 *   1. Drop the real file into `public/assets/...` using the same file name, OR
 *   2. Point the entry below at the new path (local or CDN), and
 *   3. If it is a remote host, add that host to `images.remotePatterns` in
 *      `next.config.ts`.
 *
 * Every entry carries intrinsic `width`/`height` so `next/image` can reserve
 * space and avoid layout shift.
 * =============================================================================
 */
import { env } from './env'

export type AssetRef = {
  src: string
  width: number
  height: number
  alt: string
  /** Marks artwork that ships as a placeholder and is meant to be replaced. */
  placeholder?: boolean
}

/**
 * Resolves a path against `NEXT_PUBLIC_ASSET_BASE_URL`.
 * Absolute URLs and data URIs are returned untouched.
 */
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  const base = env.assetBaseUrl.replace(/\/$/, '')
  const rel = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${rel}` : rel
}

/** Standard aspect ratios, so cards and media blocks stay consistent. */
export const aspectRatios = {
  square: '1 / 1',
  portrait: '3 / 4',
  landscape: '4 / 3',
  wide: '16 / 9',
  ultrawide: '21 / 9',
  hero: '5 / 4',
} as const

export type AspectRatio = keyof typeof aspectRatios

const PLACEHOLDER = { placeholder: true } as const

export const assets = {
  logo: {
    /** Full lockup for the header on light backgrounds. */
    primary: {
      src: '/assets/logo/logo.svg',
      width: 320,
      height: 72,
      alt: 'Bee Cave Family Dentistry',
      ...PLACEHOLDER,
    },
    /** Full lockup for dark/inverted backgrounds (footer). */
    inverted: {
      src: '/assets/logo/logo-inverted.svg',
      width: 320,
      height: 72,
      alt: 'Bee Cave Family Dentistry',
      ...PLACEHOLDER,
    },
    /** Square mark for favicons, avatars and compact headers. */
    mark: {
      src: '/assets/logo/logo-mark.svg',
      width: 96,
      height: 96,
      alt: 'Bee Cave Family Dentistry',
      ...PLACEHOLDER,
    },
  },

  hero: {
    primary: {
      src: '/assets/images/hero.svg',
      width: 1200,
      height: 960,
      alt: 'Dental team welcoming a patient at Bee Cave Family Dentistry',
      ...PLACEHOLDER,
    },
    secondary: {
      src: '/assets/images/hero-secondary.svg',
      width: 800,
      height: 800,
      alt: 'Bright, modern treatment room',
      ...PLACEHOLDER,
    },
  },

  about: {
    doctor: {
      src: '/assets/images/doctor.svg',
      width: 800,
      height: 1000,
      alt: 'Dr. Smrity Amatya, DMD',
      ...PLACEHOLDER,
    },
    office: {
      src: '/assets/images/office.svg',
      width: 1200,
      height: 800,
      alt: 'Reception area of the practice',
      ...PLACEHOLDER,
    },
    team: {
      src: '/assets/images/team.svg',
      width: 1200,
      height: 800,
      alt: 'The Bee Cave Family Dentistry team',
      ...PLACEHOLDER,
    },
  },

  /** Generic fallbacks — used whenever a specific asset is missing. */
  fallback: {
    image: {
      src: '/assets/images/placeholder.svg',
      width: 1200,
      height: 800,
      alt: '',
      ...PLACEHOLDER,
    },
    avatar: {
      src: '/assets/images/avatar.svg',
      width: 200,
      height: 200,
      alt: '',
      ...PLACEHOLDER,
    },
    service: {
      src: '/assets/images/service.svg',
      width: 800,
      height: 600,
      alt: '',
      ...PLACEHOLDER,
    },
    gallery: {
      src: '/assets/images/gallery.svg',
      width: 800,
      height: 800,
      alt: '',
      ...PLACEHOLDER,
    },
  },

  /** Decorative textures/patterns used behind sections. */
  decor: {
    pattern: {
      src: '/assets/images/pattern.svg',
      width: 600,
      height: 600,
      alt: '',
      ...PLACEHOLDER,
    },
  },

  /** Social proof badges shown in the trust strip. */
  badges: {
    generic: {
      src: '/assets/images/badge.svg',
      width: 200,
      height: 120,
      alt: '',
      ...PLACEHOLDER,
    },
  },

  /** Open Graph / social sharing card. */
  og: {
    default: {
      src: '/assets/images/og-default.svg',
      width: 1200,
      height: 630,
      alt: 'Bee Cave Family Dentistry',
      ...PLACEHOLDER,
    },
  },
} as const satisfies Record<string, Record<string, AssetRef>>

/**
 * Blur data URI applied to every `<AppImage placeholder="blur" />`.
 * A neutral 4×3 gradient — no per-image work required.
 */
export const blurDataURL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiNlZWYwZjEiLz48L3N2Zz4='

export type Assets = typeof assets
