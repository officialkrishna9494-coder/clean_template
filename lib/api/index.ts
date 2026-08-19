export { api, request } from './client'
export type { RequestOptions } from './client'
export { ApiError, ApiNetworkError, ApiTimeoutError, toUserMessage } from './errors'
export {
  appointmentSchema,
  contactSchema,
  fieldErrors,
  submissionResponseSchema,
} from './schemas'
export type { AppointmentPayload, ContactPayload, SubmissionResponse } from './schemas'
export { getAvailability, requestAppointment } from './services/appointment.service'
export type { AvailabilitySlot } from './services/appointment.service'
export { submitContactForm } from './services/contact.service'
