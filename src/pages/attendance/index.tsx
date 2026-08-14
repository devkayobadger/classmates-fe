import { Navigate } from "react-router-dom"

import { useSubjects } from "@/pages/subjects/redux/use-subjects"
import { getAttendancePagePath } from "./utils/get-attendance-page-path"

export default function AttendancePage() {
  const { data, isLoading, error } = useSubjects()

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
        Loading subjects...
      </div>
    )
  }

  if (error || !data || data.subjects.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-destructive">
        No subjects found.
      </div>
    )
  }

  return (
    <Navigate
      replace
      to={getAttendancePagePath(data.subjects[0].id, new Date())}
    />
  )
}
