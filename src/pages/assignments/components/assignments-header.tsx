import { BookOpen, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { Assignment, AssignmentSubject } from "../redux/assignments.types"

interface AssignmentsHeaderProps {
  subjects: AssignmentSubject[]
  selectedSubjectId?: string
  search: string
  status?: Assignment["status"]
  onSubjectChange: (value?: string) => void
  onSearchChange: (value: string) => void
  onStatusChange: (value?: Assignment["status"]) => void
  onNewAssignment: () => void
}

export function AssignmentsHeader({
  subjects,
  selectedSubjectId,
  search,
  status,
  onSubjectChange,
  onSearchChange,
  onStatusChange,
  onNewAssignment,
}: AssignmentsHeaderProps) {
  const selectedSubject = subjects.find((subject) => subject.id === selectedSubjectId)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
          <p className="text-sm text-muted-foreground">
            {selectedSubject
              ? `${selectedSubject.name} · ${selectedSubject.program} · Semester ${selectedSubject.semester}`
              : "Manage assignments across all your subjects"}
          </p>
        </div>
        <Button onClick={onNewAssignment}>
          <Plus className="h-4 w-4" />
          Create assignment
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search assignments"
            className="pl-9"
          />
        </div>
        <Select
          value={selectedSubjectId ?? "all"}
          onValueChange={(value) => onSubjectChange(value === "all" ? undefined : value)}
        >
          <SelectTrigger className="w-full sm:w-52">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="All subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={status ?? "all"}
          onValueChange={(value) =>
            onStatusChange(value === "all" ? undefined : (value as Assignment["status"]))
          }
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="not-started">Not started</SelectItem>
            <SelectItem value="in-progress">In progress</SelectItem>
            <SelectItem value="statuses-entered">Statuses entered</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
