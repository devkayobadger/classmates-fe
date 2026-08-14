import { TableCell, TableRow } from "@/components/ui/table"

import type { ExamStudentMark } from "../redux/exams.types"
import { computeExamGrade } from "../utils/exam-grade-utils"
import { ExamGradeBadge } from "./exam-grade-badge"
import { ExamStudentAvatar } from "./exam-student-avatar"
import { ExamMarkInput } from "./exam-mark-input"


interface ExamMarksRowProps {
  student: ExamStudentMark
  totalMarks: number
  onMarksChange: (
    studentId: string,
    value: number | null
  ) => void
}

export function ExamMarksRow({
  student,
  totalMarks,
  onMarksChange,
}: ExamMarksRowProps) {
  const grade = computeExamGrade(
    student.marks,
    totalMarks
  )

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <ExamStudentAvatar
            name={student.name}
            color={student.avatarColor}
          />

          <p className="font-medium">
            {student.name}
          </p>
        </div>
      </TableCell>

      <TableCell className="text-muted-foreground">
        {student.rollNumber}
      </TableCell>

      <TableCell>
        <ExamMarkInput
          value={student.marks}
          max={totalMarks}
          onChange={(value) =>
            onMarksChange(student.id, value)
          }
        />
      </TableCell>

      <TableCell>
        <ExamGradeBadge grade={grade} />
      </TableCell>
    </TableRow>
  )
}