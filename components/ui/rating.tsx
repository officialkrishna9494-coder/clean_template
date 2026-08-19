import { Star } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export type RatingProps = {
  /** 0–5, halves allowed. */
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** Screen-reader label; defaults to "4.9 out of 5 stars". */
  label?: string
  showValue?: boolean
}

const sizes = { sm: 'size-3.5', md: 'size-4.5', lg: 'size-6' }

export function Rating({ value, max = 5, size = 'md', className, label, showValue = false }: RatingProps) {
  const rounded = Math.round(value * 2) / 2
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <span className="flex items-center gap-0.5" role="img" aria-label={label ?? `${value} out of ${max} stars`}>
        {Array.from({ length: max }, (_, i) => {
          const filled = rounded >= i + 1
          const half = !filled && rounded >= i + 0.5
          return (
            <span key={i} className="relative inline-block">
              <Star className={cn(sizes[size], 'text-border-strong')} fill="currentColor" strokeWidth={0} />
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? '50%' : '100%' }}
                >
                  <Star className={cn(sizes[size], 'text-accent')} fill="currentColor" strokeWidth={0} />
                </span>
              )}
            </span>
          )
        })}
      </span>
      {showValue ? <span className="text-sm font-semibold text-ink">{value.toFixed(1)}</span> : null}
    </span>
  )
}
