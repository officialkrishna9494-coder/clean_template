/**
 * =============================================================================
 * NAVIGATION
 * =============================================================================
 * The Services menu is **generated** from `content/services.ts` rather than
 * hand-listed, so adding a service publishes its page, adds it to the header
 * dropdown and puts it in the sitemap in one edit — the three can never drift
 * apart.
 *
 * Top-level items and the footer columns stay hand-authored, because their
 * order is an editorial decision rather than a derived one.
 * =============================================================================
 */
import { services } from '@/content/services'

export type NavItem = {
  label: string
  href: string
  description?: string
  /** Renders as a dropdown when present. */
  children?: NavItem[]
  /** Opens in a new tab and adds rel="noopener noreferrer". */
  external?: boolean
  /** Highlights the item as a call to action inside the nav. */
  emphasis?: boolean
}

const serviceNavItems: NavItem[] = services.map((service) => ({
  label: service.title,
  href: `/${service.slug}`,
  description: service.summary,
}))

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services', children: serviceNavItems },
  { label: 'Smile Gallery', href: '/smile-gallery' },
  { label: 'Contact', href: '/contact' },
]

/** Footer link columns. Service links are picked by slug so they stay valid. */
function serviceLink(slug: string): NavItem {
  const service = services.find((entry) => entry.slug === slug)
  if (!service) throw new Error(`[navigation] Unknown service slug in footer: ${slug}`)
  return { label: service.title, href: `/${service.slug}` }
}

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Practice',
    items: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about-us' },
      { label: 'All Services', href: '/services' },
      { label: 'Smile Gallery', href: '/smile-gallery' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Popular Services',
    items: [
      serviceLink('family-dentistry-in-austin-tx'),
      serviceLink('teeth-cleaning-in-austin-tx'),
      serviceLink('cosmetic-dentistry-in-austin-tx'),
      serviceLink('invisalign-in-austin-tx'),
      serviceLink('teeth-whitening-in-austin-tx'),
    ],
  },
  {
    title: 'Restore & Repair',
    items: [
      serviceLink('dental-crowns-in-austin-tx'),
      serviceLink('dental-bridge-in-austin-tx'),
      serviceLink('dentures-in-austin-tx'),
      serviceLink('root-canal-in-austin-tx'),
      serviceLink('emergency-dentistry-in-austin-tx'),
    ],
  },
]

export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
]
