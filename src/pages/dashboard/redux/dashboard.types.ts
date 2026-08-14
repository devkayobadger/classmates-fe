export type ClassStatus = "in-progress" | "recorded" | "upcoming"

export interface ClassSession {
  id: string
  time: string // e.g. "10:00"
  durationMinutes: number
  subject: string
  status: ClassStatus
  studentCount: number
  program: string // e.g. "BSc CSIT"
  semester: string // e.g. "4th Sem"
  room: string
  recordedPresentCount?: number // present only when status === "recorded"
}

export type ActivityType = "success" | "info" | "warning"

export interface ActivityItem {
  id: string
  type: ActivityType
  message: string
  timestamp: string // ISO string, formatted for display where it's rendered
}

export interface AttentionStudent {
  id: string
  name: string
  initials: string
  subject: string
  semester: string
  attendancePercentage: number
}

export interface DashboardStats {
  avgAttendancePercentage: number
  avgAttendanceTrendPercentage: number
  classesRecordedToday: number
  classesTotalToday: number
  studentsBelowEligibility: number
  totalStudents: number
  totalSubjects: number
}

export interface DashboardOverview {
  userName: string
  dateLabel: string // e.g. "Thursday, 10 July"
  pendingAttendanceCount: number
  stats: DashboardStats
  todaysClasses: ClassSession[]
  recentActivity: ActivityItem[]
  studentsNeedingAttention: AttentionStudent[]
}
