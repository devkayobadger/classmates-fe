export type AttendanceStatus = "present" | "late" | "absent" | "excused"

export type AvatarColor =
  "violet" | "blue" | "rose" | "green" | "teal" | "amber"

export interface AttendanceStudent {
  id: string
  name: string
  studentCode: string
  avatarColor: AvatarColor
  status: AttendanceStatus
  atRisk?: {
    label: string
    percentage: number
  }
}

export interface AttendanceSessionOverview {
  room: string
  timeLabel: string
  students: AttendanceStudent[]
}

/**
 * Lifecycle of a single day's attendance session for a class.
 * - not_started: no session has been created yet for this class/date.
 * - active: session is open, teachers can mark students present/absent/etc.
 * - closed: session has been stopped, marks are final and locked.
 */
export type AttendanceSessionStatus = "not_started" | "active" | "closed"

export interface AttendanceSessionState {
  status: AttendanceSessionStatus
  startedAt?: string
  stoppedAt?: string
}
