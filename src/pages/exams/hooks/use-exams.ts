import { useEffect, useState } from "react"

import { fetchExamsOverview } from "../redux/exams.api"
import type { ExamsOverview } from "../redux/exams.types"

export function useExams(subjectId?: string) {
  const [data, setData] = useState<ExamsOverview | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setIsLoading(true)
        setError(null)
        const result = await fetchExamsOverview(subjectId)
        if (!cancelled) setData(result)
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [subjectId])

  return { data, isLoading, error }
}
