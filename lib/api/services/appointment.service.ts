/**
 * Appointment requests and availability lookups.
 */
import { endpoints } from '@/config'
import { api } from '../client'
import { appointmentSchema, type AppointmentPayload, type SubmissionResponse } from '../schemas'

export async function requestAppointment(payload: AppointmentPayload): Promise<SubmissionResponse> {
  const parsed = appointmentSchema.parse(payload)
  return api.post<SubmissionResponse>(endpoints.appointments.create, parsed)
}

export type AvailabilitySlot = { start: string; end: string; available: boolean }

/**
 * Open slots for a given day. Cached and tagged so a booking can invalidate it
 * with `revalidateTag`.
 */
export async function getAvailability(isoDate: string): Promise<AvailabilitySlot[]> {
  return api.get<AvailabilitySlot[]>(endpoints.appointments.availability(isoDate), {
    revalidate: 60,
  })
}
