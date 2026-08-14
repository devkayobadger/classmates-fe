import { useRef, useState } from "react"
import { Users } from "lucide-react"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type {
  AttendanceStatus,
  AttendanceStudent,
} from "../redux/attendance-session.types"
import { AttendanceRow } from "./attendance-row"

interface AttendanceTableProps {
  students: AttendanceStudent[]
  onStatusChange: (id: string, status: AttendanceStatus) => void
  /** Disables status marking while no attendance session is active. */
  disabled?: boolean
}

export function AttendanceTable({
  students,
  onStatusChange,
  disabled = false,
}: AttendanceTableProps) {
  const rowGroupRefs = useRef<(HTMLDivElement | null)[]>([])
  const [focusedRowIndex, setFocusedRowIndex] = useState<number | null>(null)

  const handleNavigateVertical = (
    currentIndex: number,
    direction: "up" | "down"
  ) => {
    const nextIndex = direction === "down" ? currentIndex + 1 : currentIndex - 1

    if (nextIndex >= 0 && nextIndex < students.length) {
      const targetGroup = rowGroupRefs.current[nextIndex]
      if (!targetGroup) return

      const activeBtn = targetGroup.querySelector(
        '[role="radio"][tabindex="0"]'
      ) as HTMLButtonElement

      const fallbackBtn = targetGroup.querySelector(
        "button"
      ) as HTMLButtonElement

      ;(activeBtn || fallbackBtn)?.focus()
    }
  }

  if (students.length === 0) return <EmptyState />

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10" />
            <TableHead>Student</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <AttendanceRow
              key={student.id}
              index={index + 1}
              student={student}
              isFocused={focusedRowIndex === index}
              onFocus={() => setFocusedRowIndex(index)}
              onStatusChange={onStatusChange}
              disabled={disabled}
              onNavigateVertical={(direction) =>
                handleNavigateVertical(index, direction)
              }
              ref={(el) => {
                rowGroupRefs.current[index] = el
              }}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center gap-3 rounded-lg border border-dashed text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Users className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">No students found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search.
        </p>
      </div>
    </div>
  )
}
