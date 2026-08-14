import { useMemo } from "react"

import { useParams } from "react-router-dom"

import MarksHeader from "../components/marks-header"
import { MarksProgressSummary } from "../components/marks-progress"
import { MarksTable } from "../components/marks-table"
import { useAssessmentMarks } from "../hooks/use-assessment-marks"

const ViewAssessmentMarks = () => {
  const { id = "" } = useParams()

  const { data, isLoading, error } = useAssessmentMarks(id)

  const students = useMemo(() => {
    if (!data) return []

    return data.students
  }, [data])

  const entered = useMemo(
    () => students.filter((student) => student.marks !== null).length,
    [students]
  )

  const average = useMemo(() => {
    if (entered === 0) return null

    const total = students.reduce(
      (sum, student) => sum + (student.marks ?? 0),
      0
    )

    return total / entered
  }, [students, entered])

  if (isLoading) return <Loading />

  if (error || !data) return <Error />

  return (
    <div className="space-y-6 p-6">
      <MarksHeader
        title={data.title}
        marks={data.totalMarks}
        subject={data.subject}
        program={data.program}
        semester={data.semester}
        dueDate={data.dateLabel}
      />

      <MarksProgressSummary
        entered={entered}
        total={students.length}
        average={average}
        maxMarks={data.totalMarks}
      />

      <MarksTable
        students={students}
        totalMarks={data.totalMarks}
        editable={false}
      />
    </div>
  )
}

function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
      Loading assessment…
    </div>
  )
}

function Error() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
      Failed to load assessment.
    </div>
  )
}

export default ViewAssessmentMarks
