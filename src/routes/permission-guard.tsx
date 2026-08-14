import { Navigate } from "react-router-dom"

import { useHasPermission } from "@/hooks/use-has-permissions"

interface PermissionGuardProps {
  permission?: string
  children: React.ReactNode
}

export default function PermissionGuard({
  permission,
  children,
}: PermissionGuardProps) {
  const hasPermission = useHasPermission(permission)

  if (!hasPermission) {
    return <Navigate to="/401" replace />
  }

  return <>{children}</>
}
