import { cn } from "@/lib/utils"

import type { AssessmentStatus } from "../redux/assessments.types"

interface AssessmentProgressProps {
  entered: number
  total: number
  status: AssessmentStatus
  className?: string
}

const BAR_COLOR: Record<AssessmentStatus, string> = {
  "marks-entered": "bg-emerald-500",
  "in-progress": "bg-amber-500",
  "not-started": "bg-muted-foreground/20",
}

export function AssessmentProgress({
  entered,
  total,
  status,
  className,
}: AssessmentProgressProps) {
  const percentage = total === 0 ? 0 : Math.round((entered / total) * 100)

  return (
    <div className={cn("w-36 shrink-0 text-right", className)}>
      <p className="flex justify-between text-sm">
        <span className="text-muted-foreground">Entered</span>{" "}
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
