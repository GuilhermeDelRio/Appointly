import { create } from 'zustand'

type DialogType = 'userSettings' | 'account' | null

interface DialogState {
  openDialog: DialogType
  open: (dialog: DialogType) => void
  close: () => void
}

export const useDialogStore = create<DialogState>((set) => ({
  openDialog: null,
  open: (dialog) => set({ openDialog: dialog }),
  close: () => set({ openDialog: null }),
}))
