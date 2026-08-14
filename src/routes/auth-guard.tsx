import { Navigate, Outlet } from "react-router-dom"

import { useAppSelector } from "@/lib/redux/hooks"

export default function AuthGuard() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
