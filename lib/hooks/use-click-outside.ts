'use client'

import { useEffect, type RefObject } from 'react'

/**
 * Calls `handler` on a pointer press outside `ref`, or on Escape.
 * Used to dismiss nav dropdowns and the mobile drawer.
 */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  handler: () => void,
): void {
  useEffect(() => {
    if (!active) return

    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) handler()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [ref, active, handler])
}
