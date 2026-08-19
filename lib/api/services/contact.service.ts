/**
 * Contact form submission.
 * The only module that knows which endpoint a contact message goes to.
 */
import { endpoints } from '@/config'
import { api } from '../client'
import { contactSchema, type ContactPayload, type SubmissionResponse } from '../schemas'

export async function submitContactForm(payload: ContactPayload): Promise<SubmissionResponse> {
  // Validate before the network call so obvious mistakes never leave the client.
  const parsed = contactSchema.parse(payload)
  return api.post<SubmissionResponse>(endpoints.contact.submit, parsed)
}
