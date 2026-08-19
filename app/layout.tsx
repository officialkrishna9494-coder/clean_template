import type { Metadata, Viewport } from 'next'
import { Footer, Header, MobileCallBar, SkipLink } from '@/components/layout'
import { StructuredData, ThemeStyles } from '@/components/ui'
import { palette, site, themeOptions } from '@/config'
import { fontVariables } from '@/config/fonts'
import { buildMetadata } from '@/lib/utils/seo'
import { dentistSchema, websiteSchema } from '@/lib/utils/structured-data'
import './globals.css'

export const metadata: Metadata = buildMetadata()

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: palette.primary[600],
  colorScheme: themeOptions.colorMode === 'system' ? 'light dark' : themeOptions.colorMode,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang={site.locale} className={`${fontVariables} h-full`} suppressHydrationWarning>
      <head>
        {/* Design tokens are injected before any content paints. */}
        <ThemeStyles />
        <StructuredData data={[dentistSchema(), websiteSchema()]} />
      </head>
      {/* `pb-16 sm:pb-0` reserves room for the fixed mobile call bar. */}
      <body className="flex min-h-full flex-col pb-16 antialiased sm:pb-0">
        <SkipLink />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  )
}
