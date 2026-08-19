import type { SVGProps } from 'react'

/**
 * Social glyphs.
 *
 * Lucide dropped brand marks, so these are inline paths kept deliberately
 * simple. Swap in a client's official brand assets by replacing the paths —
 * the `SocialIcon` lookup and every call site stay unchanged.
 */
export type SocialIconName = 'facebook' | 'instagram' | 'google' | 'yelp' | 'x' | 'youtube' | 'linkedin'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
} as const

const glyphs: Record<SocialIconName, (props: IconProps) => React.ReactElement> = {
  facebook: (props) => (
    <svg {...base} {...props}>
      <path d="M14 8.5V6.9c0-.7.2-1.1 1.2-1.1H17V3h-2.6C11.6 3 11 4.5 11 6.6v1.9H9V11h2v10h3V11h2.2l.3-2.5H14Z" />
    </svg>
  ),
  instagram: (props) => (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.9" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  google: (props) => (
    <svg {...base} {...props}>
      <path d="M21.6 12.2c0-.7-.06-1.3-.18-1.9H12v3.6h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.2Z" />
      <path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
      <path d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14Z" />
      <path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1Z" />
    </svg>
  ),
  yelp: (props) => (
    <svg {...base} {...props}>
      <path d="M10.6 11.3 4.8 9.4a1.1 1.1 0 0 1-.7-1.3c.3-1.2 1-2.3 1.9-3.2a1.1 1.1 0 0 1 1.5 0l4.2 4.5c.6.6.1 1.7-.7 1.9Zm.5 2.9-3.6 4.5a1.1 1.1 0 0 1-1.6.1 6.9 6.9 0 0 1-1.6-2.8 1.1 1.1 0 0 1 .8-1.4l5.1-1.4c.9-.2 1.5.7.9 1Zm2.4-3.1V3.6c0-.7-.6-1.2-1.3-1.1-1.3.2-2.5.6-3.6 1.2a1.1 1.1 0 0 0-.4 1.5l3.6 6c.5.8 1.7.5 1.7-.4Zm.9 2.2 5.4 1.1c.7.2 1.1.9.8 1.5a7.9 7.9 0 0 1-2 2.9 1.1 1.1 0 0 1-1.6-.2l-3.3-4.2c-.5-.7.1-1.4.7-1.1Zm.4-2.4 4.6-3.3c.6-.4.7-1.2.2-1.7a8 8 0 0 0-2.5-1.7 1.1 1.1 0 0 0-1.5.7l-1.7 5c-.3.9.6 1.6 1 1Z" />
    </svg>
  ),
  x: (props) => (
    <svg {...base} {...props}>
      <path d="M17.5 3h3l-6.6 7.5L21.8 21h-6l-4.7-6.1L5.7 21h-3l7-8L2.5 3h6.2l4.2 5.6L17.5 3Zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5Z" />
    </svg>
  ),
  youtube: (props) => (
    <svg {...base} {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  ),
  linkedin: (props) => (
    <svg {...base} {...props}>
      <path d="M6.9 8.5v11.6H3.3V8.5h3.6ZM7.1 5.1a2.1 2.1 0 1 1-4.2 0 2.1 2.1 0 0 1 4.2 0ZM21 13.7v6.4h-3.6v-6c0-1.5-.5-2.5-1.9-2.5-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9v6.2H9.9s.05-10.1 0-11.6h3.6v1.7a3.6 3.6 0 0 1 3.2-1.8c2.4 0 4.2 1.5 4.2 4.9Z" />
    </svg>
  ),
}

export function SocialIcon({ name, ...props }: IconProps & { name: SocialIconName }) {
  const Glyph = glyphs[name] ?? glyphs.google
  return Glyph(props)
}
