'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalculatorInput, TaxComparison } from '@/types'
import { calculateTaxImpact } from '@/utils/taxCalculator'

export default function Calculator() {
  const [input, setInput] = useState<CalculatorInput>({
    incomeType: 'employed',
    monthlyIncome: 0,
    isDisabled: false,
    homeownerType: 'none',
    bettingFrequency: 'none',
    travelDaysPerMonth: 0,
    propertyLocation: 'other_areas',
    isNonResident: false,
    hasInternationalClients: false,
    hasETIMSCompliance: true,
    companyType: 'regular'
  })

  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<TaxComparison | null>(null)
  
  // Auto-calculate statutory deductions
  const autoCalculateDeductions = (monthlyIncome: number) => {
    return {
      nssfContribution: Math.min(monthlyIncome * 0.06, 6960), // 6% capped at 6,960
      shifContribution: monthlyIncome * 0.0275, // 2.75%
      housingLevy: monthlyIncome * 0.015 // 1.5%
    }
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Auto-calculate statutory deductions if not manually set
    const autoDeductions = autoCalculateDeductions(input.monthlyIncome)
    const finalInput = {
      ...input,
      nssfContribution: input.nssfContribution || autoDeductions.nssfContribution,
      shifContribution: input.shifContribution || autoDeductions.shifContribution,
      housingLevy: input.housingLevy || autoDeductions.housingLevy
    }
    
    const calculationResults = calculateTaxImpact(finalInput)
    setResults(calculationResults)
    setShowResults(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getKeyChangeExplanation = (input: CalculatorInput, results: TaxComparison): string => {
    const majorChanges = []
    
    // PAYE formula change
    if (results.year2025.payeAfterReliefs !== results.year2024.payeAfterReliefs) {
      majorChanges.push("PAYE reliefs now applied before tax calculation")
    }
    
    // VAT threshold change
    if (input.monthlyVATSales && (input.monthlyVATSales * 12) >= 5000000) {
      majorChanges.push("VAT registration threshold increased 5M→8M KES")
    }
    
    // Digital economy taxes
    if (input.digitalServicesIncome) {
      majorChanges.push("Digital tax reduced (3%→1.5%) but SEPT expanded")
    }
    
    // Corporate tax changes
    if (input.incomeType === 'corporate' && input.companyType === 'nifc_startup') {
      majorChanges.push("NIFC startups get 15% tax rate vs 30% standard")
    }
    
    // Betting excise
    if (input.bettingFrequency !== 'none') {
      majorChanges.push("Betting excise increased from 20% to 35%")
    }
    
    return majorChanges.length > 0 ? majorChanges[0] : "Tax base broadening with competitive rates"
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
          
          <header className="mb-16 text-center">
            <div className="relative">
              <h1 className="text-5xl font-bold kenya-text-accent mb-6 flex items-center justify-center gap-4">
                <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H9v-2h5v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                Tax Impact Calculator
              </h1>
              <div className="absolute -top-2 -right-8 text-3xl">
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                </svg>
              </div>
              <div className="absolute -bottom-1 -left-6 text-2xl">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.56-3.55C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"/>
                </svg>
              </div>
            </div>
            <p className="text-2xl kenya-text-primary max-w-3xl mx-auto">
              See how <span className="kenya-text-accent font-semibold">tax base expansion</span> affects you personally - 
              most individuals benefit while the system generates <span className="kenya-text-accent font-semibold">more revenue</span>
            </p>
            <div className="mt-6 inline-block px-6 py-2 status-beneficial text-white rounded-full text-sm font-medium">
              📊 Broader Base = Fair Share for All
            </div>
          </header>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <div className="kenya-card kenya-shadow-lg p-8">
              <h2 className="text-3xl font-bold kenya-text-primary mb-8 flex items-center">
                <span className="text-3xl mr-4">📝</span>
                Your Information
              </h2>
            
              <form onSubmit={handleCalculate} className="space-y-8">
                <div>
                  <label className="block text-lg font-bold kenya-text-primary mb-3">
                    💼 Income Type
                  </label>
                  <select
                    value={input.incomeType}
                    onChange={(e) => setInput({...input, incomeType: e.target.value as any})}
                    className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
                  >
                    <option value="" disabled className="text-gray-400">Select your income type</option>
                    <option value="employed" className="text-gray-800">💼 Employed</option>
                    <option value="freelancer" className="text-gray-800">🖥️ Freelancer</option>
                    <option value="business" className="text-gray-800">🏢 Business Owner</option>
                    <option value="corporate" className="text-gray-800">🏛️ Corporate Entity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold kenya-text-primary mb-3">
                    💰 Monthly Income (KES)
                  </label>
                  <input
                    type="number"
                    value={input.monthlyIncome || ''}
                    onChange={(e) => setInput({...input, monthlyIncome: Number(e.target.value) || 0})}
                    className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm placeholder-gray-400"
                    min="0"
                    placeholder="Enter your monthly income (e.g. 50,000)"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold kenya-text-primary mb-3">
                    🏠 Homeowner Status
                  </label>
                  <select
                    value={input.homeownerType}
                    onChange={(e) => setInput({...input, homeownerType: e.target.value as any})}
                    className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
                  >
                    <option value="none" className="text-gray-800">🚫 Not a homeowner</option>
                    <option value="mortgage" className="text-gray-800">🏦 Paying mortgage</option>
                    <option value="self_built" className="text-gray-800">🔨 Building own home</option>
                  </select>
                </div>

                {/* Lifestyle Factors - Only for employed/freelancer */}
                {(input.incomeType === 'employed' || input.incomeType === 'freelancer') && (
                  <>
                    <div className="border-t-2 border-yellow-200 pt-6">
                      <h3 className="text-xl font-bold kenya-text-primary mb-4">🎯 Lifestyle Factors</h3>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-bold kenya-text-primary mb-3">
                        🎰 Betting Frequency
                      </label>
                      <select
                        value={input.bettingFrequency}
                        onChange={(e) => setInput({...input, bettingFrequency: e.target.value as any})}
                        className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
                      >
                        <option value="none" className="text-gray-800">🚫 Never bet</option>
                        <option value="occasional" className="text-gray-800">🎯 Occasional (KES 2,000/month)</option>
                        <option value="frequent" className="text-gray-800">🎰 Frequent (KES 10,000/month)</option>
                      </select>
                      <p className="text-sm text-orange-600 mt-2 font-medium">
                        ⚠️ Excise duty: 20% (2024) → 35% (2025)
                      </p>
                    </div>
                  </>
                )}

                {/* Business & VAT Fields */}
                {(input.incomeType === 'business' || input.incomeType === 'corporate') && (
                  <>
                    <div className="border-t-2 border-blue-200 pt-6">
                      <h3 className="text-xl font-bold kenya-text-primary mb-4">🏢 Business Information</h3>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-bold kenya-text-primary mb-3">
                        🛒 Monthly VAT Sales (KES)
                      </label>
                      <input
                        type="number"
                        value={input.monthlyVATSales || ''}
                        onChange={(e) => setInput({...input, monthlyVATSales: Number(e.target.value) || undefined})}
                        className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm placeholder-gray-400"
                        min="0"
                        placeholder="Monthly sales subject to VAT"
                      />
                      <p className="text-sm text-blue-600 mt-2 font-medium">
                        📊 VAT threshold: KES 5M (2024) → 8M (2025)
                      </p>
                    </div>

                    <div>
                      <label className="block text-lg font-bold kenya-text-primary mb-3">
                        🧾 Monthly VAT Purchases (KES)
                      </label>
                      <input
                        type="number"
                        value={input.monthlyVATPurchases || ''}
                        onChange={(e) => setInput({...input, monthlyVATPurchases: Number(e.target.value) || undefined})}
                        className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm placeholder-gray-400"
                        min="0"
                        placeholder="Monthly purchases with VAT"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-bold kenya-text-primary mb-3">
                        ✅ eTIMS Compliance
                      </label>
                      <select
                        value={input.hasETIMSCompliance ? 'yes' : 'no'}
                        onChange={(e) => setInput({...input, hasETIMSCompliance: e.target.value === 'yes'})}
                        className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
                      >
                        <option value="yes" className="text-gray-800">✅ Compliant with eTIMS</option>
                        <option value="no" className="text-gray-800">❌ Not eTIMS compliant</option>
                      </select>
                      <p className="text-sm text-orange-600 mt-2 font-medium">
                        ⚠️ Non-compliance reduces input VAT claims by 20% (2025)
                      </p>
                    </div>
                  </>
                )}

                {/* Corporate Tax Fields */}
                {input.incomeType === 'corporate' && (
                  <>
                    <div>
                      <label className="block text-lg font-bold kenya-text-primary mb-3">
                        🏛️ Company Type
                      </label>
                      <select
                        value={input.companyType}
                        onChange={(e) => setInput({...input, companyType: e.target.value as any})}
                        className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
                      >
                        <option value="regular" className="text-gray-800">🏢 Regular Company</option>
                        <option value="nifc_startup" className="text-gray-800">🚀 NIFC Startup</option>
                        <option value="nifc_certified" className="text-gray-800">⭐ NIFC Certified</option>
                      </select>
                      <p className="text-sm text-green-600 mt-2 font-medium">
                        💡 NIFC startups: 15% vs 30% tax rate (2025)
                      </p>
                    </div>

                    <div>
                      <label className="block text-lg font-bold kenya-text-primary mb-3">
                        💰 Annual Profit (KES)
                      </label>
                      <input
                        type="number"
                        value={input.annualProfit || ''}
                        onChange={(e) => setInput({...input, annualProfit: Number(e.target.value) || undefined})}
                        className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm placeholder-gray-400"
                        min="0"
                        placeholder="Company's annual profit"
                      />
                    </div>
                  </>
                )}

                {/* Digital Economy Fields */}
                {(input.incomeType === 'freelancer' || input.incomeType === 'business') && (
                  <>
                    <div className="border-t-2 border-purple-200 pt-6">
                      <h3 className="text-xl font-bold kenya-text-primary mb-4">💻 Digital Economy</h3>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-bold kenya-text-primary mb-3">
                        🌐 Monthly Digital Services Income (KES)
                      </label>
                      <input
                        type="number"
                        value={input.digitalServicesIncome || ''}
                        onChange={(e) => setInput({...input, digitalServicesIncome: Number(e.target.value) || undefined})}
                        className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm placeholder-gray-400"
                        min="0"
                        placeholder="Income from digital services"
                      />
                      <p className="text-sm text-blue-600 mt-2 font-medium">
                        📊 Digital Asset Tax: 3% (2024) → 1.5% (2025)
                      </p>
                    </div>

                    <div>
                      <label className="block text-lg font-bold kenya-text-primary mb-3">
                        🌍 International Clients
                      </label>
                      <select
                        value={input.hasInternationalClients ? 'yes' : 'no'}
                        onChange={(e) => setInput({...input, hasInternationalClients: e.target.value === 'yes'})}
                        className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
                      >
                        <option value="no" className="text-gray-800">🇰🇪 Local clients only</option>
                        <option value="yes" className="text-gray-800">🌍 International clients</option>
                      </select>
                      <p className="text-sm text-orange-600 mt-2 font-medium">
                        ⚠️ SEPT: 6% rate expanded in 2025 (no threshold)
                      </p>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="kenya-button w-full py-4 px-6 rounded-xl text-lg font-bold"
                >
                  🧮 Calculate Tax Impact
                </button>
              </form>
            </div>

            <div className="kenya-card kenya-shadow-lg p-8">
              <h2 className="text-3xl font-bold kenya-text-primary mb-8 flex items-center">
                <span className="text-3xl mr-4">📊</span>
                Results
              </h2>
            
              {!showResults ? (
                <div className="text-center py-16 security-lines rounded-xl">
                  <div className="text-6xl mb-6">
                    <svg className="w-20 h-20 mx-auto text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                    </svg>
                  </div>
                  <p className="text-xl kenya-text-primary">See how expanding the tax base benefits both you and the economy - calculate your fair share contribution</p>
                </div>
              ) : results && results.savings && (
                <div className="space-y-8">
                  {/* Tax Areas Being Calculated */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-blue-800 mb-4">📊 Tax Areas Under Analysis</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>PAYE (Formula Change)</div>
                        {(input.incomeType === 'business' || input.incomeType === 'corporate') && (
                          <div className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>VAT (Threshold & Compliance)</div>
                        )}
                        {input.incomeType === 'corporate' && (
                          <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Corporate Tax (NIFC Rates)</div>
                        )}
                        {input.digitalServicesIncome && (
                          <div className="flex items-center"><span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>Digital Economy Taxes</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        {input.propertyTransactions && (
                          <div className="flex items-center"><span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>Capital Gains (Deduction Removal)</div>
                        )}
                        {input.bettingFrequency !== 'none' && (
                          <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>Betting Excise (20% → 35%)</div>
                        )}
                        {input.homeownerType !== 'none' && (
                          <div className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>Housing Relief Changes</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`p-8 rounded-2xl relative overflow-hidden ${results.savings.amount > 0 ? 'status-beneficial' : 'status-costly'}`}>
                    <div className="relative z-10">
                      <h3 className="font-bold text-2xl mb-4 text-white">
                        {results.savings.amount > 0 ? '✅ You\'ll be better off!' : '❌ You\'ll pay more taxes'}
                      </h3>
                      <p className="text-4xl font-bold text-white">
                        {formatCurrency(Math.abs(results.savings.amount))} 
                        <span className="text-lg font-normal ml-3 opacity-90">
                          ({Math.abs(results.savings.percentage).toFixed(1)}% {results.savings.amount > 0 ? 'more' : 'less'} income)
                        </span>
                      </p>
                      
                      {/* Key Changes Explanation */}
                      <div className="mt-4 text-white/90 text-base">
                        <p><strong>Key Change:</strong> {getKeyChangeExplanation(input, results)}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 text-6xl opacity-20">
                      {results.savings.amount > 0 ? '💰' : '💸'}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="kenya-card kenya-shadow p-6 relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-400"></div>
                      <h4 className="text-xl font-bold kenya-text-primary mb-6 flex items-center">
                        <span className="text-2xl mr-3">📅</span>
                        2024 Tax Breakdown
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="font-medium text-gray-700">💼 PAYE:</span>
                          <span className="font-bold text-gray-900">{formatCurrency(results.year2024.payeAfterReliefs)}</span>
                        </div>
                        {results.year2024.corporateTax > 0 && (
                          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700">🏛️ Corporate Tax:</span>
                            <span className="font-bold text-blue-700">{formatCurrency(results.year2024.corporateTax)}</span>
                          </div>
                        )}
                        {results.year2024.vatPayable > 0 && (
                          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="font-medium text-gray-700">🧾 VAT Payable:</span>
                            <span className="font-bold text-purple-700">{formatCurrency(results.year2024.vatPayable)}</span>
                          </div>
                        )}
                        {results.year2024.digitalServicesTax > 0 && (
                          <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                            <span className="font-medium text-gray-700">💻 Digital Tax:</span>
                            <span className="font-bold text-indigo-700">{formatCurrency(results.year2024.digitalServicesTax)}</span>
                          </div>
                        )}
                        {results.year2024.bettingExciseDuty > 0 && (
                          <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
                            <span className="font-medium text-gray-700">🎰 Betting Excise:</span>
                            <span className="font-bold text-red-700">{formatCurrency(results.year2024.bettingExciseDuty)}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center p-4 currency-accent-bg text-white rounded-xl shadow-md">
                          <span className="font-bold text-lg">💸 Total Tax:</span>
                          <span className="font-bold text-xl">{formatCurrency(results.year2024.totalTaxBurden)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 status-beneficial text-white rounded-xl shadow-md">
                          <span className="font-bold text-lg">💰 Net Income:</span>
                          <span className="font-bold text-xl">{formatCurrency(results.year2024.netIncome)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="kenya-card kenya-shadow p-6 relative">
                      <div className="absolute top-0 left-0 right-0 h-1 kenya-gradient"></div>
                      <h4 className="text-xl font-bold kenya-text-primary mb-6 flex items-center">
                        <span className="text-2xl mr-3">📅</span>
                        2025 Tax Breakdown
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">NEW</span>
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="font-medium text-gray-700">💼 PAYE:</span>
                          <span className="font-bold text-gray-900">{formatCurrency(results.year2025.payeAfterReliefs)}</span>
                        </div>
                        {results.year2025.corporateTax > 0 && (
                          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700">🏛️ Corporate Tax:</span>
                            <span className="font-bold text-blue-700">{formatCurrency(results.year2025.corporateTax)}</span>
                          </div>
                        )}
                        {results.year2025.vatPayable > 0 && (
                          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="font-medium text-gray-700">🧾 VAT Payable:</span>
                            <span className="font-bold text-purple-700">{formatCurrency(results.year2025.vatPayable)}</span>
                          </div>
                        )}
                        {(results.year2025.digitalServicesTax + results.year2025.digitalExciseDuty + results.year2025.septTax) > 0 && (
                          <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                            <span className="font-medium text-gray-700">💻 Digital Taxes:</span>
                            <span className="font-bold text-indigo-700">{formatCurrency(results.year2025.digitalServicesTax + results.year2025.digitalExciseDuty + results.year2025.septTax)}</span>
                          </div>
                        )}
                        {results.year2025.bettingExciseDuty > 0 && (
                          <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
                            <span className="font-medium text-gray-700">🎰 Betting Excise:</span>
                            <span className="font-bold text-red-700">{formatCurrency(results.year2025.bettingExciseDuty)}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center p-4 currency-accent-bg text-white rounded-xl shadow-md">
                          <span className="font-bold text-lg">💸 Total Tax:</span>
                          <span className="font-bold text-xl">{formatCurrency(results.year2025.totalTaxBurden)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 status-beneficial text-white rounded-xl shadow-md">
                          <span className="font-bold text-lg">💰 Net Income:</span>
                          <span className="font-bold text-xl">{formatCurrency(results.year2025.netIncome)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Tax Changes Explanation */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">🔍 What Changed Between 2024 & 2025</h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      
                      {/* PAYE Changes */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">💼 PAYE Calculation</h4>
                        <div className="bg-red-50 border-l-4 border-red-400 p-3">
                          <p className="text-red-800"><strong>2024:</strong> Tax calculated first, then reliefs subtracted</p>
                        </div>
                        <div className="bg-green-50 border-l-4 border-green-400 p-3">
                          <p className="text-green-800"><strong>2025:</strong> Reliefs subtracted before tax calculation</p>
                        </div>
                        <p className="text-xs text-gray-600">Difference: {formatCurrency(results.year2025.payeAfterReliefs - results.year2024.payeAfterReliefs)}</p>
                      </div>

                      {/* VAT Changes */}
                      {(input.incomeType === 'business' || input.incomeType === 'corporate') && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-700">🧾 VAT Changes</h4>
                          <div className="bg-red-50 border-l-4 border-red-400 p-3">
                            <p className="text-red-800"><strong>2024:</strong> 5M KES threshold, no eTIMS penalty</p>
                          </div>
                          <div className="bg-green-50 border-l-4 border-green-400 p-3">
                            <p className="text-green-800"><strong>2025:</strong> 8M KES threshold, eTIMS compliance factor</p>
                          </div>
                          <p className="text-xs text-gray-600">Impact: {input.hasETIMSCompliance ? 'Compliant - no penalty' : '20% input VAT reduction'}</p>
                        </div>
                      )}

                      {/* Digital Economy Changes */}
                      {input.digitalServicesIncome && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-700">💻 Digital Economy</h4>
                          <div className="bg-red-50 border-l-4 border-red-400 p-3">
                            <p className="text-red-800"><strong>2024:</strong> 3% digital asset tax, SEPT threshold</p>
                          </div>
                          <div className="bg-green-50 border-l-4 border-green-400 p-3">
                            <p className="text-green-800"><strong>2025:</strong> 1.5% digital tax, expanded SEPT, 20% excise</p>
                          </div>
                          <p className="text-xs text-gray-600">Net change: {formatCurrency((results.year2025.digitalServicesTax + results.year2025.digitalExciseDuty + results.year2025.septTax) - results.year2024.digitalServicesTax)}</p>
                        </div>
                      )}

                      {/* Corporate Tax Changes */}
                      {input.incomeType === 'corporate' && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-700">🏛️ Corporate Tax</h4>
                          <div className="bg-red-50 border-l-4 border-red-400 p-3">
                            <p className="text-red-800"><strong>2024:</strong> Flat 30% rate, 20% fringe benefits</p>
                          </div>
                          <div className="bg-green-50 border-l-4 border-green-400 p-3">
                            <p className="text-green-800"><strong>2025:</strong> 15% NIFC rate, 30% fringe benefits, 5yr loss cap</p>
                          </div>
                          <p className="text-xs text-gray-600">Your rate: {input.companyType === 'nifc_startup' ? '15%' : '30%'}</p>
                        </div>
                      )}

                      {/* Housing Changes */}
                      {input.homeownerType !== 'none' && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-700">🏠 Housing Relief</h4>
                          <div className="bg-red-50 border-l-4 border-red-400 p-3">
                            <p className="text-red-800"><strong>2024:</strong> KES 300K max, mortgage only</p>
                          </div>
                          <div className="bg-green-50 border-l-4 border-green-400 p-3">
                            <p className="text-green-800"><strong>2025:</strong> KES 360K max, includes self-built & construction</p>
                          </div>
                          <p className="text-xs text-gray-600">Benefit: {formatCurrency(results.year2025.housingRelief - results.year2024.housingRelief)}</p>
                        </div>
                      )}

                      {/* Betting Changes */}
                      {input.bettingFrequency !== 'none' && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-700">🎰 Betting Excise</h4>
                          <div className="bg-red-50 border-l-4 border-red-400 p-3">
                            <p className="text-red-800"><strong>2024:</strong> 20% excise duty</p>
                          </div>
                          <div className="bg-red-50 border-l-4 border-red-400 p-3">
                            <p className="text-red-800"><strong>2025:</strong> 35% excise duty</p>
                          </div>
                          <p className="text-xs text-gray-600">Increase: {formatCurrency(results.year2025.bettingExciseDuty - results.year2024.bettingExciseDuty)}</p>
                        </div>
                      )}

                    </div>
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-blue-800 text-sm"><strong>Summary:</strong> {results.explanation}</p>
                    </div>
                  </div>

                  <div className="text-center pt-8">
                    <button
                      onClick={() => setShowResults(false)}
                      className="kenya-button px-8 py-3 rounded-full text-lg"
                    >
                      🔄 Adjust inputs and recalculate
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
      </div>
    </div>
  )
}