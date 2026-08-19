import { CalendarDays, Phone } from 'lucide-react'
import Link from 'next/link'
import { site } from '@/config'

/**
 * Fixed bottom bar on small screens with the two actions a visitor to a dental
 * site actually wants. Body padding in the root layout reserves space for it,
 * so it never covers page content.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-sticky border-t border-border bg-background/95 backdrop-blur-md sm:hidden">
      <div className="grid grid-cols-2">
        <a
          href={`tel:${site.contact.phone.href}`}
          className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-primary"
        >
          <Phone className="size-4" aria-hidden="true" />
          Call Us
        </a>
        <Link
          href={site.cta.primary.href}
          className="flex items-center justify-center gap-2 bg-primary py-4 text-sm font-semibold text-primary-ink"
        >
          <CalendarDays className="size-4" aria-hidden="true" />
          Book Now
        </Link>
      </div>
    </div>
  )
}
