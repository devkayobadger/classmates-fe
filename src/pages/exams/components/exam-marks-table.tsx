import { Users } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { ExamStudentMark } from "../redux/exams.types"
import { ExamMarksRow } from "./exam-marks-row"

interface ExamMarksTableProps {
  students: ExamStudentMark[]
  totalMarks: number
  onMarksChange: (
    studentId: string,
    value: number | null
  ) => void
  onSave: () => void
  isSaving: boolean
  hasChanges: boolean
}

export function ExamMarksTable({
  students,
  totalMarks,
  onMarksChange,
  onSave,
  isSaving,
  hasChanges,
}: ExamMarksTableProps) {
  if (students.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Student</TableHead>

                  <TableHead>Roll No.</TableHead>

                  <TableHead>
                    Marks (/{totalMarks})
                  </TableHead>

                  <TableHead>Grade</TableHead>
                </TableRow>
            </TableHeader>

          <TableBody>
            {students.map((student) => (
              <ExamMarksRow
                key={student.id}
                student={student}
                totalMarks={totalMarks}
                onMarksChange={onMarksChange}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end">
        <Button
          onClick={onSave}
          disabled={!hasChanges || isSaving}
        >
          {isSaving ? "Saving..." : "Save Marks"}
        </Button>
      </div>
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
        <p className="font-medium">
          No students found
        </p>

        <p className="text-sm text-muted-foreground">
          Add students to this subject to enter exam marks.
        </p>
      </div>
    </div>
  )
}