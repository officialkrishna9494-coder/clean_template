import type { NextConfig } from 'next'

/**
 * Next.js configuration.
 *
 * Behaviour that varies per deployment lives in `config/env.ts` and the `.env`
 * files — this file holds only build/runtime settings the framework needs.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    /**
     * Remote image hosts. Add an entry before pointing an asset in
     * `config/assets.config.ts` at an external URL.
     *
     * Example:
     *   { protocol: 'https', hostname: 'cdn.example.com', pathname: '/**' }
     */
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    // Matches the container widths and grid columns the design actually uses.
    deviceSizes: [480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 64, 96, 128, 200, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Blocks the site being framed for clickjacking.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        // Placeholder and replacement artwork is immutable per deploy.
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' }],
      },
    ]
  },
}

export default nextConfig
