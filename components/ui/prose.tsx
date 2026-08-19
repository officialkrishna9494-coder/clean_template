import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Long-form body copy (policies, articles).
 *
 * Tailwind's typography plugin is not installed, so the element styles live
 * here as a single arbitrary-variant block — one place to change how every
 * long-form page reads, still driven by the design tokens.
 */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'max-w-[68ch] text-base leading-relaxed text-ink-muted',
        '[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink',
        '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-ink',
        '[&_p]:mb-5',
        '[&_ul]:mb-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5',
        '[&_li]:list-disc [&_li]:marker:text-primary',
        '[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4',
        '[&_strong]:font-semibold [&_strong]:text-ink',
        '[&>*:first-child]:mt-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
