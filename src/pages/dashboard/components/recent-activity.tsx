import type { ComponentType } from "react"

import { Check, Pencil, TriangleAlert } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { ActivityItem, ActivityType } from "../redux/dashboard.types"

const ACTIVITY_ICON: Record<
  ActivityType,
  {
    icon: ComponentType<{ className?: string }>
    className: string
  }
> = {
  success: {
    icon: Check,
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  info: {
    icon: Pencil,
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: TriangleAlert,
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
}

interface RecentActivityProps {
  activities: ActivityItem[]
  formatTimestamp?: (timestamp: string) => string
}

export function RecentActivity({
  activities,
  formatTimestamp,
}: RecentActivityProps) {
  const safeActivities = activities ?? []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        {safeActivities.length === 0 ? (
          <div className="flex h-24 items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">
              No recent activity.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {safeActivities.map((activity) => {
              const activityConfig = ACTIVITY_ICON[activity.type]

              if (!activityConfig) {
                return null
              }

              const { icon: Icon, className } = activityConfig

              return (
                <li key={activity.id} className="flex items-start gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${className}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.message}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatTimestamp
                        ? formatTimestamp(activity.timestamp)
                        : activity.timestamp}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}