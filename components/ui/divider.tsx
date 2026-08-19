import { cn } from '@/lib/utils/cn'

export type DividerProps = {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  tone?: 'default' | 'inverted'
  /** Optional centred label, e.g. "or". */
  label?: string
}

export function Divider({ className, orientation = 'horizontal', tone = 'default', label }: DividerProps) {
  const line = tone === 'inverted' ? 'bg-white/15' : 'bg-border'

  if (label) {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <span className={cn('h-px flex-1', line)} />
        <span className="text-xs font-semibold tracking-wider text-ink-subtle uppercase">{label}</span>
        <span className={cn('h-px flex-1', line)} />
      </div>
    )
  }

  return (
    <span
      role="separator"
      aria-orientation={orientation}
      className={cn(orientation === 'horizontal' ? 'block h-px w-full' : 'block h-full w-px', line, className)}
    />
  )
}
