import { useTranslation } from 'react-i18next'
import { useDialogStore, DialogType } from '@/stores/dialogStore'
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Actions {
  buttonLabel: string,
  dialogType: DialogType,
  variant: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined
  hide: boolean
  onClick?: () => void
}

type HeaderProps = {
  titleLabel: string
  titleIcon: React.ComponentType
  actions: Actions[]
}

export function Header({ titleLabel, titleIcon: TitleIcon, actions }: HeaderProps) {
  const { t } = useTranslation()
  const openDialog = useDialogStore((state) => state.open)

  const handleHeaderAction = (dialogType: DialogType) => openDialog(dialogType)

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <TitleIcon />
        <h1 className="text-2xl ml-2 font-medium">{t(titleLabel)}</h1>
      </div>

      <div className="flex gap-2">
      {actions
        .filter(action => !action.hide)
        .map(({ buttonLabel, dialogType, variant, onClick }, index) => (
          <Button
            key={index}
            className="cursor-pointer"
            variant={variant || 'default'}
            onClick={() => onClick ? onClick() : dialogType && handleHeaderAction(dialogType)}
          >
            <Plus className="mr-1" />
            {t(buttonLabel)}
          </Button>
      ))}
      </div>
    </div>
  )
}