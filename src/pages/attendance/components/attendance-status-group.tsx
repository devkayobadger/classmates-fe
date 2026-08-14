import { useEffect, useRef } from "react"

import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { AttendanceStatus } from "../redux/attendance-session.types"

const OPTIONS: AttendanceStatus[] = ["present", "absent", "late", "excused"]

const CONFIG: Record<
  AttendanceStatus,
  { label: string; shortcut: string; activeClassName: string }
> = {
  present: {
    label: "Present",
    shortcut: "p",
    activeClassName: "bg-success text-white hover:bg-success/90 shadow-sm",
  },
  late: {
    label: "Late",
    shortcut: "l",
    activeClassName: "bg-warning text-white hover:bg-warning/90 shadow-sm",
  },
  absent: {
    label: "Absent",
    shortcut: "a",
    activeClassName:
      "bg-destructive text-white hover:bg-destructive/90 shadow-sm",
  },
  excused: {
    label: "Excused",
    shortcut: "e",
    activeClassName: "bg-primary text-white hover:bg-primary/90 shadow-sm",
  },
}

interface AttendanceStatusGroupProps {
  value: AttendanceStatus
  onChange: (status: AttendanceStatus) => void
  onNavigateVertical?: (direction: "up" | "down") => void
  className?: string
  autoFocus?: boolean
  /** Disables status marking while no attendance session is active. */
  disabled?: boolean
}

export function AttendanceStatusGroup({
  value,
  onChange,
  onNavigateVertical,
  className,
  autoFocus = false,
  disabled = false,
}: AttendanceStatusGroupProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (!autoFocus) return

    const index = OPTIONS.indexOf(value)
    if (index !== -1) {
      buttonRefs.current[index]?.focus()
    }
  }, [autoFocus, value])

  const focusAndChange = (status: AttendanceStatus) => {
    const index = OPTIONS.indexOf(status)
    if (index !== -1) {
      buttonRefs.current[index]?.focus()
      onChange(status)
    }
  }

  const moveHorizontal = (index: number) => {
    const wrappedIndex = (index + OPTIONS.length) % OPTIONS.length
    buttonRefs.current[wrappedIndex]?.focus()
    onChange(OPTIONS[wrappedIndex])
  }

  return (
    <div
      role="radiogroup"
      aria-label="Attendance status"
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border bg-background p-1 shadow-sm",
        className
      )}
    >
      {OPTIONS.map((status, index) => {
        const isActive = value === status
        const { label, shortcut, activeClassName } = CONFIG[status]

        return (
          <Button
            key={status}
            ref={(el) => {
              buttonRefs.current[index] = el
            }}
            type="button"
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            variant="ghost"
            disabled={disabled}
            onClick={() => onChange(status)}
            onKeyDown={(e) => {
              if (disabled) return

              const key = e.key.toLowerCase()
              const matchedOption = OPTIONS.find((opt) => shortcut === key)

              if (matchedOption) {
                e.preventDefault()
                focusAndChange(matchedOption)
                return
              }

              switch (e.key) {
                case "ArrowRight":
                  e.preventDefault()
                  moveHorizontal(index + 1)
                  break

                case "ArrowLeft":
                  e.preventDefault()
                  moveHorizontal(index - 1)
                  break

                case "ArrowDown":
                  e.preventDefault()
                  onNavigateVertical?.("down")
                  break

                case "ArrowUp":
                  e.preventDefault()
                  onNavigateVertical?.("up")
                  break

                case "Home":
                  e.preventDefault()
                  focusAndChange(OPTIONS[0])
                  break

                case "End":
                  e.preventDefault()
                  focusAndChange(OPTIONS[OPTIONS.length - 1])
                  break

                case " ":
                case "Enter":
                  e.preventDefault()
                  onChange(status)
                  break
              }
            }}
            className={cn(
              "relative z-0 flex h-8 w-20 items-center justify-center gap-1.5 rounded-xl px-2 text-xs font-medium transition-all",
              "focus-visible:ring-gray-600",
              isActive
                ? activeClassName
                : "bg-transparent text-muted-foreground hover:bg-muted/60"
            )}
          >
            {isActive && <Check className="h-3 w-3" />}
            {label}
          </Button>
        )
      })}
    </div>
  )
}
