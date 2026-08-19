/**
 * Smile gallery entries. Replace the placeholder artwork in
 * `public/assets/images/` with real before/after photography — the layout and
 * captions need no changes.
 */
import { assets } from '@/config'
import type { GalleryItem } from '@/types/content'

export const galleryItems: GalleryItem[] = [
  {
    title: 'Porcelain veneers',
    description: 'Six upper veneers correcting worn edges, shade and a small midline gap.',
    before: assets.fallback.gallery,
    after: assets.fallback.gallery,
  },
  {
    title: 'Same-day CEREC® crown',
    description: 'A fractured molar restored with a milled ceramic crown in a single visit.',
    before: assets.fallback.gallery,
    after: assets.fallback.gallery,
  },
  {
    title: 'Professional whitening',
    description: 'In-office whitening followed by custom take-home trays.',
    before: assets.fallback.gallery,
    after: assets.fallback.gallery,
  },
  {
    title: 'Invisalign alignment',
    description: 'Fourteen months of clear aligner treatment closing anterior crowding.',
    before: assets.fallback.gallery,
    after: assets.fallback.gallery,
  },
  {
    title: 'Composite bonding',
    description: 'A chipped central incisor rebuilt with shade-matched composite.',
    before: assets.fallback.gallery,
    after: assets.fallback.gallery,
  },
  {
    title: 'Full upper denture',
    description: 'A staged fitting restoring chewing function and facial support.',
    before: assets.fallback.gallery,
    after: assets.fallback.gallery,
  },
]
