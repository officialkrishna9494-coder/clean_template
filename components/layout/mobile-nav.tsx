'use client'

import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ButtonLink, Logo } from '@/components/ui'
import { site, type NavItem } from '@/config'
import { useBodyScrollLock } from '@/lib/hooks/use-body-scroll-lock'
import { cn } from '@/lib/utils/cn'

/**
 * Slide-in navigation drawer for small screens.
 *
 * Closes automatically on route change, locks background scroll while open,
 * and dismisses on Escape.
 */
export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const pathname = usePathname()

  useBodyScrollLock(open)

  // Any navigation dismisses the drawer. Adjusting state during render (rather
  // than in an effect) avoids a cascading second render on every route change.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
    setExpanded(null)
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex size-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-primary hover:text-primary lg:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-0 z-overlay bg-neutral-950/45 backdrop-blur-[2px] transition-opacity duration-[var(--t-duration-normal)] lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          'fixed inset-y-0 right-0 z-modal flex w-[min(22rem,88vw)] flex-col bg-background shadow-xl lg:hidden',
          'transition-transform duration-[var(--t-duration-normal)] ease-[var(--t-ease-entrance)]',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        // Keeps the closed panel out of the tab order and the a11y tree.
        inert={!open}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Logo height={36} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-ink hover:border-primary hover:text-primary"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block rounded-lg px-4 py-3 text-base font-semibold transition-colors',
                        active ? 'bg-primary-soft text-primary' : 'text-ink hover:bg-surface',
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              }

              const isExpanded = expanded === item.href

              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? null : item.href)}
                    aria-expanded={isExpanded}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-semibold transition-colors',
                      active ? 'text-primary' : 'text-ink hover:bg-surface',
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn('size-4 transition-transform', isExpanded && 'rotate-180')}
                    />
                  </button>
                  {isExpanded ? (
                    <ul className="mt-1 mb-2 ml-4 flex flex-col gap-0.5 border-l border-border pl-3">
                      <li>
                        <Link
                          href={item.href}
                          className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-primary hover:bg-surface"
                        >
                          All {item.label}
                        </Link>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              'block rounded-lg px-3 py-2.5 text-sm transition-colors',
                              pathname === child.href
                                ? 'bg-primary-soft font-semibold text-primary'
                                : 'text-ink-muted hover:bg-surface hover:text-ink',
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-2 border-t border-border px-5 py-4">
          <ButtonLink href={site.cta.primary.href} external={site.cta.primary.external} size="lg" block>
            {site.cta.primary.label}
          </ButtonLink>
          <ButtonLink
            href={`tel:${site.contact.phone.href}`}
            variant="outline"
            size="lg"
            block
            leadingIcon={<Phone className="size-4" aria-hidden="true" />}
          >
            {site.contact.phone.display}
          </ButtonLink>
        </div>
      </div>
    </>
  )
}
