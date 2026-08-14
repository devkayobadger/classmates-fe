import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Grade } from "../redux/assessments.types"

const CONFIG: Record<Grade, string> = {
  "A+": "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
  A: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
  "B+": "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
  B: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
  "C+": "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
  C: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
  "D+": "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
  D: "bg-red-50 text-red-700 border-red-200 hover:bg-red-50",
}

interface GradeBadgeProps {
  grade: Grade | null
}

export function GradeBadge({ grade }: GradeBadgeProps) {
  if (!grade) {
    return <span className="text-sm text-muted-foreground">—</span>
  }

  return (
    <Badge variant="outline" className={cn("font-medium", CONFIG[grade])}>
      {grade}
    </Badge>
  )
}
