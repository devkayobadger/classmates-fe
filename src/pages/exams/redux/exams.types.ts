export type ExamType =
  | "unit-test"
  | "mid-term"
  | "pre-board"
  | "practical"

export type ExamStatus =
  | "marks-entered"
  | "in-progress"
  | "not-started"

export interface Exam {
   id: string
   subjectId: string
   title: string
   type: ExamType
   totalMarks: number
   status: ExamStatus
   examDate: string | null
   dateLabel: string
   studentCount: number
   enteredCount: number
 }

export interface ExamSubject {
  id: string
  name: string
  semester: number
  program: string | null
}

export interface ExamsOverview {
  subject: ExamSubject | null
  program: string
  semester: string
  subjects: ExamSubject[]
  exams: Exam[]
}
export type ExamAvatarColor =
  | "violet"
  | "blue"
  | "rose"
  | "green"
  | "teal"
  | "amber"

export interface ExamStudentMark {
  id: string
  name: string
  studentCode?: string
  rollNumber: string
  marks: number | null
  index: number
  avatarColor: ExamAvatarColor
}

export interface ExamMarksOverview {
  examId: string
  title: string
  type: ExamType
  totalMarks: number
  subject: string
  program: string
  semester: string
  dateLabel: string
  students: ExamStudentMark[]
}
