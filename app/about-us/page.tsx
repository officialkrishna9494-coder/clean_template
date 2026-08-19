import { Award, GraduationCap, HeartHandshake, Users } from 'lucide-react'
import { Section, SectionHeader, StructuredData } from '@/components/ui'
import {
  CtaBand,
  FeatureGrid,
  MediaSplit,
  PageHero,
  ProcessSteps,
  ServiceAreas,
  StatsBand,
  Testimonials,
} from '@/components/sections'
import { assets } from '@/config'
import { differentiators, doctor, serviceAreas, stats, testimonials, visitSteps } from '@/content'
import { buildMetadata } from '@/lib/utils/seo'
import { breadcrumbSchema } from '@/lib/utils/structured-data'

const PATH = '/about-us'

export const metadata = buildMetadata({
  title: 'About Us',
  description:
    'Meet Dr. Smrity Amatya, DMD and the team at Bee Cave Family Dentistry. Compassionate, comprehensive dental care for families in Bee Cave and Austin, TX.',
  path: PATH,
})

const values = [
  {
    title: 'Every patient is listened to first',
    description:
      'We ask what brought you in and what worries you before we pick up an instrument. Treatment follows the conversation, not the other way round.',
    icon: HeartHandshake,
  },
  {
    title: 'Whole families, one practice',
    description:
      'Children, teens, adults and seniors are all treated here — often back-to-back, so one trip covers the household.',
    icon: Users,
  },
  {
    title: 'Continually trained and equipped',
    description:
      'Digital imaging, CEREC® same-day crowns and clear aligner therapy, kept current through ongoing education.',
    icon: GraduationCap,
  },
  {
    title: 'Care given back to the community',
    description:
      'Dr. Amatya volunteers free dental checkups for people in need across the Austin area.',
    icon: Award,
  },
]

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About Us', path: PATH },
        ])}
      />

      <PageHero
        eyebrow="About the Practice"
        title="A neighbourhood dental practice built on trust"
        description="Bee Cave Family Dentistry was founded on a simple idea: that going to the dentist should feel calm, honest and unhurried — for every member of your family."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      <MediaSplit
        eyebrow="Meet Your Dentist"
        title={doctor.name}
        body={doctor.bio}
        bullets={doctor.highlights}
        image={assets.about.doctor}
        ratio="portrait"
        imageSide="left"
        overlay={{ value: '10+', label: 'Years in practice across Texas and Pennsylvania' }}
        cta={{ label: 'Book with Dr. Amatya', href: '/contact#appointment' }}
      />

      <StatsBand stats={stats} tone="primary" />

      <FeatureGrid
        features={values}
        eyebrow="Our Values"
        title="What we hold ourselves to"
        description="Four things we try never to compromise on, whatever the appointment."
        tone="surface"
        columns={2}
      />

      <MediaSplit
        eyebrow="The Practice"
        title="A calm, modern office designed to put you at ease"
        body={[
          'Our office in Bee Cave was designed around how patients actually feel walking in. Natural light, a quiet waiting area and treatment rooms that do not feel clinical — because comfort is not a luxury, it is what makes care possible.',
          'Behind the scenes we run digital X-rays with a fraction of the radiation of traditional film, intraoral cameras so you can see exactly what we see, and CEREC® milling that turns a two-visit crown into a single appointment.',
        ]}
        bullets={[
          'Low-dose digital radiography',
          'Intraoral cameras in every room',
          'CEREC® same-day crown milling',
          'Step-free access and free parking outside',
        ]}
        image={assets.about.office}
        ratio="landscape"
        imageSide="right"
        tone="default"
      />

      <ProcessSteps steps={visitSteps} tone="surface" />

      <FeatureGrid
        features={differentiators}
        eyebrow="Why Patients Stay"
        title="The reasons families keep coming back"
        tone="default"
        columns={3}
      />

      <Section tone="surface" spacing="md" container="lg">
        <SectionHeader
          eyebrow="Insurance & Payment"
          title="Straightforward about what things cost"
          description="We work with most major PPO dental plans and file your claim on your behalf. For larger treatment plans, CareCredit financing spreads the cost into manageable monthly instalments. Whatever the treatment, you get a written estimate before we begin — never a surprise afterwards."
        />
      </Section>

      <Testimonials testimonials={testimonials} tone="default" limit={3} />

      <ServiceAreas areas={serviceAreas} tone="surface" />

      <CtaBand
        title="Come and meet the team"
        description="We are welcoming new patients of every age. Book online or call us — we would love to look after your family."
      />
    </>
  )
}
