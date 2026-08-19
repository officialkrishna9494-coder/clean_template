import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { AppImage, ButtonLink, Section, Eyebrow, Heading, Text } from '@/components/ui'
import type { SectionSpacing, SectionTone } from '@/components/ui'
import type { AspectRatio, AssetRef } from '@/config'
import { cn } from '@/lib/utils/cn'

export type MediaSplitProps = {
  eyebrow?: string
  title: ReactNode
  /** Paragraphs of body copy. */
  body?: string[]
  /** Checklist rendered under the copy. */
  bullets?: string[]
  image: AssetRef
  ratio?: AspectRatio
  /** Which side the image sits on at large sizes. */
  imageSide?: 'left' | 'right'
  cta?: { label: string; href: string; external?: boolean }
  secondaryCta?: { label: string; href: string; external?: boolean }
  tone?: SectionTone
  spacing?: SectionSpacing
  /** Small stat/badge card overlapping the image corner. */
  overlay?: { value: string; label: string }
  children?: ReactNode
  id?: string
}

/**
 * Image-beside-copy band — the workhorse layout for "About", "Meet the
 * doctor", and long-form service explanations. Alternate `imageSide` down a
 * page to create rhythm.
 */
export function MediaSplit({
  eyebrow,
  title,
  body = [],
  bullets = [],
  image,
  ratio = 'landscape',
  imageSide = 'right',
  cta,
  secondaryCta,
  tone = 'default',
  spacing = 'lg',
  overlay,
  children,
  id,
}: MediaSplitProps) {
  const inverted = tone === 'inverted' || tone === 'primary'

  return (
    <Section id={id} tone={tone} spacing={spacing}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={cn('relative', imageSide === 'left' ? 'lg:order-1' : 'lg:order-2')}>
          <AppImage src={image} ratio={ratio} sizes="(min-width: 1024px) 46vw, 92vw" className="shadow-lg" />
          {overlay ? (
            <div
              className={cn(
                'absolute -bottom-6 rounded-card border p-5 shadow-lg',
                imageSide === 'left' ? '-right-4 lg:-right-8' : '-left-4 lg:-left-8',
                'border-border bg-elevated',
              )}
            >
              <p className="font-display text-3xl leading-none font-semibold text-primary">
                {overlay.value}
              </p>
              <p className="mt-1 max-w-[10rem] text-sm text-ink-muted">{overlay.label}</p>
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            'flex flex-col gap-5',
            imageSide === 'left' ? 'lg:order-2' : 'lg:order-1',
          )}
        >
          {eyebrow ? <Eyebrow tone={inverted ? 'inverted' : 'primary'}>{eyebrow}</Eyebrow> : null}
          <Heading level={2} size="xl" className={inverted ? 'text-ink-inverted' : undefined}>
            {title}
          </Heading>

          {body.map((paragraph) => (
            <Text
              key={paragraph.slice(0, 40)}
              tone={inverted ? 'inverted' : 'muted'}
              className={inverted ? 'opacity-80' : undefined}
            >
              {paragraph}
            </Text>
          ))}

          {bullets.length > 0 ? (
            <ul className="mt-1 flex flex-col gap-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span
                    className={cn(
                      'mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full',
                      inverted ? 'bg-white/12 text-accent' : 'bg-primary-soft text-primary',
                    )}
                    aria-hidden="true"
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span
                    className={cn('text-base', inverted ? 'text-ink-inverted/85' : 'text-ink-muted')}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {children}

          {cta || secondaryCta ? (
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              {cta ? (
                <ButtonLink
                  href={cta.href}
                  external={cta.external}
                  size="lg"
                  variant={inverted ? 'inverted' : 'primary'}
                >
                  {cta.label}
                </ButtonLink>
              ) : null}
              {secondaryCta ? (
                <ButtonLink
                  href={secondaryCta.href}
                  external={secondaryCta.external}
                  size="lg"
                  variant={inverted ? 'inverted-outline' : 'outline'}
                >
                  {secondaryCta.label}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  )
}
