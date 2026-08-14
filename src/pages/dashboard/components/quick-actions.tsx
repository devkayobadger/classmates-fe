import type { ComponentType } from "react"

import { ClipboardCheck, Download, PenLine, UserPlus } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuickAction {
  key: string
  label: string
  icon: ComponentType<{ className?: string }>
  iconClassName: string
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    key: "takeAttendance",
    label: "Take attendance",
    icon: ClipboardCheck,
    iconClassName: "bg-primary text-primary-foreground",
  },
  {
    key: "enterMarks",
    label: "Enter marks",
    icon: PenLine,
    iconClassName: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "addStudent",
    label: "Add student",
    icon: UserPlus,
    iconClassName: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    key: "exportReport",
    label: "Export report",
    icon: Download,
    iconClassName: "bg-muted text-muted-foreground",
  },
]

interface QuickActionsProps {
  onAction?: (key: string) => void
}

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_ACTIONS.map(({ key, label, icon: Icon, iconClassName }) => (
            <button
              key={key}
              type="button"
              onClick={() => onAction?.(key)}
              className="flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}
              >
                <Icon className="h-5 w-5" />
              </span>

              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
