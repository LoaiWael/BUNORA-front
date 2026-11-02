import {
  Database,
  Globe2,
  Layers,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react"
import { DATASET_STATS, EXCLUDED_SENSORY_FEATURES } from "@/data/mock-data"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"

export function DatasetExplorer() {
  const topOrigins = [
    { country: "Ethiopia", count: 182, avgScore: 84.7, region: "East Africa" },
    { country: "Colombia", count: 215, avgScore: 83.8, region: "South America" },
    { country: "Guatemala", count: 174, avgScore: 83.1, region: "Central America" },
    { country: "Costa Rica", count: 98, avgScore: 83.5, region: "Central America" },
    { country: "Brazil", count: 142, avgScore: 82.2, region: "South America" },
    { country: "Mexico", count: 110, avgScore: 81.6, region: "North America" },
  ]

  const processingBreakdown = [
    { method: "Washed / Wet", percentage: 68, description: "Mucilage removed with water fermentation; yields clean, bright cup" },
    { method: "Natural / Dry", percentage: 21, description: "Cherries dried in whole fruit; heavy fruit sweetness and winey body" },
    { method: "Pulped Natural / Honey", percentage: 7, description: "Skin removed while retaining sweet mucilage; balanced sweetness" },
    { method: "Semi-Washed", percentage: 4, description: "Giling Basah method prevalent in Indonesian specialty crops" },
  ]

  return (
    <div className="space-y-10 py-6">
      {/* Header */}
      <FadeIn direction="up" delay={0.05} duration={0.4}>
        <div className="flex flex-col gap-2 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/20 p-6 md:p-8">
          <div className="inline-flex items-center gap-1.5 w-fit rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold text-secondary-foreground">
            <Database className="size-3.5 text-primary" />
            <span>Coffee Quality Institute (CQI) Database</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            CQI Dataset Explorer & Feature Audit
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
            Exploratory analysis of historical coffee evaluation records curated by the Coffee Quality Institute, covering physical bean properties, geographic origins, and cupping benchmarks.
          </p>
        </div>
      </FadeIn>

      {/* Dataset Core Statistics */}
      <StaggerContainer staggerDelay={0.06} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StaggerItem className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Total Samples</span>
          <div className="mt-1 text-2xl font-bold text-foreground font-mono">
            {DATASET_STATS.totalRecords}
          </div>
          <span className="text-[11px] text-muted-foreground">Historical reviews</span>
        </StaggerItem>

        <StaggerItem className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Arabica Beans</span>
          <div className="mt-1 text-2xl font-bold text-foreground font-mono">
            {DATASET_STATS.arabicaCount}
          </div>
          <span className="text-[11px] text-primary font-medium">97.9% dominant</span>
        </StaggerItem>

        <StaggerItem className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Robusta Beans</span>
          <div className="mt-1 text-2xl font-bold text-foreground font-mono">
            {DATASET_STATS.robustaCount}
          </div>
          <span className="text-[11px] text-muted-foreground">2.1% representation</span>
        </StaggerItem>

        <StaggerItem className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Origin Countries</span>
          <div className="mt-1 text-2xl font-bold text-foreground font-mono">
            {DATASET_STATS.originCount}
          </div>
          <span className="text-[11px] text-muted-foreground">Across 4 continents</span>
        </StaggerItem>

        <StaggerItem className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Mean Cup Score</span>
          <div className="mt-1 text-2xl font-bold text-foreground font-mono">
            {DATASET_STATS.averageCupScore}
          </div>
          <span className="text-[11px] text-secondary-foreground font-medium">Specialty baseline</span>
        </StaggerItem>

        <StaggerItem className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Score Range</span>
          <div className="mt-1 text-2xl font-bold text-foreground font-mono">
            {DATASET_STATS.minCupScore}–{DATASET_STATS.maxCupScore}
          </div>
          <span className="text-[11px] text-muted-foreground">Points span</span>
        </StaggerItem>
      </StaggerContainer>

      {/* Target Leakage Prevention Deep-Dive */}
      <FadeIn direction="up" delay={0.12}>
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="flex flex-col gap-2 border-b border-border pb-4 mb-6">
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-5 text-destructive" />
              <h2 className="text-base font-semibold text-foreground">
                Target Leakage Prevention Protocol
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              In standard machine learning, using post-tasting sensory sub-scores would guarantee an artificial $R^2 \approx 0.99$ because <code className="font-mono text-foreground">Total.Cup.Points</code> is the exact arithmetic sum of these components. BUNORA strictly eliminates all 10 sensory attributes from training to solve the real-world pre-tasting prediction challenge.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {EXCLUDED_SENSORY_FEATURES.map((feat) => (
              <div
                key={feat.name}
                className="flex flex-col justify-between rounded-lg border border-border bg-muted/30 p-3 text-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{feat.name}</span>
                    <span className="text-[10px] uppercase font-mono font-bold text-destructive">
                      Excluded
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {feat.reason}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <ShieldCheck className="size-3 text-primary" />
                  <span>Zero Target Leakage</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Two-Column Grid: Origins & Processing Methods */}
      <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Top Origins */}
        <StaggerItem className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Globe2 className="size-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                Major Cultivating Origins
              </h2>
            </div>
            <span className="text-xs text-muted-foreground">
              Sample representation in CQI
            </span>
          </div>

          <div className="space-y-3">
            {topOrigins.map((orig) => (
              <div
                key={orig.country}
                className="flex items-center justify-between rounded-lg border border-border p-3 text-xs"
              >
                <div>
                  <div className="font-semibold text-foreground">{orig.country}</div>
                  <div className="text-[11px] text-muted-foreground">{orig.region} • {orig.count} samples</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-foreground">
                    {orig.avgScore} pts
                  </div>
                  <span className="text-[10px] text-primary font-medium">
                    Average Cup Score
                  </span>
                </div>
              </div>
            ))}
          </div>
        </StaggerItem>

        {/* Processing Methods Breakdown */}
        <StaggerItem className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                Post-Harvest Processing Methods
              </h2>
            </div>
            <span className="text-xs text-muted-foreground">
              Distribution & Profile
            </span>
          </div>

          <div className="space-y-3">
            {processingBreakdown.map((pm) => (
              <div
                key={pm.method}
                className="rounded-lg border border-border p-3 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{pm.method}</span>
                  <span className="font-mono font-bold text-primary">{pm.percentage}%</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {pm.description}
                </p>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${pm.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  )
}
