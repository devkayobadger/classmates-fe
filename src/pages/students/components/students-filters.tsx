import { ArrowUpDown, BookOpen, Filter, Search } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import type { EligibilityStatus } from "../redux/students.types"

export type SortKey = "name" | "attendance" | "internal"

const ELIGIBILITY_OPTIONS: { value: EligibilityStatus; label: string }[] = [
  { value: "eligible", label: "Eligible" },
  { value: "borderline", label: "Borderline" },
  { value: "at-risk", label: "At risk" },
]

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "attendance", label: "Attendance" },
  { value: "internal", label: "Internal marks" },
]

interface StudentsFiltersProps {
  searchTerm: string
  onSearchTermChange: (value: string) => void
  subjects: string[]
  selectedSubject: string
  onSubjectChange: (value: string) => void
  selectedEligibility: EligibilityStatus[]
  onEligibilityChange: (value: EligibilityStatus[]) => void
  sortKey: SortKey
  onSortKeyChange: (value: SortKey) => void
}

export function StudentsFilters({
  searchTerm,
  onSearchTermChange,
  subjects,
  selectedSubject,
  onSubjectChange,
  selectedEligibility,
  onEligibilityChange,
  sortKey,
  onSortKeyChange,
}: StudentsFiltersProps) {
  function toggleEligibility(value: EligibilityStatus) {
    if (selectedEligibility.includes(value)) {
      onEligibilityChange(selectedEligibility.filter((v) => v !== value))
    } else {
      onEligibilityChange([...selectedEligibility, value])
    }
  }

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

      <Select value={selectedSubject} onValueChange={onSubjectChange}>
        <SelectTrigger className="w-full sm:w-50">
          <BookOpen className="h-4 w-4 text-black dark:text-white" />
          <SelectValue placeholder="All subjects" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All subjects</SelectItem>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-start sm:w-40">
            <Filter className="h-4 w-4" />
            Eligibility
            {selectedEligibility.length > 0 && (
              <span className="ml-auto rounded-full bg-secondary px-1.5 text-xs">
                {selectedEligibility.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filter by eligibility</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ELIGIBILITY_OPTIONS.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={selectedEligibility.includes(option.value)}
              onCheckedChange={() => toggleEligibility(option.value)}
              onSelect={(e) => e.preventDefault()}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="sm:ml-auto">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={sortKey}
            onValueChange={(value) => onSortKeyChange(value as SortKey)}
          >
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
