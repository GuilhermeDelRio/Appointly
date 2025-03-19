import { useTranslation } from 'react-i18next'
import { useDialogStore, DialogType } from '@/stores/dialogStore'
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type HeaderProps = {
  titleLabel: string
  titleIcon: React.ComponentType
  buttonLabel?: string,
  dialogType: DialogType
}

export function Header({ titleLabel, titleIcon: TitleIcon, buttonLabel, dialogType }: HeaderProps) {
  const { t } = useTranslation()

    const openDialog = useDialogStore((state) => state.open)
  
    const handleHeaderAction = () => openDialog(dialogType)

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <TitleIcon />
        <h1 className="text-2xl ml-2 font-medium">{t(titleLabel)}</h1>
      </div>

      {buttonLabel && (
        <Button className='cursor-pointer' onClick={handleHeaderAction}>
          <Plus />
          {t(buttonLabel)}
        </Button>
      )}
    </div>
  )
}