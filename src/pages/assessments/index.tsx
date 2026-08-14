import { useMemo, useState } from "react"

import { useNavigate } from "react-router-dom"

import { AssessmentsHeader } from "./components/assessments-header"
import { AssessmentsList } from "./components/assessments-list"
import { useAssessments } from "./hooks/use-assessments"

export default function AssessmentsPage() {
  const { data, isLoading, error } = useAssessments()
  const [selectedSubject, setSelectedSubject] = useState<string>()
  const navigate = useNavigate()

  const activeSubject = selectedSubject ?? data?.subject ?? ""

  const assessments = useMemo(() => {
    if (!data) return []
    return data.assessments
  }, [data])

  if (isLoading) return <Loading />

  if (error || !data) return <Error />

  return (
    <div className="space-y-6 p-6">
      <AssessmentsHeader
        subject={activeSubject}
        program={data.program}
        semester={data.semester}
        subjects={data.subjects}
        onSubjectChange={setSelectedSubject}
        onNewAssessment={() => {
          // TODO: open the create-assessment dialog / navigate to the create flow
        }}
      />

      <AssessmentsList
        assessments={assessments}
        onView={(id) => {
          navigate(`/assessments/${id}`)
        }}
        onEnterMarks={(id) => {
          navigate(`/assessments/${id}/edit`)
        }}
      />
    </div>
  )
}

function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
      Loading assessments…
    </div>
  )
}

function Error() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
      Failed to load assessments. Please try again later.
    </div>
  )
}
