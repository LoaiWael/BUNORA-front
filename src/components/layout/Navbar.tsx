import { Link, NavLink } from "react-router"
import { Coffee, GraduationCap, Moon, Sun, BarChart3, Database } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
}

export function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const navItems = [
    { path: "/", label: "Predictor Studio", icon: Coffee },
    { path: "/models", label: "Model Benchmark", icon: BarChart3 },
    { path: "/dataset", label: "CQI Dataset & EDA", icon: Database },
    { path: "/about", label: "Project & Team", icon: GraduationCap },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="page-shell flex h-16 items-center justify-between gap-4">
        {/* Brand Logo & Title with View Transition */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            viewTransition
            className="flex items-center gap-3 text-start transition-opacity hover:opacity-90"
          >
            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-card p-1 shadow-xs">
              <img
                src="/logo.png"
                alt="BUNORA Logo"
                className="size-full object-contain"
                width={40}
                height={40}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                  BUNORA
                </span>
                <span className="rounded bg-secondary px-1.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  بُنورا
                </span>
              </div>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Coffee Quality ML System • Mansoura University
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Tabs with viewTransition prop */}
        <nav className="hidden md:flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                viewTransition
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-card text-foreground shadow-xs ring-1 ring-border font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <Icon className="size-3.5" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Academic Badge */}
        <div className="flex items-center gap-2">
          <TooltipProvider delay={150}>
            <Tooltip>
              <TooltipTrigger
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme mode"
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted"
              >
                {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={6}>
                Switch to {isDark ? "Light" : "Dark"} Mode
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delay={150}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Link
                    to="/about"
                    viewTransition
                    aria-label="Faculty of Computers and Information, Mansoura University"
                    className="hidden sm:flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-2.5 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary"
                  />
                }
              >
                <GraduationCap className="size-3.5" />
                <span>Mansoura Univ.</span>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={6}>
                Supervised by Dr. Sara El-Sayed El-Metwally
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar with viewTransition */}
      <div className="flex border-t border-border bg-card/50 px-2 py-1.5 md:hidden overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 w-full justify-between">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                viewTransition
                className={({ isActive }) =>
                  `flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <Icon className="size-3.5" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </header>
  )
}
