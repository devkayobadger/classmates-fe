import {
  BookOpen,
  CalendarCheck,
  MoreHorizontal,
  Pencil,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import { CircularProgress } from "./circular-progress"
import type { Subject } from "../redux/subjects.types"
import { Link } from "react-router-dom"
import { getAttendancePagePath } from "@/pages/attendance/utils/get-attendance-page-path"
import TooltipWrap from "@/components/tooltip-wrap"

const ICON_BG: Record<Subject["color"], string> = {
  blue: "bg-blue-600",
  green: "bg-emerald-600",
  orange: "bg-amber-500",
  slate: "bg-slate-500",
}

interface SubjectCardProps {
  subject: Subject
  view?: "grid" | "list"
  onOpen?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onAddStudents?: (id: string) => void
}

export function SubjectCard({
  subject,
  view = "grid",
  onOpen,
  onEdit,
  onDelete,
  onAddStudents,
}: SubjectCardProps) {
  const menu = (
    <DropdownMenu>
      <TooltipWrap tooltip="More options">
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </TooltipWrap>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onAddStudents?.(subject.id)}>
          <UserPlus className="h-4 w-4" />
          Add students
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit?.(subject.id)}>
          <Pencil className="h-4 w-4" />
          Edit subject
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDelete?.(subject.id)}
        >
          <Trash2 className="h-4 w-4" />
          Delete subject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  if (view === "list") {
    return (
      <Card
        className="cursor-pointer transition-colors hover:bg-accent/40"
        onClick={() => onOpen?.(subject.id)}
      >
        <CardContent className="flex items-center gap-4 py-4">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white",
              ICON_BG[subject.color]
            )}
          >
            <BookOpen className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">
              {subject.code}
            </p>
            <p className="truncate font-semibold">{subject.name}</p>
            <p className="text-sm text-muted-foreground">
              {subject.program} · {subject.semester}
            </p>
          </div>

          <div className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
            <Users className="h-4 w-4" />
            {subject.studentCount}
          </div>

          <div className="flex items-center gap-3">
            <CircularProgress
              value={subject.attendancePercentage}
              size={44}
              strokeWidth={4}
            />
            {menu}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="cursor-pointer transition-colors hover:bg-accent/40"
      onClick={() => onOpen?.(subject.id)}
    >
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg text-white",
              ICON_BG[subject.color]
            )}
          >
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="flex items-center">
            <TooltipWrap tooltip="Mark attendance">
              <Button variant="ghost" size="icon" asChild>
                <Link to={getAttendancePagePath(subject.id)}>
                  <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            </TooltipWrap>
            {menu}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            {subject.code}
          </p>
          <h3 className="leading-tight font-semibold">{subject.name}</h3>
          <p className="text-sm text-muted-foreground">
            {subject.program} · {subject.semester}
          </p>
        </div>

        <div className="flex items-end justify-between border-t pt-4">
          <div>
            <p className="text-xl leading-none font-semibold">
              {subject.studentCount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Students</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <CircularProgress value={subject.attendancePercentage} />
            <p className="text-xs text-muted-foreground">Attendance</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
