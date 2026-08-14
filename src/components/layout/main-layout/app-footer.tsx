import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { FOOTER_NAV_ITEMS } from "@/lib/constants/nav-items"
import { cn } from "@/lib/utils"

export function AppFooter() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (href: string) => {
    navigate(href)
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[95%] max-w-4xl -translate-x-1/2 px-2">
      <nav className="flex items-center rounded-full border border-border bg-background/90 py-2 shadow-xl backdrop-blur-md">
        <div className="flex w-full items-center justify-around">
          {FOOTER_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(`${item.href}/`)

            return (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                onClick={() => handleClick(item.href)}
                className={cn(
                  "rounded-full text-xs transition-colors sm:text-sm",
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

// dark version
{
  /* <div className="fixed bottom-6 left-1/2 z-50 w-[95%] max-w-4xl -translate-x-1/2 px-2">
    <nav className="flex items-center rounded-full border bg-zinc-950/90 border-zinc-800 py-1 shadow-xl backdrop-blur-md">
        <div className="flex w-full items-center justify-around">
            {FOOTER_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.label;

                return (
                    <Button
                        key={item.label}
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTab(item.label)}
                        className={cn(
                            "rounded-full text-xs sm:text-sm transition-colors",
                            isActive ? "bg-secondary text-foreground hover:bg-secondary/90 hover:text-foreground"
                                : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"

                        )}
                    >
                        <Icon className="size-4" />
                        <span className="hidden md:inline">{item.label}</span>
                    </Button>
                );
            })}
        </div>
    </nav>
</div> */
}
