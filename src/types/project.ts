export type CoffeeSpecies = "Arabica" | "Robusta"

export type ProcessingMethod =
  | "Washed / Wet"
  | "Natural / Dry"
  | "Pulped Natural / Honey"
  | "Semi-Washed"

export interface CoffeeInputMetadata {
  species: CoffeeSpecies
  countryOfOrigin: string
  variety: string
  processingMethod: ProcessingMethod
  altitude: number
  moisture: number
  category1Defects: number
  category2Defects: number
}

export interface CoffeePreset {
  id: string
  name: string
  region: string
  metadata: CoffeeInputMetadata
  description: string
}

export interface PredictionResult {
  score: number
  tier: "Specialty Grade" | "Premium Grade" | "Commercial Grade"
  confidenceMargin: number
  breakdown: {
    originBaseline: number
    altitudeImpact: number
    varietyImpact: number
    processingImpact: number
    defectsDeduction: number
  }
}

export interface ModelMetric {
  name: string
  category: "Baseline" | "Linear" | "Ensemble" | "Boosting"
  cvMaeMean: number
  cvMaeStd: number
  testMae: number
  testRmse: number
  testR2: number
  status: "Baseline" | "Evaluated" | "Best Candidate"
  hyperparameters: string
}

export interface TeamMember {
  name: string
  studentId: string
  section: number
  role: string
}

export interface TimelineMilestone {
  week: number
  phase: string
  keyTasks: string
  status: "Completed" | "In Progress" | "Upcoming"
}

export interface PipelineStep {
  step: number
  title: string
  arabicTitle: string
  description: string
  outputArtifact: string
}
