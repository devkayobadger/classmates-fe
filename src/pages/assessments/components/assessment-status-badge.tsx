import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import type { AssessmentStatus } from "../redux/assessments.types"

const CONFIG: Record<AssessmentStatus, { label: string; className: string }> = {
  "marks-entered": {
    label: "Marks entered",
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

interface AssessmentStatusBadgeProps {
  status: AssessmentStatus
  className?: string
}

export function AssessmentStatusBadge({
  status,
  className,
}: AssessmentStatusBadgeProps) {
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
