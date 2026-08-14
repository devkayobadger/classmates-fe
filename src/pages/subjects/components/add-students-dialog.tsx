import { useState } from "react"
import { Check, UserPlus } from "lucide-react"

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
import { addStudentToSubject } from "@/pages/students/redux/students.api"

import { bumpSubjectStudentCount } from "../redux/subjects.api"
import type { Subject } from "../redux/subjects.types"

interface AddStudentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subject: Subject | null
  /** Called after each student is successfully added, so the page can
   * refresh the subject's student count. */
  onAdded: () => void
}

export function AddStudentsDialog({
  open,
  onOpenChange,
  subject,
  onAdded,
}: AddStudentsDialogProps) {
  const [name, setName] = useState("")
  const [studentCode, setStudentCode] = useState("")
  const [rollNumber, setRollNumber] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [addedCount, setAddedCount] = useState(0)

  const canSubmit =
    name.trim().length > 0 &&
    studentCode.trim().length > 0 &&
    rollNumber.trim().length > 0

  function resetFields() {
    setName("")
    setStudentCode("")
    setRollNumber("")
  }

  function resetAll() {
    resetFields()
    setAddedCount(0)
  }

  async function handleAdd() {
    if (!subject || !canSubmit || isSaving) return

    setIsSaving(true)

    try {
      // New students always start at 0% attendance / 0 marks — this
      // only appends a record, so existing students in this subject
      // (or any other) are never touched.
      await addStudentToSubject(subject.name, {
        name: name.trim(),
        studentCode: studentCode.trim(),
        rollNumber: rollNumber.trim(),
      })

      await bumpSubjectStudentCount()

      setAddedCount((count) => count + 1)
      resetFields()
      onAdded()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) resetAll()
        onOpenChange(next)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Students</DialogTitle>
          <DialogDescription>
            {subject
              ? `Manually add a student to ${subject.name}. They'll start at 0% attendance.`
              : "Manually add a student to this subject."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student-name">Student Name</Label>
            <Input
              id="student-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Sharma"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="student-code">Student Code</Label>
            <Input
              id="student-code"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              placeholder="e.g. CSIT 208299"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roll-number">Roll Number</Label>
            <Input
              id="roll-number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="e.g. BCA8199"
            />
          </div>

          {addedCount > 0 && (
            <p className="flex items-center gap-1.5 text-xs text-success">
              <Check className="h-3.5 w-3.5" />
              {addedCount} student{addedCount > 1 ? "s" : ""} added so far
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetAll()
              onOpenChange(false)
            }}
          >
            Done
          </Button>
          <Button onClick={handleAdd} disabled={!canSubmit || isSaving}>
            <UserPlus className="h-4 w-4" />
            {isSaving ? "Adding..." : "Add student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
