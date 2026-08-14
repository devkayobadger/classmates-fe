import { Badge } from "@/components/ui/badge"

interface MarksProps {
  title: string
  marks: number
  subject: string
  program: string
  semester: string
  dueDate: string
}

export default function MarksHeader({
  title,
  marks,
  subject,
  program,
  semester,
  dueDate,
}: MarksProps) {
  return (
    <div className="space-y-1">
      <h1 className="flex items-center text-2xl font-bold tracking-tight">
        {title}
        <Badge
          variant="secondary"
          className="ml-2 border border-border px-2 py-1"
        >
          {marks} marks
        </Badge>
      </h1>

      <p className="text-sm text-muted-foreground">
        {subject} · {program} {semester} · Due {dueDate}
      </p>
    </div>
  )
}
