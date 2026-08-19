import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

/* ==========================================================================
   Typography primitives.
   Size and element are decoupled on purpose: a page can have exactly one
   <h1> for accessibility while still rendering it at any visual size.
   ========================================================================== */

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

const headingSizes: Record<HeadingSize, string> = {
  xs: 'text-lg',
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
  '2xl': 'text-5xl',
  '3xl': 'text-6xl',
}

export type HeadingProps = {
  children: ReactNode
  /** Semantic level — drives the rendered tag, not the visual size. */
  level?: HeadingLevel
  /** Visual size. Defaults to a sensible size for the level. */
  size?: HeadingSize
  as?: ElementType
  className?: string
  id?: string
  /** Uses the sans stack instead of the display face. */
  sans?: boolean
  balance?: boolean
}

const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: '2xl',
  2: 'xl',
  3: 'lg',
  4: 'md',
  5: 'sm',
  6: 'xs',
}

export function Heading({
  children,
  level = 2,
  size,
  as,
  className,
  id,
  sans = false,
  balance = true,
}: HeadingProps) {
  const Component = (as ?? `h${level}`) as ElementType
  return (
    <Component
      id={id}
      className={cn(
        headingSizes[size ?? defaultSizeForLevel[level]],
        sans ? 'font-sans font-semibold' : 'font-display',
        'text-ink',
        balance && 'text-balance',
        className,
      )}
    >
      {children}
    </Component>
  )
}

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
export type TextTone = 'default' | 'muted' | 'subtle' | 'inverted' | 'primary' | 'accent'

const textSizes: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

const textTones: Record<TextTone, string> = {
  default: 'text-ink',
  muted: 'text-ink-muted',
  subtle: 'text-ink-subtle',
  inverted: 'text-ink-inverted',
  primary: 'text-primary',
  accent: 'text-accent',
}

export type TextProps = {
  children: ReactNode
  size?: TextSize
  tone?: TextTone
  as?: ElementType
  className?: string
  /** Constrains the measure to a comfortable reading width (~65ch). */
  prose?: boolean
}

export function Text({
  children,
  size = 'base',
  tone = 'muted',
  as: Component = 'p',
  className,
  prose = false,
}: TextProps) {
  return (
    <Component
      className={cn(
        textSizes[size],
        textTones[tone],
        'leading-relaxed',
        prose && 'max-w-[65ch]',
        className,
      )}
    >
      {children}
    </Component>
  )
}

export type EyebrowProps = {
  children: ReactNode
  className?: string
  tone?: 'primary' | 'accent' | 'inverted' | 'muted'
}

const eyebrowTones = {
  primary: 'text-primary',
  accent: 'text-accent',
  inverted: 'text-ink-inverted/80',
  muted: 'text-ink-subtle',
}

/** Small uppercase kicker that sits above a section heading. */
export function Eyebrow({ children, className, tone = 'primary' }: EyebrowProps) {
  return (
    <p
      className={cn(
        'font-sans text-xs font-semibold tracking-widest uppercase',
        eyebrowTones[tone],
        className,
      )}
    >
      {children}
    </p>
  )
}

export type SectionHeaderProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  /** Text alignment. `center` also centres the block itself. */
  align?: 'left' | 'center'
  level?: HeadingLevel
  size?: HeadingSize
  tone?: 'default' | 'inverted'
  className?: string
  children?: ReactNode
}

/**
 * The eyebrow + heading + description trio that opens nearly every section.
 * Using it everywhere is what keeps section intros visually identical.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  level = 2,
  size,
  tone = 'default',
  className,
  children,
}: SectionHeaderProps) {
  const inverted = tone === 'inverted'
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={inverted ? 'inverted' : 'primary'}>{eyebrow}</Eyebrow> : null}
      <Heading level={level} size={size} className={inverted ? 'text-ink-inverted' : undefined}>
        {title}
      </Heading>
      {description ? (
        <Text size="lg" tone={inverted ? 'inverted' : 'muted'} className={inverted ? 'opacity-80' : undefined}>
          {description}
        </Text>
      ) : null}
      {children}
    </div>
  )
}
