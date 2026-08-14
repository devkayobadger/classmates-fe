import type { ComponentType } from "react"

import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  icon: ComponentType<{ className?: string }>
  iconClassName: string
  value: string
  label: string
  trailing?: string
  trailingClassName?: string
}

export function StatCard({
  icon: Icon,
  iconClassName,
  value,
  label,
  trailing,
  trailingClassName,
}: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClassName}`}
          >
            <Icon className="h-5 w-5" />
          </span>

          {trailing && (
            <span
              className={`text-xs font-medium ${
                trailingClassName ?? "text-muted-foreground"
              }`}
            >
              {trailing}
            </span>
          )}
        </div>

        <div className="mt-5 space-y-1">
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}
