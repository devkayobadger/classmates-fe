import Logo from "@/assets/logo.png"

export function ClassmatesLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2.5">
        <img src={Logo} alt="Classmates Logo" className="size-8 shrink-0" />
        <span className="text-xl font-semibold text-foreground">
          Classmates
        </span>
      </div>
    </div>
  )
}
