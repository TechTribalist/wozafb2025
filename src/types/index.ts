export interface Clause {
  _id: string
  title: string
  sectionNumber: string
  year: number
  fullText: string
  summary: string
  impactLevel: 'beneficial' | 'neutral' | 'costly'
  linkedFacts?: Myth[]
  linkedCalculations?: TaxRule[]
}

export interface Myth {
  _id: string
  statement: string
  verdict: 'true' | 'false' | 'partial' | 'misleading'
  explanation: string
  sources?: string[]
  linkedClauses?: Clause[]
  relatedCalculator?: string
}

export interface TaxRule {
  _id: string
  name: string
  year: number
  ruleFormula: string
  description: string
  appliesTo: string
}

export interface ComparisonView {
  _id: string
  clause2024: Clause
  clause2025: Clause
  comparisonNotes: string
  verdict: 'better' | 'worse' | 'neutral' | 'mixed'
}

export interface CalculatorInput {
  incomeType: 'employed' | 'freelancer' | 'business'
  monthlyIncome: number
  homeownerType?: 'none' | 'mortgage' | 'self_built'
  bettingFrequency?: 'none' | 'occasional' | 'frequent'
  consumptionHabits?: {
    alcohol: boolean
    sugaryDrinks: boolean
    travelDays?: 'none' | 'occasional' | 'frequent'
  }
}