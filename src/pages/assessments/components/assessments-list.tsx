import { ClipboardList } from "lucide-react"

import type { Assessment } from "../redux/assessments.types"
import { AssessmentCard } from "./assessment-card"

interface AssessmentsListProps {
  assessments: Assessment[]
  onView?: (id: string) => void
  onEnterMarks?: (id: string) => void
}

export function AssessmentsList({
  assessments,
  onView,
  onEnterMarks,
}: AssessmentsListProps) {
  if (assessments.length === 0) return <EmptyState />

  return (
    <div className="space-y-3">
      {assessments.map((assessment) => (
        <AssessmentCard
          key={assessment.id}
          assessment={assessment}
          onView={onView}
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
        <p className="font-medium">No assessments yet</p>
        <p className="text-sm text-muted-foreground">
          Create an assessment to start recording marks.
        </p>
      </div>
    </div>
  )
}
