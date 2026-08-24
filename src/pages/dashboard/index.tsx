import { useNavigate } from "react-router-dom"

import { DashboardHeader } from "./components/dashboard-header"
import { NeedsAttention } from "./components/needs-attention"
import { QuickActions } from "./components/quick-actions"
import { RecentActivity } from "./components/recent-activity"
import { StatsGrid } from "./components/stats-grid"
import { TodaysClasses } from "./components/todays-classes"
import { useDashboardOverview } from "./hooks/use-dashboard-overview"

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboardOverview()
  const navigate = useNavigate()

  const handleQuickAction = (key: string) => {
    switch (key) {
      case "takeAttendance":
        navigate("/attendance")
        break

      case "enterMarks":
        navigate("/assignments")
        break

      case "addStudent":
        navigate("/students")
        break

      case "exportReport":
        break
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
        Loading dashboard…
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-destructive">
        Couldn't load your dashboard. Please try again.
      </div>
    )
  }

  const todaysClasses = data.todaysClasses ?? []
  const recentActivity = data.recentActivity ?? []
  const studentsNeedingAttention = data.studentsNeedingAttention ?? []

  const stats = data.stats ?? {
    avgAttendancePercentage: 0,
    avgAttendanceTrendPercentage: 0,
    classesRecordedToday: 0,
    classesTotalToday: 0,
    studentsBelowEligibility: 0,
    totalStudents: 0,
    totalSubjects: 0,
  }

  return (
    <div className="space-y-6 p-6">
      <DashboardHeader
        userName={data.userName}
        dateLabel={data.dateLabel}
        totalClassesToday={todaysClasses.length}
        pendingAttendanceCount={data.pendingAttendanceCount}
        onTakePendingAttendance={() => navigate("/attendance")}
      />

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <TodaysClasses
            classes={todaysClasses}
            onTakeAttendance={() => {
              navigate("/attendance")
            }}
            onPreviewRoster={() => {
              // TODO: open the roster preview
            }}
          />

          <RecentActivity activities={recentActivity} />
        </div>

        <div className="space-y-6">
          <QuickActions onAction={handleQuickAction} />
          <NeedsAttention students={studentsNeedingAttention} />
        </div>
      </div>
    </div>
  )
}
