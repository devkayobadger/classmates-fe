import { useEffect, useState } from "react"

import type { AssessmentMarksOverview } from "../redux/assessments.types"
import { fetchAssessmentMarks } from "../redux/assessments.api"

interface UseAssessmentMarksResult {
  data: AssessmentMarksOverview | undefined
  isLoading: boolean
  error: unknown
}

export function useAssessmentMarks(
  assessmentId: string
): UseAssessmentMarksResult {
  const [data, setData] = useState<AssessmentMarksOverview>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    let cancelled = false

    fetchAssessmentMarks(assessmentId)
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [assessmentId])

  return { data, isLoading, error }
}
