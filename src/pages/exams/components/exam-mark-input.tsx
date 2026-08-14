import type { ChangeEvent } from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ExamMarkInputProps {
  value: number | null
  max: number
  onChange: (value: number | null) => void
}

export function ExamMarkInput({
  value,
  max,
  onChange,
}: ExamMarkInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value

    // Empty input means marks have not been entered.
    if (raw === "") {
      onChange(null)
      return
    }

    const parsed = Number(raw)

    // Ignore invalid values.
    if (!Number.isFinite(parsed)) {
      return
    }

    // Keep marks inside the valid range.
    if (parsed < 0 || parsed > max) {
      return
    }

    onChange(parsed)
  }

  const hasValue = value !== null

  return (
    <div className="flex items-center gap-1.5">
      <Input
        type="number"
        min={0}
        max={max}
        step="0.5"
        value={value ?? ""}
        onChange={handleChange}
        placeholder="—"
        className={cn(
          "no-spinner h-8 w-16 text-center tabular-nums",
          hasValue &&
            "border-emerald-300 bg-emerald-50 text-emerald-800 focus-visible:ring-emerald-300/50"
        )}
      />

      <span className="text-sm text-muted-foreground">
        /{max}
      </span>
    </div>
  )
}