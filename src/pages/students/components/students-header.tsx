import { Download, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"

interface StudentsHeaderProps {
  onExport?: () => void
  onAddStudent?: () => void
}

export function StudentsHeader({
  onExport,
  onAddStudent,
}: StudentsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Students</h1>
        <p className="text-sm text-muted-foreground">
          All students across your subjects · click a row to view profile
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onExport}>
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button onClick={onAddStudent}>
          <UserPlus className="h-4 w-4" />
          Add student
        </Button>
      </div>
    </div>
  )
}
