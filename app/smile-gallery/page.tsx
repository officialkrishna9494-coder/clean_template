import { StructuredData } from '@/components/ui'
import { CtaBand, GalleryGrid, PageHero, Testimonials } from '@/components/sections'
import { galleryItems, testimonials } from '@/content'
import { buildMetadata } from '@/lib/utils/seo'
import { breadcrumbSchema } from '@/lib/utils/structured-data'

const PATH = '/smile-gallery'

export const metadata = buildMetadata({
  title: 'Smile Gallery',
  description:
    'Before-and-after results from Bee Cave Family Dentistry — veneers, same-day crowns, whitening, Invisalign, bonding and dentures in Bee Cave and Austin, TX.',
  path: PATH,
})

export default function SmileGalleryPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Smile Gallery', path: PATH },
        ])}
      />

      <PageHero
        eyebrow="Smile Gallery"
        title="Results from our own treatment rooms"
        description="Every case below was treated here at Bee Cave Family Dentistry. Results vary from person to person — the best way to know what is achievable for you is a consultation."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Smile Gallery' }]}
      />

      <GalleryGrid items={galleryItems} title="" tone="default" />

      <Testimonials
        testimonials={testimonials}
        eyebrow="In Their Words"
        title="What these patients said afterwards"
        tone="surface"
        limit={3}
      />

      <CtaBand
        title="Curious what is possible for your smile?"
        description="Book a consultation and we will photograph your smile, talk through the realistic options and give you a written estimate — no obligation."
      />
    </>
  )
}
