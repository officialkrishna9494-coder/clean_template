import { Prose, Section, StructuredData } from '@/components/ui'
import { CtaBand, PageHero } from '@/components/sections'
import { site } from '@/config'
import { buildMetadata } from '@/lib/utils/seo'
import { breadcrumbSchema } from '@/lib/utils/structured-data'

const PATH = '/accessibility'

export const metadata = buildMetadata({
  title: 'Accessibility',
  description: `How ${site.name} works to keep this website and our practice accessible to everyone.`,
  path: PATH,
})

export default function AccessibilityPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Accessibility', path: PATH },
        ])}
      />

      <PageHero
        title="Accessibility"
        description="We want everyone to be able to use this website and visit our practice comfortably."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]}
      />

      <Section tone="default" spacing="lg" container="md">
        <Prose>
          <h2>Our commitment</h2>
          <p>
            This site is built to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level
            AA. That is an ongoing commitment rather than a finished task, and we review it as the
            site changes.
          </p>

          <h2>What that means in practice</h2>
          <ul>
            <li>Every page can be operated with a keyboard alone, with a visible focus ring.</li>
            <li>A skip link lets you jump past the header straight to the page content.</li>
            <li>Headings are used in order, so screen-reader navigation works properly.</li>
            <li>Images carry meaningful alternative text, and decorative images are hidden.</li>
            <li>Text and interface colours meet AA contrast ratios in light and dark modes.</li>
            <li>Animation is reduced automatically when your system asks for reduced motion.</li>
            <li>Text can be resized to 200% without the layout breaking.</li>
          </ul>

          <h2>At the practice</h2>
          <p>
            Our office has step-free access to Suite 200 and free parking directly outside. If you
            have a mobility, sensory or communication need we should know about before your visit,
            please tell us when you book and we will make arrangements.
          </p>

          <h2>Tell us if something does not work</h2>
          <p>
            If any part of this site is difficult for you to use, we want to hear about it. Call{' '}
            <a href={`tel:${site.contact.phone.href}`}>{site.contact.phone.display}</a> or email{' '}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> and describe what
            happened. We will help you directly and fix the underlying problem.
          </p>
        </Prose>
      </Section>

      <CtaBand variant="soft" />
    </>
  )
}
