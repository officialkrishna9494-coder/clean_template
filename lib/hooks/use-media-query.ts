'use client'

import { useEffect, useState } from 'react'
import { breakpoints } from '@/config'

/**
 * Subscribes to a CSS media query.
 * Returns `false` during SSR and the first client render, so markup matches
 * on hydration; the real value lands in the first effect.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const list = window.matchMedia(query)
    const update = () => setMatches(list.matches)
    update()
    list.addEventListener('change', update)
    return () => list.removeEventListener('change', update)
  }, [query])

  return matches
}

/** `useBreakpoint('lg')` → true at ≥1024px, using the tokens from the theme. */
export function useBreakpoint(name: keyof typeof breakpoints): boolean {
  return useMediaQuery(`(min-width: ${breakpoints[name]})`)
}
