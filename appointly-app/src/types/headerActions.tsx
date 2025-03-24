import { DialogType } from "@/stores/dialogStore"

export interface Actions {
  buttonLabel: string,
  dialogType: DialogType,
  variant: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined
  hide: boolean
  icon: React.ComponentType
  onClick?: () => void
}