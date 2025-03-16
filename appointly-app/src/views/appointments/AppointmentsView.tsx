import { CalendarDays } from 'lucide-react'
import { Header } from "@/components/header/Header"

export function AppointmentsView() {
  return (
    <div>
      <Header 
        titleLabel="Appointments"
        titleIcon={ CalendarDays }
        buttonLabel="New appointment" 
      />
    </div>
  )
}