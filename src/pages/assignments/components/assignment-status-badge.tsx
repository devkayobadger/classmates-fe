import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import type { AssignmentStatus } from "../redux/assignments.types"

const CONFIG: Record<AssignmentStatus, { label: string; className: string }> = {
  "statuses-entered": {
    label: "Statuses entered",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
  },
  "in-progress": {
    label: "In progress",
    className: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
  },
  "not-started": {
    label: "Not started",
    className:
      "bg-muted text-muted-foreground border-transparent hover:bg-muted",
  },
}

interface AssignmentStatusBadgeProps {
  status: AssignmentStatus
  className?: string
}

export function AssignmentStatusBadge({
  status,
  className,
}: AssignmentStatusBadgeProps) {
  const { label, className: toneClassName } = CONFIG[status]

  return (
    <Badge
      variant="outline"
      className={cn("font-medium", toneClassName, className)}
    >
      {label}
    </Badge>
  )
}
