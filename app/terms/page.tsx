import { Prose, Section, StructuredData } from '@/components/ui'
import { CtaBand, PageHero } from '@/components/sections'
import { site } from '@/config'
import { buildMetadata } from '@/lib/utils/seo'
import { breadcrumbSchema } from '@/lib/utils/structured-data'

const PATH = '/terms'

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: `The terms that apply when you use the ${site.name} website.`,
  path: PATH,
})

export default function TermsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Terms of Use', path: PATH },
        ])}
      />

      <PageHero
        title="Terms of Use"
        description={`The terms that apply when you use the ${site.name} website.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]}
      />

      <Section tone="default" spacing="lg" container="md">
        <Prose>
          <p>
            <strong>Template notice:</strong> this page is a starting point, not legal advice. Have
            your own counsel review and adapt it before you publish.
          </p>

          <h2>No medical advice</h2>
          <p>
            The content on this website is general information about dental treatment. It is not a
            diagnosis and it is not a substitute for an examination. Never delay seeking care
            because of something you read here. If you are in pain or think you may have a dental
            emergency, call us on{' '}
            <a href={`tel:${site.contact.phone.href}`}>{site.contact.phone.display}</a>.
          </p>

          <h2>Results vary</h2>
          <p>
            Photographs and case descriptions show outcomes for particular patients. Your own result
            depends on your clinical situation and cannot be guaranteed from a photograph.
          </p>

          <h2>Appointment requests</h2>
          <p>
            Submitting the appointment form is a request, not a confirmed booking. Your appointment
            is confirmed only once a member of our team has spoken to you.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The text, images, layout and code on this site belong to {site.legalName} or its
            licensors, and may not be reproduced without permission.
          </p>

          <h2>External links</h2>
          <p>
            Where we link to another website, we do so for convenience. We are not responsible for
            its content or its privacy practices.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. Continuing to use the site after a change
            means you accept the revised terms.
          </p>
        </Prose>
      </Section>

      <CtaBand variant="soft" />
    </>
  )
}
