import { LayoutDashboard } from 'lucide-react'
import { Header } from "@/components/header/Header"

export function DashboardView() {
  return (
    <div className="flex flex-col p-2">
      <Header 
        titleLabel="dashboard:name" 
        titleIcon={ LayoutDashboard }
      />
    </div>
  )
}