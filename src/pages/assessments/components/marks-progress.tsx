import { Separator } from "@/components/ui/separator"

interface MarksProgressSummaryProps {
  entered: number
  total: number
  average: number | null
  maxMarks: number
}

export function MarksProgressSummary({
  entered,
  total,
  average,
  maxMarks,
}: MarksProgressSummaryProps) {
  return (
    <div className="ml-auto flex w-fit gap-4">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{entered}</span>
        {" / "}
        {total} students graded
      </p>
      <Separator orientation="vertical" className="h-auto!" />
      <p className="text-sm text-muted-foreground">
        Avg{" "}
        <span className="font-semibold text-foreground">
          {average?.toFixed(1) ?? "—"}
        </span>{" "}
        / {maxMarks}
      </p>
    </div>
  )
}
