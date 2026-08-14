import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { ClassSession } from "../redux/dashboard.types"
import { ClassRow } from "./class-row"

interface TodaysClassesProps {
  classes: ClassSession[]
  onFullTimetable?: () => void
  onTakeAttendance?: (id: string) => void
  onPreviewRoster?: (id: string) => void
}

export function TodaysClasses({
  classes,
  onFullTimetable,
  onTakeAttendance,
  onPreviewRoster,
}: TodaysClassesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Today's Classes</CardTitle>

        <Button onClick={onFullTimetable} variant="link">
          Full timetable <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {classes.length === 0 ? (
          <div className="flex h-24 items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">
              No classes scheduled today.
            </p>
          </div>
        ) : (
          classes.map((session) => (
            <ClassRow
              key={session.id}
              session={session}
              onTakeAttendance={onTakeAttendance}
              onPreviewRoster={onPreviewRoster}
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}
