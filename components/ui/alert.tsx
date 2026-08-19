import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const alertVariants = cva('flex items-start gap-3 rounded-lg border p-4 text-sm', {
  variants: {
    variant: {
      info: 'border-primary/25 bg-primary-soft text-ink',
      success: 'border-success/25 bg-success-soft text-ink',
      warning: 'border-warning/30 bg-warning-soft text-ink',
      danger: 'border-danger/25 bg-danger-soft text-ink',
    },
  },
  defaultVariants: { variant: 'info' },
})

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
} as const

const iconTones = {
  info: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
} as const

export type AlertProps = VariantProps<typeof alertVariants> & {
  title?: string
  children: ReactNode
  className?: string
}

export function Alert({ variant = 'info', title, children, className }: AlertProps) {
  const Icon = icons[variant ?? 'info']
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      role={variant === 'danger' ? 'alert' : 'status'}
    >
      <Icon className={cn('mt-0.5 size-5 shrink-0', iconTones[variant ?? 'info'])} aria-hidden="true" />
      <div className="flex flex-col gap-1">
        {title ? <p className="font-semibold text-ink">{title}</p> : null}
        <div className="text-ink-muted">{children}</div>
      </div>
    </div>
  )
}
