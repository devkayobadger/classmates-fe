import {
  ClipboardList,
  FileText,
  FlaskConical,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import type {
  Exam,
  ExamType,
} from "../redux/exams.types"

import { ExamProgress } from "./exam-progress"

interface ExamCardProps {
  exam: Exam
  onEnterMarks?: (id: string) => void
}

const ICON_BY_TYPE: Record<
  ExamType,
  typeof ClipboardList
> = {
  "unit-test": ClipboardList,
  "mid-term": FileText,
  "pre-board": FileText,
  practical: FlaskConical,
}

const STATUS_LABEL: Record<
  Exam["status"],
  string
> = {
  "marks-entered": "Marks entered",
  "in-progress": "In progress",
  "not-started": "Not started",
}

export function ExamCard({
  exam,
  onEnterMarks,
}: ExamCardProps) {
  const Icon = ICON_BY_TYPE[exam.type]

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold leading-tight">
                {exam.title}
              </h3>

              <Badge variant="outline">
                {STATUS_LABEL[exam.status]}
              </Badge>
            </div>

            <p className="mt-0.5 text-sm text-muted-foreground">
              {exam.totalMarks} marks · {exam.dateLabel} ·{" "}
              {exam.studentCount} students
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:min-w-55">
          <ExamProgress
            entered={exam.enteredCount}
            total={exam.studentCount}
          />

          <button
            type="button"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
            onClick={() => onEnterMarks?.(exam.id)}
          >
            Enter marks
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
