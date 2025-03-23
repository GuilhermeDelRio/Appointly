import { Patient } from '@/views/patients/patient'
import { create } from 'zustand'

interface PatientStore {
  data: Patient[]
  totalCount: number
  setData: (newData: Patient[], total: number) => void,
  removeById: (id: string) => void
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
  }
}))
