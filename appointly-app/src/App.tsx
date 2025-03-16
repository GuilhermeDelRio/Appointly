import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { GlobalDialog } from "./components/GlobalDialog/GlobalDialog"

export function App({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <GlobalDialog />
      <main className="flex flex-col w-full h-screen overflow-y-hidden">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}