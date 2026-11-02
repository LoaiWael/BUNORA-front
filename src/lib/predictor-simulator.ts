import type { CoffeeInputMetadata, PredictionResult } from "@/types/project"

export function simulateQualityPrediction(input: CoffeeInputMetadata): PredictionResult {
  let score = 79.5 // Baseline intercept

  // Species contribution
  if (input.species === "Arabica") {
    score += 1.8
  } else {
    score -= 2.6
  }

  // Country origin terroir impact
  let originBaseline: number
  const originLower = input.countryOfOrigin.toLowerCase()
  if (originLower.includes("ethiopia")) {
    originBaseline = 2.4
  } else if (originLower.includes("kenya")) {
    originBaseline = 2.6
  } else if (originLower.includes("colombia")) {
    originBaseline = 1.9
  } else if (originLower.includes("guatemala")) {
    originBaseline = 1.7
  } else if (originLower.includes("costa rica") || originLower.includes("panama")) {
    originBaseline = 2.1
  } else if (originLower.includes("brazil")) {
    originBaseline = 0.8
  } else if (originLower.includes("indonesia")) {
    originBaseline = 1.2
  } else {
    originBaseline = 1.0
  }
  score += originBaseline

  // Altitude effect (meters)
  let altitudeImpact: number
  if (input.altitude >= 1800) {
    altitudeImpact = 1.9
  } else if (input.altitude >= 1500) {
    altitudeImpact = 1.3
  } else if (input.altitude >= 1200) {
    altitudeImpact = 0.8
  } else if (input.altitude >= 900) {
    altitudeImpact = 0.2
  } else {
    altitudeImpact = -0.7
  }
  score += altitudeImpact

  // Variety genetic potential
  let varietyImpact: number
  const varLower = input.variety.toLowerCase()
  if (varLower.includes("geisha")) {
    varietyImpact = 2.8
  } else if (varLower.includes("sl28") || varLower.includes("sl34")) {
    varietyImpact = 2.1
  } else if (varLower.includes("bourbon") || varLower.includes("heirloom")) {
    varietyImpact = 1.5
  } else if (varLower.includes("typica") || varLower.includes("caturra")) {
    varietyImpact = 1.1
  } else if (varLower.includes("catuai") || varLower.includes("pacamara")) {
    varietyImpact = 0.9
  } else {
    varietyImpact = 0.4
  }
  score += varietyImpact

  // Processing method influence
  let processingImpact: number
  switch (input.processingMethod) {
    case "Washed / Wet":
      processingImpact = 1.2
      break
    case "Pulped Natural / Honey":
      processingImpact = 1.0
      break
    case "Natural / Dry":
      processingImpact = 0.8
      break
    case "Semi-Washed":
      processingImpact = 0.5
      break
  }
  score += processingImpact

  // Moisture level balance (ideal ~ 10.0% - 11.8%)
  if (input.moisture < 9.5 || input.moisture > 12.5) {
    score -= 0.8
  }

  // Physical defects deduction
  const defectsDeduction = Number(
    (input.category1Defects * 0.45 + input.category2Defects * 0.15).toFixed(2)
  )
  score -= defectsDeduction

  // Clamp within realistic CQI score bounds
  const finalScore = Number(Math.min(92.5, Math.max(68.0, score)).toFixed(2))

  let tier: PredictionResult["tier"] = "Commercial Grade"
  if (finalScore >= 80.0) {
    tier = "Specialty Grade"
  } else if (finalScore >= 75.0) {
    tier = "Premium Grade"
  }

  return {
    score: finalScore,
    tier,
    confidenceMargin: 1.35, // Test MAE from XGBoost model
    breakdown: {
      originBaseline: Number(originBaseline.toFixed(2)),
      altitudeImpact: Number(altitudeImpact.toFixed(2)),
      varietyImpact: Number(varietyImpact.toFixed(2)),
      processingImpact: Number(processingImpact.toFixed(2)),
      defectsDeduction,
    },
  }
}
