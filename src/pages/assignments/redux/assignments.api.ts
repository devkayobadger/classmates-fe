import { axiosInstance } from "@/lib/redux/axios"

import type {
  Assignment,
  AssignmentCompletionStatus,
  AssignmentInput,
  AssignmentMarksOverview,
  AssignmentsOverview,
  AssignmentStudentMark,
  AssignmentSubject,
} from "./assignments.types"

const AVATAR_COLORS = [
  "violet",
  "blue",
  "rose",
  "green",
  "teal",
  "amber",
] as const

interface BackendAssignment extends Assignment {
  createdAt: string
  updatedAt: string
}

interface BackendAssignmentMarks {
  id: string
  title: string
  description: string | null
  assignedDate: string
  dueDate: string
  subject: string
  subjectCode: string
  program: string
  semester: string
  students: Array<
    Omit<AssignmentStudentMark, "index" | "studentCode" | "status"> & {
      studentCode: string | null
      status: AssignmentCompletionStatus | "late_done" | null
    }
  >
}

export async function fetchAssignmentsOverview(filters?: {
  subjectId?: string
  search?: string
  status?: Assignment["status"]
}): Promise<AssignmentsOverview> {
  const [subjectsResponse, assignmentsResponse] = await Promise.all([
    axiosInstance.get<AssignmentSubject[]>("subjects"),
    axiosInstance.get<BackendAssignment[]>("assignments", { params: filters }),
  ])

  return {
    subjects: subjectsResponse.data,
    assignments: assignmentsResponse.data,
  }
}

export async function createAssignment(
  input: AssignmentInput
): Promise<Assignment> {
  const { data } = await axiosInstance.post<Assignment>("assignments", input)
  return data
}

export async function updateAssignment(
  assignmentId: string,
  input: AssignmentInput
): Promise<Assignment> {
  const { data } = await axiosInstance.put<Assignment>(
    `assignments/${assignmentId}`,
    input
  )
  return data
}

export async function deleteAssignment(assignmentId: string): Promise<void> {
  await axiosInstance.delete(`assignments/${assignmentId}`)
}

export async function fetchAssignmentMarks(
  assignmentId: string
): Promise<AssignmentMarksOverview> {
  const { data } = await axiosInstance.get<BackendAssignmentMarks>(
    `assignments/${assignmentId}/statuses`
  )
  return {
    assignmentId: data.id,
    title: data.title,
    description: data.description,
    assignedDate: data.assignedDate,
    dueDate: data.dueDate,
    subject: data.subject,
    subjectCode: data.subjectCode,
    program: data.program,
    semester: data.semester,
    students: data.students
      .map((student, index) => ({
        ...student,
        studentCode: student.studentCode ?? undefined,
        status: student.status === "late_done" ? "late" : student.status,
        index: index + 1,
        avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  }
}

export async function saveAssignmentStatuses(
  assignmentId: string,
  statuses: Array<{ studentId: string; status: AssignmentCompletionStatus }>
): Promise<void> {
  await axiosInstance.put(`assignments/${assignmentId}/statuses`, { statuses })
}
