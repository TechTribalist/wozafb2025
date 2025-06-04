'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ClauseComparison() {
  const [selectedComparison, setSelectedComparison] = useState(0)

  const comparisons = [
    {
      id: 1,
      title: "Housing Tax Relief",
      sectionNumber: "Clause 8(b)(i)",
      clause2024: {
        text: "Tax relief available only for mortgage interest payments up to KES 300,000 per year for mortgage holders",
        impact: "Limited to homeowners with bank mortgages only"
      },
      clause2025: {
        text: "Tax relief expanded to include self-built homes and construction loans up to KES 360,000 per year",
        impact: "Benefits homeowners, mortgage holders, and those building their own homes"
      },
      verdict: "better" as const,
      comparisonNotes: "20% increase in relief amount (from KES 300,000 to KES 360,000) and expanded eligibility to include self-built homes"
    },
    {
      id: 2,
      title: "Per Diem Benefits",
      sectionNumber: "Clause 3",
      clause2024: {
        text: "Tax-free per diem limit of KES 2,000 per day for employees working out of town",
        impact: "Limited daily allowance relief for private sector employees"
      },
      clause2025: {
        text: "Tax-free per diem limit increased to KES 10,000 per day for employees working out of town",
        impact: "Significantly enhanced non-taxable benefit for employees"
      },
      verdict: "better" as const,
      comparisonNotes: "400% increase in tax-free daily allowance, bringing equity between private and public sector employees"
    },
    {
      id: 3,
      title: "Digital Asset Tax",
      sectionNumber: "Clause 28(d)",
      clause2024: {
        text: "3% tax on transfer or exchange value of digital assets",
        impact: "Higher cost for digital asset transactions"
      },
      clause2025: {
        text: "1.5% tax on transfer or exchange value of digital assets",
        impact: "Reduced cost to encourage regulated platform usage"
      },
      verdict: "better" as const,
      comparisonNotes: "50% reduction in digital asset tax rate to align with turnover tax and encourage compliance"
    },
    {
      id: 4,
      title: "Significant Economic Presence (SEP) Tax",
      sectionNumber: "Clause 6",
      clause2024: {
        text: "SEP tax applies only to digital marketplaces with turnover above KES 5 million",
        impact: "Limited scope allowing some digital businesses to avoid tax"
      },
      clause2025: {
        text: "SEP tax expanded to all internet and electronic networks, KES 5 million threshold removed",
        impact: "Broader tax base covering all digital economic activities"
      },
      verdict: "neutral" as const,
      comparisonNotes: "Expands tax base to capture more digital economy participants but may increase compliance burden"
    },
    {
      id: 5,
      title: "Carry Forward of Tax Losses",
      sectionNumber: "Clause 8(c)",
      clause2024: {
        text: "Businesses could carry forward tax losses indefinitely",
        impact: "Unlimited time to utilize business losses against future profits"
      },
      clause2025: {
        text: "Tax losses can only be carried forward for 5 years",
        impact: "Limited time to recover losses, affecting long-term investments"
      },
      verdict: "worse" as const,
      comparisonNotes: "Introduces 5-year cap on loss carryforward, potentially affecting businesses with long recovery periods"
    },
    {
      id: 6,
      title: "VAT on Electric Bicycles and Solar Batteries",
      sectionNumber: "Clause 37",
      clause2024: {
        text: "Electric bicycles and solar batteries were zero-rated (0% VAT with input VAT recovery)",
        impact: "No VAT cost, supporting clean energy adoption"
      },
      clause2025: {
        text: "Electric bicycles and solar batteries moved to exempt status (0% VAT but no input VAT recovery)",
        impact: "Increased cost as suppliers cannot recover input VAT"
      },
      verdict: "worse" as const,
      comparisonNotes: "Makes clean energy solutions more expensive as input VAT becomes a cost to suppliers"
    }
  ]

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'better': return 'bg-green-100 text-green-800'
      case 'worse': return 'bg-red-100 text-red-800'
      case 'neutral': return 'bg-gray-100 text-gray-800'
      case 'mixed': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getVerdictLabel = (verdict: string) => {
    switch (verdict) {
      case 'better': return 'Better for Citizens'
      case 'worse': return 'Worse for Citizens'
      case 'neutral': return 'Neutral Change'
      case 'mixed': return 'Mixed Impact'
      default: return verdict
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Clause Comparison: 2024 vs 2025
          </h1>
          <p className="text-xl text-gray-600">
            See how specific clauses have changed between Finance Bill 2024 and 2025
          </p>
        </header>

        <div className="mb-8">
          <div className="flex gap-2 flex-wrap">
            {comparisons.map((comp, index) => (
              <button
                key={comp.id}
                onClick={() => setSelectedComparison(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedComparison === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {comp.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {comparisons[selectedComparison].title}
            </h2>
            <p className="text-gray-600">{comparisons[selectedComparison].sectionNumber}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 text-gray-700">
                📅 2024 Version
              </h3>
              <p className="mb-4">{comparisons[selectedComparison].clause2024.text}</p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">
                  <strong>Impact:</strong> {comparisons[selectedComparison].clause2024.impact}
                </p>
              </div>
            </div>

            <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
              <h3 className="font-semibold text-lg mb-3 text-blue-700">
                📅 2025 Version
              </h3>
              <p className="mb-4">{comparisons[selectedComparison].clause2025.text}</p>
              <div className="bg-blue-100 p-3 rounded">
                <p className="text-sm text-blue-700">
                  <strong>Impact:</strong> {comparisons[selectedComparison].clause2025.impact}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg">Analysis</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                getVerdictColor(comparisons[selectedComparison].verdict)
              }`}>
                {getVerdictLabel(comparisons[selectedComparison].verdict)}
              </span>
            </div>
            <p className="text-gray-700">
              {comparisons[selectedComparison].comparisonNotes}
            </p>
          </div>

          <div className="mt-6">
            <Link 
              href="/calculator"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
            >
              Calculate Your Impact →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}