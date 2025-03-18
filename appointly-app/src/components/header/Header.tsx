import { useTranslation } from 'react-i18next'
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type HeaderProps = {
  titleLabel: string
  titleIcon: React.ComponentType
  buttonLabel?: string
}

export function Header({ titleLabel, titleIcon: TitleIcon, buttonLabel }: HeaderProps) {
  const { t } = useTranslation()

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <TitleIcon />
        <h1 className="text-2xl ml-2 font-medium">{t(titleLabel)}</h1>
      </div>

      {buttonLabel && (
        <Button className='cursor-pointer'>
          <Plus />
          {t(buttonLabel)}
        </Button>
      )}
    </div>
  )
}