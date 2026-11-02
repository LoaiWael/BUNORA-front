import {
  GraduationCap,
  Users,
  Calendar,
  Workflow,
  Code2,
} from "lucide-react"
import { TEAM_MEMBERS, TIMELINE_MILESTONES } from "@/data/mock-data"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"

export function ProjectSpecs() {
  const techStack = [
    { component: "Machine Learning Core", tools: ["Python", "scikit-learn", "XGBoost", "pandas", "NumPy", "Joblib"] },
    { component: "Backend REST API", tools: ["FastAPI", "Uvicorn", "Pydantic", "Python 3.11"] },
    { component: "Frontend Web Application", tools: ["React 19", "TypeScript", "Tailwind CSS v4", "Vite", "Recharts"] },
    { component: "DevOps & Reproducibility", tools: ["Docker", "Git", "GitHub", "Pinned Dependencies"] },
  ]

  return (
    <div className="space-y-10 py-6">
      {/* University & Academic Header */}
      <FadeIn direction="up" delay={0.05} duration={0.4}>
        <div className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/20 p-6 md:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold text-secondary-foreground">
                <GraduationCap className="size-3.5 text-primary" />
                <span>Mansoura University • Faculty of Computers and Information</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                BUNORA Academic Project Details
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Department of Computer Science • AI / Machine Learning Project • Fall 2026
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-1">
              <div className="text-muted-foreground">Course Instructor & Supervision:</div>
              <div className="font-semibold text-foreground text-sm">
                Dr. Sara El-Sayed El-Metwally
              </div>
              <div className="text-[11px] text-muted-foreground">
                Department of Computer Science
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Team Roster Section */}
      <FadeIn direction="up" delay={0.1}>
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                Project Research & Development Team
              </h2>
            </div>
            <span className="rounded bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
              Section 6
            </span>
          </div>

          <StaggerContainer staggerDelay={0.07} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member) => (
              <StaggerItem
                key={member.studentId}
                className="flex flex-col justify-between rounded-xl border border-border bg-muted/20 p-4 transition-all hover:border-primary/50"
              >
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {member.name}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>ID: <code className="font-mono text-foreground font-semibold">{member.studentId}</code></span>
                    <span>•</span>
                    <span>Section {member.section}</span>
                  </div>
                </div>
                <div className="mt-3 border-t border-border/60 pt-2 text-xs text-primary font-medium">
                  {member.role}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </FadeIn>

      {/* Dual-Path Architecture Visualizer */}
      <FadeIn direction="up" delay={0.14}>
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="flex flex-col gap-1 border-b border-border pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Workflow className="size-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                Dual-Path System Architecture
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Operational decoupling of offline machine learning training vs. online real-time inference
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Path 1: Offline Training */}
            <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Path 1: Offline Training Pipeline
                </span>
                <span className="text-[10px] rounded bg-secondary px-2 py-0.5 text-secondary-foreground font-mono">
                  Batch Job
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">1</span>
                  <div>
                    <div className="font-semibold text-foreground">CQI Dataset Ingestion</div>
                    <div className="text-[11px] text-muted-foreground">1,340 Arabica & Robusta historical cupping records</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">2</span>
                  <div>
                    <div className="font-semibold text-foreground">Auditing, Imputation & Encoding</div>
                    <div className="text-[11px] text-muted-foreground">ColumnTransformer with SimpleImputer & OneHotEncoder</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">3</span>
                  <div>
                    <div className="font-semibold text-foreground">5-Fold CV & Tuning</div>
                    <div className="text-[11px] text-muted-foreground">RandomizedSearchCV optimizing XGBoost hyperparameters</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">4</span>
                  <div>
                    <div className="font-semibold text-foreground">Serialized Pipeline Artifact</div>
                    <div className="text-[11px] text-muted-foreground">Exported to <code className="font-mono text-primary font-semibold">coffee_model.joblib</code></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Path 2: Online Inference */}
            <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Path 2: Online Real-Time Inference
                </span>
                <span className="text-[10px] rounded bg-primary/10 px-2 py-0.5 text-primary font-mono">
                  Latency &lt; 50ms
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary font-bold text-secondary-foreground">1</span>
                  <div>
                    <div className="font-semibold text-foreground">Client Web Browser</div>
                    <div className="text-[11px] text-muted-foreground">User submits pre-tasting metadata through responsive UI</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary font-bold text-secondary-foreground">2</span>
                  <div>
                    <div className="font-semibold text-foreground">FastAPI Endpoint (/predict)</div>
                    <div className="text-[11px] text-muted-foreground">Pydantic schema validation & input sanity verification</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary font-bold text-secondary-foreground">3</span>
                  <div>
                    <div className="font-semibold text-foreground">In-Memory Model Pipeline</div>
                    <div className="text-[11px] text-muted-foreground">Loaded from .joblib, transforms features and calculates points</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">4</span>
                  <div>
                    <div className="font-semibold text-foreground">Prediction Response</div>
                    <div className="text-[11px] text-muted-foreground">JSON payload returned with score, confidence, and specialty grade</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 8-Week Implementation Roadmap */}
      <FadeIn direction="up" delay={0.16}>
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                Eight-Week Implementation Roadmap
              </h2>
            </div>
            <span className="text-xs text-muted-foreground">
              Academic Schedule
            </span>
          </div>

          <StaggerContainer staggerDelay={0.06} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE_MILESTONES.map((m) => (
              <StaggerItem
                key={m.week}
                className="flex flex-col justify-between rounded-xl border border-border bg-muted/20 p-4 text-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-foreground">Week {m.week}</span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                        m.status === "Completed"
                          ? "bg-primary/10 text-primary"
                          : m.status === "In Progress"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <div className="font-semibold text-foreground text-sm mb-1">
                    {m.phase}
                  </div>
                  <p className="text-muted-foreground text-[11px]">
                    {m.keyTasks}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </FadeIn>

      {/* Technology Stack Grid */}
      <FadeIn direction="up" delay={0.18}>
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Code2 className="size-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                Technology Stack
              </h2>
            </div>
            <span className="text-xs text-muted-foreground">
              Production & Research Tools
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((stack) => (
              <div
                key={stack.component}
                className="rounded-lg border border-border bg-muted/20 p-4 space-y-2 text-xs"
              >
                <div className="font-semibold text-foreground">
                  {stack.component}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stack.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-card px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
