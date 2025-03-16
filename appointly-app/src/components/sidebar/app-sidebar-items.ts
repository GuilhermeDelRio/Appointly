import { Grid } from "@mynaui/icons-react"
import { Users } from "@mynaui/icons-react"
import { Calendar } from "@mynaui/icons-react"

interface Item {
  title: string
  url: string
  icon: React.ComponentType
}

export const sidebarItems: Item[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Grid
  },
  {
    title: 'Patients',
    url: '/patients',
    icon: Users
  },
  {
    title: 'Appointments',
    url: '/appointments',
    icon: Calendar
  },
]