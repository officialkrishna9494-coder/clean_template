import { Section, Prose, StructuredData } from '@/components/ui'
import { CtaBand, PageHero } from '@/components/sections'
import { site } from '@/config'
import { formatAddress } from '@/lib/utils/format'
import { buildMetadata } from '@/lib/utils/seo'
import { breadcrumbSchema } from '@/lib/utils/structured-data'

const PATH = '/privacy-policy'

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses and protects the information you share with us.`,
  path: PATH,
})

export default function PrivacyPolicyPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: PATH },
        ])}
      />

      <PageHero
        title="Privacy Policy"
        description={`How ${site.name} handles the information you share with us.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />

      <Section tone="default" spacing="lg" container="md">
        <Prose>
          <p>
            <strong>Template notice:</strong> this page is a starting point, not legal advice.
            Have your own counsel review and adapt it — particularly the HIPAA, retention and
            state-specific sections — before you publish.
          </p>

          <h2>Information we collect</h2>
          <p>
            When you contact us through this website we collect the details you choose to give us:
            your name, phone number, email address, preferred appointment times and anything you
            write in the message field. We also collect standard technical information such as your
            browser type and the pages you visit, which helps us understand how the site is used.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To respond to your enquiry and schedule or confirm appointments.</li>
            <li>To provide dental care and maintain your clinical record.</li>
            <li>To send appointment reminders, where you have asked us to.</li>
            <li>To improve this website and the service we provide.</li>
          </ul>

          <h2>Protected health information</h2>
          <p>
            Clinical information you share with us as a patient is protected health information and
            is handled in line with HIPAA and applicable Texas law. We do not sell it, and we share
            it only as needed to provide your care, obtain payment, run the practice, or where the
            law requires.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This site uses cookies to keep it working correctly. If analytics are enabled, we use
            them only in aggregate to understand which pages are useful. You can block cookies in
            your browser settings; some parts of the site may then work less well.
          </p>

          <h2>Data retention</h2>
          <p>
            We keep enquiry messages for as long as needed to answer them and for our own records.
            Clinical records are retained for the period required by Texas dental practice
            regulations.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us for a copy of the information we hold about you, ask us to correct it, or
            ask us to stop sending you reminders. Contact us and we will help.
          </p>

          <h2>Contact us</h2>
          <p>
            {site.legalName}
            <br />
            {formatAddress()}
            <br />
            <a href={`tel:${site.contact.phone.href}`}>{site.contact.phone.display}</a>
            <br />
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
        </Prose>
      </Section>

      <CtaBand variant="soft" />
    </>
  )
}
