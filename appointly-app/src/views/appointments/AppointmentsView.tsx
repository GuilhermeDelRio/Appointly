import { appointmentService } from '@/services/appointmentService'
import { useAppointmentStore } from '@/stores/appointmentStore'

import { Actions } from '@/types/headerActions'

import { Header } from "@/components/header/Header"
import CustomCalendar from '@/components/CustomCalendar/CustomCalendar'

import { CalendarDays, Plus } from 'lucide-react'
import { CalendarEventExternal } from '@schedule-x/calendar'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function AppointmentsView() {
  const { t } = useTranslation()
  const setDataInStore = useAppointmentStore((state) => state.setData)

  const actions: Actions[] = [
    {
      buttonLabel: "appointments:btnAdd",
      dialogType: "appointmentsDialog",
      variant: "default",
      icon: Plus,
      hide: false
    }
  ]

  const convertToISO = (dateTimeStr: string) => {
    const isoString = `${dateTimeStr}:00Z`.replace(' ', 'T')
    return isoString
  }

  const  handleEventDragAndDrop = async (updatedEvent: CalendarEventExternal) => {
    const { id, start, end, patientId } = updatedEvent

    const payload = {
      id,
      initialDate: convertToISO(start),
      endDate: convertToISO(end),
      patientId: patientId
    }

    try {
      await appointmentService.patch(payload)
      toast.success(t('common:updated', { field: t('appointments:singularName') }))
    } catch (ex: any) {
      toast.error(ex.message)
    }
  }

  const handleQueryBetweenDates = async (start: Date, end: Date ) => {

    const response = await appointmentService.getAppointmentsBetweenDates(
      start.toISOString(),
      end.toISOString()
    )

    console.log(response.data)

    setDataInStore(response.data)
  }
  
  return (
    <div className="flex flex-col p-2">
      <Header 
        titleLabel="appointments:name"
        titleIcon={ CalendarDays }
        actions={actions}
      />

      <CustomCalendar 
        handleEventDragAndDrop={handleEventDragAndDrop}
        handleQueryBetweenDates={handleQueryBetweenDates}
      /> 
    </div>
  )
}