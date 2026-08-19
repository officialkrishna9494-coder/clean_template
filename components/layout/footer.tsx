import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { ButtonLink, Container, Divider, Logo, SocialIcon } from '@/components/ui'
import type { SocialIconName } from '@/components/ui'
import { footerNav, legalNav, site } from '@/config'
import { formatAddressLines, groupHours } from '@/lib/utils/format'

/**
 * Site footer. Every link, hour and contact detail is read from
 * `config/site.config.ts` — nothing here is hard-coded.
 */
export function Footer() {
  const hourGroups = groupHours()

  return (
    <footer className="bg-inverted text-ink-inverted">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-10">
          {/* Identity + contact */}
          <div className="flex flex-col gap-6">
            <Logo variant="inverted" height={48} />
            <p className="max-w-sm text-sm leading-relaxed text-ink-inverted/70">
              {site.description}
            </p>

            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={site.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-ink-inverted/80 transition-colors hover:text-accent"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    {formatAddressLines().map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phone.href}`}
                  className="flex items-center gap-3 text-ink-inverted/80 transition-colors hover:text-accent"
                >
                  <Phone className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {site.contact.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-center gap-3 break-all text-ink-inverted/80 transition-colors hover:text-accent"
                >
                  <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {site.contact.email}
                </a>
              </li>
            </ul>

            <div className="flex gap-2">
              {site.social.map((entry) => (
                  <a
                    key={entry.label}
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${entry.label}`}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-ink-inverted/80 transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                  >
                    <SocialIcon name={entry.icon as SocialIconName} className="size-4" />
                  </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-4">
              <h2 className="font-sans text-xs font-semibold tracking-widest text-accent uppercase">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-inverted/70 transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Hours + CTA */}
        <div className="mt-14 grid gap-8 rounded-card border border-white/10 bg-white/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest text-accent uppercase">
              <Clock className="size-4" aria-hidden="true" />
              Office Hours
            </h2>
            <dl className="grid gap-x-10 gap-y-2 text-sm sm:grid-cols-2">
              {hourGroups.map((group) => (
                <div key={group.days} className="flex justify-between gap-6 sm:justify-start">
                  <dt className="text-ink-inverted/70">{group.days}</dt>
                  <dd className="font-medium text-ink-inverted">{group.label}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm text-ink-inverted/60">{site.hoursNote}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink
              href={site.cta.primary.href}
              external={site.cta.primary.external}
              variant="accent"
              size="lg"
            >
              {site.cta.primary.label}
            </ButtonLink>
            <ButtonLink
              href={`tel:${site.contact.phone.href}`}
              variant="inverted-outline"
              size="lg"
              leadingIcon={<Phone className="size-4" aria-hidden="true" />}
            >
              {site.contact.phone.display}
            </ButtonLink>
          </div>
        </div>

        <Divider tone="inverted" className="my-10" />

        <div className="flex flex-col-reverse items-center justify-between gap-4 text-sm text-ink-inverted/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
