/**
 * Small, dependency-free formatting helpers shared across components.
 */
import { site, type BusinessHours } from '@/config'

/** `(512) 885-2020` → `tel:+15128852020` */
export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '')
  return `tel:${digits.startsWith('+') ? digits : `+1${digits}`}`
}

/** Single-line postal address, e.g. for structured data and map queries. */
export function formatAddress(
  address: typeof site.contact.address = site.contact.address,
): string {
  return [
    address.street,
    address.street2,
    `${address.city}, ${address.region} ${address.postalCode}`,
  ]
    .filter(Boolean)
    .join(', ')
}

/** Multi-line address as an array, for rendering with `<br />` between parts. */
export function formatAddressLines(
  address: typeof site.contact.address = site.contact.address,
): string[] {
  return [
    [address.street, address.street2].filter(Boolean).join(', '),
    `${address.city}, ${address.region} ${address.postalCode}`,
  ]
}

/** `8:30 AM – 4:30 PM`, or `Closed`. */
export function formatHours(entry: BusinessHours): string {
  if (!entry.opens || !entry.closes) return 'Closed'
  return `${entry.opens} – ${entry.closes}`
}

/**
 * Collapses consecutive days that share the same hours:
 * `Tuesday – Wednesday`, `Friday`, `Saturday`, `Mon, Thu, Sun — Closed`.
 */
export function groupHours(hours: readonly BusinessHours[] = site.hours) {
  const groups: { days: string[]; label: string }[] = []
  for (const entry of hours) {
    const label = formatHours(entry)
    const last = groups.at(-1)
    if (last && last.label === label) last.days.push(entry.day)
    else groups.push({ days: [entry.day], label })
  }
  return groups.map(({ days, label }) => ({
    label,
    days: days.length > 1 ? `${days[0]} – ${days.at(-1)}` : days[0],
  }))
}

/** Converts `8:30 AM` to minutes past midnight. Returns `null` if unparsable. */
function toMinutes(time: string): number | null {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time.trim())
  if (!match) return null
  let hour = Number(match[1]) % 12
  if (match[3].toUpperCase() === 'PM') hour += 12
  return hour * 60 + Number(match[2])
}

/**
 * Whether the practice is currently open, evaluated in the practice timezone.
 * Returns `null` when it cannot be determined (e.g. unparsable hours).
 */
export function isOpenNow(now: Date = new Date()): boolean | null {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: site.timezone,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)

  const weekday = parts.find((p) => p.type === 'weekday')?.value
  const hour = Number(parts.find((p) => p.type === 'hour')?.value)
  const minute = Number(parts.find((p) => p.type === 'minute')?.value)
  if (!weekday || Number.isNaN(hour) || Number.isNaN(minute)) return null

  const today = site.hours.find((entry) => entry.day === weekday)
  if (!today || !today.opens || !today.closes) return false

  const opens = toMinutes(today.opens)
  const closes = toMinutes(today.closes)
  if (opens == null || closes == null) return null

  const current = hour * 60 + minute
  return current >= opens && current < closes
}

/** `schema.org` opening-hours strings, e.g. `Tu 08:30-16:30`. */
export function toSchemaHours(hours: readonly BusinessHours[] = site.hours): string[] {
  const abbrev: Record<string, string> = {
    Monday: 'Mo',
    Tuesday: 'Tu',
    Wednesday: 'We',
    Thursday: 'Th',
    Friday: 'Fr',
    Saturday: 'Sa',
    Sunday: 'Su',
  }
  const pad = (minutes: number) =>
    `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`

  return hours
    .filter((entry) => entry.opens && entry.closes)
    .map((entry) => {
      const opens = toMinutes(entry.opens!)
      const closes = toMinutes(entry.closes!)
      if (opens == null || closes == null) return null
      return `${abbrev[entry.day]} ${pad(opens)}-${pad(closes)}`
    })
    .filter((value): value is string => value !== null)
}

/** "1", "2", "3" → "01", "02", "03" — used by numbered process steps. */
export function padNumber(value: number, length = 2): string {
  return String(value).padStart(length, '0')
}

/** Truncates on a word boundary and appends an ellipsis. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, text.lastIndexOf(' ', maxLength))}…`
}

/** `slugify('Dental Crowns')` → `dental-crowns` */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
