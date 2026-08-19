import type { MetadataRoute } from 'next'
import { seo, site } from '@/config'

/** Generated from `config/seo.config.ts` — served at /robots.txt. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [...seo.robots.disallow],
    },
    sitemap: `${site.url.replace(/\/$/, '')}/sitemap.xml`,
    host: site.url,
  }
}
