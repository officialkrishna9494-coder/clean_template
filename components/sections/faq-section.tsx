import { Accordion, ButtonLink, Section, SectionHeader } from '@/components/ui'
import type { SectionTone } from '@/components/ui'
import { site } from '@/config'
import type { Faq } from '@/types/content'

export type FaqSectionProps = {
  faqs: Faq[]
  eyebrow?: string
  title?: string
  description?: string
  tone?: SectionTone
  /** Adds a "still have questions?" call to action below the list. */
  showCta?: boolean
  id?: string
}

export function FaqSection({
  faqs,
  eyebrow = 'FAQs',
  title = 'Questions patients ask us',
  description,
  tone = 'default',
  showCta = true,
  id = 'faqs',
}: FaqSectionProps) {
  return (
    <Section id={id} tone={tone} spacing="lg" container="lg">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} className="mb-12" />

      <Accordion
        items={faqs.map((faq) => ({ title: faq.question, content: faq.answer }))}
        defaultOpen={0}
      />

      {showCta ? (
        <div className="mt-12 flex flex-col items-center gap-4 rounded-card border border-border bg-surface p-8 text-center">
          <p className="font-display text-xl text-ink">Still have a question?</p>
          <p className="max-w-md text-base text-ink-muted">
            Call us and speak to a person — no phone tree, no hold music.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`tel:${site.contact.phone.href}`} size="lg">
              {site.contact.phone.display}
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Send a message
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </Section>
  )
}
