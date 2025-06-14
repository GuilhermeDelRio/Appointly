import { Patient } from '@/models/patient'
import { create } from 'zustand'

interface PatientStore {
  data: Patient[]
  totalCount: number
  setData: (newData: Patient[], total: number) => void,
  removeById: (id: string) => void
  removeManyById: (ids: string[]) => void
}

export const usePatientStore = create<PatientStore>((set, get) => ({
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