'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function MythCheckerContent() {
  const [selectedMyth, setSelectedMyth] = useState<number | null>(null)
  const searchParams = useSearchParams()

  const myths = [
    {
      id: 1,
      statement: "VAT will increase from 16% to 18%",
      verdict: "false" as const,
      explanation: "This is false. The Bill does not amend section 5 of the VAT Act, so the standard VAT rate remains at 16%. The claim may have come from reports that Kenya might harmonize its VAT with other East African countries at 18%.",
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
      statement: "KRA will use advanced data analytics to catch tax evaders and ensure fair compliance",
      verdict: "true" as const,
      explanation: "This is true. Section 59A of the Tax Procedures Act is amended to empower KRA to access trade secrets and personal data for integration into the electronic tax management system, including integration with third-party data from telecoms and banks. KRA's strategy leverages broad, real-time, cross-sectoral data integration and advanced analytics to detect and deter tax evasion by matching actual financial activity with declared tax obligations. This modern approach increases compliance, protects honest taxpayers, and ensures everyone contributes their fair share to national development.",
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
    },
    {
      id: 10,
      statement: "Neonatal Tax will be introduced on newborn babies",
      verdict: "false" as const,
      explanation: "This is completely false with no basis in the Finance Bill 2025. No such tax exists anywhere in the bill. This appears to be fabricated misinformation designed to cause alarm among expectant parents.",
      sources: ["Complete Finance Bill 2025 Review", "Official Government Statement"],
      relatedCalculator: "myth-debunker"
    },
    {
      id: 11,
      statement: "Diaspora Remittance Tax will be imposed on money sent from abroad",
      verdict: "false" as const,
      explanation: "This is entirely false. There is no provision in Finance Bill 2025 for taxing diaspora remittances. The government actively encourages remittances as they boost foreign exchange reserves and support families.",
      sources: ["Finance Bill 2025 Analysis", "Central Bank of Kenya Policy"],
      relatedCalculator: "remittance-calculator"
    },
    {
      id: 12,
      statement: "1% levy will be charged on all PayBill and Till Number transactions",
      verdict: "false" as const,
      explanation: "This is false. While there are existing taxes on digital financial services, Finance Bill 2025 does not introduce a blanket 1% levy on all PayBill and Till transactions. The existing structure remains unchanged.",
      sources: ["Finance Bill 2025", "Digital Financial Services Regulations"],
      relatedCalculator: "digital-transactions"
    }
  ]

  // Auto-load myth based on URL parameters
  useEffect(() => {
    const mythParam = searchParams.get('myth')
    if (mythParam) {
      const mythIndex = myths.findIndex(myth => myth.id.toString() === mythParam)
      if (mythIndex !== -1) {
        setSelectedMyth(mythIndex)
      }
    }
  }, [searchParams, myths])

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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
          
          <header className="mb-16 text-center">
            <div className="relative">
              <h1 className="text-5xl font-bold kenya-text-accent mb-6 flex items-center justify-center gap-4">
                <svg className="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                Myth vs Truth
              </h1>
              <div className="absolute -top-2 -right-8 text-3xl">
                <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="absolute -bottom-1 -left-6 text-2xl">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                </svg>
              </div>
            </div>
            <p className="text-2xl kenya-text-primary max-w-3xl mx-auto">
              Many myths claim <span className="kenya-text-accent font-semibold">massive tax rate increases</span>. 
              The reality: Finance Bill 2025 focuses on <span className="kenya-text-accent font-semibold">expanding who pays</span>, not how much
            </p>
            <div className="mt-6 inline-block px-6 py-2 status-costly text-white rounded-full text-sm font-medium">
              📊 Base Expansion Strategy vs. 12 Rate Increase Myths
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
  )
}

export default function MythChecker() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MythCheckerContent />
    </Suspense>
  )
}