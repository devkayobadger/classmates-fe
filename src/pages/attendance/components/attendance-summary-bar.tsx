import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import type {
  AttendanceStatus,
  AttendanceStudent,
} from "../redux/attendance-session.types"

interface AttendanceSummaryBarProps {
  counts: Record<AttendanceStatus, number>
  students: AttendanceStudent[]
}

const ORDER: AttendanceStatus[] = ["present", "late", "absent", "excused"]

const SEGMENT_CONFIG: Record<
  AttendanceStatus,
  { label: string; barClassName: string; dotClassName: string }
> = {
  present: {
    label: "present",
    barClassName: "bg-success",
    dotClassName: "bg-success",
  },
  late: {
    label: "late",
    barClassName: "bg-warning",
    dotClassName: "bg-warning",
  },
  absent: {
    label: "absent",
    barClassName: "bg-destructive",
    dotClassName: "bg-destructive",
  },
  excused: {
    label: "excused",
    barClassName: "bg-primary",
    dotClassName: "bg-primary",
  },
}

export function AttendanceSummaryBar({
  counts,
  students,
}: AttendanceSummaryBarProps) {
  const total = ORDER.reduce((sum, status) => sum + counts[status], 0)

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center">
        <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-muted">
          {ORDER.map((status) => {
            const count = counts[status]
            if (count === 0 || total === 0) return null
            const width = (count / total) * 100
            const filteredStudents = students.filter((s) => s.status === status)

            return (
              <Tooltip key={status}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      SEGMENT_CONFIG[status].barClassName,
                      "cursor-pointer transition-opacity hover:opacity-80"
                    )}
                    style={{ width: `${width}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-xs rounded-md border bg-popover p-3 text-popover-foreground shadow-md"
                >
                  <StudentTooltipContent
                    label={SEGMENT_CONFIG[status].label}
                    students={filteredStudents}
                    count={count}
                  />
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {ORDER.map((status) => {
            const filteredStudents = students.filter((s) => s.status === status)
            const count = counts[status]

            return (
              <Tooltip key={status}>
                <TooltipTrigger asChild>
                  <span className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-foreground">
                    <span
                      className={`h-2 w-2 rounded-full ${SEGMENT_CONFIG[status].dotClassName}`}
                    />
                    <span className="font-medium text-foreground">{count}</span>{" "}
                    {SEGMENT_CONFIG[status].label}
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-xs rounded-md border bg-popover p-3 text-popover-foreground shadow-md"
                >
                  <StudentTooltipContent
                    label={SEGMENT_CONFIG[status].label}
                    students={filteredStudents}
                    count={count}
                  />
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}

function StudentTooltipContent({
  label,
  students,
  count,
}: {
  label: string
  students: AttendanceStudent[]
  count: number
}) {
  return (
    <div className="space-y-1.5">
      <p className="border-b pb-1 text-xs font-semibold tracking-wide text-foreground capitalize">
        {label} ({count})
      </p>
      {students.length === 0 ? (
        <p className="text-xs text-muted-foreground">None</p>
      ) : (
        <ul className="max-h-40 space-y-1 overflow-y-auto pr-1">
          {students.map((student) => (
            <li
              key={student.id}
              className="flex items-center justify-between gap-3 text-xs"
            >
              <span className="truncate font-medium text-foreground">
                {student.name}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {student.studentCode}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
