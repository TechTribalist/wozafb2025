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
    },
    {
      id: 7,
      title: "PAYE Calculation Method",
      sectionNumber: "Clause 4",
      clause2024: {
        text: "Tax reliefs (personal, insurance) are subtracted after applying progressive tax rates",
        impact: "Tax calculated first, then reliefs deducted from final amount"
      },
      clause2025: {
        text: "All allowable deductions and reliefs subtracted before applying progressive tax rates",
        impact: "Lower taxable income base but potential for higher effective tax for some"
      },
      verdict: "mixed" as const,
      comparisonNotes: "Structural change affects how PAYE is calculated - benefits some taxpayers while increasing burden for others"
    },
    {
      id: 8,
      title: "VAT Registration Threshold",
      sectionNumber: "Clause 22",
      clause2024: {
        text: "Mandatory VAT registration for businesses with annual turnover of KES 5 million or more",
        impact: "More businesses required to register and collect VAT"
      },
      clause2025: {
        text: "VAT registration threshold increased to KES 8 million annual turnover",
        impact: "Relief for small/medium businesses; fewer required to register for VAT"
      },
      verdict: "better" as const,
      comparisonNotes: "60% increase in threshold provides significant relief for SMEs, reducing compliance burden"
    },
    {
      id: 9,
      title: "Corporate Tax - NIFC Incentives",
      sectionNumber: "Clause 12",
      clause2024: {
        text: "Standard 30% corporate tax rate for all companies",
        impact: "Uniform tax rate regardless of company type or sector"
      },
      clause2025: {
        text: "Preferential 15% tax rate for NIFC-certified startups and qualifying entities",
        impact: "Significant tax advantage for companies in financial services sector"
      },
      verdict: "better" as const,
      comparisonNotes: "50% tax reduction for NIFC entities promotes Kenya as regional financial hub"
    },
    {
      id: 10,
      title: "Fringe Benefits Tax",
      sectionNumber: "Clause 15",
      clause2024: {
        text: "Fringe benefits taxed at 20% rate",
        impact: "Lower tax burden on employee benefits provided by employers"
      },
      clause2025: {
        text: "Fringe benefits taxed at corporate tax rate (30%)",
        impact: "Higher cost for employers providing benefits to employees"
      },
      verdict: "worse" as const,
      comparisonNotes: "50% increase in fringe benefits tax rate increases employment costs for businesses"
    },
    {
      id: 11,
      title: "Digital Services Excise Duty",
      sectionNumber: "Clause 29",
      clause2024: {
        text: "No specific excise duty on digital services",
        impact: "Digital services not subject to additional excise taxation"
      },
      clause2025: {
        text: "20% excise duty introduced on digital services provided by non-residents",
        impact: "Additional tax burden on international digital service providers"
      },
      verdict: "neutral" as const,
      comparisonNotes: "New tax stream captures revenue from digital economy but may increase costs for consumers"
    },
    {
      id: 12,
      title: "Capital Gains Tax - Investment Deductions",
      sectionNumber: "Clause 18",
      clause2024: {
        text: "Investment deductions available for projects outside Nairobi/Mombasa and in Special Economic Zones",
        impact: "Tax incentives encourage investment in less developed regions"
      },
      clause2025: {
        text: "All investment deductions for regional development removed",
        impact: "Increased CGT burden, reduced incentives for regional investment"
      },
      verdict: "worse" as const,
      comparisonNotes: "Removal of regional investment incentives may discourage development outside major cities"
    },
    {
      id: 13,
      title: "eTIMS VAT Compliance",
      sectionNumber: "Clause 24",
      clause2024: {
        text: "Standard VAT input/output offset regardless of invoicing system",
        impact: "All VAT-registered businesses can claim full input VAT"
      },
      clause2025: {
        text: "Non-compliant eTIMS users face reduced input VAT claims (20% penalty)",
        impact: "Compliance factor affects VAT calculations and cash flow"
      },
      verdict: "neutral" as const,
      comparisonNotes: "Encourages digital compliance but penalizes businesses not using electronic invoicing"
    },
    {
      id: 14,
      title: "Timber Sales Deductions",
      sectionNumber: "Clause 19",
      clause2024: {
        text: "Special deductions available for timber sales and forestry activities",
        impact: "Reduced tax burden on forestry sector to encourage sustainable practices"
      },
      clause2025: {
        text: "Timber-related tax deductions removed, full income tax rates apply",
        impact: "Higher tax burden on forestry sector and timber trade"
      },
      verdict: "worse" as const,
      comparisonNotes: "100% increase in effective tax rate on timber sales may discourage legal forestry activities"
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