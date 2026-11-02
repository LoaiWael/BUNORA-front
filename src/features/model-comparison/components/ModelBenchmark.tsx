import { useState } from "react"
import {
  BarChart3,
  CheckCircle2,
  Cpu,
  TrendingDown,
  TrendingUp,
  Workflow,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { MODEL_METRICS, PIPELINE_STEPS } from "@/data/mock-data"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"

export function ModelBenchmark() {
  const [activeMetricTab, setActiveMetricTab] = useState<"testMae" | "testRmse" | "testR2">("testMae")
  const [selectedPipelineStep, setSelectedPipelineStep] = useState<number>(1)

  const chartData = MODEL_METRICS.map((m) => ({
    name: m.name,
    mae: m.testMae,
    rmse: m.testRmse,
    r2: m.testR2,
    isBest: m.status === "Best Candidate",
  }))

  const activeStepObj = PIPELINE_STEPS.find((s) => s.step === selectedPipelineStep) || PIPELINE_STEPS[0]

  return (
    <div className="space-y-10 py-6">
      {/* Benchmark Header */}
      <FadeIn direction="up" delay={0.05} duration={0.4}>
        <div className="flex flex-col gap-2 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/20 p-6 md:p-8">
          <div className="inline-flex items-center gap-1.5 w-fit rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold text-secondary-foreground">
            <Cpu className="size-3.5 text-primary" />
            <span>Regression Benchmarks & Model Evaluation</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Algorithm Comparison & Pipeline Architecture
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
            Systematic empirical comparison of 7 regression models on the CQI coffee dataset using 5-fold cross-validation and a held-out 20% test partition to evaluate predictive performance on tabular agricultural metadata.
          </p>
        </div>
      </FadeIn>

      {/* Metrics Summary Cards */}
      <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StaggerItem className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Best Performing Model</span>
            <CheckCircle2 className="size-4 text-primary" />
          </div>
          <div className="mt-2 text-xl font-bold text-foreground">XGBoost Regressor</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Sequential gradient-boosted decision trees
          </p>
        </StaggerItem>

        <StaggerItem className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Test MAE (Mean Absolute Error)</span>
            <TrendingDown className="size-4 text-primary" />
          </div>
          <div className="mt-2 text-xl font-bold text-foreground">1.35 pts</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Down from 2.41 baseline (44% error reduction)
          </p>
        </StaggerItem>

        <StaggerItem className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Test RMSE (Root Mean Squared)</span>
            <TrendingDown className="size-4 text-primary" />
          </div>
          <div className="mt-2 text-xl font-bold text-foreground">1.87 pts</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Heavily penalizes outlier predictions
          </p>
        </StaggerItem>

        <StaggerItem className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Variance Explained (R²)</span>
            <TrendingUp className="size-4 text-primary" />
          </div>
          <div className="mt-2 text-xl font-bold text-foreground">0.64 (64%)</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Pre-tasting metadata explains 64% of score variance
          </p>
        </StaggerItem>
      </StaggerContainer>

      {/* Comparative Performance Chart */}
      <FadeIn direction="up" delay={0.12}>
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="size-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">
                  Model Evaluation Metric Visualizer
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Comparison across all 7 evaluated regression architectures
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
              <button
                type="button"
                onClick={() => setActiveMetricTab("testMae")}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  activeMetricTab === "testMae"
                    ? "bg-card text-foreground shadow-xs ring-1 ring-border font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Test MAE (Lower is better)
              </button>
              <button
                type="button"
                onClick={() => setActiveMetricTab("testRmse")}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  activeMetricTab === "testRmse"
                    ? "bg-card text-foreground shadow-xs ring-1 ring-border font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Test RMSE
              </button>
              <button
                type="button"
                onClick={() => setActiveMetricTab("testR2")}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  activeMetricTab === "testR2"
                    ? "bg-card text-foreground shadow-xs ring-1 ring-border font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                R² Score (Higher is better)
              </button>
            </div>
          </div>

          {/* Chart View */}
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis tick={{ fontSize: 11 }} />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-md">
                          <span className="font-semibold block">{data.name}</span>
                          <div className="mt-1 space-y-1">
                            <div>
                              MAE: <strong className="font-mono">{data.mae} pts</strong>
                            </div>
                            <div>
                              RMSE: <strong className="font-mono">{data.rmse} pts</strong>
                            </div>
                            <div>
                              R² Score: <strong className="font-mono">{data.r2}</strong>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar
                  dataKey={
                    activeMetricTab === "testMae"
                      ? "mae"
                      : activeMetricTab === "testRmse"
                        ? "rmse"
                        : "r2"
                  }
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      className={
                        entry.isBest
                          ? "fill-primary"
                          : "fill-muted-foreground/40 hover:fill-muted-foreground/70"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Highlighted bar represents the best-performing model selected for serialized inference deployment.
          </p>
        </div>
      </FadeIn>

      {/* Model Benchmark Table */}
      <FadeIn direction="up" delay={0.16}>
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Comprehensive Evaluation Metrics Table
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Empirical scores across 5-Fold Cross Validation and Unseen Test Split
              </p>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              Random State = 42
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/30 text-muted-foreground uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Model Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">CV MAE (Mean ± Std)</th>
                  <th className="py-3 px-4">Test MAE</th>
                  <th className="py-3 px-4">Test RMSE</th>
                  <th className="py-3 px-4">Test R²</th>
                  <th className="py-3 px-4">Tuned Hyperparameters</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MODEL_METRICS.map((m) => (
                  <tr
                    key={m.name}
                    className={`transition-colors hover:bg-muted/30 ${
                      m.status === "Best Candidate" ? "bg-primary/5 font-medium" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-foreground">
                      {m.name}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      <span className="rounded bg-secondary/80 px-2 py-0.5 text-[10px] text-secondary-foreground">
                        {m.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {m.cvMaeMean.toFixed(2)} ± {m.cvMaeStd.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-mono text-foreground font-semibold">
                      {m.testMae.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-mono text-muted-foreground">
                      {m.testRmse.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-mono text-foreground">
                      {m.testR2.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground max-w-xs truncate" title={m.hyperparameters}>
                      {m.hyperparameters}
                    </td>
                    <td className="py-3 px-4">
                      {m.status === "Best Candidate" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                          <CheckCircle2 className="size-3" />
                          <span>Best Model</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-muted-foreground">
                          {m.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      {/* Interactive 12-Step Training Pipeline Workflow */}
      <FadeIn direction="up" delay={0.2}>
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="flex flex-col gap-1 border-b border-border pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Workflow className="size-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                End-to-End ML Training Pipeline (12 Steps)
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Sequential machine learning pipeline covering data auditing, preprocessing, cross-validation, hyperparameter tuning, and serialized model serving.
            </p>
          </div>

          {/* Step Pills Navigator */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 mb-6">
            {PIPELINE_STEPS.map((s) => {
              const isSelected = selectedPipelineStep === s.step
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setSelectedPipelineStep(s.step)}
                  className={`flex flex-col items-start rounded-lg border p-2.5 text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "border-border bg-background hover:bg-muted text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] font-bold ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      Step {s.step}
                    </span>
                  </div>
                  <span className="text-xs truncate w-full mt-1">
                    {s.title.split("&")[0]}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active Step Details Panel */}
          <div className="rounded-xl border border-border bg-muted/20 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {activeStepObj.step}
                </span>
                <span className="font-heading text-sm font-semibold text-foreground">
                  {activeStepObj.title}
                </span>
                <span className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground font-medium">
                  {activeStepObj.arabicTitle}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Artifact: <code className="font-mono text-foreground font-semibold">{activeStepObj.outputArtifact}</code>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-foreground/90">
              {activeStepObj.description}
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
