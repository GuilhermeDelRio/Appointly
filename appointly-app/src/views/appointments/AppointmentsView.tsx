import { CalendarDays, Plus } from 'lucide-react'
import { Header } from "@/components/header/Header"
import { Actions } from '@/types/headerActions'

import CustomCalendar from '@/components/CustomCalendar/CustomCalendar'

export function AppointmentsView() {

  const actions: Actions[] = [
    {
      buttonLabel: "appointments:btnAdd",
      dialogType: "appointmentsDialog",
      variant: "default",
      icon: Plus,
      hide: false
    }
  ]
  
  return (
    <div className="flex flex-col p-2">
      <Header 
        titleLabel="appointments:name"
        titleIcon={ CalendarDays }
        actions={actions}
      />

      <CustomCalendar />
    </div>
  )
}