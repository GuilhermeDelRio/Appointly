import api from "./api"
import { toast } from "sonner"

const get = async <T>(url: string, config = {}): Promise<T> => {
  try {
    const response = await api.get<T>(url, config)
    return response.data
  } catch (error: any) {
    toast.error(error)
    throw error
  }
}

export default { get }