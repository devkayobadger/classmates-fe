import {
  ClipboardList,
  Eye,
  FileText,
  PenSquare,
  SquarePen,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import type { Assessment } from "../redux/assessments.types"
import { AssessmentProgress } from "./assessment-progress"
import { AssessmentStatusBadge } from "./assessment-status-badge"

const ICON_BY_KIND: Record<Assessment["kind"], typeof ClipboardList> = {
  exam: ClipboardList,
  assignment: PenSquare,
  quiz: FileText,
}

const ICON_TONE: Record<Assessment["status"], string> = {
  "marks-entered": "bg-blue-50 text-blue-600",
  "in-progress": "bg-amber-50 text-amber-600",
  "not-started": "bg-muted text-muted-foreground",
}

interface AssessmentCardProps {
  assessment: Assessment
  onView?: (id: string) => void
  onEnterMarks?: (id: string) => void
}

export function AssessmentCard({
  assessment,
  onView,
  onEnterMarks,
}: AssessmentCardProps) {
  const Icon =
    assessment.status === "not-started"
      ? FileText
      : ICON_BY_KIND[assessment.kind]
  const isComplete = assessment.status === "marks-entered"

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              ICON_TONE[assessment.status]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="leading-tight font-semibold">
                {assessment.title}
              </h3>
              <AssessmentStatusBadge status={assessment.status} />
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {assessment.totalMarks} marks · {assessment.dateLabel} ·{" "}
              {assessment.studentCount} students
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:pl-4">
          <AssessmentProgress
            entered={assessment.enteredCount}
            total={assessment.studentCount}
            status={assessment.status}
          />

          {isComplete ? (
            <Button variant="outline" onClick={() => onView?.(assessment.id)}>
              <Eye className="h-4 w-4" />
              View marks
            </Button>
          ) : (
            <Button onClick={() => onEnterMarks?.(assessment.id)}>
              <SquarePen className="h-4 w-4" />
              Enter marks
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
