import { MapPin } from 'lucide-react'
import { Badge, Section, SectionHeader } from '@/components/ui'
import type { SectionTone } from '@/components/ui'

export type ServiceAreasProps = {
  areas: string[]
  title?: string
  description?: string
  tone?: SectionTone
}

/** Local-SEO band listing the neighbourhoods the practice serves. */
export function ServiceAreas({
  areas,
  title = 'Serving Bee Cave and the surrounding Austin area',
  description = 'Patients travel to us from across the Hill Country. If you are nearby, we would be glad to see you.',
  tone = 'surface',
}: ServiceAreasProps) {
  return (
    <Section tone={tone} spacing="md" container="lg">
      <SectionHeader eyebrow="Service Area" title={title} description={description} className="mb-10" />
      <ul className="flex flex-wrap justify-center gap-3">
        {areas.map((area) => (
          <li key={area}>
            <Badge
              variant="outline"
              size="md"
              icon={<MapPin className="size-3.5 text-primary" aria-hidden="true" />}
            >
              {area}
            </Badge>
          </li>
        ))}
      </ul>
    </Section>
  )
}
