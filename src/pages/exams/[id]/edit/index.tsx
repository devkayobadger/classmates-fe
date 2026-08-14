import { useMemo, useState } from "react"

import { useParams } from "react-router-dom"

import { notifier } from "@/lib/utils/notifier"
import { ExamMarksHeader } from "../../components/exam-marks-header"
import { ExamMarksTable } from "../../components/exam-marks-table"
import { useExamMarks } from "../../hooks/use-exam-marks"
import { saveExamMarks } from "../../redux/exams.api"

export default function EditExamMarks() {
  const { id = "" } = useParams()

  const {
    data,
    isLoading,
    error,
  } = useExamMarks(id)

  const [
    editedMarks,
    setEditedMarks,
  ] = useState<Record<string, number | null>>({})

  const [isSaving, setIsSaving] = useState(false)

  const students = useMemo(() => {
    if (!data) return []

    return data.students.map((student) => ({
      ...student,

      marks:
        editedMarks[student.id] !== undefined
          ? editedMarks[student.id]
          : student.marks,
    }))
  }, [data, editedMarks])

  function handleMarksChange(
    studentId: string,
    value: number | null
  ) {
    setEditedMarks((previous) => ({
      ...previous,
      [studentId]: value,
    }))
  }

  async function handleSave() {
    if (!data) return

    setIsSaving(true)

    try {

      const marksToSave = Object.entries(
        editedMarks
      ).map(([studentId, marks]) => ({
        studentId,
        marks,
      }))

      await saveExamMarks(data.examId, marksToSave)
      notifier.success("Marks saved successfully.")

      // Clear the local changes after successful save.
      setEditedMarks({})
    } catch (error) {
      console.error("Failed to save marks:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (error || !data) {
    return <Error />
  }

  return (
    <div className="space-y-6 p-6">
      <ExamMarksHeader
        title={data.title}
        totalMarks={data.totalMarks}
        subject={data.subject}
        program={data.program}
        semester={data.semester}
        dateLabel={data.dateLabel}
      />

      <ExamMarksTable
        students={students}
        totalMarks={data.totalMarks}
        onMarksChange={handleMarksChange}
        onSave={handleSave}
        isSaving={isSaving}
        hasChanges={Object.keys(editedMarks).length > 0}
      />
    </div>
  )
}

function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
      Loading exam…
    </div>
  )
}

function Error() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
      Failed to load exam.
    </div>
  )
}