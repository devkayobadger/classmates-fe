import { useMemo, useState } from "react"

import { useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { notifier } from "@/lib/utils/notifier"

import MarksHeader from "../../components/marks-header"
import { MarksTable } from "../../components/marks-table"
import { useAssignmentMarks } from "../../hooks/use-assignment-marks"
import { saveAssignmentStatuses } from "../../redux/assignments.api"
import type { AssignmentCompletionStatus } from "../../redux/assignments.types"

export default function AssignmentMarksPage() {
  const { id = "" } = useParams()
  const { data, isLoading, error } = useAssignmentMarks(id)
  const [editedStatuses, setEditedStatuses] = useState<
    Record<string, AssignmentCompletionStatus>
  >({})
  const [isSaving, setIsSaving] = useState(false)

  const students = useMemo(
    () =>
      data?.students.map((student) => ({
        ...student,
        status: editedStatuses[student.id] ?? student.status,
      })) ?? [],
    [data, editedStatuses]
  )
  const completed = students.filter(
    (student) => student.status === "done"
  ).length
  const notDone = students.filter(
    (student) => student.status === "not_done"
  ).length
  const late = students.filter((student) => student.status === "late").length
  const excused = students.filter(
    (student) => student.status === "excused"
  ).length

  async function handleSave() {
    if (!data) return
    setIsSaving(true)
    try {
      await saveAssignmentStatuses(
        data.assignmentId,
        Object.entries(editedStatuses).map(([studentId, status]) => ({
          studentId,
          status,
        }))
      )
      setEditedStatuses({})
      notifier.success("Assignment statuses saved successfully.")
    } catch (saveError) {
      console.error("Failed to save assignment statuses:", saveError)
      notifier.error("Couldn't save assignment statuses. Please retry.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <StateMessage>Loading assignment…</StateMessage>
  if (error || !data)
    return <StateMessage>Failed to load assignment.</StateMessage>

  return (
    <div className="space-y-6 p-6">
      <MarksHeader
        title={data.title}
        subject={data.subject}
        program={data.program}
        semester={data.semester}
        dueDate={formatDate(data.dueDate)}
      />
      <MarksTable
        students={students}
        onStatusChange={(studentId, status) =>
          setEditedStatuses((current) => ({ ...current, [studentId]: status }))
        }
      />
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving || Object.keys(editedStatuses).length === 0}
        >
          {isSaving ? "Saving..." : "Save statuses"}
        </Button>
      </div>
    </div>
  )
}

function StateMessage({ children }: { children: string }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
      {children}
    </div>
  )
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
