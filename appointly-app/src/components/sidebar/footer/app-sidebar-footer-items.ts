import { Users, Settings, LogOut} from 'lucide-react'

interface Item {
  title: string
  icon: React.ComponentType
}

export const footerItems: Item[] = [
  {
    title: "common:account",
    icon: Users
  },
  {
    title: "common:settings",
    icon: Settings
  },
  {
    title: "common:signOut",
    icon: LogOut
  }
]