import { useMemo, useState } from "react"

import { format } from "date-fns"
import { useNavigate, useParams } from "react-router-dom"

import { useSubjects } from "@/pages/subjects/redux/use-subjects"

import type { AttendanceStatus } from "../redux/attendance-session.types"
import useFilteredStudents from "../hooks/use-filtered-students"
import { AttendanceSessionHeader } from "../components/attendance-session-header"
import { AttendanceSummaryBar } from "../components/attendance-summary-bar"
import { AttendanceTable } from "../components/attendance-table"
import { AttendanceToolbar } from "../components/attendance-toolbar"
import { getAttendancePagePath } from "../utils/get-attendance-page-path"
import { useAttendanceSession } from "../hooks/use-attendance-session"

export default function AttendanceSessionPage() {
  const navigate = useNavigate()

  const { subjectId = "", date = format(new Date(), "yyyy-MM-dd") } =
    useParams<{
      subjectId: string
      date: string
    }>()

  const [searchTerm, setSearchTerm] = useState("")

  const selectedDate = useMemo(() => new Date(date), [date])

  const { data: subjectsData } = useSubjects()

  const {
    data,
    students,
    isLoading,
    error,
    sessionStatus,
    startAttendance,
    stopAttendance,
    resumeAttendance,
    changeStatus,
    markAllPresent,
    reset,
  } = useAttendanceSession({
    subjectId,
    date: selectedDate,
  })

  const currentSubject = useMemo(
    () => subjectsData?.subjects.find((subject) => subject.id === subjectId),
    [subjectsData, subjectId]
  )

  const filteredStudents = useFilteredStudents({
    students,
    searchTerm,
  })

  const counts = useMemo(() => {
    const result: Record<AttendanceStatus, number> = {
      present: 0,
      late: 0,
      absent: 0,
      excused: 0,
    }

    students.forEach((student) => {
      result[student.status]++
    })

    return result
  }, [students])

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
        Loading attendance...
      </div>
    )
  }

  if (error || !data || !subjectsData || !currentSubject) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-destructive">
        Couldn't load attendance.
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <AttendanceSessionHeader
        subjects={subjectsData.subjects}
        room={data.room}
        selectedSubjectId={currentSubject.id}
        totalStudents={currentSubject.studentCount}
        date={selectedDate}
        timeLabel={data.timeLabel}
        students={students}
        sessionStatus={sessionStatus}
        onStartAttendance={startAttendance}
        onStopAttendance={stopAttendance}
        onResumeAttendance={resumeAttendance}
        onSubjectChange={(newSubjectId) => {
          if (!newSubjectId) return

          navigate(getAttendancePagePath(newSubjectId, selectedDate))
        }}
        onDateChange={(newDate) => {
          if (!newDate) return

          navigate(getAttendancePagePath(currentSubject.id, newDate))
        }}
      />

      <AttendanceToolbar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onMarkAllPresent={markAllPresent}
        onReset={reset}
        disabled={sessionStatus !== "active"}
      />

      <AttendanceSummaryBar students={students} counts={counts} />

      <AttendanceTable
        students={filteredStudents}
        onStatusChange={changeStatus}
        disabled={sessionStatus !== "active"}
      />
    </div>
  )
}
