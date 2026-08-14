import { useMemo } from "react"
import type { AttendanceStudent } from "../redux/attendance-session.types"

export default function useFilteredStudents({
  students,
  searchTerm,
}: {
  students: AttendanceStudent[]
  searchTerm: string
}) {
  return useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (query.length === 0) return students

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.studentCode.toLowerCase().includes(query)
    )
  }, [students, searchTerm])
}
