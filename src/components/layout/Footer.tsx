import { GraduationCap, Users, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/60 py-8 text-sm">
      <div className="page-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-card p-0.5 shadow-xs">
              <img
                src="/logo.png"
                alt="BUNORA Logo"
                className="size-full object-contain"
                width={28}
                height={28}
              />
            </div>
            <span className="font-heading font-semibold text-foreground">
              BUNORA • بُنورا
            </span>
            <span className="text-xs text-muted-foreground">
              “Every Bean Has a Story”
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Coffee Quality Score Prediction Using Machine Learning • Faculty of Computers and Information, Mansoura University
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="size-3.5 text-primary" />
            <span>Supervised by: <strong className="text-foreground">Dr. Sara El-Sayed El-Metwally</strong></span>
          </div>
          <span className="hidden sm:inline text-border">•</span>
          <div className="flex items-center gap-1.5">
            <Users className="size-3.5 text-primary" />
            <span>Project Team: <strong className="text-foreground">Section 6</strong></span>
          </div>
          <span className="hidden sm:inline text-border">•</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-primary" />
            <span>CQI Database Pipeline</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
