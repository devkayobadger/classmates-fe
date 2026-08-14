import { BookOpen } from "lucide-react"

import type { Subject } from "../redux/subjects.types"
import type { SubjectsView } from "./subjects-header"
import { SubjectCard } from "./subject-card"

interface SubjectsGridProps {
  subjects: Subject[]
  view: SubjectsView
  onOpen?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onAddStudents?: (id: string) => void
}

export function SubjectsGrid({
  subjects,
  view,
  onOpen,
  onEdit,
  onDelete,
  onAddStudents,
}: SubjectsGridProps) {
  if (subjects.length === 0) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-3 rounded-lg border border-dashed text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <BookOpen className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">No subjects yet</p>
          <p className="text-sm text-muted-foreground">
            Add a subject to start tracking attendance and marks.
          </p>
        </div>
      </div>
    )
  }

  if (view === "list") {
    return (
      <div className="space-y-3">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            view="list"
            onOpen={onOpen}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddStudents={onAddStudents}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          view="grid"
          onOpen={onOpen}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddStudents={onAddStudents}
        />
      ))}
    </div>
  )
}
