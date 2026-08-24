import { cn } from "@/lib/utils"

import type { AssignmentStatus } from "../redux/assignments.types"

interface AssignmentProgressProps {
  entered: number
  total: number
  status: AssignmentStatus
  className?: string
}

const BAR_COLOR: Record<AssignmentStatus, string> = {
  "statuses-entered": "bg-emerald-500",
  "in-progress": "bg-amber-500",
  "not-started": "bg-muted-foreground/20",
}

export function AssignmentProgress({
  entered,
  total,
  status,
  className,
}: AssignmentProgressProps) {
  const percentage = total === 0 ? 0 : Math.round((entered / total) * 100)

  return (
    <div className={cn("w-36 shrink-0 text-right", className)}>
      <p className="flex justify-between text-sm">
        <span className="text-muted-foreground">Updated</span>{" "}
        <span className="font-medium">
          {entered}/{total}
        </span>
      </p>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", BAR_COLOR[status])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
