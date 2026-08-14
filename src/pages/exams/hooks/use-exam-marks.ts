import { useEffect, useState } from "react"

import type { ExamMarksOverview } from "../redux/exams.types"
import { fetchExamMarks } from "../redux/exams.api"

interface UseExamMarksResult {
  data: ExamMarksOverview | undefined
  isLoading: boolean
  error: unknown
}

export function useExamMarks(
  examId: string
): UseExamMarksResult {
  const [data, setData] =
    useState<ExamMarksOverview>()

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState<unknown>(null)

  useEffect(() => {
    let cancelled = false

    setIsLoading(true)
    setError(null)

    fetchExamMarks(examId)
      .then((result) => {
        if (!cancelled) {
          setData(result)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [examId])

  return {
    data,
    isLoading,
    error,
  }
}