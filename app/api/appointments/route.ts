/**
 * POST /api/appointments — receives requests from `<AppointmentForm />`.
 * See `app/api/contact/route.ts` for the shared pattern.
 */
import { NextResponse } from 'next/server'
import { appointmentSchema, fieldErrors } from '@/lib/api/schemas'
import { env } from '@/config'
import { checkRateLimit, clientIp } from '@/lib/api/rate-limit'

export async function POST(request: Request) {
  const ip = clientIp(request)
  const limit = checkRateLimit(`appointment:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 })

  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: 'Too many requests from this address. Please call us instead.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = appointmentSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Please check your details.', errors: fieldErrors(parsed.error) },
      { status: 422 },
    )
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true, message: 'Thanks — we will be in touch.' })
  }

  await deliver(parsed.data)

  return NextResponse.json({
    ok: true,
    message:
      'Thanks — we have your request. A member of our team will call to confirm your time within one business day.',
    reference: `APT-${Date.now().toString(36).toUpperCase()}`,
  })
}

async function deliver(data: unknown): Promise<void> {
  if (!env.contactRecipient) {
    console.info('[appointments] No CONTACT_FORM_RECIPIENT configured; logging only.', data)
    return
  }
  console.info(`[appointments] Would deliver to ${env.contactRecipient}`, data)
}
