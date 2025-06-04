'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalculatorInput } from '@/types'
import { calculateTaxImpact } from '@/utils/taxCalculator'

export default function Calculator() {
  const [input, setInput] = useState<CalculatorInput>({
    incomeType: 'employed',
    monthlyIncome: 0,
    homeownerType: 'none',
    bettingFrequency: 'none',
    consumptionHabits: {
      alcohol: false,
      sugaryDrinks: false
    }
  })

  const [showResults, setShowResults] = useState(false)
  const results = showResults ? calculateTaxImpact(input) : null

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <main className="min-h-screen currency-bg">
      <div className="min-h-screen bg-gradient-to-br from-white/98 via-white/95 to-white/98">
        <div className="container mx-auto px-4 py-12">
          <Link href="/" className="kenya-button px-6 py-3 rounded-full mb-8 inline-block no-underline">
            ← Back to Home
          </Link>
          
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
            
              <form onSubmit={handleCalculate} className="space-y-6">
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
              ) : results && (
                <div className="space-y-8">
                  <div className={`p-8 rounded-2xl relative overflow-hidden ${results.difference.betterOff ? 'status-beneficial' : 'status-costly'}`}>
                    <div className="relative z-10">
                      <h3 className="font-bold text-2xl mb-4 text-white">
                        {results.difference.betterOff ? '✅ You\'ll be better off!' : '❌ You\'ll pay more taxes'}
                      </h3>
                      <p className="text-4xl font-bold text-white">
                        {formatCurrency(Math.abs(results.difference.amount))} 
                        <span className="text-lg font-normal ml-3 opacity-90">
                          ({results.difference.percentage.toFixed(1)}% {results.difference.betterOff ? 'more' : 'less'} income)
                        </span>
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 text-6xl opacity-20">
                      {results.difference.betterOff ? '💰' : '💸'}
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
                          <span className="font-medium text-gray-700">💼 Income Tax:</span>
                          <span className="font-bold text-gray-900">{formatCurrency(results.year2024.incomeTax)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <span className="font-medium text-gray-700">🎯 Tax Reliefs:</span>
                          <span className="font-bold text-green-700">-{formatCurrency(results.year2024.reliefs)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
                          <span className="font-medium text-gray-700">🎰 Excise Duties:</span>
                          <span className="font-bold text-red-700">{formatCurrency(results.year2024.exciseDuty)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 currency-accent-bg text-white rounded-xl shadow-md">
                          <span className="font-bold text-lg">💸 Total Tax:</span>
                          <span className="font-bold text-xl">{formatCurrency(results.year2024.totalTax)}</span>
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
                          <span className="font-medium text-gray-700">💼 Income Tax:</span>
                          <span className="font-bold text-gray-900">{formatCurrency(results.year2025.incomeTax)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <span className="font-medium text-gray-700">🎯 Tax Reliefs:</span>
                          <span className="font-bold text-green-700">-{formatCurrency(results.year2025.reliefs)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
                          <span className="font-medium text-gray-700">🎰 Excise Duties:</span>
                          <span className="font-bold text-red-700">{formatCurrency(results.year2025.exciseDuty)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 currency-accent-bg text-white rounded-xl shadow-md">
                          <span className="font-bold text-lg">💸 Total Tax:</span>
                          <span className="font-bold text-xl">{formatCurrency(results.year2025.totalTax)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 status-beneficial text-white rounded-xl shadow-md">
                          <span className="font-bold text-lg">💰 Net Income:</span>
                          <span className="font-bold text-xl">{formatCurrency(results.year2025.netIncome)}</span>
                        </div>
                      </div>
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
    </main>
  )
}