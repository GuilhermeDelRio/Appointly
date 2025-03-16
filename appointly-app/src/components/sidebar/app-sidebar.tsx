import { Sidebar } from "@/components/ui/sidebar"

import { AppSidebarHeader } from "./app-sidebar-header"
import { AppSidebarContent } from "./app-sidebar-content"
import { AppSidebarFooter } from "./app-sidebar-footer"

export function AppSidebar() {
  return (
    <Sidebar>
      <AppSidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  )
}
