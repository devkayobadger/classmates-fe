import type { Exam } from "../redux/exams.types"

import { ExamCard } from "./exam-card"

interface ExamsListProps {
  exams: Exam[]
  onEnterMarks?: (id: string) => void
}

export function ExamsList({
  exams,
  onEnterMarks,
}: ExamsListProps) {
  if (exams.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
        No exams have been created for this subject yet.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {exams.map((exam) => (
        <ExamCard
          key={exam.id}
          exam={exam}
          onEnterMarks={onEnterMarks}
        />
      ))}
    </div>
  )
}
