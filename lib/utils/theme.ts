/**
 * Turns `config/theme.config.ts` into CSS custom properties.
 *
 * This is the bridge that makes the TypeScript theme the single source of
 * truth: the same object drives Tailwind utilities (via the `--t-*` variables
 * referenced from `@theme inline` in `app/globals.css`) and any runtime
 * JavaScript that needs a token value.
 *
 * Every emitted variable is namespaced `--t-` so it can never collide with the
 * `--color-*` / `--radius-*` names Tailwind itself generates.
 */
import {
  motion,
  palette,
  radius,
  semanticColors,
  shadows,
  spacing,
  themeOptions,
  typography,
  zIndex,
} from '@/config/theme.config'

/** Prefix for every generated custom property. */
export const TOKEN_PREFIX = '--t'

function colorBlock(scheme: 'light' | 'dark', indent = '  '): string {
  return Object.entries(semanticColors[scheme])
    .map(([name, value]) => `${indent}${TOKEN_PREFIX}-color-${name}: ${value};`)
    .join('\n')
}

function staticBlock(): string {
  const lines: string[] = []
  const push = (name: string, value: string | number) =>
    lines.push(`  ${TOKEN_PREFIX}-${name}: ${value};`)

  // Raw palette steps, for the rare one-off that needs a specific ramp value.
  for (const [scaleName, scale] of Object.entries(palette)) {
    for (const [step, value] of Object.entries(scale)) {
      push(`palette-${scaleName}-${step}`, value)
    }
  }

  for (const [name, value] of Object.entries(typography.fontFamily)) push(`font-${name}`, value)
  for (const [name, value] of Object.entries(typography.fontSize)) push(`text-${name}`, value)
  for (const [name, value] of Object.entries(typography.lineHeight)) push(`leading-${name}`, value)
  for (const [name, value] of Object.entries(typography.letterSpacing)) push(`tracking-${name}`, value)
  for (const [name, value] of Object.entries(typography.fontWeight)) push(`weight-${name}`, value)

  push('spacing-unit', spacing.unit)
  push('gutter', spacing.gutter)
  for (const [name, value] of Object.entries(spacing.section)) push(`section-${name}`, value)
  for (const [name, value] of Object.entries(spacing.container)) push(`container-${name}`, value)

  for (const [name, value] of Object.entries(radius)) push(`radius-${name}`, value)
  for (const [name, value] of Object.entries(shadows)) push(`shadow-${name}`, value)
  for (const [name, value] of Object.entries(motion.duration)) push(`duration-${name}`, value)
  for (const [name, value] of Object.entries(motion.easing)) push(`ease-${name}`, value)
  for (const [name, value] of Object.entries(zIndex)) push(`z-${name}`, value)

  return lines.join('\n')
}

/**
 * Full stylesheet text injected once by `<ThemeStyles />` in the root layout.
 *
 * Honours `themeOptions.colorMode`:
 *   - `'system'` follows `prefers-color-scheme` and still respects an explicit
 *     `data-theme` attribute in both directions.
 *   - `'dark'` pins the dark palette.
 *   - `'light'` pins light, with dark available via `data-theme="dark"`.
 */
export function buildThemeCss(): string {
  const blocks = [`:root {\n${staticBlock()}\n${colorBlock('light')}\n}`]
  const dark = colorBlock('dark')

  if (themeOptions.colorMode === 'dark') {
    blocks.push(`:root:not([data-theme="light"]) {\n${dark}\n}`)
  } else if (themeOptions.colorMode === 'system') {
    blocks.push(
      `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${colorBlock('dark', '    ')}\n  }\n}`,
    )
  }

  // An explicit choice always wins, in every mode.
  blocks.push(`:root[data-theme="dark"] {\n${dark}\n}`)

  if (themeOptions.respectReducedMotion) {
    blocks.push(
      [
        '@media (prefers-reduced-motion: reduce) {',
        '  *, *::before, *::after {',
        '    animation-duration: 0.01ms !important;',
        '    animation-iteration-count: 1 !important;',
        '    transition-duration: 0.01ms !important;',
        '    scroll-behavior: auto !important;',
        '  }',
        '}',
      ].join('\n'),
    )
  }

  return blocks.join('\n\n')
}
