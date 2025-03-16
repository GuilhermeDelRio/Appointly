import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

import { ChevronsDownUp } from 'lucide-react'

import { getFooterItems } from './app-sidebar-footer-items'
import { UserSettingsDialog } from './UserSettingsDialog'


export function AppSidebarFooter() {
  const { t } = useTranslation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleUserSettings = () => {
    setIsDialogOpen(true)
  }
  
  const footerItems = getFooterItems(handleUserSettings)

  return (
    <>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    GR
                  </div>

                  Guilherme Del Rio
                  <ChevronsDownUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {footerItems.map((item) => (
                    <DropdownMenuItem key={item.title} onClick={item.action}>
                      <item.icon />
                      <span>{ t(item.title) }</span>
                    </DropdownMenuItem>
                  ))
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      
      <UserSettingsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </> 
  )
}