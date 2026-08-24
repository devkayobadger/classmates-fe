import { ClipboardList } from "lucide-react"

import type { Assignment } from "../redux/assignments.types"
import { AssignmentCard } from "./assignment-card"

interface AssignmentsListProps {
  assignments: Assignment[]
  onEdit: (assignment: Assignment) => void
  onDelete: (assignment: Assignment) => void
  onEnterMarks: (id: string) => void
}

export function AssignmentsList({ assignments, onEdit, onDelete, onEnterMarks }: AssignmentsListProps) {
  if (assignments.length === 0) return <EmptyState />

  return (
    <div className="space-y-3">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          onEdit={onEdit}
          onDelete={onDelete}
          onEnterMarks={onEnterMarks}
        />
      ))}
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
        <p className="font-medium">No assignments found</p>
        <p className="text-sm text-muted-foreground">Create an assignment or adjust your filters.</p>
      </div>
    </div>
  )
}
