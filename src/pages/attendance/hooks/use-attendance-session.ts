import { useEffect, useState } from "react"

import { format } from "date-fns"

import { notifier } from "@/lib/utils/notifier"

import type {
  AttendanceSessionOverview,
  AttendanceSessionState,
  AttendanceSessionStatus,
  AttendanceStudent,
  AttendanceStatus,
} from "../redux/attendance-session.types"
import {
  fetchAttendanceSession,
  persistAttendanceStatus,
} from "../redux/attendance-session.api"

interface UseAttendanceSessionProps {
  subjectId: string
  date: Date
}

interface UseAttendanceSessionResult {
  data: AttendanceSessionOverview | undefined
  students: AttendanceStudent[]
  isLoading: boolean
  error: unknown

  sessionStatus: AttendanceSessionStatus
  startAttendance: () => void
  stopAttendance: () => void
  resumeAttendance: () => void

  changeStatus: (id: string, status: AttendanceStatus) => void
  markAllPresent: () => void
  reset: () => void
}

export function useAttendanceSession({
  subjectId,
  date,
}: UseAttendanceSessionProps): UseAttendanceSessionResult {
  const [data, setData] = useState<AttendanceSessionOverview>()
  const [students, setStudents] = useState<AttendanceStudent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const [sessionStatus, setSessionStatus] =
    useState<AttendanceSessionStatus>("not_started")

  const dateKey = format(date, "yyyy-MM-dd")
  // The session lifecycle (start/stop/resume) is a local workflow gate
  // with no equivalent concept in the database — the actual attendance
  // marks are what's persisted to PostgreSQL (see attendance-session.api.ts).
  const sessionStorageKey = `attendance_session_${subjectId}_${dateKey}`

  /**
   * Fetch base attendance data — live from the backend, reflecting
   * whatever's already been saved to PostgreSQL for this class + date.
   */
  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetchAttendanceSession(subjectId, dateKey)

        if (cancelled) return

        setStudents(result.students)

        const savedSession = localStorage.getItem(sessionStorageKey)

        if (savedSession) {
          const parsed = JSON.parse(savedSession) as AttendanceSessionState
          setSessionStatus(parsed.status)
        } else {
          setSessionStatus("not_started")
        }

        setData(result)
      } catch (err) {
        if (!cancelled) {
          setError(err)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [subjectId, dateKey, sessionStorageKey])

  /**
   * Start a new attendance session for this class + date.
   * No-ops if a session is already active, which guarantees only one
   * active session can ever exist per class per date.
   */
  function startAttendance() {
    if (sessionStatus === "active") return

    const newState: AttendanceSessionState = {
      status: "active",
      startedAt: new Date().toISOString(),
    }

    localStorage.setItem(sessionStorageKey, JSON.stringify(newState))
    setSessionStatus("active")
  }

  /**
   * Stop the currently active attendance session. Marks already saved
   * to PostgreSQL remain there and are shown by reports, but no further
   * changes are allowed for this session.
   */
  function stopAttendance() {
    if (sessionStatus !== "active") return

    const newState: AttendanceSessionState = {
      status: "closed",
      stoppedAt: new Date().toISOString(),
    }

    localStorage.setItem(sessionStorageKey, JSON.stringify(newState))
    setSessionStatus("closed")
  }

  /**
   * Re-open a session that was stopped by mistake. This reactivates the
   * *same* session (it does not create a new one), so it stays within
   * the "one session per class per date" rule while still letting a
   * teacher undo an accidental Stop and keep marking attendance.
   */
  function resumeAttendance() {
    if (sessionStatus !== "closed") return

    const newState: AttendanceSessionState = {
      status: "active",
      startedAt: new Date().toISOString(),
    }

    localStorage.setItem(sessionStorageKey, JSON.stringify(newState))
    setSessionStatus("active")
  }

  const changeStatus = (id: string, status: AttendanceStatus) => {
    if (sessionStatus !== "active") return

    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              status,
            }
          : student
      )
    )

    // Persist to PostgreSQL. Optimistic UI update above already
    // reflects the change; surface a toast if the save fails so the
    // teacher knows to retry rather than silently losing the mark.
    persistAttendanceStatus(subjectId, id, dateKey, status).catch(() => {
      notifier.error("Couldn't save that attendance mark. Please retry.")
    })
  }

  const markAllPresent = () => {
    if (sessionStatus !== "active") return

    setStudents((prev) => prev.map((student) => ({ ...student, status: "present" })))

    Promise.all(
      students.map((student) =>
        persistAttendanceStatus(subjectId, student.id, dateKey, "present")
      )
    ).catch(() => {
      notifier.error("Couldn't save attendance for everyone. Please retry.")
    })
  }

  function reset() {
    if (sessionStatus !== "active") return
    if (!data) return

    setStudents(data.students)

    Promise.all(
      data.students.map((student) =>
        persistAttendanceStatus(subjectId, student.id, dateKey, student.status)
      )
    ).catch(() => {
      notifier.error("Couldn't save the reset attendance. Please retry.")
    })
  }

  return {
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
  }
}
