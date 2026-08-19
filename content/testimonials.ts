/**
 * Patient reviews. Also feeds the `AggregateRating` structured data, so keep
 * the ratings honest — they are published to search engines.
 */
import type { Testimonial } from '@/types/content'

export const testimonials: Testimonial[] = [
  {
    quote:
      'Everyone that works in this office is friendly and helpful. Dr. Smrity is very patient and takes her time. They did a wonderful job and thoroughly explained the process. I highly recommend this place.',
    author: 'Marisa T.',
    source: 'Google review',
    rating: 5,
  },
  {
    quote:
      'The entire team went out of their way to make me feel welcome and comfortable. Dr. Amatya is professional, knowledgeable and approachable, with a calming demeanour — one of the most pleasant dental visits I have ever had.',
    author: 'Daniel R.',
    source: 'Google review',
    rating: 5,
  },
  {
    quote:
      'I brought both of my kids in on the same afternoon and they actually asked when they could come back. The hygienist explained everything to them at their level. That has never happened before.',
    author: 'Priya S.',
    source: 'Google review',
    rating: 5,
  },
  {
    quote:
      'I cracked a molar on a Friday and they saw me that same day. Walked out with a permanent crown in one visit — no temporary, no second appointment. Genuinely impressive.',
    author: 'Kevin B.',
    source: 'Google review',
    rating: 5,
  },
  {
    quote:
      'I have avoided dentists for years because of anxiety. They never once made me feel judged, and they talked me through every single step before doing it. I am finally back on a regular schedule.',
    author: 'Anna L.',
    source: 'Google review',
    rating: 5,
  },
  {
    quote:
      'Clear pricing up front, no upselling, and the office is spotless. The front desk sorted out my insurance before I even asked. Easy to recommend.',
    author: 'Tom H.',
    source: 'Google review',
    rating: 5,
  },
]

export const averageRating =
  testimonials.reduce((sum, review) => sum + review.rating, 0) / testimonials.length
