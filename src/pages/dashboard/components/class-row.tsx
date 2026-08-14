import { Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import type { ClassSession } from "../redux/dashboard.types"

interface ClassRowProps {
  session: ClassSession
  onTakeAttendance?: (id: string) => void
  onPreviewRoster?: (id: string) => void
}

export function ClassRow({
  session,
  onTakeAttendance,
  onPreviewRoster,
}: ClassRowProps) {
  const isActive = session.status === "in-progress"

  const dividerClass =
    session.status === "in-progress"
      ? "bg-primary"
      : session.status === "recorded"
        ? "bg-emerald-500"
        : "bg-border"

  return (
    <div
      className={`flex flex-col gap-4 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between ${
        isActive ? "border-primary/30 bg-primary/5" : "border-border"
      }`}
    >
      <div className="flex flex-1 items-stretch gap-4">
        {/* Time */}
        <div className="flex w-auto shrink-0 flex-col justify-center">
          <p className="text-sm font-semibold text-foreground">
            {session.time}
          </p>
          <p className="text-xs text-muted-foreground">
            {session.durationMinutes} min
          </p>
        </div>

        {/* Vertical Divider */}
        <div className={`w-0.5 self-stretch rounded-full ${dividerClass}`} />

        {/* Details */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-foreground">
              {session.subject}
            </p>

            {isActive && (
              <Badge
                variant="secondary"
                className="bg-blue-500/10 text-blue-600 dark:text-blue-400"
              >
                In Progress
              </Badge>
            )}

            {session.status === "recorded" && (
              <Badge
                variant="secondary"
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              >
                Recorded
              </Badge>
            )}
          </div>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            {session.studentCount} students • {session.program} • Semester{" "}
            {session.semester} • Room {session.room}
          </p>
        </div>
      </div>

      {/* Action */}
      <div className="flex shrink-0 items-center">
        {session.status === "in-progress" && (
          <Button size="sm" onClick={() => onTakeAttendance?.(session.id)}>
            Take Attendance
          </Button>
        )}

        {session.status === "upcoming" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPreviewRoster?.(session.id)}
          >
            Preview Roster
          </Button>
        )}

        {session.status === "recorded" && (
          <Badge
            variant="secondary"
            className="bg-emerald-500/10 px-3 py-1 text-emerald-600 dark:text-emerald-400"
          >
            ✓ {session.recordedPresentCount} Present
          </Badge>
        )}
      </div>
    </div>
  )
}
