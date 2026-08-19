'use client'

import { CalendarDays, CheckCircle2, Mail, Phone, User } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { z } from 'zod'
import { Alert, Button, InputField, SelectField, TextareaField } from '@/components/ui'
import { appointmentSchema, fieldErrors, requestAppointment, toUserMessage } from '@/lib/api'
import { services } from '@/content/services'
import { site } from '@/config'
import { cn } from '@/lib/utils/cn'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const serviceOptions = [
  { value: 'not-sure', label: 'Not sure — please advise' },
  ...services.map((service) => ({ value: service.slug, label: service.title })),
]

const timeOptions = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'flexible', label: 'I am flexible' },
]

/**
 * Appointment request form.
 *
 * Validation runs against the same Zod schema the route handler uses, so the
 * client can never submit something the server would reject for a different
 * reason. Errors are reported per field and announced to screen readers.
 */
export function AppointmentForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})
    setMessage('')

    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const payload = {
      ...data,
      isNewPatient: data.isNewPatient === 'on',
    }

    const parsed = appointmentSchema.safeParse(payload)
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error))
      setStatus('error')
      setMessage('Please correct the highlighted fields.')
      return
    }

    setStatus('submitting')
    try {
      const result = await requestAppointment(parsed.data)
      setStatus('success')
      setMessage(result.message)
      form.reset()
    } catch (error) {
      setStatus('error')
      // Zod failures from the service layer surface as field errors too.
      if (error instanceof z.ZodError) setErrors(fieldErrors(error))
      setMessage(toUserMessage(error))
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex flex-col items-center gap-4 rounded-card border border-success/25 bg-success-soft p-10 text-center',
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="size-12 text-success" aria-hidden="true" />
        <h3 className="font-display text-2xl text-ink">Request received</h3>
        <p className="max-w-md text-base text-ink-muted">{message}</p>
        <p className="text-sm text-ink-subtle">
          Need to be seen sooner? Call us on{' '}
          <a href={`tel:${site.contact.phone.href}`} className="font-semibold text-primary hover:underline">
            {site.contact.phone.display}
          </a>
          .
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')}>
          Send another request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('flex flex-col gap-5', className)}>
      {status === 'error' && message ? (
        <Alert variant="danger" title="We could not send that">
          {message}
        </Alert>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          name="name"
          label="Full name"
          placeholder="Jane Doe"
          autoComplete="name"
          required
          error={errors.name}
          leadingIcon={<User />}
        />
        <InputField
          name="phone"
          type="tel"
          label="Phone"
          placeholder="(512) 555-0100"
          autoComplete="tel"
          required
          error={errors.phone}
          leadingIcon={<Phone />}
        />
      </div>

      <InputField
        name="email"
        type="email"
        label="Email"
        placeholder="jane@example.com"
        autoComplete="email"
        required
        error={errors.email}
        leadingIcon={<Mail />}
      />

      <SelectField
        name="service"
        label="What can we help with?"
        defaultValue="not-sure"
        options={serviceOptions}
        error={errors.service}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          name="preferredDate"
          type="date"
          label="Preferred date"
          hint="We will confirm the exact time by phone."
          error={errors.preferredDate}
        />
        <SelectField
          name="preferredTime"
          label="Preferred time"
          defaultValue="flexible"
          options={timeOptions}
          error={errors.preferredTime}
        />
      </div>

      <TextareaField
        name="notes"
        label="Anything we should know?"
        placeholder="Pain, anxiety, insurance questions, accessibility needs — anything at all."
        rows={4}
        error={errors.notes}
      />

      <label className="flex items-start gap-3 text-base text-ink-muted">
        <input
          type="checkbox"
          name="isNewPatient"
          className="mt-1 size-5 shrink-0 rounded border-border-strong text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
        I am a new patient (complimentary whitening with your first cleaning &amp; exam)
      </label>

      {/* Honeypot — visually hidden and skipped by assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="appointment-company">Company</label>
        <input id="appointment-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Button
        type="submit"
        size="xl"
        block
        loading={status === 'submitting'}
        leadingIcon={<CalendarDays className="size-4" aria-hidden="true" />}
      >
        {status === 'submitting' ? 'Sending…' : 'Request my appointment'}
      </Button>

      <p className="text-center text-sm text-ink-subtle">
        We reply within one business day. For urgent pain, please call{' '}
        <a href={`tel:${site.contact.phone.href}`} className="font-semibold text-primary hover:underline">
          {site.contact.phone.display}
        </a>
        .
      </p>
    </form>
  )
}
