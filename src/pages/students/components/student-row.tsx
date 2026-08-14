import { TableCell, TableRow } from "@/components/ui/table"

import type { Student } from "../redux/students.types"
import { AttendanceBar } from "./attendance-bar"
import { EligibilityBadge } from "./eligibility-badge"
import { StudentAvatar } from "./student-avatar"

interface StudentRowProps {
  student: Student
  onOpen?: (id: string) => void
  index: number
}

export function StudentRow({ student, onOpen, index }: StudentRowProps) {
  return (
    <TableRow className="cursor-pointer" onClick={() => onOpen?.(student.id)}>
      <TableCell className="w-10 text-sm text-muted-foreground">
        {index}
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-3">
          <StudentAvatar name={student.name} color={student.avatarColor} />
          <div className="min-w-0">
            <p className="truncate font-medium">{student.name}</p>
            <p className="text-xs text-muted-foreground">
              {student.studentCode}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell className="text-muted-foreground">{student.subject}</TableCell>

      <TableCell className="text-muted-foreground">
        {student.rollNumber}
      </TableCell>

      <TableCell>
        <AttendanceBar value={student.attendancePercentage} />
      </TableCell>

      <TableCell className="text-muted-foreground">
        {student.internalMarks}/{student.internalMarksTotal}
      </TableCell>

      <TableCell>
        <EligibilityBadge status={student.eligibility} />
      </TableCell>
    </TableRow>
  )
}
