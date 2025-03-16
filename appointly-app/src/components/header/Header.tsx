import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type HeaderProps = {
  titleLabel: string
  titleIcon: React.ComponentType
  buttonLabel?: string
}

export function Header({ titleLabel, titleIcon: TitleIcon, buttonLabel }: HeaderProps) {
  return (
    <div className="mr-5 ml-2 mt-4 flex justify-between items-center">
      <div className="flex items-center">
        <TitleIcon />
        <h1 className="text-2xl ml-2 font-medium">{titleLabel}</h1>
      </div>

      {buttonLabel && (
        <Button>
          <Plus />
          {buttonLabel}
        </Button>
      )}
    </div>
  )
}