import { IconBox, Section, SectionHeader, Text } from '@/components/ui'
import type { SectionSpacing, SectionTone } from '@/components/ui'
import type { Feature } from '@/types/content'
import { cn } from '@/lib/utils/cn'

export type FeatureGridProps = {
  features: Feature[]
  eyebrow?: string
  title?: string
  description?: string
  columns?: 2 | 3
  tone?: SectionTone
  spacing?: SectionSpacing
  /** `card` boxes each feature; `plain` lays them out with no chrome. */
  variant?: 'card' | 'plain'
  id?: string
}

/**
 * "Why choose us" style grid. Data-driven from `content/practice.ts`, so the
 * same layout serves any set of differentiators.
 */
export function FeatureGrid({
  features,
  eyebrow,
  title,
  description,
  columns = 3,
  tone = 'surface',
  spacing = 'lg',
  variant = 'card',
  id,
}: FeatureGridProps) {
  const inverted = tone === 'inverted' || tone === 'primary'

  return (
    <Section id={id} tone={tone} spacing={spacing}>
      {title ? (
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          tone={inverted ? 'inverted' : 'default'}
          className="mb-14"
        />
      ) : null}

      <ul
        className={cn(
          'grid gap-6',
          columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {features.map((feature) => (
          <li
            key={feature.title}
            className={cn(
              'flex flex-col gap-4',
              variant === 'card' &&
                (inverted
                  ? 'rounded-card border border-white/10 bg-white/5 p-7'
                  : 'rounded-card border border-border bg-elevated p-7'),
            )}
          >
            <IconBox icon={feature.icon} size="lg" variant={inverted ? 'inverted' : 'primary'} />
            <h3
              className={cn(
                'font-display text-lg',
                inverted ? 'text-ink-inverted' : 'text-ink',
              )}
            >
              {feature.title}
            </h3>
            <Text size="sm" tone={inverted ? 'inverted' : 'muted'} className={inverted ? 'opacity-75' : undefined}>
              {feature.description}
            </Text>
          </li>
        ))}
      </ul>
    </Section>
  )
}
