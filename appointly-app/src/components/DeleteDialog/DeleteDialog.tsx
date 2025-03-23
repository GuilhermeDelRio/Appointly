import { useTranslation } from "react-i18next"
import { useDialogStore } from "@/stores/dialogStore"
import { toast } from "sonner"
import { CircleAlert, Trash } from 'lucide-react'
import { DialogProps } from "@/types/dialogProps"
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function DeleteDialog({ open, onOpenChange }: DialogProps) {
  const { t } = useTranslation()
  const { dialogData } = useDialogStore()

  const handleSaveChanges = async () => {
    try {
      await dialogData.onDelete()
      toast.success(t('common:deleted', { field: t(dialogData.entity) }))
      onOpenChange(false)
    } catch(ex: any) {
      toast.error(ex.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CircleAlert color="#e01b24" />
            <span className="ml-1">{t('messages:deleteTitle')}</span>
          </DialogTitle>
        </DialogHeader>
  
        <Separator />

        <span>{t('messages:deleteMsg')}</span>

        <DialogFooter>
          <Button 
            className="cursor-pointer" 
            variant="secondary"
            onClick={() => onOpenChange(false)}>
              {t('common:cancel')}
          </Button>
          <Button 
            className="cursor-pointer"
            variant="destructive"
            type="submit" 
            onClick={handleSaveChanges}>
              <Trash />
              {t('common:delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
