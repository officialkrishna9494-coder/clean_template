import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-page-sm',
  md: 'max-w-page-md',
  lg: 'max-w-page-lg',
  xl: 'max-w-page-xl',
  '2xl': 'max-w-page-2xl',
  full: 'max-w-none',
}

export type ContainerProps = {
  children: ReactNode
  /** Maps to the `spacing.container` scale in `theme.config.ts`. */
  size?: ContainerSize
  as?: ElementType
  className?: string
  /** Removes the horizontal gutter — for full-bleed children. */
  bleed?: boolean
}

/**
 * Centres content and applies the single global horizontal gutter.
 * Nothing else in the codebase should set page-level side padding.
 */
export function Container({
  children,
  size = 'xl',
  as: Component = 'div',
  className,
  bleed = false,
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full', sizeClasses[size], !bleed && 'container-gutter', className)}
    >
      {children}
    </Component>
  )
}
