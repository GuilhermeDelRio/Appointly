import { requestService } from "@/api/requestServices"

const baseUrl = '/systemInfo'

export const systemInfoService = {
  getAll: (config = {}) => requestService.get(baseUrl, config),
}