import { axiosInstance } from "@/lib/redux/axios"

import type { DashboardOverview } from "./dashboard.types"

// Matches the shape returned by GET {API_BASE}/dashboard/overview.
// userName/dateLabel are intentionally NOT part of the backend payload —
// userName always comes from the live auth profile in Redux (see
// use-dashboard-overview.ts) so the greeting updates the instant the
// Profile Name changes, and dateLabel is derived from the current date.
type DashboardOverviewApiResponse = Omit<DashboardOverview, "userName" | "dateLabel">

function getDateLabel(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
}

// Calls the real Express backend: GET {API_BASE}/dashboard/overview
// All stats, today's classes, recent activity, and at-risk students are
// computed live from PostgreSQL, scoped to the authenticated teacher.
export async function fetchDashboardOverview(): Promise<
  Omit<DashboardOverview, "userName">
> {
  const { data } = await axiosInstance.get<DashboardOverviewApiResponse>(
    "dashboard/overview"
  )

  return {
    ...data,
    dateLabel: getDateLabel(),
  }
}
