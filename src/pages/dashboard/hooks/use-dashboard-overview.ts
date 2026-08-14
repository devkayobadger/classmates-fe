import { useEffect, useState } from "react"

import { useAppSelector } from "@/lib/redux/hooks"

import { fetchDashboardOverview } from "../redux/dashboard.api"
import type { DashboardOverview } from "../redux/dashboard.types"

interface UseDashboardOverviewResult {
  data: DashboardOverview | undefined
  isLoading: boolean
  error: unknown
}

export function useDashboardOverview(): UseDashboardOverviewResult {
  const [data, setData] = useState<Omit<DashboardOverview, "userName">>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  // Always read the live Profile Name from the store, so the "Good
  // Morning" greeting updates immediately after a profile edit without
  // needing to refetch the whole dashboard.
  const fullName = useAppSelector((state) => state.auth.profile?.fullName)

  useEffect(() => {
    let cancelled = false

    fetchDashboardOverview()
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

  const overview: DashboardOverview | undefined = data
    ? { ...data, userName: fullName?.split(" ")[0] ?? "there" }
    : undefined

  return { data: overview, isLoading, error }
}
