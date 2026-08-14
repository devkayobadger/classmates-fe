import { cn } from "@/lib/utils"

interface AttendanceBarProps {
  value: number
  className?: string
}

function toneForValue(value: number) {
  if (value >= 85) return "bg-emerald-500"
  if (value >= 75) return "bg-blue-500"
  if (value >= 65) return "bg-amber-600"
  return "bg-red-500"
}

export function AttendanceBar({ value, className }: AttendanceBarProps) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", toneForValue(clamped))}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="w-9 text-sm text-muted-foreground">{clamped}%</span>
    </div>
  )
}
