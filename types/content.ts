import type { LucideIcon } from 'lucide-react'
import type { AssetRef } from '@/config'

/** A single service offered by the practice, and its dedicated page. */
export type Service = {
  /** URL path, e.g. `/dental-crowns-in-austin-tx`. Matches the live site. */
  slug: string
  /** Nav / card label. */
  title: string
  /** `<h1>` on the service page. */
  heading: string
  /** One-line summary used on cards. */
  summary: string
  /** Opening paragraph on the service page. */
  intro: string
  /** Body paragraphs. */
  body: string[]
  /** Bullet list of benefits. */
  benefits: string[]
  /** Numbered treatment steps. */
  process?: { title: string; description: string }[]
  /** Questions shown on the service page and emitted as FAQ structured data. */
  faqs?: Faq[]
  icon: LucideIcon
  image?: AssetRef
  /** Grouping used by the services index page. */
  category: ServiceCategory
  /** Surfaces the service on the homepage grid. */
  featured?: boolean
  seo: { title: string; description: string }
}

export type ServiceCategory = 'preventive' | 'restorative' | 'cosmetic' | 'specialty'

export type Testimonial = {
  quote: string
  author: string
  /** e.g. "Google review". */
  source?: string
  rating: number
}

export type Faq = {
  question: string
  answer: string
}

export type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

export type Stat = {
  value: string
  label: string
}

export type GalleryItem = {
  title: string
  description?: string
  before: AssetRef
  after: AssetRef
}
