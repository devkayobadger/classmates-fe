const schedule = [
  {
    code: "DS",
    subject: "Data Structures",
    time: "Now",
    chip: "blue" as const,
    active: true,
  },
  {
    code: "OS",
    subject: "Operating Systems",
    time: "12:00",
    chip: "amber" as const,
  },
  {
    code: "DB",
    subject: "Database Systems",
    time: "2:30",
    chip: "violet" as const,
  },
]

const chipClasses = {
  blue: "text-blue-500 bg-blue-500/10",
  amber: "text-amber-500 bg-amber-500/10",
  violet: "text-violet-500 bg-violet-500/10",
  green: "text-emerald-500 bg-emerald-500/10",
} as const

export function TestimonialPanel() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-10 px-10 py-16 lg:px-16">
      <div className="flex max-w-md flex-col gap-10">
        <div className="space-y-5">
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">
            Why teachers switch
          </span>
          <blockquote className="py-2 text-xl leading-snug font-medium text-foreground sm:text-2xl">
            “Classmates helps me understand my students beyond attendance - I see who needs
            help, who is improving, and how I can guide them better.”
          </blockquote>
          <div className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${chipClasses.green}`}
            >
              IC
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">Indra Chaudhary</p>
              <p className="text-sm text-muted-foreground">
                Lecturer · BSc CSIT, Trinity
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-4xl border border-border bg-card p-5 shadow-sm">
          <p className="mb-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Today · {schedule.length} classes
          </p>
          <ul className="space-y-1">
            {schedule.map((item) => (
              <li
                key={item.code}
                className="flex items-center gap-3 rounded-lg px-1 py-2"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${chipClasses[item.chip]}`}
                >
                  {item.code}
                </span>
                <span className="flex-1 text-sm font-medium text-foreground">
                  {item.subject}
                </span>
                <span
                  className={
                    item.active
                      ? "bg-chip-amber text-chip-amber-foreground rounded-full px-2 py-0.5 text-xs font-semibold"
                      : "text-xs text-muted-foreground"
                  }
                >
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
