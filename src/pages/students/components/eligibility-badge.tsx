import { AlertTriangle, CheckCircle2, OctagonAlert } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import type { EligibilityStatus } from "../redux/students.types"

const CONFIG: Record<
  EligibilityStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  eligible: {
    label: "Eligible",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
    icon: CheckCircle2,
  },
  borderline: {
    label: "Borderline",
    className: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
    icon: AlertTriangle,
  },
  "at-risk": {
    label: "At risk",
    className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-50",
    icon: OctagonAlert,
  },
}

interface EligibilityBadgeProps {
  status: EligibilityStatus
  className?: string
}

export function EligibilityBadge({ status, className }: EligibilityBadgeProps) {
  const { label, className: toneClassName, icon: Icon } = CONFIG[status]

  return (
    <Badge
      variant="outline"
      className={cn("gap-1 font-medium", toneClassName, className)}
    >
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  )
}
