import { Badge } from "@/components/ui/badge"

interface ExamMarksHeaderProps {
  title: string
  totalMarks: number
  subject: string
  program: string
  semester: string
  dateLabel: string
}

export function ExamMarksHeader({
  title,
  totalMarks,
  subject,
  program,
  semester,
  dateLabel,
}: ExamMarksHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="flex items-center text-2xl font-bold tracking-tight">
        {title}

        <Badge
          variant="secondary"
          className="ml-2 border border-border px-2 py-1"
        >
          {totalMarks} marks
        </Badge>
      </h1>

      <p className="text-sm text-muted-foreground">
        {subject} · {program} · {semester} · {dateLabel}
      </p>
    </div>
  )
}