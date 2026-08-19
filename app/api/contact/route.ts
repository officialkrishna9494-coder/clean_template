/**
 * POST /api/contact — receives general enquiries from `<ContactForm />`.
 *
 * This is a working reference implementation: it validates with the shared
 * schema, rejects honeypot hits, rate-limits per IP, and logs the submission.
 * Swap the `deliver()` body for your email provider or CRM.
 */
import { NextResponse } from 'next/server'
import { contactSchema, fieldErrors } from '@/lib/api/schemas'
import { env } from '@/config'
import { checkRateLimit, clientIp } from '@/lib/api/rate-limit'

export async function POST(request: Request) {
  const ip = clientIp(request)
  const limit = checkRateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 })

  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: 'Too many messages from this address. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Please check your details.', errors: fieldErrors(parsed.error) },
      { status: 422 },
    )
  }

  // The honeypot is empty for real users; a filled value is a bot. We return a
  // success shape so the bot learns nothing, but deliver nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true, message: 'Thanks — we will be in touch.' })
  }

  await deliver(parsed.data)

  return NextResponse.json({
    ok: true,
    message: 'Thanks for getting in touch. We reply within one business day.',
    reference: `MSG-${Date.now().toString(36).toUpperCase()}`,
  })
}

/**
 * Delivery hook. Replace with your provider — e.g. Resend, SendGrid, or a
 * CRM webhook — reading credentials from `config/env.ts`.
 */
async function deliver(data: unknown): Promise<void> {
  if (!env.contactRecipient) {
    console.info('[contact] No CONTACT_FORM_RECIPIENT configured; logging only.', data)
    return
  }
  console.info(`[contact] Would deliver to ${env.contactRecipient}`, data)
}
