import { useState } from "react"

import { SubjectsGrid } from "./components/subjects-grid"
import { useSubjects } from "./redux/use-subjects"
import { SubjectsHeader, type SubjectsView } from "./components/subjects-header"
import { AddSubjectDialog } from "./components/add-subject-dialog"
import { AddStudentsDialog } from "./components/add-students-dialog"
import { deleteSubject } from "./redux/subjects.api"
import { removeStudentsForSubject } from "@/pages/students/redux/students.api"

export default function SubjectsPage() {
  const { data, isLoading, error, refetch } = useSubjects()
  const [view, setView] = useState<SubjectsView>("grid")
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false)
  const [addStudentsSubjectId, setAddStudentsSubjectId] = useState<
    string | null
  >(null)

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
        Loading subjects…
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-destructive">
        Couldn't load your subjects. Please try again.
      </div>
    )
  }

  const addStudentsSubject =
    data.subjects.find((subject) => subject.id === addStudentsSubjectId) ??
    null

  return (
    <div className="space-y-6 p-6">
      <SubjectsHeader
        subjectCount={data.subjects.length}
        totalStudents={data.totalStudents}
        view={view}
        onViewChange={setView}
        onAddSubject={() => setIsAddSubjectOpen(true)}
      />

      <SubjectsGrid
        subjects={data.subjects}
        view={view}
        onOpen={(id) => {
          // TODO: navigate to the subject detail page for `id`
        }}
        onEdit={(id) => {
          // TODO: open the edit-subject dialog for `id`
        }}
        onDelete={async (id) => {
          const subject = data.subjects.find((s) => s.id === id)
          if (!subject) return

          const confirmed = window.confirm(
            `Delete "${subject.name}"? This permanently removes the subject and all its enrolled students. This can't be undone.`
          )
          if (!confirmed) return

          await deleteSubject(id)
          await removeStudentsForSubject()
          refetch()
        }}
        onAddStudents={(id) => setAddStudentsSubjectId(id)}
      />

      <AddSubjectDialog
        open={isAddSubjectOpen}
        onOpenChange={setIsAddSubjectOpen}
        subjects={data.subjects}
        onCreated={refetch}
      />

      <AddStudentsDialog
        open={Boolean(addStudentsSubjectId)}
        onOpenChange={(open) => {
          if (!open) setAddStudentsSubjectId(null)
        }}
        subject={addStudentsSubject}
        onAdded={refetch}
      />
    </div>
  )
}
