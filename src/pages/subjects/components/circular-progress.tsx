import { cn } from "@/lib/utils"

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
}

function toneForValue(value: number) {
  if (value >= 85) {
    return {
      track: "stroke-emerald-100",
      indicator: "stroke-emerald-500",
      text: "text-emerald-600",
    }
  }
  if (value >= 70) {
    return {
      track: "stroke-blue-100",
      indicator: "stroke-blue-500",
      text: "text-blue-600",
    }
  }
  return {
    track: "stroke-red-100",
    indicator: "stroke-red-500",
    text: "text-red-600",
  }
}

export function CircularProgress({
  value,
  size = 48,
  strokeWidth = 5,
  className,
}: CircularProgressProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference
  const tone = toneForValue(clamped)

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className={tone.track}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            tone.indicator,
            "transition-[stroke-dashoffset] duration-500"
          )}
        />
      </svg>
      <span className={cn("absolute text-xs font-semibold", tone.text)}>
        {Math.round(clamped)}%
      </span>
    </div>
  )
}
