import { Quote } from 'lucide-react'
import { Card, Rating, Section, SectionHeader, Text } from '@/components/ui'
import type { SectionTone } from '@/components/ui'
import type { Testimonial } from '@/types/content'

export type TestimonialsProps = {
  testimonials: Testimonial[]
  eyebrow?: string
  title?: string
  description?: string
  tone?: SectionTone
  /** Trims the list — useful for a homepage teaser. */
  limit?: number
  id?: string
}

/**
 * Patient reviews in a masonry-style column layout, so quotes of different
 * lengths sit together without ragged whitespace.
 */
export function Testimonials({
  testimonials,
  eyebrow = 'Patient Reviews',
  title = 'What our patients say',
  description,
  tone = 'surface',
  limit,
  id,
}: TestimonialsProps) {
  const items = limit ? testimonials.slice(0, limit) : testimonials

  return (
    <Section id={id} tone={tone} spacing="lg">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} className="mb-14" />

      <ul className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>li]:mb-6 [&>li]:break-inside-avoid">
        {items.map((testimonial) => (
          <li key={testimonial.author}>
            <Card variant="elevated" padding="lg" className="gap-4">
              <div className="flex items-center justify-between gap-4">
                <Rating value={testimonial.rating} />
                <Quote className="size-7 text-primary/20" aria-hidden="true" />
              </div>
              <Text tone="default" className="text-base">
                “{testimonial.quote}”
              </Text>
              <footer className="mt-1 flex flex-col gap-0.5 border-t border-border pt-4">
                <cite className="font-sans text-sm font-semibold text-ink not-italic">
                  {testimonial.author}
                </cite>
                {testimonial.source ? (
                  <span className="text-xs text-ink-subtle">{testimonial.source}</span>
                ) : null}
              </footer>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
