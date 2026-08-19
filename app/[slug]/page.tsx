import { ArrowRight, CheckCircle2, Phone } from 'lucide-react'
import { notFound } from 'next/navigation'
import {
  ButtonLink,
  Card,
  Heading,
  IconBox,
  Section,
  SectionHeader,
  StructuredData,
  Text,
} from '@/components/ui'
import {
  ContactInfo,
  CtaBand,
  FaqSection,
  MediaSplit,
  PageHero,
  ProcessSteps,
  ServicesGrid,
  Testimonials,
} from '@/components/sections'
import { AppointmentForm } from '@/components/forms'
import { assets, site } from '@/config'
import { getService, services, testimonials } from '@/content'
import { buildMetadata } from '@/lib/utils/seo'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/utils/structured-data'

/**
 * Service page template.
 *
 * One route renders every service in `content/services.ts`, statically
 * generated at build time. Adding a service to that file publishes a new page
 * — no new route, no new layout, no copy-pasted template.
 */

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

/** Any slug not in the catalogue 404s rather than rendering an empty shell. */
export const dynamicParams = false

export async function generateMetadata(props: PageProps<'/[slug]'>) {
  const { slug } = await props.params
  const service = getService(slug)
  if (!service) return buildMetadata({ title: 'Not found', index: false })

  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/${service.slug}`,
  })
}

export default async function ServicePage(props: PageProps<'/[slug]'>) {
  const { slug } = await props.params
  const service = getService(slug)
  if (!service) notFound()

  // Related = same category first, topped up to three from the featured list.
  const related = [
    ...services.filter((item) => item.category === service.category && item.slug !== service.slug),
    ...services.filter((item) => item.featured && item.category !== service.category),
  ]
    .filter((item, index, list) => list.findIndex((entry) => entry.slug === item.slug) === index)
    .slice(0, 3)

  return (
    <>
      <StructuredData
        data={[
          serviceSchema({
            name: service.heading,
            description: service.seo.description,
            path: `/${service.slug}`,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/${service.slug}` },
          ]),
          ...(service.faqs?.length ? [faqSchema(service.faqs)] : []),
        ]}
      />

      <PageHero
        eyebrow={service.title}
        title={service.heading}
        description={service.intro}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={site.cta.primary.href} external={site.cta.primary.external} size="lg">
            {site.cta.primary.label}
          </ButtonLink>
          <ButtonLink
            href={`tel:${site.contact.phone.href}`}
            variant="outline"
            size="lg"
            leadingIcon={<Phone className="size-4" aria-hidden="true" />}
          >
            {site.contact.phone.display}
          </ButtonLink>
        </div>
      </PageHero>

      <MediaSplit
        eyebrow="Overview"
        title={`About ${service.title.toLowerCase()}`}
        body={service.body}
        bullets={service.benefits}
        image={service.image ?? assets.fallback.service}
        ratio="landscape"
        imageSide="right"
        tone="default"
      />

      {service.process?.length ? (
        <ProcessSteps
          steps={service.process}
          eyebrow="The Process"
          title={`What ${service.title.toLowerCase()} involves`}
          tone="surface"
          layout={service.process.length > 3 ? 'horizontal' : 'vertical'}
        />
      ) : (
        <Section tone="surface" spacing="lg" container="lg">
          <SectionHeader
            eyebrow="Benefits"
            title={`Why patients choose ${service.title.toLowerCase()}`}
            className="mb-12"
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 rounded-card bg-elevated p-5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-base text-ink-muted">{benefit}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Booking band, repeated on every service page — this is where the
          traffic that lands on a service page is meant to convert. */}
      <Section id="appointment" tone="default" spacing="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <IconBox icon={service.icon} size="xl" />
              <Heading level={2} size="xl">
                Book your {service.title.toLowerCase()} appointment
              </Heading>
              <Text size="lg">
                Send us your details and we will call to confirm a time. We work with most major PPO
                plans and offer CareCredit financing on larger treatment plans.
              </Text>
            </div>
            <ContactInfo />
          </div>

          <div className="rounded-card border border-border bg-elevated p-6 shadow-soft sm:p-9">
            <AppointmentForm />
          </div>
        </div>
      </Section>

      {service.faqs?.length ? (
        <FaqSection
          faqs={service.faqs}
          eyebrow="FAQs"
          title={`${service.title} — your questions answered`}
          tone="surface"
          showCta={false}
        />
      ) : null}

      <Testimonials testimonials={testimonials} tone="default" limit={3} />

      <ServicesGrid
        services={related}
        eyebrow="Related Care"
        title="You might also be looking for"
        columns={3}
        tone="surface"
        cta={{ label: 'View all services', href: '/services' }}
      />

      <Section tone="default" spacing="md" container="lg">
        <Card variant="soft" padding="lg" className="items-center gap-4 text-center">
          <Text size="lg" tone="default">
            Not sure whether {service.title.toLowerCase()} is right for you?
          </Text>
          <ButtonLink
            href="/contact"
            variant="link"
            trailingIcon={<ArrowRight className="size-4" aria-hidden="true" />}
          >
            Ask us — we will give you a straight answer
          </ButtonLink>
        </Card>
      </Section>

      <CtaBand />
    </>
  )
}
