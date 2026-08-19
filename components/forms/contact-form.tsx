'use client'

import { CheckCircle2, Mail, Phone, Send, User } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { z } from 'zod'
import { Alert, Button, InputField, TextareaField } from '@/components/ui'
import { contactSchema, fieldErrors, submitContactForm, toUserMessage } from '@/lib/api'
import { site } from '@/config'
import { cn } from '@/lib/utils/cn'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/** General enquiry form. Same validation contract as the route handler. */
export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})
    setMessage('')

    const form = event.currentTarget
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(form)))
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error))
      setStatus('error')
      setMessage('Please correct the highlighted fields.')
      return
    }

    setStatus('submitting')
    try {
      const result = await submitContactForm(parsed.data)
      setStatus('success')
      setMessage(result.message)
      form.reset()
    } catch (error) {
      setStatus('error')
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
        <h3 className="font-display text-2xl text-ink">Message sent</h3>
        <p className="max-w-md text-base text-ink-muted">{message}</p>
        <Button variant="outline" onClick={() => setStatus('idle')}>
          Send another message
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
          autoComplete="name"
          required
          error={errors.name}
          leadingIcon={<User />}
        />
        <InputField
          name="phone"
          type="tel"
          label="Phone"
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
        autoComplete="email"
        required
        error={errors.email}
        leadingIcon={<Mail />}
      />

      <TextareaField
        name="message"
        label="How can we help?"
        placeholder="Tell us what you need and we will get back to you."
        required
        rows={6}
        error={errors.message}
      />

      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Button
        type="submit"
        size="lg"
        block
        loading={status === 'submitting'}
        leadingIcon={<Send className="size-4" aria-hidden="true" />}
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>

      <p className="text-center text-sm text-ink-subtle">
        Prefer to talk? Call{' '}
        <a href={`tel:${site.contact.phone.href}`} className="font-semibold text-primary hover:underline">
          {site.contact.phone.display}
        </a>
        .
      </p>
    </form>
  )
}
