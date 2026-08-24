import { useMemo, useState } from "react"

import { useNavigate } from "react-router-dom"

import { notifier } from "@/lib/utils/notifier"

import { AssignmentDialog } from "./components/assignment-dialog"
import { AssignmentsHeader } from "./components/assignments-header"
import { AssignmentsList } from "./components/assignments-list"
import { useAssignments } from "./hooks/use-assignments"
import { createAssignment, deleteAssignment, updateAssignment } from "./redux/assignments.api"
import type { Assignment, AssignmentInput } from "./redux/assignments.types"

export default function AssignmentsPage() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>()
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<Assignment["status"]>()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<Assignment>()
  const [isSaving, setIsSaving] = useState(false)
  const navigate = useNavigate()

  const filters = useMemo(
    () => ({ subjectId: selectedSubjectId, search: search.trim() || undefined, status }),
    [search, selectedSubjectId, status]
  )
  const { data, isLoading, error, reload } = useAssignments(filters)

  async function handleSubmit(input: AssignmentInput) {
    setIsSaving(true)
    try {
      if (editingAssignment) {
        await updateAssignment(editingAssignment.id, input)
        notifier.success("Assignment updated successfully.")
      } else {
        await createAssignment(input)
        notifier.success("Assignment created successfully.")
      }
      setDialogOpen(false)
      setEditingAssignment(undefined)
      await reload()
    } catch (submitError) {
      console.error("Failed to save assignment:", submitError)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(assignment: Assignment) {
    if (!window.confirm(`Delete “${assignment.title}”? This cannot be undone.`)) return
    try {
      await deleteAssignment(assignment.id)
      notifier.success("Assignment deleted successfully.")
      await reload()
    } catch (deleteError) {
      console.error("Failed to delete assignment:", deleteError)
    }
  }

  if (isLoading) return <Loading />
  if (error || !data) return <Error />

  return (
    <div className="space-y-6 p-6">
      <AssignmentsHeader
        subjects={data.subjects}
        selectedSubjectId={selectedSubjectId}
        search={search}
        status={status}
        onSubjectChange={setSelectedSubjectId}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onNewAssignment={() => {
          setEditingAssignment(undefined)
          setDialogOpen(true)
        }}
      />
      <AssignmentsList
        assignments={data.assignments}
        onEdit={(assignment) => {
          setEditingAssignment(assignment)
          setDialogOpen(true)
        }}
        onDelete={handleDelete}
        onEnterMarks={(id) => navigate(`/assignments/${id}/statuses`)}
      />
      <AssignmentDialog
        key={`${dialogOpen}-${editingAssignment?.id ?? "new"}-${selectedSubjectId ?? "all"}`}
        open={dialogOpen}
        assignment={editingAssignment}
        subjects={data.subjects}
        defaultSubjectId={selectedSubjectId}
        isSaving={isSaving}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setEditingAssignment(undefined)
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

function Loading() {
  return <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">Loading assignments…</div>
}

function Error() {
  return <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">Failed to load assignments. Please try again later.</div>
}
