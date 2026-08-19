/**
 * =============================================================================
 * THEME CONFIGURATION — SINGLE SOURCE OF TRUTH FOR ALL VISUAL DESIGN
 * =============================================================================
 *
 * Every colour, font, radius, shadow and spacing step used anywhere in the app
 * resolves back to this file. Change a value here and the entire site changes.
 *
 * How it flows to the browser:
 *   1. `buildThemeCssVariables()` (lib/utils/theme.ts) turns this object into
 *      CSS custom properties.
 *   2. `<ThemeStyles />` injects them onto `:root` in `app/layout.tsx`.
 *   3. `app/globals.css` maps them into Tailwind's `@theme` layer, so utilities
 *      such as `bg-primary`, `text-ink-muted`, `rounded-card`, `shadow-soft`
 *      and `font-display` are generated from these tokens.
 *
 * To re-skin this template for a different client, you normally only need to
 * edit `palette`, `fonts` and `radius` below.
 * =============================================================================
 */

/** Palette scales are 50 → 950, matching the Tailwind convention. */
export type ColorScale = {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

export const palette = {
  /** Brand primary — used for primary buttons, links and key surfaces. */
  primary: {
    50: '#eefbfa',
    100: '#d3f5f3',
    200: '#abeae8',
    300: '#71d9d7',
    400: '#37bfbf',
    500: '#1ca3a5',
    600: '#148286',
    700: '#14686c',
    800: '#155357',
    900: '#164649',
    950: '#06282c',
  },
  /** Brand accent — "honey" tone for highlights, ratings and secondary CTAs. */
  accent: {
    50: '#fffaeb',
    100: '#fef0c7',
    200: '#fde08a',
    300: '#fccb4d',
    400: '#fbb524',
    500: '#f5930b',
    600: '#d96e06',
    700: '#b44d09',
    800: '#923c0e',
    900: '#78320f',
    950: '#451803',
  },
  /** Neutral ramp — text, borders, muted surfaces. */
  neutral: {
    50: '#f7f8f8',
    100: '#eef0f1',
    200: '#dfe3e5',
    300: '#c7cdd1',
    400: '#a0abb1',
    500: '#7c8992',
    600: '#647079',
    700: '#525c63',
    800: '#464e54',
    900: '#3e4448',
    950: '#25292c',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
} satisfies Record<string, ColorScale>

export type PaletteName = keyof typeof palette

/**
 * Semantic colours. Components must reference these, never raw palette steps,
 * so a re-skin never requires touching component code.
 */
export const semanticColors = {
  light: {
    /** Page background. */
    background: '#ffffff',
    /** Alternating band background. */
    surface: palette.neutral[50],
    /** Raised surfaces: cards, popovers, dropdowns. */
    elevated: '#ffffff',
    /** Inverted / dark band background. */
    inverted: palette.primary[950],

    /** Default body text. */
    ink: palette.neutral[950],
    /** Secondary body text. */
    'ink-muted': palette.neutral[600],
    /** Tertiary text: captions, meta. */
    'ink-subtle': palette.neutral[500],
    /** Text on top of `primary` / `inverted`. */
    'ink-inverted': '#ffffff',

    border: palette.neutral[200],
    'border-strong': palette.neutral[300],

    primary: palette.primary[600],
    'primary-hover': palette.primary[700],
    'primary-soft': palette.primary[50],
    'primary-ink': '#ffffff',

    accent: palette.accent[500],
    'accent-hover': palette.accent[600],
    'accent-soft': palette.accent[50],
    'accent-ink': palette.neutral[950],

    success: palette.success[600],
    'success-soft': palette.success[50],
    warning: palette.warning[600],
    'warning-soft': palette.warning[50],
    danger: palette.danger[600],
    'danger-soft': palette.danger[50],

    /** Focus ring colour used by every interactive primitive. */
    ring: palette.primary[500],
  },
  dark: {
    background: palette.neutral[950],
    surface: '#1c2023',
    elevated: '#22272a',
    inverted: '#000000',

    ink: palette.neutral[50],
    'ink-muted': palette.neutral[300],
    'ink-subtle': palette.neutral[400],
    'ink-inverted': palette.neutral[950],

    border: '#343b40',
    'border-strong': '#454d53',

    primary: palette.primary[400],
    'primary-hover': palette.primary[300],
    'primary-soft': 'rgba(28, 163, 165, 0.14)',
    'primary-ink': palette.primary[950],

    accent: palette.accent[400],
    'accent-hover': palette.accent[300],
    'accent-soft': 'rgba(251, 181, 36, 0.14)',
    'accent-ink': palette.neutral[950],

    success: palette.success[400],
    'success-soft': 'rgba(74, 222, 128, 0.14)',
    warning: palette.warning[400],
    'warning-soft': 'rgba(251, 191, 36, 0.14)',
    danger: palette.danger[400],
    'danger-soft': 'rgba(248, 113, 113, 0.14)',

    ring: palette.primary[400],
  },
} as const

export type SemanticColorName = keyof typeof semanticColors.light

/**
 * Typography. Font families are declared here by CSS-variable name; the actual
 * font files are loaded by `config/fonts.ts` via `next/font`.
 */
export const typography = {
  fontFamily: {
    sans: 'var(--font-sans-src), ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    display: 'var(--font-display-src), Georgia, "Times New Roman", serif',
    mono: 'var(--font-mono-src), ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  /** Fluid type scale — every step clamps between mobile and desktop sizes. */
  fontSize: {
    xs: 'clamp(0.75rem, 0.74rem + 0.05vw, 0.78rem)',
    sm: 'clamp(0.875rem, 0.86rem + 0.07vw, 0.92rem)',
    base: 'clamp(1rem, 0.98rem + 0.1vw, 1.0625rem)',
    lg: 'clamp(1.125rem, 1.09rem + 0.17vw, 1.1875rem)',
    xl: 'clamp(1.25rem, 1.19rem + 0.29vw, 1.375rem)',
    '2xl': 'clamp(1.5rem, 1.4rem + 0.5vw, 1.75rem)',
    '3xl': 'clamp(1.75rem, 1.57rem + 0.9vw, 2.25rem)',
    '4xl': 'clamp(2.125rem, 1.83rem + 1.46vw, 2.875rem)',
    '5xl': 'clamp(2.5rem, 2.02rem + 2.4vw, 3.75rem)',
    '6xl': 'clamp(3rem, 2.3rem + 3.5vw, 4.75rem)',
  },
  lineHeight: {
    tight: '1.12',
    snug: '1.25',
    normal: '1.6',
    relaxed: '1.75',
  },
  letterSpacing: {
    tighter: '-0.03em',
    tight: '-0.015em',
    normal: '0em',
    wide: '0.02em',
    wider: '0.08em',
    widest: '0.16em',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const

/**
 * Spacing. The base unit is 4px; named steps below are the *section rhythm*
 * used by `<Section />` so vertical spacing stays consistent site-wide.
 */
export const spacing = {
  /** Base grid unit. Tailwind's numeric spacing scale derives from this. */
  unit: '0.25rem',
  /** Vertical padding applied by `<Section spacing="..." />`. */
  section: {
    none: '0rem',
    sm: 'clamp(2rem, 1.4rem + 3vw, 3.5rem)',
    md: 'clamp(3rem, 2rem + 5vw, 5.5rem)',
    lg: 'clamp(4rem, 2.6rem + 7vw, 7.5rem)',
    xl: 'clamp(5rem, 3rem + 10vw, 10rem)',
  },
  /** Horizontal gutter applied by `<Container />`. */
  gutter: 'clamp(1.25rem, 0.8rem + 2.2vw, 2.5rem)',
  /** Max content widths available to `<Container size="..." />`. */
  container: {
    sm: '40rem',
    md: '52rem',
    lg: '64rem',
    xl: '75rem',
    '2xl': '85rem',
    full: '100%',
  },
} as const

export const radius = {
  none: '0px',
  xs: '0.25rem',
  sm: '0.375rem',
  md: '0.625rem',
  lg: '0.875rem',
  xl: '1.25rem',
  '2xl': '1.75rem',
  '3xl': '2.5rem',
  full: '9999px',
  /** Component defaults — change these to restyle every instance at once. */
  button: '9999px',
  card: '1.25rem',
  input: '0.75rem',
  image: '1.25rem',
} as const

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(16 24 40 / 0.05)',
  sm: '0 1px 3px 0 rgb(16 24 40 / 0.08), 0 1px 2px -1px rgb(16 24 40 / 0.06)',
  md: '0 4px 12px -2px rgb(16 24 40 / 0.10), 0 2px 6px -2px rgb(16 24 40 / 0.06)',
  lg: '0 12px 28px -6px rgb(16 24 40 / 0.12), 0 6px 12px -6px rgb(16 24 40 / 0.07)',
  xl: '0 24px 48px -12px rgb(16 24 40 / 0.18)',
  soft: '0 2px 4px -1px rgb(16 24 40 / 0.04), 0 12px 32px -8px rgb(16 24 40 / 0.10)',
  ring: '0 0 0 4px rgb(28 163 165 / 0.18)',
} as const

/** Responsive breakpoints. Keep in sync with `@theme` in `app/globals.css`. */
export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const motion = {
  duration: {
    instant: '80ms',
    fast: '160ms',
    normal: '260ms',
    slow: '420ms',
    slower: '700ms',
  },
  easing: {
    standard: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const

export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 30,
  header: 40,
  dropdown: 50,
  overlay: 60,
  modal: 70,
  toast: 80,
} as const

/** Global switches that change site-wide behaviour without touching code. */
export const themeOptions = {
  /**
   * 'light'  — always light
   * 'dark'   — always dark
   * 'system' — follow `prefers-color-scheme`
   */
  colorMode: 'light' as 'light' | 'dark' | 'system',
  /** Header behaviour on scroll. */
  stickyHeader: true,
  /** Respect `prefers-reduced-motion` (recommended: true). */
  respectReducedMotion: true,
} as const

export const theme = {
  palette,
  semanticColors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
  motion,
  zIndex,
  options: themeOptions,
} as const

export type Theme = typeof theme
