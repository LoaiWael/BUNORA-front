import { useState } from "react"
import {
  Coffee,
  Sparkles,
  Mountain,
  Droplet,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Sliders,
} from "lucide-react"
import {
  COFFEE_PRESETS,
  ORIGIN_COUNTRIES,
  COFFEE_VARIETIES,
} from "@/data/mock-data"
import { simulateQualityPrediction } from "@/lib/predictor-simulator"
import type { CoffeeInputMetadata, CoffeePreset } from "@/types/project"
import { FadeIn, ScaleIn } from "@/components/animations"

export function PredictionStudio() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("ethiopian-yirgacheffe")
  const [isSimulating, setIsSimulating] = useState<boolean>(false)

  const [formData, setFormData] = useState<CoffeeInputMetadata>(
    COFFEE_PRESETS[0].metadata
  )

  const result = simulateQualityPrediction(formData)

  const handleApplyPreset = (preset: CoffeePreset) => {
    setSelectedPresetId(preset.id)
    setFormData(preset.metadata)
  }

  const handlePredict = () => {
    setIsSimulating(true)
    setTimeout(() => {
      setIsSimulating(false)
    }, 280)
  }

  const handleReset = () => {
    handleApplyPreset(COFFEE_PRESETS[0])
  }

  return (
    <div className="space-y-8 py-6">
      {/* Hero Intro */}
      <FadeIn direction="up" delay={0.05} duration={0.4}>
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/30 p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold text-secondary-foreground">
                <Sparkles className="size-3.5 text-primary" />
                <span>Interactive Quality Inference</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Coffee Quality Prediction Studio
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Predict final cupping scores (<code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">Total.Cup.Points</code>) using exclusively verifiable pre-tasting agronomic, geographic, and post-harvest metadata.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                <RotateCcw className="size-3.5" />
                <span>Reset Values</span>
              </button>
            </div>
          </div>

          {/* Preset Selector Bar */}
          <div className="mt-2 space-y-2 border-t border-border/60 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Load Preset Coffee Sample:
              </span>
              <span className="text-xs text-muted-foreground">
                6 CQI Profile Presets Available
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {COFFEE_PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/40 font-semibold"
                        : "border-border bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    <Coffee className="size-3 text-primary" />
                    <span>{preset.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Target Leakage Prevention Banner */}
      <FadeIn direction="up" delay={0.1} duration={0.4}>
        <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-xs sm:text-sm">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <ShieldCheck className="size-4 text-primary" />
          </div>
          <div className="space-y-0.5">
            <span className="font-semibold text-foreground">
              Strict Target Leakage Prevention Enforced
            </span>
            <p className="text-muted-foreground">
              As outlined in the BUNORA methodology, sensory cupping sub-scores (Aroma, Flavor, Aftertaste, Acidity, Body, Balance, Uniformity, Sweetness) are strictly excluded from the model to reflect true pre-tasting prediction prior to physical sample grading.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Main Grid: Form (Left) & Result Showcase (Right) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Input Parameters Form (7 Cols) */}
        <FadeIn direction="up" delay={0.15} duration={0.45} className="space-y-6 lg:col-span-7">
          <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="size-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">
                  Pre-Tasting Coffee Metadata
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">
                Features for inference
              </span>
            </div>

            <div className="space-y-5">
              {/* Species Selection */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Botanical Species (<code className="text-muted-foreground font-mono">Species</code>)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Arabica", "Robusta"] as const).map((sp) => {
                    const isSelected = formData.species === sp
                    return (
                      <button
                        key={sp}
                        type="button"
                        onClick={() => setFormData({ ...formData, species: sp })}
                        className={`flex items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium transition-all ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        <Coffee className="size-3.5" />
                        <span>{sp}</span>
                        {sp === "Arabica" && (
                          <span className={`text-[10px] px-1 rounded ${isSelected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            97.9% of CQI
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Country of Origin & Variety Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Country of Origin (<code className="text-muted-foreground font-mono">Country.of.Origin</code>)
                  </label>
                  <select
                    value={formData.countryOfOrigin}
                    onChange={(e) =>
                      setFormData({ ...formData, countryOfOrigin: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                  >
                    {ORIGIN_COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Botanical Variety (<code className="text-muted-foreground font-mono">Variety</code>)
                  </label>
                  <select
                    value={formData.variety}
                    onChange={(e) =>
                      setFormData({ ...formData, variety: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                  >
                    {COFFEE_VARIETIES.map((variety) => (
                      <option key={variety} value={variety}>
                        {variety}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Processing Method */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Processing Method (<code className="text-muted-foreground font-mono">Processing.Method</code>)
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(
                    [
                      "Washed / Wet",
                      "Natural / Dry",
                      "Pulped Natural / Honey",
                      "Semi-Washed",
                    ] as const
                  ).map((method) => {
                    const isSelected = formData.processingMethod === method
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, processingMethod: method })
                        }
                        className={`flex flex-col items-center justify-center rounded-lg border p-2 text-center text-xs font-medium transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/40"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        <span className="truncate">{method.split(" / ")[0]}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {method.includes("/") ? method.split(" / ")[1] : "Traditional"}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Altitude & Moisture Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                      <Mountain className="size-3.5 text-primary" />
                      <span>Mean Altitude</span>
                    </label>
                    <span className="text-xs font-mono font-semibold text-foreground">
                      {formData.altitude} m
                    </span>
                  </div>
                  <input
                    type="range"
                    min="600"
                    max="2400"
                    step="50"
                    value={formData.altitude}
                    onChange={(e) =>
                      setFormData({ ...formData, altitude: Number(e.target.value) })
                    }
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>Lowland (600m)</span>
                    <span>Highland (2400m)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                      <Droplet className="size-3.5 text-primary" />
                      <span>Moisture Content</span>
                    </label>
                    <span className="text-xs font-mono font-semibold text-foreground">
                      {formData.moisture.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8.0"
                    max="15.0"
                    step="0.1"
                    value={formData.moisture}
                    onChange={(e) =>
                      setFormData({ ...formData, moisture: Number(e.target.value) })
                    }
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>Dry (8%)</span>
                    <span className="text-primary font-medium">Optimal 10-12%</span>
                    <span>Wet (15%)</span>
                  </div>
                </div>
              </div>

              {/* Defects Count Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Category 1 Defects (Primary)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="15"
                    value={formData.category1Defects}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category1Defects: Math.max(0, Number(e.target.value)),
                      })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                  />
                  <span className="text-[10px] text-muted-foreground mt-1 block">
                    Full black, sour, or pod defects
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Category 2 Defects (Secondary)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={formData.category2Defects}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category2Defects: Math.max(0, Number(e.target.value)),
                      })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                  />
                  <span className="text-[10px] text-muted-foreground mt-1 block">
                    Broken beans, parchment, minor insect damage
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handlePredict}
                disabled={isSimulating}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.99] disabled:opacity-60"
              >
                {isSimulating ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    <span>Computing Prediction...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    <span>Predict Coffee Quality Score</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Prediction Results & Explanation Card (5 Cols) */}
        <ScaleIn delay={0.2} initialScale={0.92} duration={0.45} className="space-y-6 lg:col-span-5">
          <div className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Model Prediction Result
              </span>
              <span className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                XGBoost Serialized
              </span>
            </div>

            {/* Quality Score Showcase */}
            <div className="my-6 flex flex-col items-center justify-center text-center">
              <div className="relative flex size-36 items-center justify-center rounded-full border-4 border-primary/20 bg-primary/5 p-4 shadow-inner">
                {/* Score value */}
                <div className="flex flex-col items-center">
                  <span className="font-heading text-4xl font-extrabold tracking-tight text-foreground">
                    {result.score}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    / 100 Points
                  </span>
                </div>
              </div>

              {/* Classification Tier Badge */}
              <div className="mt-4 flex flex-col items-center gap-1">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    result.tier === "Specialty Grade"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : result.tier === "Premium Grade"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <CheckCircle2 className="size-3.5" />
                  <span>{result.tier}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  Confidence interval: <strong>{(result.score - result.confidenceMargin).toFixed(2)}</strong> – <strong>{(result.score + result.confidenceMargin).toFixed(2)}</strong> pts (±1.35 MAE)
                </span>
              </div>
            </div>

            {/* SCA Coffee Grading Scale Indicator */}
            <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3 text-xs">
              <div className="flex items-center justify-between font-medium">
                <span className="text-foreground">SCA Cupping Scale Standard</span>
                <span className="text-primary font-semibold">Specialty &gt;= 80.0</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted flex">
                <div className="h-full bg-destructive/60 w-[70%]" title="Commercial (<75)" />
                <div className="h-full bg-secondary w-[10%]" title="Premium (75-80)" />
                <div className="h-full bg-primary w-[20%]" title="Specialty (80-100)" />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Commercial (&lt;75)</span>
                <span>Premium (75-80)</span>
                <span className="font-medium text-foreground">Specialty (80-100)</span>
              </div>
            </div>

            {/* Feature Impact Breakdown (Explainability) */}
            <div className="mt-6 space-y-3 border-t border-border pt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Feature Influence Attribution
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Origin Terroir Baseline ({formData.countryOfOrigin})</span>
                  <span className="font-mono font-medium text-foreground">
                    +{result.breakdown.originBaseline} pts
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Elevation Impact ({formData.altitude}m)</span>
                  <span className="font-mono font-medium text-foreground">
                    +{result.breakdown.altitudeImpact} pts
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Genetic Variety Potential ({formData.variety})</span>
                  <span className="font-mono font-medium text-foreground">
                    +{result.breakdown.varietyImpact} pts
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Post-Harvest Method ({formData.processingMethod})</span>
                  <span className="font-mono font-medium text-foreground">
                    +{result.breakdown.processingImpact} pts
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Physical Defects Deduction</span>
                  <span className="font-mono font-medium text-destructive">
                    -{result.breakdown.defectsDeduction} pts
                  </span>
                </div>
              </div>
            </div>

            {/* Academic Footnote */}
            <div className="mt-6 border-t border-border/70 pt-3 text-[11px] text-muted-foreground">
              Based on empirical CQI regression benchmarks trained with 5-fold cross-validation on 80% train split.
            </div>
          </div>
        </ScaleIn>
      </div>
    </div>
  )
}
