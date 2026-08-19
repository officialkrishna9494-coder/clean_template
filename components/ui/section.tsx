import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { Container, type ContainerSize } from './container'

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type SectionTone = 'default' | 'surface' | 'primary' | 'inverted' | 'accent' | 'transparent'

const spacingClasses: Record<SectionSpacing, string> = {
  none: 'py-0',
  sm: 'py-[var(--t-section-sm)]',
  md: 'py-[var(--t-section-md)]',
  lg: 'py-[var(--t-section-lg)]',
  xl: 'py-[var(--t-section-xl)]',
}

const toneClasses: Record<SectionTone, string> = {
  default: 'bg-background text-ink',
  surface: 'bg-surface text-ink',
  primary: 'bg-primary text-primary-ink',
  inverted: 'bg-inverted text-ink-inverted',
  accent: 'bg-accent-soft text-ink',
  transparent: '',
}

export type SectionProps = {
  children: ReactNode
  /** Vertical rhythm, from `spacing.section` in `theme.config.ts`. */
  spacing?: SectionSpacing
  /** Background treatment. Alternate `default` / `surface` down a page. */
  tone?: SectionTone
  /** Width of the inner container. Pass `false` to skip the container. */
  container?: ContainerSize | false
  as?: ElementType
  id?: string
  className?: string
  /** Applied to the inner container rather than the outer band. */
  innerClassName?: string
}

/**
 * The page-level building block. Every band on every page is a `<Section>`,
 * which is what keeps vertical rhythm and background alternation consistent
 * across the whole site.
 */
export function Section({
  children,
  spacing = 'lg',
  tone = 'default',
  container = 'xl',
  as: Component = 'section',
  id,
  className,
  innerClassName,
}: SectionProps) {
  const content =
    container === false ? (
      children
    ) : (
      <Container size={container} className={innerClassName}>
        {children}
      </Container>
    )

  return (
    <Component
      id={id}
      className={cn('relative w-full', spacingClasses[spacing], toneClasses[tone], className)}
    >
      {content}
    </Component>
  )
}
