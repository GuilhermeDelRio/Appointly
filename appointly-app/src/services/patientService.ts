import { requestService } from "@/api/requestServices"
import { Patient } from "@/views/patients/patient"

const baseUrl = '/patient'

export const patientService = {
  getAll: (config = {}) => requestService.get(baseUrl, config),
  getById: (id: string) => requestService.get(`${baseUrl}/${id}`),
  create: (data: Patient) => requestService.post(baseUrl, data),
  update: (data: Patient) => requestService.put(`${baseUrl}`, data),
  remove: (id: string) => requestService.delete(`${baseUrl}/${id}`),
}