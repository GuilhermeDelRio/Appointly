import { useTranslation } from 'react-i18next'

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { ChevronDown } from 'lucide-react'
import { Settings } from 'lucide-react'

export function AppSidebarHeader() {
  const { t } = useTranslation()

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  CF
                </div>

                <span className="truncate font-semibold">Clínica Flowers</span>
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">

              <DropdownMenuItem>
                <Settings className="mr-2" />
                <span>{t('common:settings')}</span>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}