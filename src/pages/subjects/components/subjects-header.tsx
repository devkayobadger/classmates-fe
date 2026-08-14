import { LayoutGrid, List, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type SubjectsView = "grid" | "list"

interface SubjectsHeaderProps {
  subjectCount: number
  totalStudents: number
  view: SubjectsView
  onViewChange: (view: SubjectsView) => void
  onAddSubject?: () => void
}

export function SubjectsHeader({
  subjectCount,
  totalStudents,
  view,
  onViewChange,
  onAddSubject,
}: SubjectsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Subjects</h1>
        <p className="text-sm text-muted-foreground">
          {subjectCount} subjects you teach this semester · {totalStudents}{" "}
          students total
        </p>
      </div>

      <div className="flex items-center gap-2">
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(value) =>
            value && onViewChange(value as SubjectsView)
          }
          className="rounded-lg border bg-background p-0.5"
        >
          <ToggleGroupItem
            value="grid"
            aria-label="Grid view"
            className="gap-1.5 px-3"
          >
            <LayoutGrid className="h-4 w-4" />
            Grid
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
            aria-label="List view"
            className="gap-1.5 px-3"
          >
            <List className="h-4 w-4" />
            List
          </ToggleGroupItem>
        </ToggleGroup>

        <Button onClick={onAddSubject}>
          <Plus className="h-4 w-4" />
          Add subject
        </Button>
      </div>
    </div>
  )
}
