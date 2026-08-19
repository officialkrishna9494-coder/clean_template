'use client'

import { RotateCcw, TriangleAlert } from 'lucide-react'
import { useEffect } from 'react'
import { Button, ButtonLink, Container, Heading, Text } from '@/components/ui'
import { site } from '@/config'

/**
 * Route-level error boundary. Renders whenever a page throws during render,
 * so a visitor never sees a blank screen — just a way forward.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Replace with your error reporter (Sentry, Datadog, …).
    console.error('[app] Unhandled error', error)
  }, [error])

  return (
    <section className="bg-surface py-[var(--t-section-lg)]">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span
          className="inline-flex size-20 items-center justify-center rounded-full bg-danger-soft text-danger"
          aria-hidden="true"
        >
          <TriangleAlert className="size-9" />
        </span>
        <Heading level={1} size="xl" className="max-w-2xl">
          Something went wrong
        </Heading>
        <Text size="lg" className="max-w-xl">
          Sorry — that did not load as it should have. Try again, and if it keeps happening please
          call us on {site.contact.phone.display} and we will help you directly.
        </Text>
        {error.digest ? (
          <p className="font-mono text-xs text-ink-subtle">Reference: {error.digest}</p>
        ) : null}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button size="lg" onClick={reset} leadingIcon={<RotateCcw className="size-4" aria-hidden="true" />}>
            Try again
          </Button>
          <ButtonLink href="/" variant="outline" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
