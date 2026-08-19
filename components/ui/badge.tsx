import { cva, type VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-sans font-semibold whitespace-nowrap',
  {
    variants: {
      variant: {
        primary: 'bg-primary-soft text-primary',
        accent: 'bg-accent-soft text-accent',
        neutral: 'bg-surface text-ink-muted',
        outline: 'border border-border-strong text-ink-muted',
        success: 'bg-success-soft text-success',
        warning: 'bg-warning-soft text-warning',
        danger: 'bg-danger-soft text-danger',
        inverted: 'bg-white/12 text-ink-inverted backdrop-blur-sm',
      },
      size: {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3.5 py-1.5 text-sm',
      },
    },
    defaultVariants: { variant: 'primary', size: 'sm' },
  },
)

export type BadgeProps = VariantProps<typeof badgeVariants> & {
  children: ReactNode
  className?: string
  icon?: ReactNode
}

export function Badge({ children, className, variant, size, icon }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {icon}
      {children}
    </span>
  )
}
