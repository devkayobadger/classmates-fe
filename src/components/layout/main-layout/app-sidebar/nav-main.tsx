import { NavLink } from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { NavItem } from "@/lib/constants/nav-items"

interface Props {
  items: NavItem[]
}

export default function NavMain({ items }: Props) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {({ isActive }) => (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <span>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </NavLink>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
