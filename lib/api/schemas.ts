/**
 * Request/response shapes shared by the client, the services and the route
 * handlers. Validating with the same schema on both sides means the browser
 * and the server can never disagree about what a valid submission is.
 */
import { z } from 'zod'
import { services } from '@/content/services'

const phonePattern = /^[\d\s()+.-]{7,20}$/

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80),
  email: z.email('Please enter a valid email address.').max(160),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, 'Please enter a valid phone number.')
    .max(20),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more — at least 10 characters.')
    .max(2000),
  /** Anti-spam honeypot: real users never fill this in. */
  company: z.string().max(0).optional(),
})

export type ContactPayload = z.infer<typeof contactSchema>

export const appointmentSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80),
  email: z.email('Please enter a valid email address.').max(160),
  phone: z.string().trim().regex(phonePattern, 'Please enter a valid phone number.').max(20),
  service: z
    .string()
    .refine(
      (value) => value === 'not-sure' || services.some((service) => service.slug === value),
      'Please choose a service from the list.',
    ),
  preferredDate: z.string().optional(),
  preferredTime: z.enum(['morning', 'afternoon', 'flexible']).optional(),
  isNewPatient: z.boolean().optional(),
  notes: z.string().trim().max(2000).optional(),
  company: z.string().max(0).optional(),
})

export type AppointmentPayload = z.infer<typeof appointmentSchema>

export const submissionResponseSchema = z.object({
  ok: z.boolean(),
  message: z.string(),
  reference: z.string().optional(),
})

export type SubmissionResponse = z.infer<typeof submissionResponseSchema>

/** Flattens a ZodError into `{ fieldName: firstMessage }` for form display. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? '_')
    if (!result[key]) result[key] = issue.message
  }
  return result
}
