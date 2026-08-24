import { MoreHorizontal, SquarePen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import type { Assignment } from "../redux/assignments.types"
import { AssignmentProgress } from "./assignment-progress"
import { AssignmentStatusBadge } from "./assignment-status-badge"

const ICON_TONE: Record<Assignment["status"], string> = {
  "statuses-entered": "bg-blue-50 text-blue-600",
  "in-progress": "bg-amber-50 text-amber-600",
  "not-started": "bg-muted text-muted-foreground",
}

interface AssignmentCardProps {
  assignment: Assignment
  onEdit: (assignment: Assignment) => void
  onDelete: (assignment: Assignment) => void
  onEnterMarks: (id: string) => void
}

export function AssignmentCard({
  assignment,
  onEdit,
  onDelete,
  onEnterMarks,
}: AssignmentCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              ICON_TONE[assignment.status]
            )}
          >
            <SquarePen className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="leading-tight font-semibold">
                {assignment.title}
              </h3>
              <AssignmentStatusBadge status={assignment.status} />
            </div>
            <p className="mt-0.5 text-sm font-medium text-muted-foreground">
              {assignment.subjectName} · {assignment.subjectCode}
            </p>
            {assignment.description && (
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {assignment.description}
              </p>
            )}
            <p className="mt-1 text-sm text-muted-foreground">
              Assigned{" "}
              {formatDate(assignment.assignedDate)} · Due{" "}
              {formatDate(assignment.dueDate)} · {assignment.studentCount}{" "}
              students
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:pl-4">
          <AssignmentProgress
            entered={assignment.enteredCount}
            total={assignment.studentCount}
            status={assignment.status}
          />
          <Button onClick={() => onEnterMarks(assignment.id)}>
            <SquarePen className="h-4 w-4" />
            Update status
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label={`Actions for ${assignment.title}`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(assignment)}>
                Edit assignment
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(assignment)}
              >
                Delete assignment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
