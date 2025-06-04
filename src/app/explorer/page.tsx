'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Explorer() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState<'all' | '2024' | '2025'>('all')
  const [selectedImpact, setSelectedImpact] = useState<'all' | 'beneficial' | 'neutral' | 'costly'>('all')

  const clauses = [
    {
      id: 1,
      title: "Housing Tax Relief Expansion",
      sectionNumber: "Clause 8(b)(i)",
      year: 2025,
      summary: "Expands mortgage interest relief to include self-built homes and increases limit from KES 300,000 to KES 360,000 annually",
      impactLevel: 'beneficial' as const,
      tags: ['housing', 'tax relief', 'homeowners', 'construction', 'mortgage']
    },
    {
      id: 2,
      title: "Per Diem Benefits Increase",
      sectionNumber: "Clause 3",
      year: 2025,
      summary: "Increases tax-free per diem limit from KES 2,000 to KES 10,000 per day for employees working out of town",
      impactLevel: 'beneficial' as const,
      tags: ['per diem', 'employees', 'travel allowance', 'employment benefits']
    },
    {
      id: 3,
      title: "Digital Asset Tax Reduction",
      sectionNumber: "Clause 28(d)",
      year: 2025,
      summary: "Reduces digital asset tax from 3% to 1.5% of transfer value to encourage use of regulated platforms",
      impactLevel: 'beneficial' as const,
      tags: ['digital assets', 'cryptocurrency', 'fintech', 'technology']
    },
    {
      id: 4,
      title: "Significant Economic Presence Tax Expansion",
      sectionNumber: "Clause 6",
      year: 2025,
      summary: "Expands SEP tax to all internet and electronic networks, removes KES 5 million threshold for non-residents",
      impactLevel: 'neutral' as const,
      tags: ['digital services', 'foreign companies', 'internet', 'tax base expansion']
    },
    {
      id: 5,
      title: "Carry Forward of Tax Losses Cap",
      sectionNumber: "Clause 8(c)",
      year: 2025,
      summary: "Limits carry forward of business tax losses to 5 years instead of indefinitely",
      impactLevel: 'costly' as const,
      tags: ['business losses', 'corporate tax', 'long-term investments', 'startups']
    },
    {
      id: 6,
      title: "VAT Changes on Electric Items",
      sectionNumber: "Clause 37",
      year: 2025,
      summary: "Moves electric bicycles, solar batteries, and mobile phones from zero-rated to exempt status",
      impactLevel: 'costly' as const,
      tags: ['VAT', 'electric vehicles', 'solar energy', 'mobile phones', 'clean technology']
    },
    {
      id: 7,
      title: "KRA Data Access Powers",
      sectionNumber: "Clause 52",
      year: 2025,
      summary: "Empowers KRA to access trade secrets and personal data for electronic tax system integration",
      impactLevel: 'costly' as const,
      tags: ['data privacy', 'trade secrets', 'tax compliance', 'business confidentiality']
    },
    {
      id: 8,
      title: "Excise Duty on Imported Plastics",
      sectionNumber: "Clause 42",
      year: 2025,
      summary: "Increases excise duty on imported plastic products to 25% or KES 200 per kg, whichever is higher",
      impactLevel: 'costly' as const,
      tags: ['excise duty', 'plastics', 'imports', 'manufacturing', 'packaging']
    },
    {
      id: 9,
      title: "Penalty Waiver for System Errors",
      sectionNumber: "Clause 56",
      year: 2025,
      summary: "Allows Cabinet Secretary to waive penalties caused by electronic tax system errors or malfunctions",
      impactLevel: 'beneficial' as const,
      tags: ['penalties', 'system errors', 'taxpayer relief', 'electronic systems']
    },
    {
      id: 10,
      title: "Removal of Investment Incentives",
      sectionNumber: "Clause 27",
      year: 2025,
      summary: "Removes 150% investment deduction for businesses located outside Nairobi and Mombasa",
      impactLevel: 'costly' as const,
      tags: ['investment incentives', 'regional development', 'capital allowances', 'decentralization']
    },
    {
      id: 11,
      title: "NIFCA Tax Incentives",
      sectionNumber: "Clause 28(b)(iv)",
      year: 2025,
      summary: "Introduces reduced corporate tax rates for companies certified by Nairobi International Financial Centre",
      impactLevel: 'beneficial' as const,
      tags: ['NIFCA', 'financial services', 'corporate tax', 'foreign investment', 'headquarters']
    },
    {
      id: 12,
      title: "Advance Pricing Agreements",
      sectionNumber: "Clause 12",
      year: 2025,
      summary: "Introduces Advance Pricing Agreements for multinational companies to reduce transfer pricing disputes",
      impactLevel: 'beneficial' as const,
      tags: ['transfer pricing', 'multinational companies', 'tax certainty', 'advance agreements']
    }
  ]

  const filteredClauses = clauses.filter(clause => {
    const matchesSearch = clause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clause.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clause.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesYear = selectedYear === 'all' || clause.year.toString() === selectedYear
    const matchesImpact = selectedImpact === 'all' || clause.impactLevel === selectedImpact

    return matchesSearch && matchesYear && matchesImpact
  })

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'beneficial': return 'bg-green-100 text-green-800'
      case 'neutral': return 'bg-gray-100 text-gray-800'
      case 'costly': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
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
            Finance Bill Explorer
          </h1>
          <p className="text-xl text-gray-600">
            Search and explore all clauses in the Finance Bill
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search clauses
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, content, or tags..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Impact
              </label>
              <select
                value={selectedImpact}
                onChange={(e) => setSelectedImpact(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Impacts</option>
                <option value="beneficial">Beneficial</option>
                <option value="neutral">Neutral</option>
                <option value="costly">Costly</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredClauses.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No clauses found matching your search criteria
            </div>
          ) : (
            filteredClauses.map(clause => (
              <div key={clause.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {clause.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {clause.sectionNumber} • {clause.year}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(clause.impactLevel)}`}>
                    {clause.impactLevel}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{clause.summary}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {clause.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Link 
                    href="/clause-comparison"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Compare versions →
                  </Link>
                  <Link 
                    href="/myth-checker"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Related myths →
                  </Link>
                  <Link 
                    href="/calculator"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Calculate impact →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}