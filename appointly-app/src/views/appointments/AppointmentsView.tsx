import { CalendarDays } from 'lucide-react'
import { Header } from "@/components/header/Header"

export function AppointmentsView() {
  return (
    <div className="flex flex-col p-2">
      <Header 
        titleLabel="appointments:name"
        titleIcon={ CalendarDays }
        buttonLabel="appointments:btnAdd"
        dialogType="appointmentsDialog"
      />
    </div>
  )
}