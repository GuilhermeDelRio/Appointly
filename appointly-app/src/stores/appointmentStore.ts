import { Appointment } from '@/models/appointment'
import { create } from 'zustand'

interface AppointmentStore {
  data: Appointment[]
  totalCount: number
  setData: (newData: Appointment[], total: number) => void,
  removeById: (id: string) => void
  removeManyById: (ids: string[]) => void
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  data: [],
  totalCount: 0,
  setData: (newData, total) => set({ data: newData, totalCount: total }),
  removeById: (id) => {
    const { data, totalCount } = get()
    const updatedData = data.filter(patient => patient.id !== id)
    set({
      data: updatedData,
      totalCount: Math.max(totalCount - 1, 0)
    })
  },
  removeManyById: (ids) => {
    const { data, totalCount } = get()
    const updatedData = data.filter(patient => patient.id && !ids.includes(patient.id))
    set({
      data: updatedData,
      totalCount: Math.max(totalCount - ids.length, 0)
    })
  }
}))