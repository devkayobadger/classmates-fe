import type { ComponentType } from "react"

import UnderConstruction from "@/pages/errors/under-construction"
import Dashboard from "@/pages/dashboard"

// Attendance
import Attendance from "@/pages/attendance"
import AttendanceSessionPage from "@/pages/attendance/[subjectId]"

import Subjects from "@/pages/subjects"
import Students from "@/pages/students"

// Assignments
import Assignments from "@/pages/assignments"
import AssignmentMarks from "@/pages/assignments/[id]/marks"

//Exams
import Exams from "@/pages/exams"
import EditExamMarks from "@/pages/exams/[id]/edit"

import Reports from "@/pages/reports"

export interface AppRoute {
  path: string
  element: ComponentType
  permission?: string
  title: string
  showInSidebar: boolean
}

export const privateRoutes: AppRoute[] = [
  {
    path: "/dashboard",
    element: Dashboard,
    title: "Dashboard",
    showInSidebar: true,
  },

  // Attendance
  {
    path: "/attendance",
    element: Attendance,
    permission: "attendance.read",
    title: "Attendance",
    showInSidebar: true,
  },
  {
    path: "/attendance/:subjectId/:date",
    element: AttendanceSessionPage,
    permission: "attendance.read",
    title: "Attendance Session",
    showInSidebar: false,
  },

  {
    path: "/subjects",
    element: Subjects,
    permission: "subject.read",
    title: "Subjects",
    showInSidebar: true,
  },

  {
    path: "/students",
    element: Students,
    permission: "student.read",
    title: "Students",
    showInSidebar: true,
  },

  // Assignments
  {
    path: "/assignments",
    element: Assignments,
    permission: "assessment.read",
    title: "Assignments",
    showInSidebar: true,
  },

  {
    path: "/assignments/:id/statuses",
    element: AssignmentMarks,
    permission: "assessment.write",
    title: "Update Assignment Statuses",
    showInSidebar: false,
  },

  // Exams
  {
  path: "/exams",
  element: Exams,
  permission: "assessment.read",
  title: "Exams",
  showInSidebar: true,
  },
  {
    path: "/exams/:id/edit",
    element: EditExamMarks,
    permission: "assessment.write",
    title: "Enter Exam Marks",
    showInSidebar: false,
  },

  {
    path: "/reports",
    element: Reports,
    permission: "report.read",
    title: "Reports",
    showInSidebar: true,
  },

  {
    path: "/coming-soon",
    element: UnderConstruction,
    title: "Coming Soon",
    showInSidebar: false,
  },
]
