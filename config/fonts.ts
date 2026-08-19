/**
 * =============================================================================
 * FONT LOADING — CENTRAL CONTROL OVER TYPEFACES
 * =============================================================================
 * `next/font` self-hosts these files, so no request ever leaves for a font CDN
 * and there is no layout shift. Each font exposes a CSS variable that
 * `theme.config.ts` references in `typography.fontFamily`.
 *
 * To swap a typeface, change the import and the loader call here — nothing
 * else in the codebase names a font.
 * =============================================================================
 */
import { Plus_Jakarta_Sans, Fraunces, JetBrains_Mono } from 'next/font/google'

/** Body / UI typeface. */
export const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-src',
  weight: ['400', '500', '600', '700'],
})

/** Display typeface used for headings and pull quotes. */
export const fontDisplay = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display-src',
  // Variable font: omitting `weight` loads the full axis range, so every
  // weight token in `theme.config.ts` is available with no extra requests.
  weight: 'variable',
})

/** Monospace, used for code samples and tabular data. */
export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-src',
  weight: ['400', '500'],
})

/** Convenience string for `<html className={fontVariables}>`. */
export const fontVariables = [fontSans.variable, fontDisplay.variable, fontMono.variable].join(' ')
