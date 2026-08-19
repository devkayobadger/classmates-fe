import { BookOpen } from "lucide-react"
import type { ExamSubject } from "../redux/exams.types"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ExamsHeaderProps {
  subject: ExamSubject | null
  program: string
  semester: string
  subjects: ExamSubject[]
  onSubjectChange: (subjectId: string) => void
}

export function ExamsHeader({
  subject,
  program,
  semester,
  subjects,
  onSubjectChange,
}: ExamsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Exams
        </h1>

        <p className="text-sm text-muted-foreground">
          {subject?.name} · {program} · {semester}
        </p>
      </div>

      <Select
        value={subject?.id}
        onValueChange={onSubjectChange}
      >
        <SelectTrigger className="w-full sm:w-50">
          <BookOpen className="h-4 w-4 text-muted-foreground" />

          <SelectValue placeholder="Select subject" />
        </SelectTrigger>

        <SelectContent>
          {subjects.map((subject) => (
            <SelectItem
              key={subject.id}
              value={subject.id}
            >
              {subject.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}