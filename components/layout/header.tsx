'use client'

import { Clock, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { ButtonLink, Container, Logo } from '@/components/ui'
import { mainNav, site, themeOptions } from '@/config'
import { useScrolledPast } from '@/lib/hooks/use-scroll-position'
import { cn } from '@/lib/utils/cn'
import { formatAddress } from '@/lib/utils/format'
import { DesktopNav } from './desktop-nav'
import { MobileNav } from './mobile-nav'

/**
 * Site header: a utility strip (large screens only) above the main bar with
 * the logo, primary navigation and calls to action.
 *
 * Condenses and gains a shadow once the page scrolls, driven by
 * `useScrolledPast`. Sticky behaviour is a theme option.
 */
export function Header() {
  const scrolled = useScrolledPast(16)

  return (
    <header
      className={cn(
        'z-header w-full border-b transition-[background-color,box-shadow,border-color] duration-[var(--t-duration-normal)]',
        themeOptions.stickyHeader && 'sticky top-0',
        scrolled
          ? 'border-border bg-background/92 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-background',
      )}
    >
      {/* Utility strip — contact details, hidden on small screens. */}
      <div
        className={cn(
          'hidden border-b border-border/70 lg:block',
          'transition-[max-height,opacity] duration-[var(--t-duration-normal)] ease-[var(--t-ease-standard)]',
          scrolled ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-12 opacity-100',
        )}
      >
        <Container className="flex h-11 items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-6 text-ink-muted">
            <a
              href={site.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <MapPin className="size-4 text-primary" aria-hidden="true" />
              {formatAddress()}
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-primary" aria-hidden="true" />
              Tue – Fri 8:30 AM – 4:30 PM · Sat 9 AM – 2 PM
            </span>
          </div>
          <a
            href={`tel:${site.contact.phone.href}`}
            className="inline-flex items-center gap-2 font-semibold text-ink hover:text-primary"
          >
            <Phone className="size-4 text-primary" aria-hidden="true" />
            {site.contact.phone.display}
          </a>
        </Container>
      </div>

      {/* Main bar. */}
      <Container
        className={cn(
          'flex items-center justify-between gap-4 transition-[height] duration-[var(--t-duration-normal)]',
          scrolled ? 'h-18' : 'h-22',
        )}
      >
        <Logo height={scrolled ? 38 : 46} priority />

        <DesktopNav items={mainNav} className="hidden lg:flex" />

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={`tel:${site.contact.phone.href}`}
            aria-label={`Call ${site.contact.phone.display}`}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-primary transition-colors hover:border-primary hover:bg-primary-soft sm:hidden"
          >
            <Phone className="size-5" aria-hidden="true" />
          </Link>

          <ButtonLink
            href={site.cta.primary.href}
            external={site.cta.primary.external}
            size={scrolled ? 'md' : 'lg'}
            className="hidden sm:inline-flex"
          >
            {site.cta.primary.label}
          </ButtonLink>

          <MobileNav items={mainNav} />
        </div>
      </Container>
    </header>
  )
}
