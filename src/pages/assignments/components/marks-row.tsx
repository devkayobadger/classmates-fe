import { forwardRef, useEffect, useRef } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

import type {
  AssignmentCompletionStatus,
  StudentMark,
} from "../redux/assignments.types"
import { StudentAvatar } from "./student-avatar"

const OPTIONS: AssignmentCompletionStatus[] = [
  "done",
  "not_done",
  "late",
  "excused",
]

const CONFIG: Record<
  AssignmentCompletionStatus,
  { label: string; shortcut: string }
> = {
  done: {
    label: "Done",
    shortcut: "d",
  },
  not_done: {
    label: "Not done",
    shortcut: "n",
  },
  late: {
    label: "Late",
    shortcut: "l",
  },
  excused: {
    label: "Excused",
    shortcut: "e",
  },
}

interface MarksRowProps {
  index: number
  student: StudentMark
  onStatusChange?: (id: string, value: AssignmentCompletionStatus) => void
  onNavigateVertical?: (direction: "up" | "down") => void
  editable?: boolean
}

export const MarksRow = forwardRef<HTMLDivElement, MarksRowProps>(
  (
    { index, student, onStatusChange, onNavigateVertical, editable },
    ref
  ) => {
    const currentStatus = student.status || "done"

    return (
      <TableRow className="h-10">
        <TableCell className="w-8 text-sm text-muted-foreground">
          {index}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <StudentAvatar name={student.name} color={student.avatarColor} />
            <p className="text-sm font-medium">{student.name}</p>
          </div>
        </TableCell>
        <TableCell className="text-xs text-muted-foreground">
          {student.studentCode ?? student.rollNumber}
        </TableCell>
        <TableCell className="text-right py-1">
          <div ref={ref} className="inline-block">
            <AssignmentStatusGroup
              value={currentStatus}
              onChange={(status) => onStatusChange?.(student.id, status)}
              onNavigateVertical={onNavigateVertical}
              autoFocus={index === 1}
              disabled={!editable}
            />
          </div>
        </TableCell>
      </TableRow>
    )
  }
)

MarksRow.displayName = "MarksRow"

function AssignmentStatusGroup({
  value,
  onChange,
  onNavigateVertical,
  autoFocus = false,
  disabled = false,
}: {
  value: AssignmentCompletionStatus | null
  onChange: (status: AssignmentCompletionStatus) => void
  onNavigateVertical?: (direction: "up" | "down") => void
  autoFocus?: boolean
  disabled?: boolean
}) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const selectedIndex = value === null ? -1 : OPTIONS.indexOf(value)

  useEffect(() => {
    if (autoFocus) buttonRefs.current[selectedIndex === -1 ? 0 : selectedIndex]?.focus()
  }, [autoFocus, selectedIndex])

  const select = (status: AssignmentCompletionStatus) => {
    buttonRefs.current[OPTIONS.indexOf(status)]?.focus()
    onChange(status)
  }

  return (
    <div
      role="radiogroup"
      aria-label="Assignment submission status"
      className="inline-flex items-center gap-1 rounded-xl border bg-background p-1 shadow-sm"
    >
      {OPTIONS.map((status, index) => {
        const active = status === value
        const config = CONFIG[status]
        return (
          <Button
            key={status}
            ref={(element) => {
              buttonRefs.current[index] = element
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active || (value === null && index === 0) ? 0 : -1}
            variant="ghost"
            disabled={disabled}
            onClick={() => onChange(status)}
            onKeyDown={(event) => {
              if (disabled) return
              const matched = OPTIONS.find(
                (option) => CONFIG[option].shortcut === event.key.toLowerCase()
              )
              if (matched) {
                event.preventDefault()
                select(matched)
                return
              }
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault()
                select(
                  OPTIONS[
                    (index +
                      (event.key === "ArrowRight" ? 1 : -1) +
                      OPTIONS.length) %
                      OPTIONS.length
                  ]
                )
                return
              }
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault()
                onNavigateVertical?.(
                  event.key === "ArrowDown" ? "down" : "up"
                )
                return
              }
              if (event.key === "Home") {
                event.preventDefault()
                select(OPTIONS[0])
              }
              if (event.key === "End") {
                event.preventDefault()
                select(OPTIONS[OPTIONS.length - 1])
              }
            }}
            className={cn(
              "relative z-0 flex h-8 min-w-20 items-center justify-center gap-1.5 rounded-xl px-2 text-xs font-medium transition-all focus-visible:ring-gray-600",
              active
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                : "bg-transparent text-muted-foreground hover:bg-muted/60"
            )}
          >
            {active && <Check className="h-3 w-3" />}
            {config.label}
          </Button>
        )
      })}
    </div>
  )
}