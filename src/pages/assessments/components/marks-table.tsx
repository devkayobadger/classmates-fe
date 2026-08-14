import { ClipboardList } from "lucide-react"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { MarksRow } from "./marks-row"
import type { StudentMark } from "../redux/assessments.types"

interface MarksTableProps {
  students: StudentMark[]
  totalMarks: number
  onMarksChange?: (id: string, value: number | null) => void
  editable?: boolean
}

export function MarksTable({
  students,
  totalMarks,
  onMarksChange,
  editable = true,
}: MarksTableProps) {
  if (students.length === 0) return <EmptyState />

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Student</TableHead>
            <TableHead>Roll No.</TableHead>
            <TableHead>Marks (/{totalMarks})</TableHead>
            <TableHead>Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <MarksRow
              key={student.id}
              student={student}
              totalMarks={totalMarks}
              onMarksChange={onMarksChange}
              editable={editable}
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
        <ClipboardList className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">No students found</p>
        <p className="text-sm text-muted-foreground">
          Add students to this subject to begin grading.
        </p>
      </div>
    </div>
  )
}
