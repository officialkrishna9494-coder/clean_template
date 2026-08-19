'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { useDismiss } from '@/lib/hooks/use-click-outside'
import { cn } from '@/lib/utils/cn'
import type { NavItem } from '@/config'

/**
 * Primary navigation for large screens.
 *
 * Dropdowns open on hover *and* on click/Enter, and close on Escape or an
 * outside press, so pointer and keyboard users get the same behaviour.
 */
export function DesktopNav({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = usePathname()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLElement>(null)

  const close = useCallback(() => setOpenIndex(null), [])
  useDismiss(navRef, openIndex !== null, close)

  const isActive = (item: NavItem) =>
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href) ||
    Boolean(item.children?.some((child) => child.href === pathname))

  return (
    <nav ref={navRef} aria-label="Primary" className={cn('items-center gap-1', className)}>
      {items.map((item, index) => {
        const active = isActive(item)
        const open = openIndex === index

        if (!item.children) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-[var(--t-duration-fast)]',
                active ? 'text-primary' : 'text-ink hover:text-primary',
              )}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          )
        }

        return (
          <div
            key={item.href}
            className="relative"
            onMouseEnter={() => setOpenIndex(index)}
            onMouseLeave={close}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="true"
              onClick={() => setOpenIndex(open ? null : index)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-[var(--t-duration-fast)]',
                active || open ? 'text-primary' : 'text-ink hover:text-primary',
              )}
            >
              {item.label}
              <ChevronDown
                aria-hidden="true"
                className={cn('size-4 transition-transform duration-[var(--t-duration-fast)]', open && 'rotate-180')}
              />
            </button>

            {open ? (
              <div
                className={cn(
                  'absolute left-1/2 top-full z-dropdown -translate-x-1/2 pt-3',
                  'animate-slide-down',
                )}
              >
                <div className="w-[min(52rem,calc(100vw-3rem))] rounded-card border border-border bg-elevated p-3 shadow-xl">
                  <ul className="grid grid-cols-2 gap-1 xl:grid-cols-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={close}
                          className={cn(
                            'flex flex-col gap-0.5 rounded-lg px-4 py-3 transition-colors duration-[var(--t-duration-fast)]',
                            pathname === child.href
                              ? 'bg-primary-soft text-primary'
                              : 'hover:bg-surface',
                          )}
                        >
                          <span className="text-sm font-semibold text-ink">{child.label}</span>
                          {child.description ? (
                            <span className="text-xs leading-snug text-ink-subtle">
                              {child.description}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 border-t border-border pt-2">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block rounded-lg px-4 py-3 text-sm font-semibold text-primary hover:bg-primary-soft"
                    >
                      View all services →
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )
      })}
    </nav>
  )
}
