import { useDialogStore } from '@/stores/dialogStore'
import { UserSettingsDialog } from '../sidebar/footer/UserSettingsDialog'

export function GlobalDialog() {
  const { openDialog, close } = useDialogStore()

  return (
    <>
      <UserSettingsDialog open={openDialog === 'userSettings'} onOpenChange={close} />
    </>
  )
}
