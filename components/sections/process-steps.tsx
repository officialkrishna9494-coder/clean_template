import { Section, SectionHeader, Text } from '@/components/ui'
import type { SectionTone } from '@/components/ui'
import { padNumber } from '@/lib/utils/format'
import { cn } from '@/lib/utils/cn'

export type ProcessStep = { title: string; description: string }

export type ProcessStepsProps = {
  steps: ProcessStep[]
  eyebrow?: string
  title?: string
  description?: string
  tone?: SectionTone
  /** `horizontal` for a connected row; `vertical` for a numbered list. */
  layout?: 'horizontal' | 'vertical'
  id?: string
}

/**
 * Numbered "what to expect" sequence. Used on the homepage and on service
 * pages that define a treatment process.
 */
export function ProcessSteps({
  steps,
  eyebrow = 'How it works',
  title = 'What to expect at your visit',
  description,
  tone = 'default',
  layout = 'horizontal',
  id,
}: ProcessStepsProps) {
  const inverted = tone === 'inverted' || tone === 'primary'

  return (
    <Section id={id} tone={tone} spacing="lg">
      {title ? (
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          tone={inverted ? 'inverted' : 'default'}
          className="mb-14"
        />
      ) : null}

      <ol
        className={cn(
          'grid gap-8',
          layout === 'horizontal' ? 'sm:grid-cols-2 lg:grid-cols-4' : 'max-w-2xl',
        )}
      >
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex flex-col gap-3">
            {/* Connector line between steps on large screens. */}
            {layout === 'horizontal' && index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-6 left-14 hidden h-px w-[calc(100%-2rem)] lg:block',
                  inverted ? 'bg-white/15' : 'bg-border',
                )}
              />
            ) : null}

            <span
              className={cn(
                'relative inline-flex size-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold',
                inverted ? 'bg-accent text-accent-ink' : 'bg-primary text-primary-ink',
              )}
            >
              {padNumber(index + 1)}
            </span>
            <h3
              className={cn('font-display text-lg', inverted ? 'text-ink-inverted' : 'text-ink')}
            >
              {step.title}
            </h3>
            <Text
              size="sm"
              tone={inverted ? 'inverted' : 'muted'}
              className={inverted ? 'opacity-75' : undefined}
            >
              {step.description}
            </Text>
          </li>
        ))}
      </ol>
    </Section>
  )
}
