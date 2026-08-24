import { useState, type FormEvent } from "react"

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

import type { Assignment, AssignmentInput, AssignmentSubject } from "../redux/assignments.types"

interface AssignmentDialogProps {
  open: boolean
  assignment?: Assignment
  subjects: AssignmentSubject[]
  defaultSubjectId?: string
  isSaving: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (input: AssignmentInput) => void
}

const emptyForm: AssignmentInput = {
  subjectId: "",
  title: "",
  description: "",
  assignedDate: "",
  dueDate: "",
}

export function AssignmentDialog({ open, assignment, subjects, defaultSubjectId, isSaving, onOpenChange, onSubmit }: AssignmentDialogProps) {
  const [form, setForm] = useState<AssignmentInput>(() =>
    assignment
      ? {
          subjectId: assignment.subjectId,
          title: assignment.title,
          description: assignment.description ?? "",
          assignedDate: assignment.assignedDate,
          dueDate: assignment.dueDate,
        }
      : { ...emptyForm, subjectId: defaultSubjectId ?? subjects[0]?.id ?? "" }
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({ ...form, description: form.description?.trim() || null })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{assignment ? "Edit assignment" : "Create assignment"}</DialogTitle>
          <DialogDescription>Set the assignment details and choose the enrolled subject.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="assignment-title">Title</Label>
            <Input id="assignment-title" required maxLength={255} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Linked list implementation" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignment-description">Description</Label>
            <textarea id="assignment-description" maxLength={2000} value={form.description ?? ""} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Instructions or notes for students" className="flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" />
          </div>
          <div className="space-y-2">
            <Label>Subject</Label>
            <Select value={form.subjectId} onValueChange={(subjectId) => setForm({ ...form, subjectId })}>
              <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => <SelectItem key={subject.id} value={subject.id}>{subject.name} ({subject.code})</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="assigned-date">Assigned date</Label><Input id="assigned-date" required type="date" value={form.assignedDate} onChange={(event) => setForm({ ...form, assignedDate: event.target.value })} /></div>
            <div className="space-y-2"><Label htmlFor="due-date">Due date</Label><Input id="due-date" required type="date" min={form.assignedDate || undefined} value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSaving || !form.subjectId}>{isSaving ? "Saving..." : assignment ? "Save changes" : "Create assignment"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
