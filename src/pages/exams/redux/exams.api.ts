import { axiosInstance } from "@/lib/redux/axios"
import type {
  Exam,
  ExamMarksOverview,
  ExamsOverview,
  ExamStudentMark,
  ExamType,
  ExamAvatarColor,
} from "./exams.types"

const AVATAR_COLORS: ExamAvatarColor[] = [
  "violet",
  "blue",
  "rose",
  "green",
  "teal",
  "amber",
]

function colorForIndex(index: number): ExamAvatarColor {
  return AVATAR_COLORS[index % AVATAR_COLORS.length]
}


function formatExamDateLabel(examDate: string): string {
  const date = new Date(`${examDate}T00:00:00`)

  const formatted = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  })

  const isPast = date.getTime() < new Date().setHours(0, 0, 0, 0)

  return isPast ? `Held ${formatted}` : `Scheduled ${formatted}`
}

interface BackendSubject {
  id: string
  name: string
  semester: number
  program: string | null
}

interface BackendExam {
  id: string
  subjectId: string
  type: ExamType
  title: string
  totalMarks: number
  examDate: string
  createdAt: string
  updatedAt: string
  studentCount: number
  enteredCount: number
  status: Exam["status"]
}

interface BackendExamStudentMark {
  id: string
  name: string
  rollNumber: string
  studentCode: string | null
  marks: number | null
}

interface BackendExamMarks {
  id: string
  title: string
  type: ExamType
  totalMarks: number
  examDate: string
  subject: string
  program: string
  semester: string
  dateLabel: string
  students: BackendExamStudentMark[]
}

async function fetchSubjects(): Promise<BackendSubject[]> {
  const { data } = await axiosInstance.get<BackendSubject[]>("subjects")
  return data
}

async function fetchExams(): Promise<BackendExam[]> {
  const { data } = await axiosInstance.get<BackendExam[]>("exams")
  return data
}

function toExam(exam: BackendExam): Exam {
  return {
    id: exam.id,
    subjectId: exam.subjectId,
    title: exam.title,
    type: exam.type,
    totalMarks: exam.totalMarks,
    status: exam.status,
    examDate: exam.examDate,
    dateLabel: formatExamDateLabel(exam.examDate),
    studentCount: exam.studentCount,
    enteredCount: exam.enteredCount,
  }
}

export async function fetchExamsOverview(
  subjectName?: string
): Promise<ExamsOverview> {
  const [subjects, exams] = await Promise.all([
    fetchSubjects(),
    fetchExams(),
  ])

  if (subjects.length === 0) {
    return { subject: "", program: "", semester: "", subjects: [], exams: [] }
  }

  const subjectsWithExams = new Set(exams.map((exam) => exam.subjectId))

  const activeSubject =
    subjects.find((subject) => subject.name === subjectName) ??
    subjects.find((subject) => subjectsWithExams.has(subject.id)) ??
    subjects[0]

  const examsForSubject = exams
    .filter((exam) => exam.subjectId === activeSubject.id)
    .map(toExam)

  return {
    subject: activeSubject.name,
    program: activeSubject.program ?? "",
    semester: `Semester ${activeSubject.semester}`,
    subjects: subjects.map((subject) => subject.name),
    exams: examsForSubject,
  }
}


export async function fetchExamMarks(
  examId: string
): Promise<ExamMarksOverview> {
  const { data } = await axiosInstance.get<BackendExamMarks>(
    `exams/${examId}/marks`
  )

  const students: ExamStudentMark[] = data.students.map((student, index) => ({
    id: student.id,
    name: student.name,
    studentCode: student.studentCode ?? undefined,
    rollNumber: student.rollNumber,
    marks: student.marks,
    index: index + 1,
    avatarColor: colorForIndex(index),
  }))

  return {
    examId: data.id,
    title: data.title,
    type: data.type,
    totalMarks: data.totalMarks,
    subject: data.subject,
    program: data.program,
    semester: data.semester,
    dateLabel: formatExamDateLabel(data.examDate),
    students,
  }
}

export async function saveExamMarks(
  examId: string,
  marks: Array<{ studentId: string; marks: number | null }>
): Promise<void> {
  await axiosInstance.put(`exams/${examId}/marks`, { marks })
}