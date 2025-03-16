import { LayoutDashboard } from 'lucide-react'
import { Users } from 'lucide-react'
import { CalendarDays } from 'lucide-react'

interface Item {
  title: string
  url: string
  icon: React.ComponentType
}

export const sidebarItems: Item[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Patients',
    url: '/patients',
    icon: Users
  },
  {
    title: 'Appointments',
    url: '/appointments',
    icon: CalendarDays
  },
]