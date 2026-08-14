import { useCallback, useEffect, useState } from "react"

import { fetchStudentsOverview } from "../redux/students.api"
import type { StudentsOverview } from "../redux/students.types"

interface UseStudentsResult {
  data: StudentsOverview | undefined
  isLoading: boolean
  error: unknown
  /** Re-fetches the students overview, e.g. after adding a student. */
  refetch: () => Promise<void>
}

export function useStudents(): UseStudentsResult {
  const [data, setData] = useState<StudentsOverview>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const load = useCallback(async () => {
    try {
      const result = await fetchStudentsOverview()
      setData(result)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    fetchStudentsOverview()
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
