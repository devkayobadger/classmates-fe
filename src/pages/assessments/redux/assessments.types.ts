export type AssessmentStatus = "marks-entered" | "in-progress" | "not-started"

export type AssessmentKind = "exam" | "assignment" | "quiz"

export interface Assessment {
  id: string
  title: string
  kind: AssessmentKind
  status: AssessmentStatus
  totalMarks: number
  dateLabel: string
  studentCount: number
  enteredCount: number
}

export interface AssessmentsOverview {
  subject: string
  program: string
  semester: string
  subjects: string[]
  assessments: Assessment[]
}

export type AvatarColor =
  "violet" | "blue" | "rose" | "green" | "teal" | "amber"

export type Grade = "A+" | "A" | "B+" | "B" | "C+" | "C" | "D+" | "D"

export interface StudentMark {
  id: string
  name: string
  rollNumber: string
  avatarColor: AvatarColor
  marks: number | null
}

export interface AssessmentMarksOverview {
  assessmentId: string
  title: string
  subject: string
  program: string
  semester: string
  dateLabel: string
  totalMarks: number
  students: StudentMark[]
}
