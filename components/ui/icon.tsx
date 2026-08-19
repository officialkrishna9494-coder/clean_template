import type { LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

export const iconBoxVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-lg transition-colors duration-[var(--t-duration-normal)]',
  {
    variants: {
      variant: {
        primary: 'bg-primary-soft text-primary',
        accent: 'bg-accent-soft text-accent',
        neutral: 'bg-surface text-ink-muted',
        solid: 'bg-primary text-primary-ink',
        inverted: 'bg-white/12 text-ink-inverted',
        outline: 'border border-border text-primary',
      },
      size: {
        sm: 'size-9 [&>svg]:size-4',
        md: 'size-12 [&>svg]:size-5',
        lg: 'size-14 [&>svg]:size-6',
        xl: 'size-16 [&>svg]:size-7',
      },
      shape: {
        rounded: 'rounded-lg',
        squircle: 'rounded-2xl',
        circle: 'rounded-full',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md', shape: 'squircle' },
  },
)

export type IconBoxProps = VariantProps<typeof iconBoxVariants> & {
  icon: LucideIcon
  className?: string
  /** Decorative by default; pass a label when the icon carries meaning. */
  label?: string
}

/**
 * A Lucide icon inside a tinted tile — the visual unit used by feature grids,
 * service cards and contact rows.
 */
export function IconBox({ icon: Icon, className, variant, size, shape, label }: IconBoxProps) {
  return (
    <span
      className={cn(iconBoxVariants({ variant, size, shape }), className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon strokeWidth={1.75} />
    </span>
  )
}
