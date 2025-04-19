import { useEffect, useState } from 'react'

import { appointmentService } from '@/services/appointmentService'
import { useAppointmentStore } from '@/stores/appointmentStore'

import { Actions } from '@/types/headerActions'
import { RequestParams } from '@/types/http'

import { Header } from "@/components/header/Header"
import CustomCalendar from '@/components/CustomCalendar/CustomCalendar'

import { CalendarDays, Plus } from 'lucide-react'
import { CalendarEventExternal } from '@schedule-x/calendar'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function AppointmentsView() {
  const { t } = useTranslation()
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const data = useAppointmentStore((state) => state.data)
  const totalCount = useAppointmentStore((state) => state.totalCount)
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

  useEffect(() => {
    const fetchAppointments = async () => {
      const config: RequestParams = { params: { page: pageIndex + 1, pageSize } }
      const response = await appointmentService.getAll(config)

      const { items, totalCount } = response.data

      setDataInStore(items, totalCount)
    }

    fetchAppointments()
  }, [pageIndex, pageSize])
  
  return (
    <div className="flex flex-col p-2">
      <Header 
        titleLabel="appointments:name"
        titleIcon={ CalendarDays }
        actions={actions}
      />

      { data.length > 0 ? <CustomCalendar handleEventDragAndDrop={handleEventDragAndDrop}/> : '' }
    </div>
  )
}