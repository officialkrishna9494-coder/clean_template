import Link from 'next/link'
import { assets, site } from '@/config'
import { cn } from '@/lib/utils/cn'
import { AppImage } from './app-image'

export type LogoProps = {
  /** `inverted` for dark backgrounds, `mark` for the square icon only. */
  variant?: 'primary' | 'inverted' | 'mark'
  /** Rendered height in pixels; width scales with the artwork's ratio. */
  height?: number
  className?: string
  /** Wraps the logo in a link home. Disable inside the homepage hero. */
  href?: string | false
  priority?: boolean
}

/**
 * Practice logo, sourced from `assets.logo` so replacing the placeholder is a
 * file swap in `public/assets/logo/`.
 */
export function Logo({
  variant = 'primary',
  height = 44,
  className,
  href = '/',
  priority = false,
}: LogoProps) {
  const source = assets.logo[variant]
  const width = Math.round((source.width / source.height) * height)

  const image = (
    <AppImage
      src={source}
      alt={site.name}
      width={width}
      height={height}
      rounded={false}
      blur={false}
      priority={priority}
      className={cn('w-auto', className)}
      style={{ height }}
    />
  )

  if (href === false) return image

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      aria-label={`${site.name} — home`}
    >
      {image}
    </Link>
  )
}
