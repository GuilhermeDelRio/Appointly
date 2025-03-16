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

import { ChevronUpDown } from "@mynaui/icons-react"
import { User } from "@mynaui/icons-react"
import { Cog } from "@mynaui/icons-react"
import { Logout } from "@mynaui/icons-react"

export function AppSidebarFooter() {
  return (
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
                <ChevronUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <User className="mr-2" />
                <span>Account</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Cog className="mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Logout className="mr-2" />
                <span>Sign out</span>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}