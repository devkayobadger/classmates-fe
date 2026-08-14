import { forwardRef } from "react"
import { AlertTriangle } from "lucide-react"

import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

import type {
  AttendanceStatus,
  AttendanceStudent,
} from "../redux/attendance-session.types"
import { AttendanceStatusGroup } from "./attendance-status-group"
import { StudentAvatar } from "./student-avatar"

interface AttendanceRowProps {
  index: number
  student: AttendanceStudent
  isFocused?: boolean
  onFocus?: () => void
  onStatusChange: (id: string, status: AttendanceStatus) => void
  onNavigateVertical?: (direction: "up" | "down") => void
  /** Disables status marking while no attendance session is active. */
  disabled?: boolean
}

export const AttendanceRow = forwardRef<HTMLDivElement, AttendanceRowProps>(
  (
    {
      index,
      student,
      isFocused,
      onFocus,
      onStatusChange,
      onNavigateVertical,
      disabled,
    },
    ref
  ) => {
    return (
      <TableRow
        onFocus={onFocus}
        className={cn(
          isFocused && "bg-gray-100 transition-colors dark:bg-gray-800"
        )}
      >
        <TableCell className="w-10 text-sm text-muted-foreground">
          {index}
        </TableCell>

        <TableCell>
          <div className="flex items-center gap-3">
            <StudentAvatar name={student.name} color={student.avatarColor} />
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-xs text-muted-foreground">
                {student.studentCode}
              </p>
              {student.atRisk && (
                <p className="mt-0.5 flex items-center gap-1 text-xs text-amber-600">
                  <AlertTriangle className="h-3 w-3" />
                  {student.atRisk.label} · {student.atRisk.percentage}%
                </p>
              )}
            </div>
          </div>
        </TableCell>

        <TableCell className="text-right">
          <div ref={ref} className="inline-block">
            <AttendanceStatusGroup
              value={student.status}
              onChange={(status) => onStatusChange(student.id, status)}
              onNavigateVertical={onNavigateVertical}
              autoFocus={index === 1} // index is 1 based
              className="ml-auto"
              disabled={disabled}
            />
          </div>
        </TableCell>
      </TableRow>
    )
  }
)

AttendanceRow.displayName = "AttendanceRow"
