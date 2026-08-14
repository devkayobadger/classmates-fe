import {
  Calendar as CalendarIcon,
  BookOpen,
  Download,
  Play,
  Square,
  RotateCcw,
} from "lucide-react"
import { format } from "date-fns"

import type { Subject } from "@/pages/subjects/redux/subjects.types"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

import type {
  AttendanceSessionStatus,
  AttendanceStudent,
} from "../redux/attendance-session.types"
import { exportAttendanceToExcel } from "../utils/attendance-session.export"

interface AttendanceSessionHeaderProps {
  subjects: Subject[]
  selectedSubjectId: string
  onSubjectChange: (subjectId: string) => void

  room: string
  totalStudents: number

  date: Date
  timeLabel: string
  students: AttendanceStudent[]

  sessionStatus: AttendanceSessionStatus
  onStartAttendance: () => void
  onStopAttendance: () => void
  onResumeAttendance: () => void

  onDateChange?: (date: Date | undefined) => void
}

export function AttendanceSessionHeader({
  subjects,
  selectedSubjectId,
  onSubjectChange,
  room,
  totalStudents,
  date,
  timeLabel,
  students,
  sessionStatus,
  onStartAttendance,
  onStopAttendance,
  onResumeAttendance,
  onDateChange,
}: AttendanceSessionHeaderProps) {
  const selectedSubject = subjects.find(
    (subject) => subject.id === selectedSubjectId
  )

  if (!selectedSubject) return null

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-muted">
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {selectedSubject.name}
          </h1>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{selectedSubject.code}</Badge>

            <Badge variant="secondary">
              {selectedSubject.program}: {selectedSubject.semester}
            </Badge>

            <Badge variant="secondary">{totalStudents} students</Badge>

            {sessionStatus === "active" && (
              <Badge
                variant="outline"
                className="border-success/30 bg-success/10 text-success"
              >
                🟢 Attendance Active
              </Badge>
            )}

            {sessionStatus === "closed" && (
              <Badge
                variant="outline"
                className="border-destructive/30 bg-destructive/10 text-destructive"
              >
                🔴 Attendance Closed
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Select value={selectedSubjectId} onValueChange={onSubjectChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-45 justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="end">
            <Calendar mode="single" selected={date} onSelect={onDateChange} />
          </PopoverContent>
        </Popover>

        {/* Start shows before a session begins, Stop while it's active.
            If Stop was pressed by mistake, Reattendance re-opens that
            same session (not a new one) so marking can continue — the
            one-session-per-class-per-date rule still holds. */}
        {sessionStatus === "not_started" && (
          <Button onClick={onStartAttendance} className={cn("shrink-0")}>
            <Play className="h-4 w-4" />
            Take Attendance
          </Button>
        )}

        {sessionStatus === "active" && (
          <Button
            variant="destructive"
            onClick={onStopAttendance}
            className={cn("shrink-0")}
          >
            <Square className="h-4 w-4" />
            Stop Attendance
          </Button>
        )}

        {sessionStatus === "closed" && (
          <Button
            variant="outline"
            onClick={onResumeAttendance}
            className={cn("shrink-0")}
          >
            <RotateCcw className="h-4 w-4" />
            Reattendance
          </Button>
        )}

        <Button
          variant="outline"
          onClick={() =>
            exportAttendanceToExcel({
              subjectName: selectedSubject.name,
              subjectCode: selectedSubject.code,
              date,
              room,
              timeLabel,
              students,
            })
          }
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  )
}
