/**
 * =============================================================================
 * SEO CONFIGURATION
 * =============================================================================
 * Default metadata for the whole site. Pages compose on top of this via
 * `buildMetadata()` in `lib/utils/seo.ts` rather than repeating boilerplate.
 * =============================================================================
 */
import { site } from './site.config'
import { assets, asset } from './assets.config'

export const seo = {
  /** `%s` is replaced with the page title; the root layout uses `default`. */
  titleTemplate: `%s | ${site.name}`,
  defaultTitle: `${site.name} | Dr. Smrity Amatya DMD | Bee Cave Dentist`,
  defaultDescription: site.description,
  /** Keywords are low-value for ranking but harmless and useful internally. */
  keywords: [
    'Bee Cave dentist',
    'family dentistry Austin TX',
    'cosmetic dentistry Austin',
    'emergency dentist Austin',
    'Invisalign Austin TX',
    'teeth cleaning Bee Cave',
    'pediatric dentist Austin',
    'dental crowns Austin TX',
  ],
  openGraph: {
    type: 'website' as const,
    siteName: site.name,
    locale: site.locale.replace('-', '_'),
    image: {
      url: asset(assets.og.default.src),
      width: assets.og.default.width,
      height: assets.og.default.height,
      alt: assets.og.default.alt,
    },
  },
  twitter: {
    card: 'summary_large_image' as const,
    site: '',
    creator: '',
  },
  robots: {
    index: true,
    follow: true,
    /** Disallowed paths, applied in `app/robots.ts`. */
    disallow: ['/api/'],
  },
  /** Verification tokens for search consoles. Empty values are omitted. */
  verification: {
    google: '',
    bing: '',
  },
} as const

export type Seo = typeof seo
