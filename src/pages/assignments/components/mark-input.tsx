import type { ChangeEvent } from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface MarkInputProps {
  value: number | null
  max: number
  onChange?: (value: number | null) => void
  editable?: boolean
}

export function MarkInput({ value, max, onChange, editable }: MarkInputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!editable) return
    if (!onChange) return

    const raw = e.target.value

    if (raw === "") {
      onChange?.(null)
      return
    }

    const parsed = Number(raw)
    if (Number.isNaN(parsed)) return

    onChange?.(Math.max(0, Math.min(max, Math.trunc(parsed))))
  }

  const hasValue = value !== null

  return (
    <div className="flex items-center gap-1.5">
      <Input
        type="number"
        min={0}
        max={max}
        step={1}
        value={value ?? ""}
        onChange={handleChange}
        disabled={!editable}
        className={cn(
          "no-spinner h-8 w-14 text-center tabular-nums",
          hasValue &&
            "border-emerald-300 bg-emerald-50 text-emerald-800 focus-visible:ring-emerald-300/50"
        )}
      />
      <span className="text-sm text-muted-foreground">/{max}</span>
    </div>
  )
}
