import { useEffect, useState } from 'react'

import { appointmentService } from '@/services/appointmentService'
import { useAppointmentStore } from '@/stores/appointmentStore'

import { Actions } from '@/types/headerActions'
import { RequestParams } from '@/types/http'

import { Header } from "@/components/header/Header"
import CustomCalendar from '@/components/CustomCalendar/CustomCalendar'

import { CalendarDays, Plus } from 'lucide-react'

export function AppointmentsView() {

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

  useEffect(() => {
    const fetchPatients = async () => {
      const config: RequestParams = { params: { page: pageIndex + 1, pageSize } }
      const response = await appointmentService.getAll(config)

      const { items, totalCount } = response.data

      setDataInStore(items, totalCount)
    }

    fetchPatients()
  }, [pageIndex, pageSize])
  
  return (
    <div className="flex flex-col p-2">
      <Header 
        titleLabel="appointments:name"
        titleIcon={ CalendarDays }
        actions={actions}
      />

      { data.length > 0 ? <CustomCalendar /> : '' }
    </div>
  )
}