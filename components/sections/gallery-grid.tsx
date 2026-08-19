import { AppImage, Badge, Card, Section, SectionHeader, Text } from '@/components/ui'
import type { SectionTone } from '@/components/ui'
import type { GalleryItem } from '@/types/content'

export type GalleryGridProps = {
  items: GalleryItem[]
  eyebrow?: string
  title?: string
  description?: string
  tone?: SectionTone
  id?: string
}

/** Before/after smile gallery. Each pair is a single card with two images. */
export function GalleryGrid({
  items,
  eyebrow = 'Smile Gallery',
  title = 'Real results from our practice',
  description,
  tone = 'default',
  id,
}: GalleryGridProps) {
  return (
    <Section id={id} tone={tone} spacing="lg">
      {title ? (
        <SectionHeader eyebrow={eyebrow} title={title} description={description} className="mb-14" />
      ) : null}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.title}>
            <Card variant="elevated" padding="none" className="overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-border">
                <figure className="relative bg-elevated">
                  <AppImage
                    src={item.before}
                    alt={`${item.title} — before treatment`}
                    ratio="square"
                    rounded={false}
                    sizes="(min-width: 1024px) 18vw, 45vw"
                  />
                  <figcaption className="absolute top-3 left-3">
                    <Badge variant="neutral">Before</Badge>
                  </figcaption>
                </figure>
                <figure className="relative bg-elevated">
                  <AppImage
                    src={item.after}
                    alt={`${item.title} — after treatment`}
                    ratio="square"
                    rounded={false}
                    sizes="(min-width: 1024px) 18vw, 45vw"
                  />
                  <figcaption className="absolute top-3 left-3">
                    <Badge variant="primary">After</Badge>
                  </figcaption>
                </figure>
              </div>
              <div className="flex flex-col gap-2 p-6">
                <h3 className="font-display text-lg text-ink">{item.title}</h3>
                {item.description ? <Text size="sm">{item.description}</Text> : null}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
