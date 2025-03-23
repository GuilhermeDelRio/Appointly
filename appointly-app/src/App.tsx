import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { GlobalDialog } from "./components/GlobalDialog/GlobalDialog"
import { ThemeProvider } from './components/ThemeProvider/theme-provider'

import { Toaster } from 'sonner'

export function App({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()

  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage')
    if (savedLang) {
      i18n.changeLanguage(savedLang)
    }
  }, [i18n])

  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <GlobalDialog />
        <Toaster richColors/>
        <main style={{ width: '50%', flexGrow: 1 }}>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}