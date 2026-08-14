import { useCallback, useEffect, useState } from "react"

import { fetchSubjectsOverview } from "./subjects.api"
import type { SubjectsOverview } from "./subjects.types"

interface UseSubjectsResult {
  data: SubjectsOverview | undefined
  isLoading: boolean
  error: unknown
  /** Re-fetches the subjects overview, e.g. after creating a subject. */
  refetch: () => Promise<void>
}

export function useSubjects(): UseSubjectsResult {
  const [data, setData] = useState<SubjectsOverview>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const load = useCallback(async () => {
    try {
      const result = await fetchSubjectsOverview()
      setData(result)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    fetchSubjectsOverview()
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

  return { data, isLoading, error, refetch: load }
}
