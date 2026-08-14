import * as XLSX from "xlsx"

import type { Student } from "../redux/students.types"

export function exportStudentsToExcel(
  students: Student[],
  filenamePrefix = "students_attendance_report"
) {
  if (!students || students.length === 0) return

  const exportData = students.map((student) => ({
    "Student Name": student.name,
    "Student Code": student.studentCode,
    "Roll Number": student.rollNumber,
    Subject: student.subject,
    "Attendance (%)": `${student.attendancePercentage}%`,
    "Internal Marks": `${student.internalMarks}/${student.internalMarksTotal}`,
    Eligibility: student.eligibility.toUpperCase(),
  }))

  const worksheet = XLSX.utils.json_to_sheet(exportData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Students")

  const currentDate = new Date().toISOString().split("T")[0]
  XLSX.writeFile(workbook, `${filenamePrefix}_${currentDate}.xlsx`)
}
