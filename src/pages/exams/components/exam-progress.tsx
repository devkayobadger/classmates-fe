import { cn } from "@/lib/utils"

interface ExamProgressProps {
  entered: number
  total: number
  className?: string
}

export function ExamProgress({
  entered,
  total,
  className,
}: ExamProgressProps) {
  const percentage =
    total === 0
      ? 0
      : Math.round((entered / total) * 100)

  const barColor =
    percentage === 0
      ? "bg-muted-foreground/20"
      : percentage === 100
        ? "bg-emerald-500"
        : "bg-amber-500"

  return (
    <div
      className={cn(
        "w-36 shrink-0 text-right",
        className
      )}
    >
      <p className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          Entered
        </span>

        <span className="font-medium">
          {entered}/{total}
        </span>
      </p>

      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            barColor
          )}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
}