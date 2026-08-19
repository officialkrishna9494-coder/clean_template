import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card, IconBox, Section, SectionHeader, StructuredData, Text } from '@/components/ui'
import { CtaBand, FaqSection, PageHero, ProcessSteps } from '@/components/sections'
import { generalFaqs, serviceCategories, services, visitSteps } from '@/content'
import { buildMetadata } from '@/lib/utils/seo'
import { breadcrumbSchema } from '@/lib/utils/structured-data'

const PATH = '/services'

export const metadata = buildMetadata({
  title: 'Dental Services',
  description:
    'Preventive, restorative, cosmetic and emergency dentistry in Bee Cave and Austin, TX — cleanings, fillings, crowns, veneers, Invisalign, dentures and more.',
  path: PATH,
})

export default function ServicesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: PATH },
        ])}
      />

      <PageHero
        eyebrow="Our Services"
        title="Complete dental care, all in one place"
        description="From routine cleanings to full smile makeovers, everything your family needs is available here — with the same team and the same records at every visit."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      {serviceCategories.map((category, index) => {
        const items = services.filter((service) => service.category === category.id)
        if (items.length === 0) return null

        return (
          <Section
            key={category.id}
            id={category.id}
            tone={index % 2 === 0 ? 'default' : 'surface'}
            spacing="lg"
          >
            <SectionHeader
              align="left"
              eyebrow={`0${index + 1}`}
              title={category.label}
              description={category.description}
              className="mb-12"
            />

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((service) => (
                <li key={service.slug} className="flex">
                  <Card href={`/${service.slug}`} variant="outline" padding="lg" className="w-full gap-5">
                    <IconBox icon={service.icon} size="lg" />
                    <div className="flex flex-1 flex-col gap-2">
                      <h3 className="font-display text-xl text-ink transition-colors group-hover:text-primary">
                        {service.title}
                      </h3>
                      <Text size="sm" className="flex-1">
                        {service.summary}
                      </Text>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowRight
                        className="size-4 transition-transform duration-[var(--t-duration-fast)] group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Card>
                </li>
              ))}
            </ul>
          </Section>
        )
      })}

      <ProcessSteps steps={visitSteps} tone="default" />

      <Section tone="surface" spacing="md" container="lg">
        <SectionHeader
          eyebrow="Not Sure Where to Start?"
          title="Book a comprehensive exam"
          description="If you are not certain which of these you need, start with an exam. We will take images, look at everything properly and give you a written plan that separates what is urgent from what can wait."
        >
          <Link
            href="/contact#appointment"
            className="mt-2 inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
          >
            Request an appointment
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </SectionHeader>
      </Section>

      <FaqSection faqs={generalFaqs.slice(0, 5)} tone="default" />

      <CtaBand />
    </>
  )
}
