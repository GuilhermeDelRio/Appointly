import { useTranslation } from 'react-i18next'
import { useDialogStore, DialogType } from '@/stores/dialogStore'
import { Button } from "@/components/ui/button"
import { Actions } from '@/types/headerActions'

type HeaderProps = {
  titleLabel: string
  titleIcon: React.ComponentType
  actions?: Actions[]
}

export function Header({ titleLabel, titleIcon: TitleIcon, actions = [] }: HeaderProps) {
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
        .map(({ buttonLabel, dialogType, variant, icon: Icon, onClick }, index) => (
          <Button
            key={index}
            className="cursor-pointer"
            variant={variant || 'default'}
            onClick={() => onClick ? onClick() : dialogType && handleHeaderAction(dialogType)}
          >
            <Icon />
            {t(buttonLabel)}
          </Button>
      ))}
      </div>
    </div>
  )
}