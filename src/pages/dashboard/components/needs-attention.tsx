import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { AttentionStudent } from "../redux/dashboard.types"

const AVATAR_PALETTE = [
  "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
]

interface NeedsAttentionProps {
  students: AttentionStudent[]
  onViewAll?: () => void
}

export function NeedsAttention({ students, onViewAll }: NeedsAttentionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Needs Attention</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Students near the eligibility cutoff
          </p>
        </div>

        <Button onClick={onViewAll} variant="link">
          View all
        </Button>
      </CardHeader>

      <CardContent>
        {students.length === 0 ? (
          <div className="flex h-24 items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">
              No students need attention.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {students.map((student, index) => (
              <li key={student.id} className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    AVATAR_PALETTE[index % AVATAR_PALETTE.length]
                  }`}
                >
                  {student.initials}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{student.name}</p>

                  <p className="truncate text-xs text-muted-foreground">
                    {student.subject} · Semester {student.semester}
                  </p>
                </div>

                <span className="text-sm font-semibold text-destructive">
                  {student.attendancePercentage}%
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
