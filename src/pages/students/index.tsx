import { useState } from "react"

import type { EligibilityStatus } from "./redux/students.types"
import { StudentDetailSheet } from "./components/student-detail-sheet"
import { StudentsFilters, type SortKey } from "./components/students-filters"
import { StudentsHeader } from "./components/students-header"
import { StudentsTable } from "./components/students-table"
import { AddStudentDialog } from "./components/add-student-dialog"
import { exportStudentsToExcel } from "./utils/export-utils"
import { useFilteredStudents } from "./hooks/use-filtered-students"
import { useStudents } from "./hooks/use-students"

export default function StudentsPage() {
  const { data, isLoading, error, refetch } = useStudents()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedEligibility, setSelectedEligibility] = useState<
    EligibilityStatus[]
  >([])
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)

  // State to track the student open in the side modal sheet
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  )

  const filteredStudents = useFilteredStudents({
    data,
    searchTerm,
    selectedSubject,
    selectedEligibility,
    sortKey,
  })

  // Find active student object based on ID
  const activeStudent =
    data?.students.find((s) => s.id === selectedStudentId) || null

  if (isLoading) return <Loading />

  if (error || !data) return <Error />

  return (
    <div className="space-y-6 p-6">
      <StudentsHeader
        onExport={() => exportStudentsToExcel(filteredStudents)}
        onAddStudent={() => setIsAddStudentOpen(true)}
      />

      <StudentsFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        subjects={data.subjects}
        selectedSubject={selectedSubject}
        onSubjectChange={setSelectedSubject}
        selectedEligibility={selectedEligibility}
        onEligibilityChange={setSelectedEligibility}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
      />

      <StudentsTable
        students={filteredStudents}
        onOpen={(id) => {
          setSelectedStudentId(id)
        }}
      />

      {/* Right Drawer / Sheet for Student Details */}
      <StudentDetailSheet
        student={activeStudent}
        isOpen={Boolean(selectedStudentId)}
        onClose={() => setSelectedStudentId(null)}
      />

      <AddStudentDialog
        open={isAddStudentOpen}
        onOpenChange={setIsAddStudentOpen}
        subjects={data.subjects}
        onAdded={refetch}
      />
    </div>
  )
}

function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
      Loading students…
    </div>
  )
}

function Error() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-destructive">
      Couldn't load your students. Please try again.
    </div>
  )
}
