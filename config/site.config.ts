/**
 * =============================================================================
 * SITE CONFIGURATION — WHO THE SITE IS FOR
 * =============================================================================
 * Practice identity, contact details, opening hours, social links and the
 * global CTAs. Header, footer, contact page, structured data and every
 * "Call us" button read from here. Menus live in `navigation.config.ts`.
 *
 * To launch a different client site, edit this file plus `theme.config.ts`,
 * `assets.config.ts` and the data in `content/`.
 * =============================================================================
 */
import { env } from './env'

export type BusinessHours = {
  day: string
  /** `null` means closed that day. */
  opens: string | null
  closes: string | null
}

export const site = {
  /** ---------------------------------------------------------------- brand */
  name: 'Bee Cave Family Dentistry',
  shortName: 'Bee Cave Dentistry',
  legalName: 'Bee Cave Family Dentistry PLLC',
  tagline: 'Gentle, comprehensive dental care for every age',
  description:
    'Bee Cave Family Dentistry provides compassionate, high-quality dental care for the whole family in Bee Cave and the surrounding Austin, TX area — preventive, restorative, cosmetic and emergency dentistry under one roof.',
  /** Canonical origin, from the environment. */
  url: env.siteUrl,
  locale: 'en-US',
  /** IANA timezone — used for hours and "open now" logic. */
  timezone: 'America/Chicago',
  foundingYear: 2025,

  /** -------------------------------------------------------------- contact */
  contact: {
    phone: {
      /** Human-readable. */
      display: '(512) 885-2020',
      /** E.164 for `tel:` links. */
      href: '+15128852020',
    },
    fax: null as string | null,
    email: 'info@beecavefamilydentistry.com',
    address: {
      street: '13917 W State Hwy 71',
      street2: 'Suite 200',
      city: 'Bee Cave',
      region: 'TX',
      regionName: 'Texas',
      postalCode: '78738',
      country: 'US',
      countryName: 'United States',
    },
    /** Coordinates power the map embed and LocalBusiness structured data. */
    geo: { latitude: 30.3085, longitude: -97.9455 },
    /** Fallback map link used when no Maps API key is configured. */
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=13917+W+State+Hwy+71+Suite+200+Bee+Cave+TX+78738',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=13917+W+State+Hwy+71+Suite+200+Bee+Cave+TX+78738',
  },

  /** ---------------------------------------------------------------- hours */
  hours: [
    { day: 'Monday', opens: null, closes: null },
    { day: 'Tuesday', opens: '8:30 AM', closes: '4:30 PM' },
    { day: 'Wednesday', opens: '8:30 AM', closes: '4:30 PM' },
    { day: 'Thursday', opens: null, closes: null },
    { day: 'Friday', opens: '8:30 AM', closes: '4:30 PM' },
    { day: 'Saturday', opens: '9:00 AM', closes: '2:00 PM' },
    { day: 'Sunday', opens: null, closes: null },
  ] satisfies BusinessHours[],
  hoursNote: 'Emergency appointments available — call us and we will make room.',

  /** --------------------------------------------------------------- social */
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
    { label: 'Google', href: 'https://www.google.com/maps', icon: 'google' },
    { label: 'Yelp', href: 'https://www.yelp.com/', icon: 'yelp' },
  ] as const,

  /** ------------------------------------------------------------------ CTA */
  cta: {
    primary: {
      label: 'Book an Appointment',
      href: env.bookingUrl || '/contact#appointment',
      external: Boolean(env.bookingUrl),
    },
    secondary: { label: 'Call (512) 885-2020', href: 'tel:+15128852020', external: false },
  },

  /** Short promotional line shown in the announcement bar. Set to `null` to hide. */
  announcement: {
    text: 'New patients: complimentary teeth whitening with your first cleaning & exam.',
    href: '/contact#appointment',
    linkLabel: 'Claim offer',
  } as { text: string; href: string; linkLabel: string } | null,
} as const

export type Site = typeof site
