import { useState } from "react"
import { UserPlus } from "lucide-react"

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
import { bumpSubjectStudentCountByName } from "@/pages/subjects/redux/subjects.api"

import { addStudentToSubject } from "../redux/students.api"

interface AddStudentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Subject names available to enroll the student into. */
  subjects: string[]
  onAdded: () => void
}

export function AddStudentDialog({
  open,
  onOpenChange,
  subjects,
  onAdded,
}: AddStudentDialogProps) {
  const [subject, setSubject] = useState("")
  const [name, setName] = useState("")
  const [studentCode, setStudentCode] = useState("")
  const [rollNumber, setRollNumber] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const canSubmit =
    subject.length > 0 &&
    name.trim().length > 0 &&
    studentCode.trim().length > 0 &&
    rollNumber.trim().length > 0

  function resetForm() {
    setSubject("")
    setName("")
    setStudentCode("")
    setRollNumber("")
  }

  async function handleSubmit() {
    if (!canSubmit || isSaving) return

    setIsSaving(true)

    try {
      // New students always start at 0% attendance / 0 marks — this
      // only appends a record, so no existing student is affected.
      await addStudentToSubject(subject, {
        name: name.trim(),
        studentCode: studentCode.trim(),
        rollNumber: rollNumber.trim(),
      })

      await bumpSubjectStudentCountByName()

      onAdded()
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
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription>
            Enroll a student in one of your subjects. They'll start at 0%
            attendance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="add-student-subject">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="add-student-subject" className="w-full">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subjectName) => (
                  <SelectItem key={subjectName} value={subjectName}>
                    {subjectName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-student-name">Student Name</Label>
            <Input
              id="add-student-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Sharma"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-student-code">Student Code</Label>
            <Input
              id="add-student-code"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              placeholder="e.g. CSIT 208299"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-student-roll">Roll Number</Label>
            <Input
              id="add-student-roll"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="e.g. BCA8199"
            />
          </div>
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
            <UserPlus className="h-4 w-4" />
            {isSaving ? "Adding..." : "Add Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
