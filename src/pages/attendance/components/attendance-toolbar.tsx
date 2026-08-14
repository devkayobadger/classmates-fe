import { Check, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AttendanceToolbarProps {
  searchTerm: string
  onSearchTermChange: (value: string) => void
  onMarkAllPresent?: () => void
  onReset?: () => void
  /** Disables mark-all/reset actions while no attendance session is active. */
  disabled?: boolean
}

export function AttendanceToolbar({
  searchTerm,
  onSearchTermChange,
  onMarkAllPresent,
  onReset,
  disabled = false,
}: AttendanceToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          placeholder="Search name or roll number..."
          className="pl-9"
        />
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Mark all:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={onMarkAllPresent}
          disabled={disabled}
        >
          <Check className="h-4 w-4" />
          Present
        </Button>
        <Button variant="ghost" size="sm" onClick={onReset} disabled={disabled}>
          Reset
        </Button>
      </div>
    </div>
  )
}
