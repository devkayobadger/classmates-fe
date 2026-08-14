import { BookOpen, Plus } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface AssessmentsHeaderProps {
  subject: string
  program: string
  semester: string
  subjects: string[]
  onSubjectChange: (value: string) => void
  onNewAssessment?: () => void
}

export function AssessmentsHeader({
  subject,
  program,
  semester,
  subjects,
  onSubjectChange,
  onNewAssessment,
}: AssessmentsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Assessments</h1>
        <p className="text-sm text-muted-foreground">
          {subject} · {program} · {semester}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Select value={subject} onValueChange={onSubjectChange}>
          <SelectTrigger className="w-full sm:w-50">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={onNewAssessment}>
          <Plus className="h-4 w-4" />
          New assessment
        </Button>
      </div>
    </div>
  )
}
