import { CheckCircle2, Phone, Star } from 'lucide-react'
import type { ReactNode } from 'react'
import { AppImage, Badge, ButtonLink, Container, Heading, Rating, Text } from '@/components/ui'
import { assets, site, type AssetRef } from '@/config'
import { cn } from '@/lib/utils/cn'

export type HeroProps = {
  eyebrow?: string
  title: ReactNode
  description?: string
  /** Short proof points listed under the copy. */
  highlights?: string[]
  primaryCta?: { label: string; href: string; external?: boolean }
  secondaryCta?: { label: string; href: string; external?: boolean }
  image?: AssetRef
  /** `split` puts copy and image side by side; `centered` is copy only. */
  layout?: 'split' | 'centered'
  /** Social-proof strip under the CTAs. */
  rating?: { value: number; count: number }
  className?: string
}

/**
 * The homepage hero. Reusable for any landing page: pass different copy, and
 * optionally switch to the `centered` layout for text-only pages.
 */
export function Hero({
  eyebrow,
  title,
  description,
  highlights = [],
  primaryCta = site.cta.primary,
  secondaryCta,
  image = assets.hero.primary,
  layout = 'split',
  rating,
  className,
}: HeroProps) {
  const centered = layout === 'centered'

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-surface',
        'py-[var(--t-section-lg)]',
        className,
      )}
    >
      {/* Decorative brand wash — purely visual, hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-primary/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-32 size-[30rem] rounded-full bg-accent/10 blur-3xl"
      />

      <Container className="relative">
        <div
          className={cn(
            'grid items-center gap-12',
            centered ? 'max-w-3xl justify-items-center text-center mx-auto' : 'lg:grid-cols-2 lg:gap-16',
          )}
        >
          <div className={cn('flex flex-col gap-6', centered && 'items-center')}>
            {eyebrow ? (
              <Badge
                variant="primary"
                size="md"
                icon={<Star className="size-3.5" aria-hidden="true" />}
                className={cn('self-start', centered && 'self-center')}
              >
                {eyebrow}
              </Badge>
            ) : null}

            <Heading level={1} size="2xl" className="max-w-[18ch]">
              {title}
            </Heading>

            {description ? (
              <Text size="lg" className={cn('max-w-xl', centered && 'mx-auto')}>
                {description}
              </Text>
            ) : null}

            {highlights.length > 0 ? (
              <ul className={cn('flex flex-col gap-2.5', centered && 'items-start')}>
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-ink">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className={cn('flex flex-col gap-3 pt-2 sm:flex-row', centered && 'justify-center')}>
              <ButtonLink
                href={primaryCta.href}
                external={primaryCta.external}
                size="xl"
              >
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={secondaryCta?.href ?? `tel:${site.contact.phone.href}`}
                external={secondaryCta?.external}
                variant="outline"
                size="xl"
                leadingIcon={<Phone className="size-4" aria-hidden="true" />}
              >
                {secondaryCta?.label ?? site.contact.phone.display}
              </ButtonLink>
            </div>

            {rating ? (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Rating value={rating.value} size="md" />
                <Text size="sm" className="!leading-normal">
                  <strong className="font-semibold text-ink">{rating.value.toFixed(1)}</strong> from{' '}
                  {rating.count}+ patient reviews
                </Text>
              </div>
            ) : null}
          </div>

          {!centered ? (
            <div className="relative">
              <AppImage
                src={image}
                ratio="hero"
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="shadow-xl"
              />

              {/* Floating hours card — hidden on small screens where it would crowd. */}
              <div className="absolute -bottom-8 -left-6 hidden max-w-[15rem] rounded-card border border-border bg-elevated p-5 shadow-lg sm:block lg:-left-14">
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                  Now welcoming
                </p>
                <p className="mt-1.5 font-display text-lg leading-snug text-ink">
                  New patients of every age
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Complimentary whitening with your first cleaning &amp; exam.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
