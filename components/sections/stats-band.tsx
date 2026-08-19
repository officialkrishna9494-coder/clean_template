import { Section } from '@/components/ui'
import type { SectionTone } from '@/components/ui'
import type { Stat } from '@/types/content'
import { cn } from '@/lib/utils/cn'

export type StatsBandProps = {
  stats: Stat[]
  tone?: SectionTone
  className?: string
}

/** Compact numeric proof strip. Reads well directly under a hero. */
export function StatsBand({ stats, tone = 'primary', className }: StatsBandProps) {
  const inverted = tone === 'primary' || tone === 'inverted'

  return (
    <Section tone={tone} spacing="sm" className={className}>
      <dl
        className={cn(
          'grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4',
          inverted ? 'text-ink-inverted' : 'text-ink',
        )}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1.5">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-display text-4xl leading-none font-semibold">{stat.value}</dd>
            <p className={cn('text-sm', inverted ? 'text-ink-inverted/70' : 'text-ink-muted')}>
              {stat.label}
            </p>
          </div>
        ))}
      </dl>
    </Section>
  )
}
