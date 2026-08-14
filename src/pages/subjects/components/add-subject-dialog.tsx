import { useMemo, useState } from "react"
import { Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import {
  bumpSubjectStudentCount,
  createSubject,
} from "../redux/subjects.api"
import type { Subject, SubjectColor } from "../redux/subjects.types"
import { importStudentsIntoSubject } from "@/pages/students/redux/students.api"

const SEMESTER_OPTIONS = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
]

const COLOR_OPTIONS: { value: SubjectColor; swatchClassName: string }[] = [
  { value: "blue", swatchClassName: "bg-blue-600" },
  { value: "green", swatchClassName: "bg-emerald-600" },
  { value: "orange", swatchClassName: "bg-amber-500" },
  { value: "slate", swatchClassName: "bg-slate-500" },
]

interface AddSubjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subjects: Subject[]
  onCreated: () => void
}

export function AddSubjectDialog({
  open,
  onOpenChange,
  subjects,
  onCreated,
}: AddSubjectDialogProps) {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [program, setProgram] = useState("")
  const [semester, setSemester] = useState("")
  const [color, setColor] = useState<SubjectColor>("blue")
  const [importSourceId, setImportSourceId] = useState<string>("none")
  const [isSaving, setIsSaving] = useState(false)

  // Other subjects already in the same semester AND the same faculty
  // (program) as the one being created — these are the only ones
  // eligible to have their roster imported into the new subject.
  // Matched case-insensitively so "BCA" and "bca" are treated the same.
  const semesterMatches = useMemo(() => {
    const normalizedProgram = program.trim().toLowerCase()
    if (!semester || !normalizedProgram) return []

    return subjects.filter(
      (subject) =>
        subject.semester === semester &&
        subject.program.trim().toLowerCase() === normalizedProgram
    )
  }, [subjects, semester, program])

  const canSubmit =
    name.trim().length > 0 &&
    code.trim().length > 0 &&
    program.trim().length > 0 &&
    semester.length > 0

  function resetForm() {
    setName("")
    setCode("")
    setProgram("")
    setSemester("")
    setColor("blue")
    setImportSourceId("none")
  }

  async function handleSubmit() {
    if (!canSubmit || isSaving) return

    setIsSaving(true)

    try {
      const newSubject = await createSubject({
        name: name.trim(),
        code: code.trim(),
        program: program.trim(),
        semester,
        color,
      })

      if (importSourceId !== "none") {
        const source = subjects.find((s) => s.id === importSourceId)

        if (source) {
          const importedCount = await importStudentsIntoSubject(
            source.name,
            newSubject.name
          )

          await bumpSubjectStudentCount()
        }
      }

      onCreated()
      resetForm()
      onOpenChange(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) resetForm()
        onOpenChange(next)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Subject</DialogTitle>
          <DialogDescription>
            Add a subject you teach this semester.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject-name">Subject Name</Label>
            <Input
              id="subject-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Operating System"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject-code">Subject Code</Label>
            <Input
              id="subject-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. CSIT-262"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="faculty-name">Faculty Name</Label>
            <Input
              id="faculty-name"
              value={program}
              onChange={(e) => {
                setProgram(e.target.value)
                setImportSourceId("none")
              }}
              placeholder="e.g. BSc CSIT"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select
              value={semester}
              onValueChange={(value) => {
                setSemester(value)
                setImportSourceId("none")
              }}
            >
              <SelectTrigger id="semester" className="w-full">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {SEMESTER_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex items-center gap-2">
              {COLOR_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-label={`${option.value} color`}
                  onClick={() => setColor(option.value)}
                  className={cn(
                    "h-7 w-7 rounded-full ring-offset-2 transition-all",
                    option.swatchClassName,
                    color === option.value
                      ? "ring-2 ring-ring"
                      : "opacity-60 hover:opacity-100"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Only appears once a semester is picked and another subject
              already exists in that same semester. */}
          {semester && semesterMatches.length > 0 && (
            <div className="space-y-2 rounded-lg border bg-muted/40 p-3">
              <Label htmlFor="import-students" className="text-sm">
                <Users className="h-4 w-4" />
                Import Students
              </Label>
              <p className="text-xs text-muted-foreground">
                Copy the enrolled students from an existing {semester}{" "}
                subject in {program} into this one.
              </p>
              <Select value={importSourceId} onValueChange={setImportSourceId}>
                <SelectTrigger id="import-students" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Don't import — start empty</SelectItem>
                  {semesterMatches.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name} ({subject.studentCount} students)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetForm()
              onOpenChange(false)
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit || isSaving}>
            {isSaving ? "Creating..." : "Create Subject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
