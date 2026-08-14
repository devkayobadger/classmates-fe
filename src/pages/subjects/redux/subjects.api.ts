import { axiosInstance } from "@/lib/redux/axios"
import { formatSemesterLabel, parseSemesterNumber } from "@/lib/utils/semester"

import type { NewSubjectInput, Subject, SubjectColor, SubjectsOverview } from "./subjects.types"

interface BackendSubject {
  id: string
  name: string
  code: string
  semester: number
  program: string
  color: string
  teacherId: string
  createdAt: string
  updatedAt: string
  studentCount: number
  attendancePercentage: number
}

const VALID_COLORS: SubjectColor[] = ["blue", "green", "orange", "slate"]

function toSubjectColor(color: string): SubjectColor {
  return (VALID_COLORS as string[]).includes(color) ? (color as SubjectColor) : "blue"
}

function mapSubject(subject: BackendSubject): Subject {
  return {
    id: subject.id,
    code: subject.code,
    name: subject.name,
    program: subject.program,
    semester: formatSemesterLabel(subject.semester),
    studentCount: subject.studentCount,
    attendancePercentage: subject.attendancePercentage,
    color: toSubjectColor(subject.color),
  }
}

// Calls the real Express backend: GET {API_BASE}/subjects
// Student counts and attendance percentages are computed live in
// PostgreSQL from the enrollments/attendance tables.
export async function fetchSubjectsOverview(): Promise<SubjectsOverview> {
  const { data } = await axiosInstance.get<BackendSubject[]>("subjects")

  const subjects = data.map(mapSubject)

  return {
    subjects,
    totalStudents: subjects.reduce((sum, subject) => sum + subject.studentCount, 0),
  }
}

// Calls the real Express backend: POST {API_BASE}/subjects
export async function createSubject(input: NewSubjectInput): Promise<Subject> {
  const { data } = await axiosInstance.post<BackendSubject>("subjects", {
    name: input.name,
    code: input.code,
    program: input.program,
    semester: parseSemesterNumber(input.semester),
    color: input.color,
  })

  return mapSubject(data)
}

// Calls the real Express backend: DELETE {API_BASE}/subjects/:id
// Cascades to enrollments and attendance records for this subject at
// the database level, so nothing about it lingers anywhere.
export async function deleteSubject(subjectId: string): Promise<void> {
  await axiosInstance.delete(`subjects/${subjectId}`)
}

/**
 * Counts are now computed live by the backend on every fetch, so these
 * "bump" helpers are no longer needed to keep local state in sync —
 * callers already refetch the overview right after mutating enrollments,
 * which is enough to pick up the new counts. Kept as no-ops so existing
 * call sites don't need to change.
 */
export async function bumpSubjectStudentCount(): Promise<void> {
  return
}

export async function bumpSubjectStudentCountByName(): Promise<void> {
  return
}
