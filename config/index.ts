/**
 * Barrel export for the configuration layer.
 * Import from `@/config` everywhere: `import { site, theme, env } from '@/config'`
 */
export { env } from './env'
export type { Env } from './env'

export { theme, palette, semanticColors, typography, spacing, radius, shadows, breakpoints, motion, zIndex, themeOptions } from './theme.config'
export type { Theme, ColorScale, PaletteName, SemanticColorName } from './theme.config'

export { site } from './site.config'
export type { Site, BusinessHours } from './site.config'

export { mainNav, footerNav, legalNav } from './navigation.config'
export type { NavItem } from './navigation.config'

export { assets, asset, aspectRatios, blurDataURL } from './assets.config'
export type { Assets, AssetRef, AspectRatio } from './assets.config'

export { apiConfig, endpoints } from './api.config'
export type { ApiConfig, Endpoints } from './api.config'

export { seo } from './seo.config'
export type { Seo } from './seo.config'

/**
 * NOTE: `./fonts` is deliberately NOT re-exported here. It calls `next/font`,
 * which must only be imported from the root layout — re-exporting it would
 * pull the font loader into every client component that imports `@/config`.
 * Import it directly: `import { fontVariables } from '@/config/fonts'`.
 */
