export type EligibilityStatus = "eligible" | "borderline" | "at-risk"

export type AvatarColor =
  "violet" | "blue" | "rose" | "green" | "teal" | "amber"

export interface Student {
  id: string
  name: string
  studentCode: string
  rollNumber: string
  subject: string
  attendancePercentage: number
  internalMarks: number
  internalMarksTotal: number
  eligibility: EligibilityStatus
  avatarColor: AvatarColor
}

export interface StudentsOverview {
  students: Student[]
  subjects: string[]
}

/** Payload for manually adding a student to a subject. */
export interface NewStudentInput {
  name: string
  studentCode: string
  rollNumber: string
}
