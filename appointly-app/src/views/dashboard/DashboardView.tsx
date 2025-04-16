import { systemInfoService } from '@/services/systemInfoService'
import { LayoutDashboard } from 'lucide-react'
import { Header } from "@/components/header/Header"
import { useEffect } from 'react'

export function DashboardView() {
  useEffect(() => {
    const fetchData = async () => {
      
      const response = await systemInfoService.getAll()

      localStorage.setItem('systemInfo', JSON.stringify(response.data))
    }

    fetchData()
  })

  return (
    <div className="flex flex-col p-2">
      <Header 
        titleLabel="dashboard:name" 
        titleIcon={ LayoutDashboard }
      />
    </div>
  )
}