'use client'

import { ChevronDown } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export type AccordionItem = {
  id?: string
  title: string
  content: ReactNode
}

export type AccordionProps = {
  items: AccordionItem[]
  /** Index open on first render. `null` opens nothing. */
  defaultOpen?: number | null
  /** When false, several panels can be open at once. */
  single?: boolean
  className?: string
  tone?: 'default' | 'inverted'
}

/**
 * Keyboard-accessible disclosure list used for FAQs.
 * Implemented with buttons + `aria-expanded` rather than `<details>` so the
 * open/close transition can be animated consistently.
 */
export function Accordion({
  items,
  defaultOpen = 0,
  single = true,
  className,
  tone = 'default',
}: AccordionProps) {
  const baseId = useId()
  const [open, setOpen] = useState<number[]>(defaultOpen === null ? [] : [defaultOpen])

  const toggle = (index: number) => {
    setOpen((current) => {
      const isOpen = current.includes(index)
      if (single) return isOpen ? [] : [index]
      return isOpen ? current.filter((i) => i !== index) : [...current, index]
    })
  }

  const inverted = tone === 'inverted'

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(index)
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <div
            key={item.id ?? item.title}
            className={cn(
              'overflow-hidden rounded-card border transition-colors duration-[var(--t-duration-normal)]',
              inverted
                ? 'border-white/12 bg-white/5'
                : isOpen
                  ? 'border-primary/30 bg-elevated shadow-soft'
                  : 'border-border bg-elevated',
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={cn(
                  'flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6',
                  'font-sans text-base font-semibold transition-colors',
                  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
                  inverted ? 'text-ink-inverted' : isOpen ? 'text-primary' : 'text-ink hover:text-primary',
                )}
              >
                <span>{item.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-5 shrink-0 transition-transform duration-[var(--t-duration-normal)] ease-[var(--t-ease-standard)]',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                'px-5 pb-5 text-base leading-relaxed sm:px-6 sm:pb-6',
                inverted ? 'text-ink-inverted/75' : 'text-ink-muted',
              )}
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
