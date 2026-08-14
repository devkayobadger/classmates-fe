import type { ExamType } from "../redux/exams.types"

export const EXAM_CONFIG: Record<
  ExamType,
  {
    label: string
    totalMarks: number
  }
> = {
  "unit-test": {
    label: "Unit Test",
    totalMarks: 20,
  },

  "mid-term": {
    label: "Mid-term",
    totalMarks: 60,
  },

  "pre-board": {
    label: "Pre-board",
    totalMarks: 60,
  },

  practical: {
    label: "Practical Exam",
    totalMarks: 20,
  },
}

export function getExamLabel(type: ExamType): string {
  return EXAM_CONFIG[type].label
}

export function getExamTotalMarks(type: ExamType): number {
  return EXAM_CONFIG[type].totalMarks
}
