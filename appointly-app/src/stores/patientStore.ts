import { Patient } from '@/views/patients/patient'
import { create } from 'zustand'

interface PatientStore {
  data: Patient[]
  totalCount: number
  setData: (newData: Patient[], total: number) => void
}

export const usePatientStore = create<PatientStore>((set) => ({
  data: [],
  totalCount: 0,
  setData: (newData, total) => set({ data: newData, totalCount: total })
}))
