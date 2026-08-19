import { ArrowRight, CalendarDays, Phone, ShieldCheck } from 'lucide-react'
import { ButtonLink, Section, SectionHeader } from '@/components/ui'
import {
  ContactInfo,
  CtaBand,
  FaqSection,
  FeatureGrid,
  Hero,
  MapEmbed,
  MediaSplit,
  ProcessSteps,
  ServiceAreas,
  ServicesGrid,
  StatsBand,
  Testimonials,
} from '@/components/sections'
import { AppointmentForm } from '@/components/forms'
import { assets, site } from '@/config'
import {
  averageRating,
  differentiators,
  doctor,
  featuredServices,
  generalFaqs,
  serviceAreas,
  stats,
  testimonials,
  visitSteps,
} from '@/content'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata = buildMetadata({ path: '/' })

/**
 * Homepage.
 *
 * Every band is a section component from `components/sections/`, fed by data
 * from `content/` and `config/`. There is no bespoke layout code here — which
 * is exactly what makes this page reproducible for another practice.
 */
export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Now welcoming new patients"
        title={
          <>
            Gentle dental care for <span className="text-primary">every age</span>, right here in
            Bee Cave
          </>
        }
        description="Your family's oral health is our top priority. From a toddler's first checkup to same-day crowns and full smile makeovers, Dr. Smrity Amatya and her team provide compassionate, high-quality care in a warm, welcoming practice."
        highlights={[
          'Preventive, restorative and cosmetic care under one roof',
          'Same-day CEREC® crowns — no temporary, no second visit',
          'Emergency slots held open every day',
        ]}
        secondaryCta={{ label: site.contact.phone.display, href: `tel:${site.contact.phone.href}` }}
        image={assets.hero.primary}
        rating={{ value: averageRating, count: 40 }}
      />

      <StatsBand stats={stats} tone="primary" />

      <ServicesGrid
        id="services"
        services={featuredServices}
        eyebrow="Our Services"
        title="Complete dental care, all in one place"
        description="A wide range of services tailored to every member of your family — from preventive care and cleanings to restorative treatments and cosmetic enhancements."
        columns={3}
        cta={{ label: 'View all services', href: '/services' }}
      />

      <MediaSplit
        eyebrow="Meet Your Dentist"
        title={doctor.name}
        body={doctor.bio.slice(0, 2)}
        bullets={doctor.highlights}
        image={assets.about.doctor}
        ratio="portrait"
        imageSide="left"
        tone="surface"
        cta={{ label: 'More about the practice', href: '/about-us' }}
        overlay={{ value: '10+', label: 'Years caring for families in Texas and Pennsylvania' }}
      />

      <FeatureGrid
        features={differentiators}
        eyebrow="Why Choose Us"
        title="Care built around how you actually feel about the dentist"
        description="We know a dental visit is not most people's favourite hour. Everything here is arranged to make it a straightforward, unhurried and genuinely comfortable one."
        tone="default"
        columns={3}
      />

      <ProcessSteps
        steps={visitSteps}
        eyebrow="How It Works"
        title="What to expect at your first visit"
        description="No surprises, no pressure and no jargon — just a clear picture of where you stand and what your options are."
        tone="surface"
      />

      <Testimonials
        testimonials={testimonials}
        eyebrow="Patient Reviews"
        title="What our patients say"
        description="A calm room, an unhurried explanation and work that lasts. Here is how that lands with the people we look after."
        tone="default"
        limit={6}
      />

      {/* Booking band — the primary conversion point on the page. */}
      <Section id="appointment" tone="surface" spacing="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeader
              align="left"
              eyebrow="Book a Visit"
              title="Request your appointment"
              description="Send us a few details and we will call to confirm a time that works. New patients receive complimentary teeth whitening with their first cleaning and exam."
            />

            <div className="flex flex-col gap-4 rounded-card border border-border bg-elevated p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-base text-ink-muted">
                  We work with most major PPO dental plans and file your claim for you. CareCredit
                  financing is available for larger treatment plans.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={`tel:${site.contact.phone.href}`}
                  variant="soft"
                  leadingIcon={<Phone className="size-4" aria-hidden="true" />}
                >
                  {site.contact.phone.display}
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="ghost"
                  trailingIcon={<ArrowRight className="size-4" aria-hidden="true" />}
                >
                  Other ways to reach us
                </ButtonLink>
              </div>
            </div>

            <ContactInfo />
          </div>

          <div className="rounded-card border border-border bg-elevated p-6 shadow-soft sm:p-9">
            <div className="mb-6 flex items-center gap-3">
              <CalendarDays className="size-6 text-primary" aria-hidden="true" />
              <h3 className="font-display text-2xl text-ink">Appointment request</h3>
            </div>
            <AppointmentForm />
          </div>
        </div>
      </Section>

      <Section tone="default" spacing="lg">
        <SectionHeader
          eyebrow="Find Us"
          title="Minutes from the Hill Country Galleria"
          description="Free surface parking directly outside the building, with step-free access to Suite 200."
          className="mb-12"
        />
        <MapEmbed height={440} />
      </Section>

      <ServiceAreas areas={serviceAreas} tone="surface" />

      <FaqSection faqs={generalFaqs.slice(0, 6)} tone="default" />

      <CtaBand />
    </>
  )
}
