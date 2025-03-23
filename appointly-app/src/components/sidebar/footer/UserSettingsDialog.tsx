import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { toast } from 'sonner'

import { Settings, Earth, SunMoon } from 'lucide-react'
import { DialogProps } from '@/types/dialogProps'
import { ModeToggle } from '@/components/ThemeProvider/mode-toggle'

interface LanguageOptions {
  lng: string
  name: string
}

export function UserSettingsDialog({ open, onOpenChange }: DialogProps) {
  const { t, i18n } = useTranslation()

  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    () => localStorage.getItem('appLanguage') || i18n.language
  )

  const languagesList: LanguageOptions[] = [
    {
      lng: "en",
      name: "language:english"
    },
    {
      lng: "pt",
      name: "language:portuguese"
    }
  ]

  const handleSaveChanges = () => {
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage)
      localStorage.setItem('appLanguage', selectedLanguage)

      toast(`${t("language:changeLangMsg")} ${selectedLanguage}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings />
            <span className="ml-1">{t("common:settings")}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label>
            <Earth />
            {t('common:language')}
          </Label>

          <Select
            value={selectedLanguage}
            onValueChange={(value) => setSelectedLanguage(value)}>

            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('language:selectLang')} />
            </SelectTrigger>
            <SelectContent>
              {languagesList.map((item) => (
                <SelectItem key={item.lng} value={item.lng}>{t(item.name)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 py-4">
          <Label>
            <SunMoon />
            {t('common:theme')}
          </Label>

          <ModeToggle />
        </div>

        <DialogFooter>
          <Button 
            className="cursor-pointer" 
            type="submit" 
            onClick={handleSaveChanges}>
              {t('common:save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
