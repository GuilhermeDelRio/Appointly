import { useDialogStore } from '@/stores/dialogStore'
import { UserSettingsDialog } from '../sidebar/footer/UserSettingsDialog'
import { PatientsDialog } from '@/views/patients/PatientsDialog'
import { DeleteDialog } from '@/components/DeleteDialog/DeleteDialog'
import { AppointmentDialog } from '@/views/appointments/AppointmentDialog'

export function GlobalDialog() {
  const { openDialog, close } = useDialogStore()

  return (
    <>
      <UserSettingsDialog open={openDialog === 'userSettings'} onOpenChange={close} />
      <PatientsDialog open={openDialog === 'patientsDialog'} onOpenChange={close} />
      <DeleteDialog open={openDialog === 'deleteDialog'} onOpenChange={close} />
      <AppointmentDialog open={openDialog === 'appointmentsDialog'} onOpenChange={close} />
    </>
  )
}
