/**
 * Metadata builders. Pages call `buildMetadata()` instead of hand-writing
 * OpenGraph/Twitter/canonical blocks, so every route stays consistent.
 */
import type { Metadata } from 'next'
import { asset, assets, seo, site } from '@/config'

export type BuildMetadataOptions = {
  title?: string
  description?: string
  /** Route path, e.g. `/about-us`. Used for the canonical URL. */
  path?: string
  /** Overrides the default OG image. */
  image?: { url: string; width: number; height: number; alt: string }
  keywords?: string[]
  /** Set false for thin or duplicate pages. */
  index?: boolean
  type?: 'website' | 'article'
}

function absoluteUrl(path = '/'): string {
  const base = site.url.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildMetadata(options: BuildMetadataOptions = {}): Metadata {
  const {
    title,
    description = seo.defaultDescription,
    path = '/',
    image,
    keywords,
    index = seo.robots.index,
    type = 'website',
  } = options

  const resolvedTitle = title ? seo.titleTemplate.replace('%s', title) : seo.defaultTitle
  const url = absoluteUrl(path)
  const ogImage = image ?? {
    url: asset(assets.og.default.src),
    width: assets.og.default.width,
    height: assets.og.default.height,
    alt: assets.og.default.alt,
  }
  const ogImageUrl = ogImage.url.startsWith('http') ? ogImage.url : absoluteUrl(ogImage.url)

  return {
    title: resolvedTitle,
    description,
    keywords: keywords ?? [...seo.keywords],
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    robots: {
      index,
      follow: index && seo.robots.follow,
      googleBot: { index, follow: index && seo.robots.follow },
    },
    openGraph: {
      type,
      title: resolvedTitle,
      description,
      url,
      siteName: seo.openGraph.siteName,
      locale: seo.openGraph.locale,
      images: [{ ...ogImage, url: ogImageUrl }],
    },
    twitter: {
      card: seo.twitter.card,
      title: resolvedTitle,
      description,
      images: [ogImageUrl],
    },
    ...(seo.verification.google || seo.verification.bing
      ? {
          verification: {
            ...(seo.verification.google ? { google: seo.verification.google } : {}),
            ...(seo.verification.bing ? { other: { 'msvalidate.01': seo.verification.bing } } : {}),
          },
        }
      : {}),
  }
}
