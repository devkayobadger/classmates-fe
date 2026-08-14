import { ClipboardCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  userName: string
  dateLabel: string
  totalClassesToday: number
  pendingAttendanceCount: number
  onTakePendingAttendance?: () => void
}

export function DashboardHeader({
  userName,
  dateLabel,
  totalClassesToday,
  pendingAttendanceCount,
  onTakePendingAttendance,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Good morning, {userName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {dateLabel} · You have {totalClassesToday} classes today,{" "}
          {pendingAttendanceCount} still needs attendance.
        </p>
      </div>

      <Button onClick={onTakePendingAttendance} className="shrink-0">
        <ClipboardCheck className="h-4 w-4" />
        Take pending attendance
      </Button>
    </div>
  )
}
