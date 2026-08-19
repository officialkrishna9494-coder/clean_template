'use client'

import { useEffect, useState } from 'react'

/**
 * Reports whether the page has scrolled past `threshold` pixels.
 * Used by the header to switch to its condensed, elevated state.
 * Reads are batched into `requestAnimationFrame` to avoid layout thrash.
 */
export function useScrolledPast(threshold = 24): boolean {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        setPassed(window.scrollY > threshold)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [threshold])

  return passed
}
