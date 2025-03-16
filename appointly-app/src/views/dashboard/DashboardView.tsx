import { LayoutDashboard } from 'lucide-react'
import { Header } from "@/components/header/Header"

export function DashboardView() {
  return (
    <div>
      <Header 
        titleLabel="Dashboard" 
        titleIcon={ LayoutDashboard }
      />
    </div>
  )
}