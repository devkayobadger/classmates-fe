import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  CheckCircle2,
  FileText,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

import type { Student } from "../redux/students.types"

interface StudentDetailSheetProps {
  student: Student | null
  isOpen: boolean
  onClose: () => void
}

export function StudentDetailSheet({
  student,
  isOpen,
  onClose,
}: StudentDetailSheetProps) {
  if (!student) return null

  // Generate initials for the avatar
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="flex w-full flex-col justify-between overflow-y-auto p-6 sm:max-w-md">
        <div className="space-y-6">
          {/* Header Profile Section */}
          <SheetHeader className="space-y-4 p-0 text-left">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base font-bold text-primary">
                  {initials}
                </div>
                <div>
                  <SheetTitle className="text-xl font-bold tracking-tight">
                    {student.name}
                  </SheetTitle>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {student.studentCode} · 4th Semester
                  </p>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge
                variant="outline"
                className={cn(
                  "gap-1 font-medium capitalize",
                  student.eligibility === "eligible" &&
                    "border-success/30 bg-success/5 text-success",
                  student.eligibility === "borderline" &&
                    "border-warning/30 bg-warning/5 text-warning",
                  student.eligibility === "at-risk" &&
                    "border-destructive/30 bg-destructive/5 text-destructive"
                )}
              >
                <CheckCircle2 className="h-3 w-3" />
                {student.eligibility}
              </Badge>
              <Badge variant="secondary" className="font-medium">
                BSc CSIT
              </Badge>
            </div>
          </SheetHeader>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1 rounded-xl border bg-card p-3.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                <span>% Attendance</span>
              </div>
              <p
                className={cn(
                  "text-2xl font-bold tracking-tight",
                  student.attendancePercentage >= 75
                    ? "text-success"
                    : "text-destructive"
                )}
              >
                {student.attendancePercentage}%
              </p>
            </div>

            <div className="space-y-1 rounded-xl border bg-card p-3.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                <Award className="h-3 w-3" />
                <span>Internal Avg</span>
              </div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {student.internalMarks}/{student.internalMarksTotal}
              </p>
            </div>

            <div className="space-y-1 rounded-xl border bg-card p-3.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                <Calendar className="h-3 w-3" />
                <span>Classes Attended</span>
              </div>
              <p className="text-xl font-bold tracking-tight text-foreground">
                23/36
              </p>
            </div>

            <div className="space-y-1 rounded-xl border bg-card p-3.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                <CheckCircle2 className="h-3 w-3" />
                <span>Status</span>
              </div>
              <p
                className={cn(
                  "pt-1 text-sm font-semibold capitalize",
                  student.eligibility === "eligible"
                    ? "text-success"
                    : "text-destructive"
                )}
              >
                {student.eligibility === "eligible"
                  ? "Eligible"
                  : "Not eligible"}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Contact
            </h3>
            <div className="divide-y rounded-xl border bg-card text-sm">
              <a
                href={`mailto:${student.name.toLowerCase().replace(/\s+/g, ".")}@student.trinity.edu.np`}
                className="group flex items-center gap-3 p-3 text-muted-foreground transition-colors hover:bg-muted/50"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate text-xs font-medium text-foreground group-hover:underline">
                  {student.name.toLowerCase().replace(/\s+/g, ".")}
                  @student.trinity.edu.np
                </span>
              </a>
              <a
                href="tel:+9779800000000"
                className="group flex items-center gap-3 p-3 text-muted-foreground transition-colors hover:bg-muted/50"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span className="text-xs font-medium text-foreground group-hover:underline">
                  +977 98XXXXXXXX
                </span>
              </a>
              <div className="flex items-center gap-3 p-3 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="text-xs font-medium text-foreground">
                  Kathmandu, Nepal
                </span>
              </div>
            </div>
          </div>
          {/* Subject-Wise Attendance */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Subject-Wise Attendance
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-xl border bg-card p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    DS
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Data Structures
                    </p>
                    <p className="text-xs text-muted-foreground">
                      23 of 36 classes
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-destructive">64%</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border bg-card p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-xs font-bold text-success">
                    DB
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Database Systems
                    </p>
                    <p className="text-xs text-muted-foreground">
                      30 of 34 classes
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-success">88%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="mt-6 flex items-center gap-3 border-t pt-6">
          <Button variant="outline" className="flex-1 gap-2" onClick={() => {}}>
            <Mail className="h-4 w-4" />
            Message
          </Button>
          <Button className="flex-1 gap-2" onClick={() => {}}>
            <FileText className="h-4 w-4" />
            Full report
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
