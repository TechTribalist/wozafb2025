import { CalculatorInput } from '@/types'

interface TaxResult {
  year2024: {
    incomeTax: number
    reliefs: number
    exciseDuty: number
    totalTax: number
    netIncome: number
  }
  year2025: {
    incomeTax: number
    reliefs: number
    exciseDuty: number
    totalTax: number
    netIncome: number
  }
  difference: {
    amount: number
    percentage: number
    betterOff: boolean
  }
}

export function calculateTaxImpact(input: CalculatorInput): TaxResult {
  const annualIncome = input.monthlyIncome * 12

  // Current PAYE tax bands for Kenya (2024/2025)
  const calculatePAYE = (income: number): number => {
    let tax = 0
    if (income <= 288000) {
      tax = income * 0.1 // 10% for income up to KES 288,000
    } else if (income <= 388000) {
      tax = 28800 + (income - 288000) * 0.25 // 25% for next KES 100,000
    } else if (income <= 6000000) {
      tax = 28800 + 25000 + (income - 388000) * 0.3 // 30% for next bracket
    } else if (income <= 9600000) {
      tax = 28800 + 25000 + 1683600 + (income - 6000000) * 0.325 // 32.5% for next bracket
    } else {
      tax = 28800 + 25000 + 1683600 + 1170000 + (income - 9600000) * 0.35 // 35% for highest bracket
    }
    return tax
  }

  // Calculate 2024 taxes
  const paye2024 = calculatePAYE(annualIncome)
  let reliefs2024 = 28800 // Personal relief (KES 2,400 per month)

  // Housing relief 2024 (mortgage only, up to KES 300,000)
  if (input.homeownerType === 'mortgage') {
    reliefs2024 += Math.min(300000, annualIncome * 0.15)
  }

  // Betting excise 2024 (20% of stakes)
  let excise2024 = 0
  if (input.bettingFrequency === 'occasional') {
    excise2024 = 2000 * 12 * 0.2 // Assume KES 2,000 monthly betting
  } else if (input.bettingFrequency === 'frequent') {
    excise2024 = 10000 * 12 * 0.2 // Assume KES 10,000 monthly betting
  }

  // Digital asset transactions (3% in 2024)
  let digitalAssetTax2024 = 0
  if (input.incomeType === 'freelancer') {
    digitalAssetTax2024 = annualIncome * 0.03 * 0.1 // Assume 10% of income from digital assets
  }

  // Calculate 2025 taxes
  const paye2025 = calculatePAYE(annualIncome)
  let reliefs2025 = 28800 // Personal relief unchanged

  // Housing relief 2025 (mortgage + self-built, up to KES 360,000)
  if (input.homeownerType === 'mortgage' || input.homeownerType === 'self_built') {
    reliefs2025 += Math.min(360000, annualIncome * 0.15)
  }

  // Betting excise 2025 (35% of stakes - increased from 20%)
  let excise2025 = 0
  if (input.bettingFrequency === 'occasional') {
    excise2025 = 2000 * 12 * 0.35
  } else if (input.bettingFrequency === 'frequent') {
    excise2025 = 10000 * 12 * 0.35
  }

  // Digital asset transactions (1.5% in 2025 - reduced from 3%)
  let digitalAssetTax2025 = 0
  if (input.incomeType === 'freelancer') {
    digitalAssetTax2025 = annualIncome * 0.015 * 0.1 // Assume 10% of income from digital assets
  }

  // Per diem benefits (tax savings from increased limit)
  let perDiemSavings2024 = 0
  let perDiemSavings2025 = 0
  if (input.incomeType === 'employed') {
    // Assume 5 travel days per month
    const monthlyTravelDays = 5
    perDiemSavings2024 = Math.min(2000 * monthlyTravelDays * 12, annualIncome * 0.3) * 0.3 // Tax on excess per diem
    perDiemSavings2025 = Math.min(10000 * monthlyTravelDays * 12, annualIncome * 0.3) * 0.3 // Higher limit
  }

  // Calculate totals
  const totalTax2024 = Math.max(0, paye2024 - reliefs2024) + excise2024 + digitalAssetTax2024 - perDiemSavings2024
  const totalTax2025 = Math.max(0, paye2025 - reliefs2025) + excise2025 + digitalAssetTax2025 - perDiemSavings2025

  const netIncome2024 = annualIncome - totalTax2024
  const netIncome2025 = annualIncome - totalTax2025

  const difference = netIncome2025 - netIncome2024
  const percentageDiff = totalTax2024 > 0 ? (difference / netIncome2024) * 100 : 0

  return {
    year2024: {
      incomeTax: paye2024,
      reliefs: reliefs2024,
      exciseDuty: excise2024 + digitalAssetTax2024,
      totalTax: totalTax2024,
      netIncome: netIncome2024
    },
    year2025: {
      incomeTax: paye2025,
      reliefs: reliefs2025,
      exciseDuty: excise2025 + digitalAssetTax2025,
      totalTax: totalTax2025,
      netIncome: netIncome2025
    },
    difference: {
      amount: difference,
      percentage: percentageDiff,
      betterOff: difference > 0
    }
  }
}