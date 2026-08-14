import { Users } from "lucide-react"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Student } from "../redux/students.types"
import { StudentRow } from "./student-row"

interface StudentsTableProps {
  students: Student[]
  onOpen?: (id: string) => void
}

export function StudentsTable({ students, onOpen }: StudentsTableProps) {
  if (students.length === 0) return <EmptyState />

  return (
    <div className="mb-12 rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10" />
            <TableHead>Student</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Roll No.</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead>Internal</TableHead>
            <TableHead>Eligibility</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <StudentRow
              key={student.id}
              index={index + 1}
              student={student}
              onOpen={onOpen}
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
          Try adjusting your search or filters.
        </p>
      </div>
    </div>
  )
}
