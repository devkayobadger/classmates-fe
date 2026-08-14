import { Navigate, Outlet } from "react-router-dom"

import { useAppSelector } from "@/lib/redux/hooks"

export default function GuestGuard() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
