import { Users, Settings, LogOut} from 'lucide-react'

interface Item {
  title: string
  icon: React.ComponentType,
  action: () => void
}

const handleAccount = () => {
  console.log('handleAccount')
}

const handleSignOut = () => {
  console.log('handleSignOut')
}

export const getFooterItems = (handleUserSettings: () => void): Item[] => [
  {
    title: "common:account",
    icon: Users,
    action: handleAccount
  },
  {
    title: "common:settings",
    icon: Settings,
    action: handleUserSettings
  },
  {
    title: "common:signOut",
    icon: LogOut,
    action: handleSignOut
  }
]