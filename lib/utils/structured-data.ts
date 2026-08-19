/**
 * JSON-LD builders. Rendered by `<StructuredData />` so search engines get a
 * machine-readable description of the practice, its services and its FAQs.
 */
import { asset, assets, site } from '@/config'
import { formatAddress, toSchemaHours } from './format'

type Json = Record<string, unknown>

function absoluteUrl(path = '/'): string {
  return `${site.url.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}

export function dentistSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${site.url}#practice`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: `+${site.contact.phone.href.replace(/\D/g, '')}`,
    email: site.contact.email,
    image: absoluteUrl(asset(assets.og.default.src)),
    logo: absoluteUrl(asset(assets.logo.primary.src)),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: [site.contact.address.street, site.contact.address.street2]
        .filter(Boolean)
        .join(', '),
      addressLocality: site.contact.address.city,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.contact.geo.latitude,
      longitude: site.contact.geo.longitude,
    },
    openingHours: toSchemaHours(),
    sameAs: site.social.map((entry) => entry.href),
    areaServed: ['Bee Cave, TX', 'Austin, TX', 'Lakeway, TX', 'Spicewood, TX', 'West Lake Hills, TX'],
    hasMap: site.contact.mapsUrl,
  }
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}#website`,
    name: site.name,
    url: site.url,
    inLanguage: site.locale,
    publisher: { '@id': `${site.url}#practice` },
  }
}

export function serviceSchema(input: {
  name: string
  description: string
  path: string
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { '@id': `${site.url}#practice` },
    location: { '@id': `${site.url}#practice` },
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function reviewSchema(
  reviews: { author: string; rating: number; body: string }[],
): Json {
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${site.url}#practice`,
    name: site.name,
    address: formatAddress(),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: average.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.author },
      reviewRating: { '@type': 'Rating', ratingValue: review.rating, bestRating: 5 },
      reviewBody: review.body,
    })),
  }
}
