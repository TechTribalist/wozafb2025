import { CalculatorInput, TaxBreakdown, TaxComparison } from '@/types'

// Tax bands for Kenya PAYE (same for 2024 and 2025)
const TAX_BANDS = [
  { min: 0, max: 288000, rate: 0.10 },           // 10% up to 288k
  { min: 288001, max: 388000, rate: 0.25 },      // 25% from 288k to 388k  
  { min: 388001, max: 6000000, rate: 0.30 },     // 30% from 388k to 6M
  { min: 6000001, max: 9600000, rate: 0.325 },   // 32.5% from 6M to 9.6M
  { min: 9600001, max: Infinity, rate: 0.35 }    // 35% above 9.6M
]

// Constants
const PERSONAL_RELIEF_ANNUAL = 28800 // KES 2,400 per month
const DISABILITY_EXEMPTION_ANNUAL = 1800000 // KES 150,000 per month
const MAX_INSURANCE_RELIEF_ANNUAL = 60000 // KES 5,000 per month max

/**
 * Calculate PAYE using progressive tax bands
 */
function calculateProgressiveTax(annualIncome: number): number {
  let tax = 0
  
  for (const band of TAX_BANDS) {
    if (annualIncome > band.min - 1) {
      const taxableInThisBand = Math.min(annualIncome, band.max) - band.min + 1
      tax += taxableInThisBand * band.rate
    }
  }
  
  return Math.max(0, tax)
}

/**
 * Calculate statutory deductions
 */
function calculateStatutoryDeductions(monthlyIncome: number, input: CalculatorInput) {
  const annualIncome = monthlyIncome * 12
  
  return {
    nssf: Math.min(input.nssfContribution || 6960, 6960) * 12, // Max 6,960/month
    shif: (input.shifContribution || monthlyIncome * 0.0275) * 12, // 2.75% of gross pay
    housingLevy: (input.housingLevy || monthlyIncome * 0.015) * 12 // 1.5% of gross pay
  }
}

/**
 * Calculate voluntary deductions
 */
function calculateVoluntaryDeductions(input: CalculatorInput, year: 2024 | 2025) {
  const baseDeductions = {
    pension: Math.min(input.pensionContribution || 0, 30000) * 12, // Max 30k/month
    mortgageInterest: Math.min(input.mortgageInterest || 0, 30000) * 12, // Max 30k/month
    medicalFund: Math.min(input.medicalFundContribution || 0, 15000) * 12, // Max 15k/month
    constructionCosts: 0
  }
  
  // 2025: Construction costs can be included in mortgage interest deduction
  if (year === 2025 && input.constructionCosts) {
    const totalHousingDeduction = (input.mortgageInterest || 0) + (input.constructionCosts || 0)
    baseDeductions.mortgageInterest = Math.min(totalHousingDeduction * 12, 360000) // Max 30k/month
    baseDeductions.constructionCosts = Math.min(input.constructionCosts * 12, 180000) // Additional for construction
  }
  
  return baseDeductions
}

/**
 * Calculate tax reliefs
 */
function calculateReliefs(input: CalculatorInput, year: 2024 | 2025) {
  const reliefs = {
    personal: input.isDisabled ? 0 : PERSONAL_RELIEF_ANNUAL,
    insurance: Math.min((input.insurancePremiums || 0) * 0.15 * 12, MAX_INSURANCE_RELIEF_ANNUAL),
    disability: input.isDisabled ? DISABILITY_EXEMPTION_ANNUAL : 0,
    housing: 0,
    perDiem: 0
  }
  
  // Housing relief calculation
  if (input.homeownerType === 'mortgage') {
    const maxHousingRelief = year === 2024 ? 300000 : 360000
    reliefs.housing = Math.min(maxHousingRelief, input.monthlyIncome * 12 * 0.15)
  } else if (input.homeownerType === 'self_built' && year === 2025) {
    // Self-built homes qualify for relief only in 2025
    reliefs.housing = Math.min(360000, input.monthlyIncome * 12 * 0.15)
  }
  
  // Per diem benefit calculation
  if (input.travelDaysPerMonth && input.travelDaysPerMonth > 0) {
    const perDiemLimit = year === 2024 ? 2000 : 10000
    const currentPerDiem = input.perDiemReceived || 0
    const maxTaxFreePerDiem = perDiemLimit * input.travelDaysPerMonth * 12
    
    // Tax savings from increased per diem limit in 2025
    if (currentPerDiem > 0) {
      const taxablePerDiem2024 = Math.max(0, currentPerDiem * 12 - (2000 * input.travelDaysPerMonth * 12))
      const taxablePerDiem2025 = Math.max(0, currentPerDiem * 12 - (10000 * input.travelDaysPerMonth * 12))
      reliefs.perDiem = (taxablePerDiem2024 - taxablePerDiem2025) * 0.3 // Assume 30% tax rate
    }
  }
  
  return reliefs
}

/**
 * Calculate digital services taxes
 */
function calculateDigitalServicesTax(input: CalculatorInput, year: 2024 | 2025): number {
  if (!input.digitalServicesIncome) return 0
  
  const annualDigitalIncome = input.digitalServicesIncome * 12
  
  if (year === 2024) {
    // Digital Asset Tax at 3%
    return annualDigitalIncome * 0.03
  } else {
    // 2025: Digital Asset Tax reduced to 1.5%, but SEPT introduced at ~6%
    const digitalAssetTax = annualDigitalIncome * 0.015
    
    // SEPT applies to non-residents (simplified assumption for freelancers with international clients)
    const septTax = input.incomeType === 'freelancer' ? annualDigitalIncome * 0.06 : 0
    
    return digitalAssetTax + septTax
  }
}

/**
 * Calculate betting excise duty
 */
function calculateBettingExcise(input: CalculatorInput, year: 2024 | 2025): number {
  if (input.bettingFrequency === 'none') return 0
  
  const monthlyBetting = input.bettingFrequency === 'occasional' ? 2000 : 10000
  const annualBetting = monthlyBetting * 12
  
  const exciseRate = year === 2024 ? 0.20 : 0.35 // Increased from 20% to 35%
  return annualBetting * exciseRate
}

/**
 * Calculate VAT with compliance factors
 */
function calculateVAT(input: CalculatorInput, year: 2024 | 2025): number {
  if (!input.monthlyVATSales && !input.monthlyVATPurchases) return 0
  
  const annualSales = (input.monthlyVATSales || 0) * 12
  const annualPurchases = (input.monthlyVATPurchases || 0) * 12
  
  // Check VAT registration threshold
  const vatThreshold = year === 2024 ? 5000000 : 8000000
  if (annualSales < vatThreshold) return 0
  
  const outputVAT = annualSales * 0.16 // 16% VAT rate
  let inputVAT = annualPurchases * 0.16
  
  // 2025: Compliance factor reduces input VAT if eTIMS not compliant
  if (year === 2025 && !input.hasETIMSCompliance) {
    inputVAT *= 0.8 // 20% reduction for non-compliance
  }
  
  return Math.max(0, outputVAT - inputVAT)
}

/**
 * Calculate corporate tax with NIFC considerations
 */
function calculateCorporateTax(input: CalculatorInput, year: 2024 | 2025): number {
  if (input.incomeType !== 'corporate' || !input.annualProfit) return 0
  
  let taxableProfit = input.annualProfit
  
  // Apply loss carryforward (2025: capped at 5 years)
  if (input.hasCarryForwardLosses) {
    const maxLossUtilization = year === 2024 ? input.hasCarryForwardLosses : Math.min(input.hasCarryForwardLosses, input.annualProfit * 0.75)
    taxableProfit = Math.max(0, taxableProfit - maxLossUtilization)
  }
  
  // Determine tax rate based on company type
  let taxRate = 0.3 // Standard 30%
  
  if (year === 2025 && input.companyType === 'nifc_startup') {
    taxRate = 0.15 // NIFC startup preferential rate
  }
  
  return taxableProfit * taxRate
}

/**
 * Calculate fringe benefits tax
 */
function calculateFringeBenefitsTax(input: CalculatorInput, year: 2024 | 2025): number {
  if (!input.fringeBenefitsProvided) return 0
  
  // 2025: Fringe benefits taxed at corporate tax rate (30%)
  const taxRate = year === 2025 ? 0.3 : 0.2 // Increased from 20% to 30%
  return input.fringeBenefitsProvided * 12 * taxRate
}

/**
 * Calculate enhanced digital economy taxes
 */
function calculateEnhancedDigitalTaxes(input: CalculatorInput, year: 2024 | 2025): { digitalAssetTax: number, digitalExcise: number, septTax: number } {
  let digitalAssetTax = 0
  let digitalExcise = 0
  let septTax = 0
  
  if (input.digitalServicesIncome) {
    const annualDigitalIncome = input.digitalServicesIncome * 12
    
    // Digital Asset Tax
    digitalAssetTax = annualDigitalIncome * (year === 2024 ? 0.03 : 0.015)
    
    // Digital Excise Duty (new in 2025)
    if (year === 2025) {
      digitalExcise = annualDigitalIncome * 0.2 // 20% on digital services
    }
    
    // SEPT - expanded in 2025
    if (input.isNonResident || input.hasInternationalClients) {
      if (year === 2024) {
        // 2024: Only if turnover > 5M
        septTax = annualDigitalIncome > 5000000 ? annualDigitalIncome * 0.06 : 0
      } else {
        // 2025: No threshold for non-residents
        septTax = annualDigitalIncome * 0.06
      }
    }
  }
  
  return { digitalAssetTax, digitalExcise, septTax }
}

/**
 * Calculate enhanced capital gains tax
 */
function calculateCapitalGainsTax(input: CalculatorInput, year: 2024 | 2025): number {
  if (!input.propertyTransactions) return 0
  
  let netGain = input.propertyTransactions
  
  // 2024: Investment deductions available for projects outside Nairobi/Mombasa and in SEZ
  if (year === 2024) {
    if (input.propertyLocation === 'other_areas' || input.propertyLocation === 'sez') {
      netGain *= 0.85 // 15% investment deduction
    }
  }
  // 2025: All investment deductions removed
  
  // Include club membership fees in CGT scope (2025)
  if (year === 2025 && input.clubMembershipFees) {
    netGain += input.clubMembershipFees * 12
  }
  
  return netGain * 0.15
}

/**
 * Calculate timber tax (deduction removal in 2025)
 */
function calculateTimberTax(input: CalculatorInput, year: 2024 | 2025): number {
  if (!input.timberSalesIncome) return 0
  
  const annualTimberIncome = input.timberSalesIncome * 12
  
  if (year === 2024) {
    // 2024: Special timber deductions available
    return annualTimberIncome * 0.15 // Reduced rate with deductions
  } else {
    // 2025: Timber deductions removed
    return annualTimberIncome * 0.3 // Full income tax rate
  }
}

/**
 * Calculate tax breakdown for a specific year
 */
function calculateYearBreakdown(input: CalculatorInput, year: 2024 | 2025): TaxBreakdown {
  const annualIncome = input.monthlyIncome * 12
  const statutoryDeductions = calculateStatutoryDeductions(input.monthlyIncome, input)
  const voluntaryDeductions = calculateVoluntaryDeductions(input, year)
  const reliefs = calculateReliefs(input, year)
  
  // Calculate total deductions
  const totalDeductions = statutoryDeductions.nssf + statutoryDeductions.shif + 
                         statutoryDeductions.housingLevy + voluntaryDeductions.pension + 
                         voluntaryDeductions.mortgageInterest + voluntaryDeductions.medicalFund +
                         voluntaryDeductions.constructionCosts
  
  // Key difference between 2024 and 2025 PAYE calculation
  let taxableIncome: number
  let payeAfterReliefs: number
  
  if (year === 2024) {
    // 2024: Apply tax first, then subtract reliefs
    taxableIncome = annualIncome - totalDeductions
    const payeBeforeReliefs = calculateProgressiveTax(taxableIncome)
    const totalReliefs = reliefs.personal + reliefs.insurance + reliefs.housing
    payeAfterReliefs = Math.max(0, payeBeforeReliefs - totalReliefs)
  } else {
    // 2025: Subtract reliefs first, then apply tax
    const totalReliefs = reliefs.personal + reliefs.insurance + reliefs.housing
    taxableIncome = annualIncome - totalDeductions - totalReliefs
    payeAfterReliefs = calculateProgressiveTax(Math.max(0, taxableIncome))
  }
  
  // Calculate enhanced tax categories
  const digitalTaxes = calculateEnhancedDigitalTaxes(input, year)
  const vatPayable = calculateVAT(input, year)
  const corporateTax = calculateCorporateTax(input, year)
  const fringeBenefitsTax = calculateFringeBenefitsTax(input, year)
  const bettingExciseDuty = calculateBettingExcise(input, year)
  const capitalGainsTax = calculateCapitalGainsTax(input, year)
  const timberTax = calculateTimberTax(input, year)
  
  // Apply disability exemption
  const finalPaye = input.isDisabled ? Math.max(0, payeAfterReliefs - reliefs.disability) : payeAfterReliefs
  
  const totalTaxBurden = finalPaye + digitalTaxes.digitalAssetTax + digitalTaxes.digitalExcise + 
                        digitalTaxes.septTax + vatPayable + corporateTax + fringeBenefitsTax + 
                        bettingExciseDuty + capitalGainsTax + timberTax
  const netIncome = annualIncome - totalDeductions - totalTaxBurden
  
  return {
    grossPay: annualIncome,
    nssfDeduction: statutoryDeductions.nssf,
    shifDeduction: statutoryDeductions.shif,
    housingLevyDeduction: statutoryDeductions.housingLevy,
    pensionDeduction: voluntaryDeductions.pension,
    mortgageInterestDeduction: voluntaryDeductions.mortgageInterest,
    medicalFundDeduction: voluntaryDeductions.medicalFund,
    constructionCostDeduction: voluntaryDeductions.constructionCosts,
    personalRelief: reliefs.personal,
    insuranceRelief: reliefs.insurance,
    disabilityExemption: reliefs.disability,
    housingRelief: reliefs.housing,
    perDiemBenefit: reliefs.perDiem,
    taxableIncome,
    payeBeforeReliefs: year === 2024 ? calculateProgressiveTax(taxableIncome) : calculateProgressiveTax(Math.max(0, taxableIncome + reliefs.personal + reliefs.insurance + reliefs.housing)),
    payeAfterReliefs: finalPaye,
    corporateTax,
    fringeBenefitsTax,
    vatPayable,
    digitalServicesTax: digitalTaxes.digitalAssetTax,
    digitalExciseDuty: digitalTaxes.digitalExcise,
    septTax: digitalTaxes.septTax,
    bettingExciseDuty,
    capitalGainsTax,
    timberTax,
    totalTaxBurden,
    netIncome
  }
}

/**
 * Main function to calculate tax comparison between 2024 and 2025
 */
export function calculateTaxImpact(input: CalculatorInput): TaxComparison {
  const year2024 = calculateYearBreakdown(input, 2024)
  const year2025 = calculateYearBreakdown(input, 2025)
  
  const savings = year2025.netIncome - year2024.netIncome
  const savingsPercentage = year2024.netIncome > 0 ? (savings / year2024.netIncome) * 100 : 0
  
  // Identify main benefits
  const mainBenefits: string[] = []
  
  if (year2025.housingRelief > year2024.housingRelief) {
    mainBenefits.push('Increased housing relief (KES 300K → 360K)')
  }
  
  if (input.homeownerType === 'self_built') {
    mainBenefits.push('Self-built homes now qualify for tax relief')
  }
  
  if (year2025.perDiemBenefit > 0) {
    mainBenefits.push('Higher per diem limit (KES 2K → 10K per day)')
  }
  
  if (year2025.digitalServicesTax < year2024.digitalServicesTax) {
    mainBenefits.push('Reduced digital asset tax (3% → 1.5%)')
  }
  
  if (year2025.bettingExciseDuty > year2024.bettingExciseDuty) {
    mainBenefits.push('Higher betting tax supports responsible gambling')
  }
  
  // Generate explanation
  let explanation = ''
  if (savings > 0) {
    explanation = `You'll save KES ${Math.abs(savings).toLocaleString()} annually under Finance Bill 2025. This demonstrates how the bill's strategy of broadening the tax base while maintaining competitive rates benefits most taxpayers.`
  } else if (savings < 0) {
    explanation = `Your tax contribution increases by KES ${Math.abs(savings).toLocaleString()} annually. This increase helps broaden the tax base and fund national development while keeping rates competitive.`
  } else {
    explanation = 'Your tax obligation remains virtually the same, showing how the bill maintains stability for most taxpayers while expanding coverage.'
  }
  
  return {
    year2024,
    year2025,
    savings: {
      amount: savings,
      percentage: savingsPercentage,
      mainBenefits
    },
    explanation
  }
}