import { create } from 'zustand'

export type DialogType = 
  'userSettings' 
  | 'account' 
  | 'patientsDialog' 
  | 'appointmentsDialog' 
  | 'deleteDialog' 
  | null

interface DialogState {
  openDialog: DialogType
  dialogData: any
  open: (dialog: DialogType, data?: any) => void
  close: () => void
}

export const useDialogStore = create<DialogState>((set) => ({
  openDialog: null,
  dialogData: null,
  open: (dialog, data) => set({ openDialog: dialog, dialogData: data }),
  close: () => set({ openDialog: null, dialogData: null }),
}))
