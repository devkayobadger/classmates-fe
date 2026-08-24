import { useRef } from "react"
import { ClipboardList } from "lucide-react"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { MarksRow } from "./marks-row"
import type {
  AssignmentCompletionStatus,
  StudentMark,
} from "../redux/assignments.types"

interface MarksTableProps {
  students: StudentMark[]
  onStatusChange?: (id: string, value: AssignmentCompletionStatus) => void
  editable?: boolean
}

export function MarksTable({
  students,
  onStatusChange,
  editable = true,
}: MarksTableProps) {
  const rowGroupRefs = useRef<(HTMLDivElement | null)[]>([])

  if (students.length === 0) return <EmptyState />

  const handleNavigateVertical = (
    currentIndex: number,
    direction: "up" | "down"
  ) => {
    const nextIndex = direction === "down" ? currentIndex + 1 : currentIndex - 1
    const targetGroup = rowGroupRefs.current[nextIndex]
    if (!targetGroup) return

    const activeButton = targetGroup.querySelector(
      '[role="radio"][tabindex="0"]'
    ) as HTMLButtonElement | null
    ;(activeButton ?? targetGroup.querySelector("button"))?.focus()
  }

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10" />
            <TableHead>Student</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead className="text-right">Submission status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <MarksRow
              key={student.id}
              index={index + 1}
              student={student}
              onStatusChange={onStatusChange}
              editable={editable}
              onNavigateVertical={(direction) =>
                handleNavigateVertical(index, direction)
              }
              ref={(element) => {
                rowGroupRefs.current[index] = element
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
        <ClipboardList className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">No students found</p>
        <p className="text-sm text-muted-foreground">
          Add students to this subject to start tracking assignments.
        </p>
      </div>
    </div>
  )
}
