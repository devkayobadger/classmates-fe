import * as XLSX from "xlsx"
import { format } from "date-fns"

import type { AttendanceStudent } from "../redux/attendance-session.types"

interface ExportAttendanceProps {
  subjectName: string
  subjectCode: string
  date: Date
  room: string
  timeLabel: string
  students: AttendanceStudent[]
}

export function exportAttendanceToExcel({
  subjectName,
  subjectCode,
  date,
  room,
  timeLabel,
  students,
}: ExportAttendanceProps) {
  if (!students || students.length === 0) return

  const exportData = students.map((student) => ({
    "Student Name": student.name,
    "Student Code": student.studentCode,
    Status: student.status.toUpperCase(),
    "At Risk": student.atRisk?.label ?? "No",
    "Attendance Percentage": student.atRisk
      ? `${student.atRisk.percentage}%`
      : "-",
  }))

  const worksheet = XLSX.utils.json_to_sheet(exportData)

  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance")

  const sessionInfo = [
    {
      Subject: subjectName,
      "Subject Code": subjectCode,
      Date: format(date, "yyyy-MM-dd"),
      Room: room,
      Time: timeLabel,
      "Total Students": students.length,
    },
  ]

  const infoWorksheet = XLSX.utils.json_to_sheet(sessionInfo)

  XLSX.utils.book_append_sheet(workbook, infoWorksheet, "Session Details")

  XLSX.writeFile(
    workbook,
    `${subjectCode}_attendance_${format(date, "yyyy-MM-dd")}.xlsx`
  )
}
