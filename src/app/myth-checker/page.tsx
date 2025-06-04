'use client'

import { useState } from 'react'
import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

export default function MythChecker() {
  const [selectedMyth, setSelectedMyth] = useState<number | null>(null)

  const myths = [
    {
      id: 1,
      statement: "VAT will increase from 16% to 18%",
      verdict: "false" as const,
      explanation: "This is false. The Bill does not amend section 5 of the VAT Act, so the standard VAT rate stays at 16%. The claim may have come from reports that Kenya might harmonize its VAT with other East African countries at 18%.",
      sources: ["Finance Bill 2025 Analysis", "KPMG Finance Bill Analysis 2025"],
      relatedCalculator: "vat-calculator"
    },
    {
      id: 2,
      statement: "10% tax on land owners as Land rate and Idle land tax",
      verdict: "false" as const,
      explanation: "This was proposed in the Land Laws (Amendment) Bill Number Two of 2023 and withdrawn in June 2024. It is not part of the Finance Bill 2025.",
      sources: ["Land Laws Amendment Bill 2023", "Finance Bill 2025"],
      relatedCalculator: "property-tax"
    },
    {
      id: 3,
      statement: "5% Agricultural tax on tea, coffee and Avocado sales by farmers",
      verdict: "false" as const,
      explanation: "This is proposed in the Medium-Term Revenue Strategy (MTRS) which was to introduce withholding tax on agricultural produce at not more than 5%, but it's not in the Finance Bill 2025.",
      sources: ["Medium-Term Revenue Strategy", "Finance Bill 2025"],
      relatedCalculator: "agricultural-tax"
    },
    {
      id: 4,
      statement: "PAYE increase from 35% to 37.7% and Tax for least earning Kenyans will increase from 10% to 25%",
      verdict: "false" as const,
      explanation: "The World Bank Report proposed raising the top marginal personal income tax rate from 35% to 38% for individuals earning more than KES 9.6 million annually, but this is not in the Finance Bill 2025.",
      sources: ["World Bank Kenya Economic Update May 2025", "Finance Bill 2025"],
      relatedCalculator: "paye-calculator"
    },
    {
      id: 5,
      statement: "15% Internet access levy",
      verdict: "false" as const,
      explanation: "There is no new 15% levy on internet access services. Existing digital taxes remain at 1.5% (digital asset tax). The Tax Laws Amendment Act 2024 introduced Significant Economic Presence Tax (6%) to replace Digital Service Tax (1.5%).",
      sources: ["Tax Laws Amendment Act 2024", "Finance Bill 2025"],
      relatedCalculator: "digital-tax"
    },
    {
      id: 6,
      statement: "Green Levy taxes on plastics and sugar",
      verdict: "false" as const,
      explanation: "There is no 'green levy' on plastics or sugar in the Finance Bill. However, the Sugar Development Levy Order 2025 proposes a 4% levy on domestic and imported sugar.",
      sources: ["Sugar Development Levy Order 2025", "Finance Bill 2025"],
      relatedCalculator: "excise-calculator"
    },
    {
      id: 7,
      statement: "Zero-rated goods to become tax-exempt making them more expensive",
      verdict: "partial" as const,
      explanation: "This is partly true. Some goods such as pharmaceutical products, locally assembled phones, electric bicycles, and animal feeds have been moved from zero-rated to exempt. However, basic foodstuffs like bread, milk and flour remain zero-rated.",
      sources: ["Finance Bill 2025, VAT Schedule", "KPMG Analysis 2025"],
      relatedCalculator: "vat-calculator"
    },
    {
      id: 8,
      statement: "KRA will access all business trade secrets and personal data",
      verdict: "true" as const,
      explanation: "This is true. Section 59A of the Tax Procedures Act is amended to empower KRA to access trade secrets and personal data for integration into the electronic tax management system, including integration with third-party data from telecoms and banks.",
      sources: ["Finance Bill 2025, Section 59A", "Tax Procedures Act"],
      relatedCalculator: "compliance-calculator"
    },
    {
      id: 9,
      statement: "Per diem benefits will increase from KES 2,000 to KES 10,000",
      verdict: "true" as const,
      explanation: "This is true. The Bill proposes to increase the threshold for per diem from KES 2,000 per day to KES 10,000 per day, benefiting employees who travel for work.",
      sources: ["Finance Bill 2025, Clause 3", "KPMG Analysis 2025"],
      relatedCalculator: "employment-benefits"
    }
  ]

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'true': return 'text-green-600'
      case 'false': return 'text-red-600'
      case 'partial': return 'text-orange-600'
      case 'misleading': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getVerdictLabel = (verdict: string) => {
    switch (verdict) {
      case 'true': return '✅ TRUE'
      case 'false': return '❌ FALSE'
      case 'partial': return '⚠️ PARTIALLY TRUE'
      case 'misleading': return '🔄 MISLEADING'
      default: return verdict
    }
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
                <SearchIcon sx={{ fontSize: 60, color: 'var(--kenya-red)' }} />
                Myth vs Truth
              </h1>
              <div className="absolute -top-2 -right-8 text-3xl">
                <CheckCircleIcon sx={{ fontSize: 40, color: '#10b981' }} />
              </div>
              <div className="absolute -bottom-1 -left-6 text-2xl">
                <CancelIcon sx={{ fontSize: 32, color: '#ef4444' }} />
              </div>
            </div>
            <p className="text-2xl kenya-text-primary max-w-3xl mx-auto">
              Click on any statement to see the <span className="kenya-text-accent font-semibold">verified facts</span> 
              from official sources
            </p>
            <div className="mt-6 inline-block px-6 py-2 status-costly text-white rounded-full text-sm font-medium">
              🚫 Debunking Finance Bill 2025 Misinformation
            </div>
          </header>

          <div className="grid gap-8 max-w-5xl mx-auto">
            {myths.map((myth, index) => (
              <div
                key={myth.id}
                className={`kenya-card kenya-shadow-lg p-8 cursor-pointer transition-all relative overflow-hidden ${
                  selectedMyth === index ? 'kenya-shadow-lg scale-105' : ''
                }`}
                onClick={() => setSelectedMyth(selectedMyth === index ? null : index)}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold kenya-text-primary pr-6 leading-relaxed">{myth.statement}</h3>
                  <div className="flex-shrink-0">
                    <span className={`font-bold text-lg px-4 py-2 rounded-full ${getVerdictColor(myth.verdict)}`}>
                      {getVerdictLabel(myth.verdict)}
                    </span>
                  </div>
                </div>
                
                {selectedMyth === index && (
                  <div className="mt-8 pt-6 border-t-2 border-gray-100 security-lines">
                    <div className="mb-8">
                      <h4 className="text-xl font-bold kenya-text-primary mb-4 flex items-center">
                        <span className="text-2xl mr-3">📋</span>
                        Explanation:
                      </h4>
                      <p className="text-gray-700 text-lg leading-relaxed">{myth.explanation}</p>
                    </div>
                    
                    <div className="mb-8">
                      <h4 className="text-xl font-bold kenya-text-primary mb-4 flex items-center">
                        <span className="text-2xl mr-3">📚</span>
                        Sources:
                      </h4>
                      <ul className="space-y-3">
                        {myth.sources.map((source, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <span className="text-green-500 text-lg">✓</span>
                            <span className="text-gray-700 font-medium">{source}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {myth.relatedCalculator && (
                      <div className="pt-6 border-t border-gray-100">
                        <Link 
                          href={`/calculator?type=${myth.relatedCalculator}`}
                          className="kenya-button px-8 py-4 rounded-full no-underline text-lg font-medium inline-flex items-center space-x-2"
                        >
                          <span>🧮</span>
                          <span>Try Related Calculator</span>
                          <span>→</span>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="absolute bottom-4 right-4 text-gray-300">
                  <span className="text-2xl">
                    {selectedMyth === index ? '👆' : '👇'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}