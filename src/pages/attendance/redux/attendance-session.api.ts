import { axiosInstance } from "@/lib/redux/axios"

import type {
  AttendanceSessionOverview,
  AttendanceStatus,
  AvatarColor,
} from "./attendance-session.types"

const AVATAR_COLORS: AvatarColor[] = [
  "violet",
  "blue",
  "rose",
  "green",
  "teal",
  "amber",
]

function colorForIndex(index: number): AvatarColor {
  return AVATAR_COLORS[index % AVATAR_COLORS.length]
}

interface BackendEnrollment {
  id: string
  studentId: string
  subjectId: string
  student: {
    id: string
    name: string
    rollNumber: string
    registrationNo: string
  }
}

interface BackendAttendanceRecord {
  id: string
  studentId: string
  subjectId: string
  date: string
  status: AttendanceStatus
  createdAt: string
}

async function fetchRoster(subjectId: string): Promise<BackendEnrollment[]> {
  const { data } = await axiosInstance.get<BackendEnrollment[]>("enrollments", {
    params: { subjectId },
  })
  return data
}

async function fetchRecordsForSubject(
  subjectId: string
): Promise<BackendAttendanceRecord[]> {
  const { data } = await axiosInstance.get<BackendAttendanceRecord[]>(
    "attendance",
    { params: { subjectId } }
  )
  return data
}

// Calls the real Express backend: GET {API_BASE}/enrollments and
// GET {API_BASE}/attendance for the given subject. Each student's
// status reflects what's already saved in PostgreSQL for `dateKey`, or
// defaults to "present" if attendance hasn't been marked yet that day.
export async function fetchAttendanceSession(
  subjectId: string,
  dateKey: string
): Promise<AttendanceSessionOverview> {
  const [roster, records] = await Promise.all([
    fetchRoster(subjectId),
    fetchRecordsForSubject(subjectId),
  ])

  const statusByStudentId = new Map(
    records.filter((r) => r.date === dateKey).map((r) => [r.studentId, r.status])
  )

  return {
    // No class-schedule/room data model exists on the backend yet, so
    // these stay blank rather than showing invented values.
    room: "",
    timeLabel: "",
    students: roster.map((enrollment, index) => ({
      id: enrollment.studentId,
      name: enrollment.student.name,
      studentCode: enrollment.student.registrationNo,
      avatarColor: colorForIndex(index),
      status: statusByStudentId.get(enrollment.studentId) ?? "present",
    })),
  }
}

// Persists a single student's attendance mark for `dateKey` to
// PostgreSQL — updates the existing record for that date if one
// already exists, otherwise creates a new one.
export async function persistAttendanceStatus(
  subjectId: string,
  studentId: string,
  dateKey: string,
  status: AttendanceStatus
): Promise<void> {
  const records = await fetchRecordsForSubject(subjectId)
  const existing = records.find(
    (r) => r.studentId === studentId && r.date === dateKey
  )

  if (existing) {
    await axiosInstance.put(`attendance/${existing.id}`, { status })
  } else {
    await axiosInstance.post("attendance", {
      studentId,
      subjectId,
      date: dateKey,
      status,
    })
  }
}
