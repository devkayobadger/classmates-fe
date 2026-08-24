import { useCallback, useEffect, useState } from "react"

import { fetchAssignmentsOverview } from "../redux/assignments.api"
import type { Assignment, AssignmentsOverview } from "../redux/assignments.types"

export function useAssignments(filters?: {
  subjectId?: string
  search?: string
  status?: Assignment["status"]
}) {
  const [data, setData] = useState<AssignmentsOverview>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const load = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      setData(await fetchAssignmentsOverview(filters))
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    const requestTimer = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(requestTimer)
  }, [load])

  return { data, isLoading, error, reload: load }
}
