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
    title: 'dashboard:name',
    url: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'patients:name',
    url: '/patients',
    icon: Users
  },
  {
    title: 'appointments:name',
    url: '/appointments',
    icon: CalendarDays
  },
]