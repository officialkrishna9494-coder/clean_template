# Assets

Everything in here is a **placeholder** and is meant to be replaced.

## How to replace an asset

Two options, both without touching component code:

1. **Drop-in replacement (recommended)** — overwrite the file with your real
   artwork, keeping the same filename. Keep the aspect ratio to avoid layout
   changes; the exact pixel dimensions may differ.
2. **Repoint the entry** — edit `config/assets.config.ts` and change the `src`,
   `width` and `height` for that asset. `src` may be a local path or a full URL
   on a remote host (add the host to `images.remotePatterns` in
   `next.config.ts` first).

No component hard-codes a path — every image resolves through
`config/assets.config.ts`, so replacing artwork is always a config edit.

## Files

| Path | Used by | Intrinsic size |
| --- | --- | --- |
| `logo/logo.svg` | Header, light backgrounds | 320 × 72 |
| `logo/logo-inverted.svg` | Footer, dark backgrounds | 320 × 72 |
| `logo/logo-mark.svg` | Square icon, favicons, avatars | 96 × 96 |
| `images/hero.svg` | Homepage hero | 1200 × 960 |
| `images/hero-secondary.svg` | Secondary hero art | 800 × 800 |
| `images/doctor.svg` | About page portrait | 800 × 1000 |
| `images/office.svg` | About page office shot | 1200 × 800 |
| `images/team.svg` | Team band | 1200 × 800 |
| `images/service.svg` | Service page fallback | 800 × 600 |
| `images/gallery.svg` | Smile gallery before/after | 800 × 800 |
| `images/avatar.svg` | Portrait fallback | 200 × 200 |
| `images/placeholder.svg` | Generic fallback | 1200 × 800 |
| `images/pattern.svg` | Decorative texture | 600 × 600 |
| `images/badge.svg` | Trust badges | 200 × 120 |
| `images/og-default.svg` | Open Graph share card | 1200 × 630 |

## A note on formats

The placeholders are SVG, which `<AppImage>` serves unoptimized (the Next.js
image optimizer rejects SVG by default). Real photography should be JPEG, PNG
or WebP — `<AppImage>` will then run it through the optimizer automatically,
with no code change needed.

The Open Graph card is the one exception: **replace `og-default.svg` with a
raster `og-default.png` or `.jpg`** before launch and update the entry in
`config/assets.config.ts`. Most social platforms do not render SVG previews.
