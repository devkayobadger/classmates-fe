import { useEffect, useState } from "react"

import type { AssessmentsOverview } from "../redux/assessments.types"
import { fetchAssessmentsOverview } from "../redux/assessments.api"

interface UseAssessmentsResult {
  data: AssessmentsOverview | undefined
  isLoading: boolean
  error: unknown
}

export function useAssessments(): UseAssessmentsResult {
  const [data, setData] = useState<AssessmentsOverview>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    let cancelled = false

    fetchAssessmentsOverview()
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
  }, [])

  return { data, isLoading, error }
}
