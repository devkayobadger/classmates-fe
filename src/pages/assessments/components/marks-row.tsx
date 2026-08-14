import { TableCell, TableRow } from "@/components/ui/table"

import type { StudentMark } from "../redux/assessments.types"
import { GradeBadge } from "./grade-badge"
import { MarkInput } from "./mark-input"
import { StudentAvatar } from "./student-avatar"
import { computeGrade } from "../utils/grade-utils"

interface MarksRowProps {
  student: StudentMark
  totalMarks: number
  onMarksChange?: (id: string, value: number | null) => void
  editable?: boolean
}

export function MarksRow({
  student,
  totalMarks,
  onMarksChange,
  editable,
}: MarksRowProps) {
  const grade = computeGrade(student.marks, totalMarks)

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <StudentAvatar name={student.name} color={student.avatarColor} />
          <p className="font-medium">{student.name}</p>
        </div>
      </TableCell>

      <TableCell className="text-muted-foreground">
        {student.rollNumber}
      </TableCell>

      <TableCell>
        <MarkInput
          value={student.marks}
          max={totalMarks}
          onChange={(value) => onMarksChange?.(student.id, value)}
          editable={editable}
        />
      </TableCell>

      <TableCell>
        <GradeBadge grade={grade} />
      </TableCell>
    </TableRow>
  )
}
