import { Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { ButtonLink, Container, Heading, Text } from '@/components/ui'
import { site } from '@/config'
import { cn } from '@/lib/utils/cn'

export type CtaBandProps = {
  title?: ReactNode
  description?: string
  primaryCta?: { label: string; href: string; external?: boolean }
  secondaryCta?: { label: string; href: string; external?: boolean }
  /** `gradient` for the brand wash, `inverted` for the dark band. */
  variant?: 'gradient' | 'inverted' | 'soft'
  className?: string
}

const variants = {
  gradient: 'bg-brand-gradient text-ink-inverted',
  inverted: 'bg-inverted text-ink-inverted',
  soft: 'bg-primary-soft text-ink',
}

/**
 * Full-width conversion band. Appears near the bottom of every page — one
 * component, so the offer and phrasing stay consistent site-wide.
 */
export function CtaBand({
  title = 'Ready to book your visit?',
  description = 'New patients welcome. Call us or send a request and we will find a time that works — including same-day appointments when you are in pain.',
  primaryCta = site.cta.primary,
  secondaryCta,
  variant = 'gradient',
  className,
}: CtaBandProps) {
  const onDark = variant !== 'soft'

  return (
    <section className={cn('py-[var(--t-section-md)]', variants[variant], className)}>
      <Container className="flex flex-col items-center gap-7 text-center">
        <Heading level={2} size="xl" className={cn('max-w-2xl', onDark && 'text-ink-inverted')}>
          {title}
        </Heading>
        <Text
          size="lg"
          tone={onDark ? 'inverted' : 'muted'}
          className={cn('max-w-2xl', onDark && 'opacity-85')}
        >
          {description}
        </Text>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={primaryCta.href}
            external={primaryCta.external}
            size="xl"
            variant={onDark ? 'inverted' : 'primary'}
          >
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink
            href={secondaryCta?.href ?? `tel:${site.contact.phone.href}`}
            external={secondaryCta?.external}
            size="xl"
            variant={onDark ? 'inverted-outline' : 'outline'}
            leadingIcon={<Phone className="size-4" aria-hidden="true" />}
          >
            {secondaryCta?.label ?? site.contact.phone.display}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
