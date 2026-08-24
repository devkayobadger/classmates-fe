interface MarksProps {
  title: string
  subject: string
  program: string
  semester: string
  dueDate: string
}

export default function MarksHeader({
  title,
  subject,
  program,
  semester,
  dueDate,
}: MarksProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>

      <p className="text-sm text-muted-foreground">
        {subject} · {program} {semester} · Due {dueDate}
      </p>
    </div>
  )
}
