import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { ExamsHeader } from "./components/exams-header"
import { ExamsList } from "./components/exams-list"
import { useExams } from "./hooks/use-exams"

export default function ExamsPage() {
  const [selectedSubjectId, setSelectedSubjectId] =
    useState<string>()

  const { data, isLoading, error } = useExams(selectedSubjectId)
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
        Loading exams…
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
        Failed to load exams. Please try again later.
      </div>
    )
  }

  const activeSubject =
    data.subjects.find(
      (subject) => subject.id === selectedSubjectId
    ) ?? data.subject

  return (
    <div className="space-y-6 p-6">
      <ExamsHeader
        subject={activeSubject}
        program={data.program}
        semester={data.semester}
        subjects={data.subjects}
        onSubjectChange={setSelectedSubjectId}
      />

      <ExamsList
        exams={data.exams}
        onEnterMarks={(id) => {
          navigate(`/exams/${id}/edit`)
        }}
      />
    </div>
  )
}