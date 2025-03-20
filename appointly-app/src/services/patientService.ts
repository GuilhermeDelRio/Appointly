import { requestService } from "@/api/requestServices"

const baseUrl = '/patient'

export const patientService = {
  getAll: (config = {}) => requestService.get(baseUrl, config),
  getById: (id: string) => requestService.get(`${baseUrl}/${id}`),
  create: (data: any) => requestService.post(baseUrl, data),
  update: (id: string, data: any) => requestService.put(`${baseUrl}/${id}`, data),
  remove: (id: string) => requestService.delete(`${baseUrl}/${id}`),
}