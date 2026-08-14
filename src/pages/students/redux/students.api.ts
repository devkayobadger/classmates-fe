import { axiosInstance } from "@/lib/redux/axios"

import type {
  AvatarColor,
  EligibilityStatus,
  NewStudentInput,
  Student,
  StudentsOverview,
} from "./students.types"

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

function eligibilityFor(attendancePercentage: number): EligibilityStatus {
  if (attendancePercentage >= 75) return "eligible"
  if (attendancePercentage >= 50) return "borderline"
  return "at-risk"
}

interface BackendSubject {
  id: string
  name: string
  semester: number
  program: string
}

interface BackendStudent {
  id: string
  name: string
  rollNumber: string
  registrationNo: string
  email: string | null
  semester: number
}

interface BackendEnrollment {
  id: string
  studentId: string
  subjectId: string
  internalMarks: number
  internalMarksTotal: number
  student: BackendStudent
  attendance: {
    totalClasses: number
    presentCount: number
    percentage: number
  }
}

async function fetchAllSubjects(): Promise<BackendSubject[]> {
  const { data } = await axiosInstance.get<BackendSubject[]>("subjects")
  return data
}

async function fetchRoster(subjectId: string): Promise<BackendEnrollment[]> {
  const { data } = await axiosInstance.get<BackendEnrollment[]>("enrollments", {
    params: { subjectId },
  })
  return data
}

async function fetchAllStudents(): Promise<BackendStudent[]> {
  const { data } = await axiosInstance.get<BackendStudent[]>("students")
  return data
}

function mapEnrollment(
  enrollment: BackendEnrollment,
  subjectName: string,
  colorIndex: number
): Student {
  return {
    id: enrollment.id,
    name: enrollment.student.name,
    studentCode: enrollment.student.registrationNo,
    rollNumber: enrollment.student.rollNumber,
    subject: subjectName,
    attendancePercentage: enrollment.attendance.percentage,
    internalMarks: enrollment.internalMarks,
    internalMarksTotal: enrollment.internalMarksTotal,
    eligibility: eligibilityFor(enrollment.attendance.percentage),
    avatarColor: colorForIndex(colorIndex),
  }
}

// Calls the real Express backend. Builds the "all students, across all
// subjects" view by combining GET /subjects with GET /enrollments per
// subject (enrollments are the join between a subject's roster, the
// student directory, and their live attendance %).
export async function fetchStudentsOverview(): Promise<StudentsOverview> {
  const subjects = await fetchAllSubjects()

  const rosters = await Promise.all(
    subjects.map((subject) => fetchRoster(subject.id))
  )

  const students: Student[] = []
  rosters.forEach((roster, subjectIndex) => {
    roster.forEach((enrollment, rowIndex) => {
      students.push(
        mapEnrollment(enrollment, subjects[subjectIndex].name, rowIndex)
      )
    })
  })

  return {
    students,
    subjects: subjects.map((subject) => subject.name),
  }
}

/**
 * Copies every enrolled student from `sourceSubjectName` into
 * `targetSubjectName`, skipping anyone already enrolled there. Returns
 * how many students were newly added.
 */
export async function importStudentsIntoSubject(
  sourceSubjectName: string,
  targetSubjectName: string
): Promise<number> {
  const subjects = await fetchAllSubjects()
  const source = subjects.find((s) => s.name === sourceSubjectName)
  const target = subjects.find((s) => s.name === targetSubjectName)

  if (!source || !target) return 0

  const roster = await fetchRoster(source.id)

  let addedCount = 0
  for (const enrollment of roster) {
    try {
      await axiosInstance.post("enrollments", {
        studentId: enrollment.studentId,
        subjectId: target.id,
      })
      addedCount += 1
    } catch {
      // Already enrolled in the target subject — skip silently, same
      // as the previous localStorage-backed behavior.
    }
  }

  return addedCount
}

/**
 * Subjects are now created directly against the backend and already
 * show up in fetchStudentsOverview()'s subject list as soon as they
 * exist — no separate registration step needed. Kept as a no-op so
 * existing call sites don't need to change.
 */
export async function registerSubjectName(): Promise<void> {
  return
}

/**
 * Deleting a subject (see subjects.api.ts) cascades to its enrollments
 * and attendance records at the database level, so there's nothing
 * left to clean up here. Kept as a no-op so existing call sites don't
 * need to change.
 */
export async function removeStudentsForSubject(): Promise<void> {
  return
}

/**
 * Adds a student to a subject's roster. Reuses an existing student
 * record (matched by roll number or registration number) if one
 * already exists in the shared student directory, otherwise creates a
 * new one, then enrolls them in the given subject.
 */
export async function addStudentToSubject(
  subjectName: string,
  input: NewStudentInput
): Promise<Student> {
  const subjects = await fetchAllSubjects()
  const subject = subjects.find((s) => s.name === subjectName)

  if (!subject) {
    throw new Error(`Subject "${subjectName}" was not found.`)
  }

  const allStudents = await fetchAllStudents()
  let student = allStudents.find(
    (s) =>
      s.registrationNo === input.studentCode || s.rollNumber === input.rollNumber
  )

  if (!student) {
    const { data } = await axiosInstance.post<BackendStudent>("students", {
      name: input.name,
      rollNumber: input.rollNumber,
      registrationNo: input.studentCode,
      semester: subject.semester,
    })
    student = data
  }

  const { data: enrollment } = await axiosInstance.post<BackendEnrollment>(
    "enrollments",
    {
      studentId: student.id,
      subjectId: subject.id,
    }
  )

  return mapEnrollment(enrollment, subject.name, 0)
}
