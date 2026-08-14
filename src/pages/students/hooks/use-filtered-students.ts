import { useMemo } from "react"

import type { SortKey } from "../components/students-filters"
import type {
  EligibilityStatus,
  StudentsOverview,
} from "../redux/students.types"

interface Props {
  data: StudentsOverview | undefined
  searchTerm: string
  selectedSubject: string
  selectedEligibility: EligibilityStatus[]
  sortKey: SortKey
}

export const useFilteredStudents = ({
  data,
  searchTerm,
  selectedSubject,
  selectedEligibility,
  sortKey,
}: Props) => {
  return useMemo(() => {
    if (!data) return []

    const query = searchTerm.trim().toLowerCase()

    const filtered = data.students.filter((student) => {
      const matchesQuery =
        query.length === 0 ||
        student.name.toLowerCase().includes(query) ||
        student.rollNumber.toLowerCase().includes(query)

      const matchesSubject =
        selectedSubject === "all" || student.subject === selectedSubject

      const matchesEligibility =
        selectedEligibility.length === 0 ||
        selectedEligibility.includes(student.eligibility)

      return matchesQuery && matchesSubject && matchesEligibility
    })

    return [...filtered].sort((a, b) => {
      if (sortKey === "attendance") {
        return b.attendancePercentage - a.attendancePercentage
      }
      if (sortKey === "internal") {
        return b.internalMarks - a.internalMarks
      }
      return a.name.localeCompare(b.name)
    })
  }, [data, searchTerm, selectedSubject, selectedEligibility, sortKey])
}
