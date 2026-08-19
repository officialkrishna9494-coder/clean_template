import { Home, Phone, Search } from 'lucide-react'
import { ButtonLink, Container, Heading, Text } from '@/components/ui'
import { ServicesGrid } from '@/components/sections'
import { featuredServices } from '@/content'
import { site } from '@/config'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <>
      <section className="bg-surface py-[var(--t-section-lg)]">
        <Container className="flex flex-col items-center gap-6 text-center">
          <span
            className="inline-flex size-20 items-center justify-center rounded-full bg-primary-soft text-primary"
            aria-hidden="true"
          >
            <Search className="size-9" />
          </span>
          <p className="font-mono text-sm tracking-widest text-ink-subtle">404</p>
          <Heading level={1} size="2xl" className="max-w-2xl">
            We could not find that page
          </Heading>
          <Text size="lg" className="max-w-xl">
            The link may be out of date, or the page may have moved. Try one of our services below,
            or give us a call — we are happy to point you in the right direction.
          </Text>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <ButtonLink href="/" size="lg" leadingIcon={<Home className="size-4" aria-hidden="true" />}>
              Back to home
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
        </Container>
      </section>

      <ServicesGrid
        services={featuredServices.slice(0, 3)}
        title="Popular services"
        columns={3}
        cta={{ label: 'View all services', href: '/services' }}
      />
    </>
  )
}
