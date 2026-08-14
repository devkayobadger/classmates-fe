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