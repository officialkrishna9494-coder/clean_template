import { buildThemeCss } from '@/lib/utils/theme'

/**
 * Writes the design tokens from `config/theme.config.ts` onto `:root`.
 *
 * Rendered once, inside `<head>` of the root layout, before any content — so
 * there is no flash of unstyled or wrongly-themed content. It is a Server
 * Component: the CSS string is generated at build time and shipped as static
 * markup with zero client JavaScript.
 */
export function ThemeStyles() {
  return <style id="theme-tokens" dangerouslySetInnerHTML={{ __html: buildThemeCss() }} />
}
