import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  LayoutDashboard,
  Users,
} from "lucide-react"

export interface NavItem {
  label: string
  href: string
  permission: string
  breadcrumb: string
  icon: React.ElementType
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    permission: "dashboard:view",
    breadcrumb: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Attendance",
    href: "/attendance",
    permission: "attendance:view",
    breadcrumb: "Attendance",
    icon: CalendarCheck,
  },
  {
    label: "Subjects",
    href: "/subjects",
    permission: "subjects:view",
    breadcrumb: "Subjects",
    icon: BookOpen,
  },
  {
    label: "Students",
    href: "/students",
    permission: "students:view",
    breadcrumb: "Students",
    icon: Users,
  },
  {
    label: "Assessments",
    href: "/assessments",
    permission: "assessments:view",
    breadcrumb: "Assessments",
    icon: ClipboardList,
  },
  {
  label: "Exams",
  href: "/exams",
  permission: "assessment.read",
  breadcrumb: "Exams",
  icon: ClipboardCheck,
  },
  {
    label: "Reports",
    href: "/reports",
    permission: "reports:view",
    breadcrumb: "Reports",
    icon: BarChart3,
  },
]

export const FOOTER_NAV_ITEMS: NavItem[] = [
  ...NAV_ITEMS,
  {
    label: "Profile",
    href: "/profile",
    permission: "profile:view",
    breadcrumb: "Profile",
    icon: Users,
  },
]
