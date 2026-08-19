import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { site } from '@/config'

/**
 * Slim promotional strip above the header. Hidden entirely when
 * `site.announcement` is `null`, so it is a config switch rather than a code
 * change.
 */
export function AnnouncementBar() {
  if (!site.announcement) return null
  const { text, href, linkLabel } = site.announcement

  return (
    <div className="bg-inverted text-ink-inverted">
      <Container className="flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center">
        <Sparkles className="hidden size-4 shrink-0 text-accent sm:block" aria-hidden="true" />
        <p className="text-sm text-ink-inverted/85">{text}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent underline-offset-4 hover:underline"
        >
          {linkLabel}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </Container>
    </div>
  )
}
