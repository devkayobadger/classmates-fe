import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import type { AvatarColor } from "../redux/attendance-session.types"

const COLOR_CLASSES: Record<AvatarColor, string> = {
  violet: "bg-violet-100 text-violet-700",
  blue: "bg-blue-100 text-blue-700",
  rose: "bg-rose-100 text-rose-700",
  green: "bg-emerald-100 text-emerald-700",
  teal: "bg-teal-100 text-teal-700",
  amber: "bg-amber-100 text-amber-700",
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ""
  return `${first}${last}`.toUpperCase()
}

interface StudentAvatarProps {
  name: string
  color: AvatarColor
  className?: string
}

export function StudentAvatar({ name, color, className }: StudentAvatarProps) {
  return (
    <Avatar className={cn("h-9 w-9", className)}>
      <AvatarFallback className={cn("font-medium", COLOR_CLASSES[color])}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
