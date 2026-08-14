export type SubjectColor = "blue" | "green" | "orange" | "slate"

export interface Subject {
  id: string
  code: string
  name: string
  program: string
  semester: string
  studentCount: number
  attendancePercentage: number
  color: SubjectColor
}

export interface SubjectsOverview {
  subjects: Subject[]
  totalStudents: number
}

/** Payload for creating a subject via the "New Subject" form. */
export interface NewSubjectInput {
  name: string
  code: string
  program: string
  semester: string
  color: SubjectColor
}
