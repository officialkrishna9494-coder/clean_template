import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { Badge, ButtonLink, Card, IconBox, Text } from '@/components/ui'
import { site } from '@/config'
import { formatAddressLines, groupHours, isOpenNow } from '@/lib/utils/format'
import { cn } from '@/lib/utils/cn'

/**
 * Address, phone, email and opening hours as a card stack.
 * Shared by the contact page and the homepage location band.
 */
export function ContactInfo({ className }: { className?: string }) {
  const hourGroups = groupHours()
  const open = isOpenNow()

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <Card variant="outline" padding="lg" className="gap-5">
        <div className="flex items-start gap-4">
          <IconBox icon={MapPin} size="md" />
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-sm font-semibold tracking-wide text-ink uppercase">
              Visit us
            </h3>
            <address className="text-base leading-relaxed text-ink-muted not-italic">
              {formatAddressLines().map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <ButtonLink href={site.contact.directionsUrl} variant="link" className="mt-1 text-sm">
              <Navigation className="size-3.5" aria-hidden="true" />
              Get directions
            </ButtonLink>
          </div>
        </div>
      </Card>

      <Card variant="outline" padding="lg" className="gap-5">
        <div className="flex items-start gap-4">
          <IconBox icon={Phone} size="md" />
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-sm font-semibold tracking-wide text-ink uppercase">
              Call or email
            </h3>
            <a
              href={`tel:${site.contact.phone.href}`}
              className="text-lg font-semibold text-primary hover:underline"
            >
              {site.contact.phone.display}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 text-base break-all text-ink-muted hover:text-primary"
            >
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              {site.contact.email}
            </a>
          </div>
        </div>
      </Card>

      <Card variant="outline" padding="lg" className="gap-5">
        <div className="flex items-start gap-4">
          <IconBox icon={Clock} size="md" />
          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-sans text-sm font-semibold tracking-wide text-ink uppercase">
                Office hours
              </h3>
              {open === null ? null : (
                <Badge variant={open ? 'success' : 'neutral'}>{open ? 'Open now' : 'Closed now'}</Badge>
              )}
            </div>
            <dl className="flex flex-col gap-2 text-base">
              {hourGroups.map((group) => (
                <div key={group.days} className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-muted">{group.days}</dt>
                  <dd
                    className={cn(
                      'font-medium',
                      group.label === 'Closed' ? 'text-ink-subtle' : 'text-ink',
                    )}
                  >
                    {group.label}
                  </dd>
                </div>
              ))}
            </dl>
            <Text size="sm" tone="subtle">
              {site.hoursNote}
            </Text>
          </div>
        </div>
      </Card>
    </div>
  )
}
