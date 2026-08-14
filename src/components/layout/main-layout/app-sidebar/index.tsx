import Logo from "@/assets/logo.png"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { NAV_ITEMS } from "@/lib/constants/nav-items"
import { useIsSuperUser, usePermissions } from "@/hooks/use-has-permissions"

import NavMain from "./nav-main"
import NavUser from "./nav-user"

export default function AppSidebar() {
  const permissions = usePermissions()
  const isSuperUser = useIsSuperUser()

  const items = NAV_ITEMS.filter(
    (item) =>
      !item.permission || permissions.includes(item.permission) || isSuperUser
  )

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 border-b">
        <div className="flex items-center gap-3 px-4 transition-all duration-200 group-data-[collapsible=icon]:px-0">
          <img src={Logo} alt="Classmates Logo" className="size-8 shrink-0" />

          <div className="min-w-0 overflow-hidden transition-all duration-200 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
            <p className="truncate text-sm font-semibold">Classmates</p>

            <p className="truncate text-xs text-muted-foreground">
              Trinity College
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
