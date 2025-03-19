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

import { Settings, Earth } from 'lucide-react'
import { DialogProps } from '@/types/dialogProps'

export function PatientsDialog({ open, onOpenChange }: DialogProps) {
  const { t } = useTranslation()

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
        </div>

        <DialogFooter>
          {/* <Button 
            className="cursor-pointer" 
            type="submit" 
            onClick={handleSaveChanges}>
              {t('common:save')}
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
