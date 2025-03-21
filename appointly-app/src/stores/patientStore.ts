import { create } from 'zustand'

interface PatientStore {
  data: any[]
  setData: (newData: any[]) => void
}

export const usePatientStore = create<PatientStore>((set) => ({
  data: [],
  setData: (newData) => set({ data: newData })
}))
