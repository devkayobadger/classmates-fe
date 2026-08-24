export type AssignmentStatus = "statuses-entered" | "in-progress" | "not-started"

export interface AssignmentSubject {
  id: string
  name: string
  code: string
  semester: number
  program: string
}

export interface Assignment {
  id: string
  subjectId: string
  subjectName: string
  subjectCode: string
  title: string
  description: string | null
  assignedDate: string
  dueDate: string
  studentCount: number
  enteredCount: number
  status: AssignmentStatus
}

export interface AssignmentsOverview {
  subjects: AssignmentSubject[]
  assignments: Assignment[]
}

export interface AssignmentStudentMark {
  id: string
  name: string
  rollNumber: string
  studentCode?: string
  status: AssignmentCompletionStatus | null
  index: number
  avatarColor: AvatarColor
}

export type AssignmentCompletionStatus = "done" | "not_done" | "late" | "excused"

export type AvatarColor =
  "violet" | "blue" | "rose" | "green" | "teal" | "amber"

export type StudentMark = AssignmentStudentMark

export interface AssignmentMarksOverview {
  assignmentId: string
  title: string
  description: string | null
  assignedDate: string
  dueDate: string
  subject: string
  subjectCode: string
  program: string
  semester: string
  students: AssignmentStudentMark[]
}

export interface AssignmentInput {
  subjectId: string
  title: string
  description?: string | null
  assignedDate: string
  dueDate: string
}
