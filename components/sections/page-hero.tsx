import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Container, Eyebrow, Heading, Text } from '@/components/ui'
import { cn } from '@/lib/utils/cn'

export type Breadcrumb = { label: string; href?: string }

export type PageHeroProps = {
  eyebrow?: string
  title: ReactNode
  description?: string
  breadcrumbs?: Breadcrumb[]
  children?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

/**
 * Compact hero for interior pages. Every non-home page opens with this, which
 * is what makes the site feel like one system rather than a set of templates.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  align = 'center',
  className,
}: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden bg-surface py-[var(--t-section-md)]', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 size-[26rem] rounded-full bg-primary/8 blur-3xl"
      />
      <Container className="relative">
        <div
          className={cn(
            'flex flex-col gap-5',
            align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'items-start',
          )}
        >
          {breadcrumbs?.length ? (
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-subtle">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.label} className="flex items-center gap-1">
                    {index > 0 ? (
                      <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
                    ) : null}
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-primary">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-ink-muted" aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <Heading level={1} size="2xl">
            {title}
          </Heading>
          {description ? (
            <Text size="lg" className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
              {description}
            </Text>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  )
}
