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
  // Basic Information
  incomeType: 'employed' | 'freelancer' | 'business' | 'corporate'
  monthlyIncome: number
  isDisabled?: boolean
  
  // Statutory Deductions (Auto-calculated but can be overridden)
  nssfContribution?: number  // Max 6,960/month
  shifContribution?: number  // 2.75% of gross pay
  housingLevy?: number       // 1.5% of gross pay
  
  // Voluntary Deductions
  pensionContribution?: number      // Max 30,000/month
  mortgageInterest?: number        // Max 30,000/month  
  medicalFundContribution?: number // Max 15,000/month
  insurancePremiums?: number       // For insurance relief calculation
  constructionCosts?: number       // New: construction cost deduction
  
  // Housing & Property
  homeownerType?: 'none' | 'mortgage' | 'self_built'
  propertyTransactions?: number // For CGT calculation
  propertyLocation?: 'nairobi_mombasa' | 'other_areas' | 'sez' // For deduction removal
  
  // Digital Economy & Business
  digitalServicesIncome?: number   // For DST/SEPT calculation
  businessTurnover?: number        // For VAT threshold
  isNonResident?: boolean          // For SEPT application
  hasInternationalClients?: boolean // For SEPT calculation
  
  // VAT Calculations
  monthlyVATSales?: number         // Output VAT calculation
  monthlyVATPurchases?: number     // Input VAT calculation
  hasETIMSCompliance?: boolean     // Compliance factor
  
  // Corporate Information
  companyType?: 'regular' | 'nifc_startup' | 'nifc_certified'
  annualProfit?: number            // For corporate tax
  hasCarryForwardLosses?: number   // Amount of losses to carry forward
  fringeBenefitsProvided?: number  // For fringe benefits tax
  
  // Lifestyle Factors
  bettingFrequency?: 'none' | 'occasional' | 'frequent'
  travelDaysPerMonth?: number      // For per diem calculation
  
  // Employment Benefits
  perDiemReceived?: number         // Monthly per diem received
  
  // Enhanced Deductions
  timberSalesIncome?: number       // Timber deduction removal
  clubMembershipFees?: number      // Club/association CGT
}

export interface TaxBreakdown {
  grossPay: number
  
  // Deductions
  nssfDeduction: number
  shifDeduction: number
  housingLevyDeduction: number
  pensionDeduction: number
  mortgageInterestDeduction: number
  medicalFundDeduction: number
  constructionCostDeduction: number
  
  // Reliefs
  personalRelief: number
  insuranceRelief: number
  disabilityExemption: number
  housingRelief: number
  perDiemBenefit: number
  
  // Tax Calculations
  taxableIncome: number
  payeBeforeReliefs: number
  payeAfterReliefs: number
  
  // Business & Corporate Taxes
  corporateTax: number
  fringeBenefitsTax: number
  vatPayable: number
  
  // Enhanced Digital Economy Taxes
  digitalServicesTax: number
  digitalExciseDuty: number
  septTax: number
  
  // Other Taxes
  bettingExciseDuty: number
  capitalGainsTax: number
  timberTax: number
  
  // Final Amounts
  totalTaxBurden: number
  netIncome: number
}

export interface TaxComparison {
  year2024: TaxBreakdown
  year2025: TaxBreakdown
  savings: {
    amount: number
    percentage: number
    mainBenefits: string[]
  }
  explanation: string
}