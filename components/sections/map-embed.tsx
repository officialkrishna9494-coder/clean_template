import { MapPin, Navigation } from 'lucide-react'
import { ButtonLink } from '@/components/ui'
import { env, site } from '@/config'
import { formatAddress } from '@/lib/utils/format'
import { cn } from '@/lib/utils/cn'

/**
 * Google Maps embed.
 *
 * Falls back to a styled placeholder card with a "get directions" link when
 * no `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` is set, so the page never renders a
 * broken iframe in development.
 */
export function MapEmbed({ className, height = 420 }: { className?: string; height?: number }) {
  const query = encodeURIComponent(formatAddress())

  if (!env.googleMapsEmbedKey) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-4 rounded-card border border-dashed border-border-strong bg-surface p-10 text-center',
          className,
        )}
        style={{ minHeight: height }}
      >
        <MapPin className="size-9 text-primary" aria-hidden="true" />
        <div>
          <p className="font-display text-lg text-ink">{site.name}</p>
          <p className="mt-1 text-base text-ink-muted">{formatAddress()}</p>
        </div>
        <ButtonLink href={site.contact.directionsUrl} variant="outline">
          <Navigation className="size-4" aria-hidden="true" />
          Open in Google Maps
        </ButtonLink>
        <p className="text-xs text-ink-subtle">
          Set <code className="font-mono">NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY</code> to render the
          interactive map.
        </p>
      </div>
    )
  }

  return (
    <iframe
      title={`Map showing the location of ${site.name}`}
      src={`https://www.google.com/maps/embed/v1/place?key=${env.googleMapsEmbedKey}&q=${query}&zoom=15`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={cn('w-full rounded-card border border-border', className)}
      style={{ height }}
    />
  )
}
