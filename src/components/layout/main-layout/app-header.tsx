import { Link, useLocation } from "react-router-dom"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AppHeader() {
  const { pathname } = useLocation()

  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbs = segments.map((segment) =>
    segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  )

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
      <SidebarTrigger />

      <nav className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb} className="flex items-center gap-2">
            {index > 0 && <span className="text-muted-foreground">/</span>}

            {breadcrumbs.length > 1 && index === 0 ? (
              <Link
                to={`/${segments[0]}`}
                className="text-primary underline transition-colors hover:text-foreground"
              >
                {crumb}
              </Link>
            ) : (
              <span
                className={
                  index === breadcrumbs.length - 1
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }
              >
                {crumb}
              </span>
            )}
          </div>
        ))}
      </nav>
    </header>
  )
}
