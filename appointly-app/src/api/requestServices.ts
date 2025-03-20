import api from "./api"

export const requestService = {
  get: (url: string, config = {}) => api.get(url, config),
  post: (url: string, data: any, config = {}) => api.post(url, data, config),
  put: (url: string, data: any, config = {}) => api.put(url, data, config),
  delete: (url: string, config = {}) => api.delete(url, config),
}