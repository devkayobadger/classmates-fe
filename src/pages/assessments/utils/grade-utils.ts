import type { Grade } from "../redux/assessments.types"

export function computeGrade(
  marks: number | null,
  total: number
): Grade | null {
  if (marks === null || total === 0) return null

  const percentage = (marks / total) * 100

  if (percentage >= 90) return "A+"
  if (percentage >= 80) return "A"
  if (percentage >= 70) return "B+"
  if (percentage >= 60) return "B"
  if (percentage >= 50) return "C+"
  if (percentage >= 40) return "C"
  if (percentage >= 30) return "D+"
  return "D"
}
