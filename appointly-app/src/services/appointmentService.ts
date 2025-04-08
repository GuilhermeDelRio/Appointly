import { requestService } from "@/api/requestServices"
import { Appointment } from "@/models/appointment"

const baseUrl = '/appointment'

export const appointmentService = {
  getAll: (config = {}) => requestService.get(baseUrl, config),
  getById: (id: string) => requestService.get(`${baseUrl}/${id}`),
  create: (data: Appointment) => requestService.post(baseUrl, data),
  update: (data: Appointment) => requestService.put(`${baseUrl}`, data),
  remove: (id: string) => requestService.delete(`${baseUrl}/${id}`),
  patch: (data: any) => requestService.patch(`${baseUrl}`, data),
  bulkDelete: (ids: {}) => requestService.post(`${baseUrl}/bulkDelete`, ids)
}