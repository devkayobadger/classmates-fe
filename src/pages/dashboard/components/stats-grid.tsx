import { CalendarCheck, UserCheck, TriangleAlert, Users } from "lucide-react"

import type { DashboardStats } from "../redux/dashboard.types"
import { StatCard } from "./stat-card"

interface StatsGridProps {
  stats: DashboardStats
}

export function StatsGrid({ stats }: StatsGridProps) {
   const trendUp = (stats?.avgAttendanceTrendPercentage ?? 0) >= 0

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        icon={CalendarCheck}
        iconClassName="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        value={`${stats.avgAttendancePercentage}%`}
        label="Avg attendance this month"
        trailing={`${trendUp ? "↗" : "↘"} ${Math.abs(stats.avgAttendanceTrendPercentage)}%`}
        trailingClassName={
          trendUp
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-destructive"
        }
      />
      <StatCard
        icon={UserCheck}
        iconClassName="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        value={`${stats.classesRecordedToday}/${stats.classesTotalToday}`}
        label="Classes recorded today"
      />
      <StatCard
        icon={TriangleAlert}
        iconClassName="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        value={String(stats.studentsBelowEligibility)}
        label="Students below 75% eligibility"
      />
      <StatCard
        icon={Users}
        iconClassName="bg-muted text-muted-foreground"
        value={String(stats.totalStudents)}
        label={`Students across ${stats.totalSubjects} subjects`}
      />
    </div>
  )
}
