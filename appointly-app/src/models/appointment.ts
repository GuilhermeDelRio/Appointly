import { Patient } from "./patient"

export enum AppointmentStatusEnum {
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
  CONFIRMED = 'CONFIRMED',
  NO_SHOW = 'NO_SHOW',
  PENDING = 'PENDING',
  RESCHEDULED = 'RESCHEDULED',
  SCHEDULED = 'SCHEDULED'
}

export enum AppointmentLocationEnum {
  ONLINE = 'ONLINE',
  OFFICE = 'OFFICE'
}

export type Appointment = {
  id?: string
  initialDate: string
  endDate: string
  appointmentStatus: AppointmentStatusEnum,
  appointmentLocation: AppointmentLocationEnum,
  patient: Patient
}

export type AppointmentRequest = {
  id?: string
  initialDate: Date
  endDate: Date
  appointmentStatus: AppointmentStatusEnum
  appointmentLocation: AppointmentLocationEnum
  patientId: string
}

export type CreateAppointmentRequest = {
  initialDate: string
  endDate: string
  appointmentStatus: AppointmentStatusEnum
  appointmentLocation: AppointmentLocationEnum
  patientId: string
}