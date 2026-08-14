import { format } from "date-fns"

export const getAttendancePagePath = (
  subjectId: string,
  date: Date = new Date()
) => {
  return `/attendance/${subjectId}/${format(date, "yyyy-MM-dd")}`
}
