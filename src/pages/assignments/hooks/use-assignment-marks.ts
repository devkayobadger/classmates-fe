import { useEffect, useState } from "react"

import type { AssignmentMarksOverview } from "../redux/assignments.types"
import { fetchAssignmentMarks } from "../redux/assignments.api"

export function useAssignmentMarks(assignmentId: string) {
  const [data, setData] = useState<AssignmentMarksOverview>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    let cancelled = false

    fetchAssignmentMarks(assignmentId)
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
  }, [assignmentId])

  return { data, isLoading, error }
}
