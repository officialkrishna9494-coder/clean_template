/**
 * Homepage and About-page copy blocks: differentiators, statistics, process
 * steps and the doctor's biography. Kept out of the components so the same
 * layouts can be reused for a different practice by editing this file.
 */
import {
  CalendarClock,
  CreditCard,
  HeartHandshake,
  MapPin,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import type { Feature, Stat } from '@/types/content'

export const differentiators: Feature[] = [
  {
    title: 'One practice for the whole family',
    description:
      'Toddlers, teens, adults and grandparents all seen by the same team — often on the same afternoon.',
    icon: Users,
  },
  {
    title: 'Gentle care, genuinely unhurried',
    description:
      'We schedule enough time to explain what we are doing and to stop when you need a moment.',
    icon: HeartHandshake,
  },
  {
    title: 'Same-day crowns with CEREC®',
    description:
      'Designed, milled and fitted in a single visit. No temporary crown and no second appointment.',
    icon: Sparkles,
  },
  {
    title: 'Modern digital imaging',
    description:
      'Low-dose digital X-rays and intraoral photography, so you can see exactly what we see.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Transparent, written pricing',
    description:
      'A clear estimate before any treatment starts. We file your insurance and offer CareCredit financing.',
    icon: CreditCard,
  },
  {
    title: 'Emergency slots held daily',
    description:
      'Space kept open every day for urgent pain, breakages and dental trauma. Call us — we will make room.',
    icon: CalendarClock,
  },
]

export const stats: Stat[] = [
  { value: '10+', label: 'Years in practice' },
  { value: '5.0', label: 'Average patient rating' },
  { value: '1 visit', label: 'For most crowns, with CEREC®' },
  { value: 'All ages', label: 'From first tooth to full dentures' },
]

export const visitSteps = [
  {
    title: 'Get in touch',
    description:
      'Call us or send the appointment form. Tell us if you are in pain and we will prioritise you.',
  },
  {
    title: 'Comprehensive exam',
    description:
      'Digital X-rays, a full examination of teeth, gums and bite, and an oral cancer screening.',
  },
  {
    title: 'A plan you understand',
    description:
      'We show you the images, explain the options, and give you a written estimate before anything begins.',
  },
  {
    title: 'Treatment at your pace',
    description:
      'We sequence the work around what is urgent, what your schedule allows and what your budget allows.',
  },
]

export const doctor = {
  name: 'Dr. Smrity Amatya, DMD',
  role: 'Founder & Family Dentist',
  credentials: 'Boston University Henry M. Goldman School of Dental Medicine',
  bio: [
    'Dr. Smrity Amatya is a family dentist with a passion for compassionate, high-quality care for patients of all ages. Her gentle approach and long experience are aimed at one thing: a practice where every patient feels genuinely at ease.',
    'Her journey in dentistry began in Bengaluru, India, followed by four years of practice in Nepal. After graduating from the Boston University Henry M. Goldman School of Dental Medicine, she practised in Pennsylvania and Texas for more than ten years before opening Bee Cave Family Dentistry.',
    'Outside the practice, Dr. Amatya volunteers in community outreach, providing free dental checkups for people in need across the Austin area.',
  ],
  highlights: [
    'DMD, Boston University Henry M. Goldman School of Dental Medicine',
    '10+ years practising in Pennsylvania and Texas',
    'Trained and practised in India and Nepal',
    'Volunteers free dental checkups across the Austin area',
  ],
}

export const serviceAreas = [
  'Bee Cave',
  'Lakeway',
  'West Lake Hills',
  'Spicewood',
  'Dripping Springs',
  'Steiner Ranch',
  'Barton Creek',
  'Austin',
]

export const trustPoints: Feature[] = [
  {
    title: 'Convenient Bee Cave location',
    description: 'Minutes from the Hill Country Galleria, with free parking directly outside.',
    icon: MapPin,
  },
  {
    title: 'Insurance filed for you',
    description: 'We work with most major PPO plans and handle the paperwork on your behalf.',
    icon: ShieldCheck,
  },
  {
    title: 'Flexible payment plans',
    description: 'CareCredit financing spreads treatment costs into manageable monthly instalments.',
    icon: CreditCard,
  },
]
