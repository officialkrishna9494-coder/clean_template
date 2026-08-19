import { CalendarDays } from 'lucide-react'
import { Section, SectionHeader, StructuredData } from '@/components/ui'
import { AppointmentForm, ContactForm } from '@/components/forms'
import { ContactInfo, CtaBand, FaqSection, MapEmbed, PageHero } from '@/components/sections'
import { generalFaqs } from '@/content'
import { buildMetadata } from '@/lib/utils/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/utils/structured-data'

const PATH = '/contact'

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Contact Bee Cave Family Dentistry at 13917 W State Hwy 71, Suite 200, Bee Cave, TX 78738. Call (512) 885-2020 or request an appointment online.',
  path: PATH,
})

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: PATH },
          ]),
          faqSchema(generalFaqs),
        ]}
      />

      <PageHero
        eyebrow="Get in Touch"
        title="Book a visit or ask us anything"
        description="Call us, send a message or request an appointment online — whichever suits. For urgent pain, please phone: we hold emergency slots open every day."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <Section id="appointment" tone="default" spacing="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeader
              align="left"
              eyebrow="Visit Us"
              title="Where to find us"
              description="We are on Highway 71 in Bee Cave, minutes from the Hill Country Galleria, with free parking directly outside."
            />
            <ContactInfo />
          </div>

          <div className="rounded-card border border-border bg-elevated p-6 shadow-soft sm:p-9">
            <div className="mb-6 flex items-center gap-3">
              <CalendarDays className="size-6 text-primary" aria-hidden="true" />
              <h2 className="font-display text-2xl text-ink">Request an appointment</h2>
            </div>
            <AppointmentForm />
          </div>
        </div>
      </Section>

      <Section tone="surface" spacing="lg">
        <SectionHeader
          eyebrow="Find Us"
          title="13917 W State Hwy 71, Suite 200"
          description="Step-free access to Suite 200, with free surface parking outside the building."
          className="mb-12"
        />
        <MapEmbed height={460} />
      </Section>

      <Section id="message" tone="default" spacing="lg" container="lg">
        <SectionHeader
          eyebrow="Send a Message"
          title="Not ready to book? Just ask."
          description="Insurance questions, treatment costs, nerves about a procedure — send them over and a member of the team will reply within one business day."
          className="mb-12"
        />
        <div className="mx-auto max-w-2xl rounded-card border border-border bg-elevated p-6 shadow-soft sm:p-9">
          <ContactForm />
        </div>
      </Section>

      <FaqSection faqs={generalFaqs} tone="surface" showCta={false} />

      <CtaBand
        title="In pain right now?"
        description="Do not wait it out. Call us and we will find you a slot today wherever we possibly can."
        variant="inverted"
      />
    </>
  )
}
