import { ArrowRight } from 'lucide-react'
import { ButtonLink, Card, IconBox, Section, SectionHeader, Text } from '@/components/ui'
import type { SectionSpacing, SectionTone } from '@/components/ui'
import type { Service } from '@/types/content'
import { cn } from '@/lib/utils/cn'

export type ServicesGridProps = {
  services: Service[]
  eyebrow?: string
  title?: string
  description?: string
  /** Grid density at the large breakpoint. */
  columns?: 2 | 3 | 4
  tone?: SectionTone
  spacing?: SectionSpacing
  /** Renders a "view all" button below the grid. */
  cta?: { label: string; href: string }
  id?: string
  className?: string
}

const columnClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

/**
 * Card grid of services. Used on the homepage (featured subset), the services
 * index (grouped by category) and service pages (related services).
 */
export function ServicesGrid({
  services,
  eyebrow,
  title,
  description,
  columns = 3,
  tone = 'default',
  spacing = 'lg',
  cta,
  id,
  className,
}: ServicesGridProps) {
  return (
    <Section id={id} tone={tone} spacing={spacing} className={className}>
      {title ? (
        <SectionHeader eyebrow={eyebrow} title={title} description={description} className="mb-14" />
      ) : null}

      <ul className={cn('grid gap-6', columnClasses[columns])}>
        {services.map((service) => (
          <li key={service.slug} className="flex">
            <Card href={`/${service.slug}`} variant="outline" padding="lg" className="w-full gap-5">
              <IconBox icon={service.icon} size="lg" />
              <div className="flex flex-1 flex-col gap-2">
                <h3 className="font-display text-xl text-ink transition-colors group-hover:text-primary">
                  {service.title}
                </h3>
                <Text size="sm" className="flex-1">
                  {service.summary}
                </Text>
              </div>
              <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Learn more
                <ArrowRight
                  className="size-4 transition-transform duration-[var(--t-duration-fast)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Card>
          </li>
        ))}
      </ul>

      {cta ? (
        <div className="mt-12 flex justify-center">
          <ButtonLink href={cta.href} variant="outline" size="lg">
            {cta.label}
          </ButtonLink>
        </div>
      ) : null}
    </Section>
  )
}
