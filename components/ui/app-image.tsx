import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import { aspectRatios, asset, blurDataURL, type AspectRatio, type AssetRef } from '@/config'
import { cn } from '@/lib/utils/cn'

/**
 * The only image component used in the app.
 *
 * Why it exists:
 *  - Resolves paths through `asset()`, so switching to a CDN is one env var.
 *  - Serves SVG placeholders unoptimized (the optimizer refuses SVG by
 *    default), which means the shipped placeholder artwork works today and
 *    real photography works after a drop-in replacement, with no code change.
 *  - Enforces an aspect ratio so nothing shifts while loading.
 *  - Applies a shared blur placeholder without per-image work.
 */
export type AppImageProps = Omit<NextImageProps, 'src' | 'alt' | 'placeholder'> & {
  /** An entry from `config/assets.config.ts`, or a raw path. */
  src: AssetRef | string
  /** Required unless the asset already carries one. Empty string = decorative. */
  alt?: string
  /** Locks the box shape; the image covers it. */
  ratio?: AspectRatio | false
  /** Wrapper class. Use `className` for the `<img>` itself. */
  wrapperClassName?: string
  className?: string
  rounded?: boolean
  /** Adds a subtle blur-up while loading. */
  blur?: boolean
}

export function AppImage({
  src,
  alt,
  ratio = false,
  wrapperClassName,
  className,
  rounded = true,
  blur = true,
  fill,
  width,
  height,
  sizes,
  ...props
}: AppImageProps) {
  const ref: AssetRef | null = typeof src === 'string' ? null : src
  const path = ref ? ref.src : (src as string)
  const resolved = asset(path)
  const isVector = /\.svg($|\?)/i.test(path)
  const resolvedAlt = alt ?? ref?.alt ?? ''

  const image = (
    <NextImage
      src={resolved}
      alt={resolvedAlt}
      // The optimizer rejects SVG unless `dangerouslyAllowSVG` is on; serving
      // vectors as-is is both safer and smaller.
      unoptimized={isVector || undefined}
      {...(ratio || fill
        ? { fill: true, sizes: sizes ?? '100vw' }
        : {
            width: width ?? ref?.width,
            height: height ?? ref?.height,
            sizes,
          })}
      {...(blur && !isVector ? { placeholder: 'blur' as const, blurDataURL } : {})}
      className={cn(
        ratio || fill ? 'object-cover' : 'h-auto w-full',
        rounded && 'rounded-image',
        className,
      )}
      {...props}
    />
  )

  if (!ratio && !fill) return image

  return (
    <div
      className={cn('relative isolate overflow-hidden', rounded && 'rounded-image', wrapperClassName)}
      style={ratio ? { aspectRatio: aspectRatios[ratio] } : undefined}
    >
      {image}
    </div>
  )
}
