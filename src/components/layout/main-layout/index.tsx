import { Outlet } from "react-router-dom"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setSidebar } from "@/lib/common/redux/common.slice"

import AppHeader from "./app-header"
import AppSidebar from "./app-sidebar"
import { AppFooter } from "./app-footer"

export default function MainLayout() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector((state) => state.common.sidebarOpen)

  return (
    <SidebarProvider
      open={sidebarOpen}
      onOpenChange={(open) => dispatch(setSidebar(open))}
    >
      <AppSidebar />

      <SidebarInset>
        <AppHeader />

        <main className="mb-16 flex-1 pb-6">
          <Outlet />
        </main>

        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}
