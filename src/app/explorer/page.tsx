'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface FinanceBillClause {
  id: number
  part?: string
  section: string
  title: string
  clauseNumber?: string
  sectionNumber?: string
  year: number
  category: 'Income Tax' | 'VAT' | 'Excise Duty' | 'Tax Procedures' | 'Stamp Duty' | 'Miscellaneous'
  summary: string
  fullText?: string
  actualText?: string
  impactLevel: 'beneficial' | 'neutral' | 'costly'
  tags: string[]
  keyProvisions: string[]
  comparisonSlug?: string
  relatedMyths?: number[]
}

export default function Explorer() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImpact, setSelectedImpact] = useState<string>('all')
  const [expandedClause, setExpandedClause] = useState<number | null>(null)

  const financeBillClauses: FinanceBillClause[] = [
    {
      id: 1,
      part: "Part I",
      section: "Section 1",
      title: "Short Title and Commencement",
      clauseNumber: "Clause 1",
      year: 2025,
      category: 'Miscellaneous',
      summary: "Establishes the Finance Act 2025 and sets commencement dates for different sections",
      fullText: "This Act may be cited as the Finance Act, 2025 and shall come into operation as follows— (a) sections 12 and 56, on the 1st of January, 2026; and (b) all other sections, on 1st July, 2025.",
      impactLevel: 'neutral',
      tags: ['commencement', 'effective dates', 'implementation', 'legislation'],
      keyProvisions: [
        "Most sections effective 1st July 2025",
        "Sections 12 and 56 effective 1st January 2026",
        "Official title: Finance Act, 2025"
      ]
    },
    {
      id: 2,
      part: "Part II",
      section: "Section 2",
      title: "Income Tax Act Definitions Amendment",
      clauseNumber: "Clause 2",
      year: 2025,
      category: 'Income Tax',
      summary: "Amends key definitions in the Income Tax Act including debenture, individual retirement fund, royalty, and related person",
      fullText: "Section 2 of the Income Tax Act is amended— (a) in subsection (1)— (i) in the definition of \"debenture\", by deleting the expression \"and, for the purposes of paragraphs (d) and (e) of section 7(1) of this Act, includes any loan or loan stock, whether secured or unsecured\"; (ii) in the definition of \"individual retirement fund\", by deleting the words \"subject to the Income Tax (Retirement Benefit) Rules\"; (iii) in paragraph (b) of the definition of \"royalty\", by inserting the words \"and includes the distribution of software where regular payments are made for the use of the software through the distributor\" immediately after the words \"support fees\"; (iv) by deleting the definition of \"compensating tax\"; (v) by deleting the definition of \"Tribunal\"; (vi) by deleting the definition of \"venture company\"; (vii) by deleting the definition of \"related person\" and substituting therefor the following new definition— \"related person\" means, in the case of two persons, either of the persons who participates directly or indirectly in the management, control or capital of the business of the other person, and in the case of more than the two persons— (a) any other person who participates directly or indirectly in the management, control or capital of the business of the two persons; or (b) an individual who— (i) participates directly or indirectly in the management, control or capital of the business of the two persons; (ii) is associated with the two persons by marriage, consanguinity or affinity; and (iii) the two persons participate in the management, control or capital of the business of the individual; (b) by deleting subsection (2).",
      impactLevel: 'neutral',
      tags: ['definitions', 'debenture', 'retirement fund', 'royalty', 'software distribution', 'related person'],
      keyProvisions: [
        "Expands royalty definition to include software distribution",
        "Removes compensating tax definition",
        "Clarifies related person definition for family relationships",
        "Removes various obsolete definitions"
      ]
    },
    {
      id: 3,
      part: "Part II",
      section: "Section 5",
      title: "Per Diem Benefits Increase",
      clauseNumber: "Clause 3",
      year: 2025,
      category: 'Income Tax',
      summary: "Increases tax-free per diem limit from KES 2,000 to KES 10,000 per day for employees working away from usual workplace",
      fullText: "Section 5 of the Income Tax Act is amended in item (iii) of the proviso to subsection (2)(a), by deleting the words \"two thousand shillings\" and substituting therefor the words \"ten thousand shillings\".",
      impactLevel: 'beneficial',
      tags: ['per diem', 'employees', 'travel allowance', 'employment benefits', 'subsistence'],
      keyProvisions: [
        "Per diem increased from KES 2,000 to KES 10,000 per day",
        "Applies to official duties away from usual workplace",
        "Tax-free reimbursement for subsistence expenses"
      ],
      comparisonSlug: "per-diem-benefits",
      relatedMyths: [9]
    },
    {
      id: 4,
      part: "Part II",
      section: "Section 8",
      title: "Employment Income Gender Neutral Language",
      clauseNumber: "Clause 4",
      year: 2025,
      category: 'Income Tax',
      summary: "Updates Income Tax Act language to be gender neutral and removes obsolete subsections",
      fullText: "Section 8 of the Income Tax Act is amended— (a) in subsection (1), by deleting the word \"husband\" and substituting therefor the word \"spouse\"; (b) by deleting subsection (4); (c) by deleting subsection (5); (d) by deleting subsection (6); (e) by deleting subsection (7); (f) by deleting subsection (9); (g) by deleting subsection (9A).",
      impactLevel: 'neutral',
      tags: ['gender neutral', 'spouse', 'employment income', 'modernization'],
      keyProvisions: [
        "Replaces \"husband\" with \"spouse\"",
        "Removes multiple obsolete subsections",
        "Modernizes legislative language"
      ]
    },
    {
      id: 5,
      part: "Part II",
      section: "Section 10",
      title: "Withholding Tax Expansion",
      clauseNumber: "Clause 5",
      year: 2025,
      category: 'Income Tax',
      summary: "Expands withholding tax to include supply of goods to public entities and sale of scrap",
      fullText: "Section 10 of the Income Tax Act is amended in subsection (1), by inserting the following new paragraphs immediately after paragraph (k)— (l) supply of goods to a public entity; (m) sale of scrap.",
      impactLevel: 'costly',
      tags: ['withholding tax', 'public entity', 'scrap sales', 'tax base expansion'],
      keyProvisions: [
        "New withholding tax on goods supplied to public entities",
        "Withholding tax on scrap sales",
        "Expands government revenue collection"
      ]
    },
    {
      id: 6,
      part: "Part II",
      section: "Section 12E",
      title: "Significant Economic Presence Tax Expansion",
      clauseNumber: "Clause 6",
      year: 2025,
      category: 'Income Tax',
      summary: "Expands SEP tax to all internet and electronic networks, removes KES 5 million threshold",
      fullText: "Section 12E of the Income Tax Act is amended— (a) in subsection (1), by inserting the words \"the internet or an electronic network including through\" immediately after the words \"carried out over\"; (b) in subsection (3), by deleting paragraph (d).",
      impactLevel: 'neutral',
      tags: ['digital services', 'foreign companies', 'internet', 'tax base expansion', 'SEPT'],
      keyProvisions: [
        "Covers all internet and electronic networks",
        "No minimum threshold for non-residents",
        "6% tax on deemed 10% profit margin"
      ],
      comparisonSlug: "sep-tax",
      relatedMyths: [5]
    },
    {
      id: 7,
      part: "Part II",
      section: "Section 12G",
      title: "Minimum Top-up Tax Payment Date",
      clauseNumber: "Clause 7",
      year: 2025,
      category: 'Income Tax',
      summary: "Sets payment deadline for minimum top-up tax to fourth month after year end",
      fullText: "Section 12G of the Income Tax Act is amended by inserting the following new subsection immediately after section (3)— (3A) Minimum top-up tax shall be payable by the end of the fourth month after the end of the year of income.",
      impactLevel: 'neutral',
      tags: ['minimum top-up tax', 'payment deadline', 'multinational enterprises'],
      keyProvisions: [
        "Payment due by fourth month after year end",
        "Applies to multinational enterprises",
        "Implements OECD Pillar Two requirements"
      ]
    },
    {
      id: 8,
      part: "Part II",
      section: "Section 15",
      title: "Housing Tax Relief and Business Deductions",
      clauseNumber: "Clause 8",
      year: 2025,
      category: 'Income Tax',
      summary: "Expands mortgage interest relief to include self-built homes, limits business loss carryforward to 5 years, and removes various deductions",
      fullText: "Section 15 of the Income Tax Act is amended— (a) in subsection (2)— (i) by deleting paragraph (g) and substituting therefor the following new paragraph— (g) the amount considered as representing the diminution in value of any implement, utensil or similar article, employed in the production of gains or profits, not being machinery or plant in respect of which a deduction may be made under the Second Schedule, at a rate of one hundred per cent in that year of income; (ii) by deleting paragraph (i); (iii) by deleting paragraph (j); (iv) by deleting paragraph (r); (v) in paragraph (w), by inserting the words \"expenditure incurred in the construction of a public sports facility\" immediately after the word \"Act\"; (vi) by deleting paragraph (z); (b) in subsection (3)— (i) in paragraph (b), by inserting the words \"construction of\" immediately after the words \"applied to the\"; (ii) by deleting paragraph (f); (c) in subsection (4), by inserting the word \"five\" immediately after the word \"succeeding\"; (d) by deleting subsection (5) that reads— (5) Notwithstanding subsection (4), the Cabinet Secretary may, on the recommendation of the Commissioner, extend the period of deduction beyond ten years where a person applies through the Commissioner for such extension, giving evidence of inability to extinguish the deficit within that period. (e) in subsection (7)(a), by deleting the word \"seven\".",
      impactLevel: 'beneficial',
      tags: ['housing', 'tax relief', 'homeowners', 'construction', 'mortgage', 'self-built', 'business losses', 'loss limitation'],
      keyProvisions: [
        "Self-built homes now qualify for relief",
        "Construction costs deductible",
        "Business loss carryforward limited to 5 years",
        "Removes various obsolete deductions",
        "Sports facility construction deductions expanded"
      ],
      comparisonSlug: "housing-tax-relief",
      relatedMyths: [1]
    },
    {
      id: 9,
      part: "Part II",
      section: "Section 16",
      title: "Deductions Not Allowed - eTIMS Requirements",
      clauseNumber: "Clause 9",
      year: 2025,
      category: 'Income Tax',
      summary: "Removes compensating tax references and clarifies electronic invoice requirements for deductions",
      fullText: "Section 16 of the Income Tax Act is amended— (a) in subsection (2)(c), by deleting the words \"including compensating tax\"; (b) by deleting subsection (4).",
      impactLevel: 'neutral',
      tags: ['deductions', 'compensating tax', 'electronic invoices', 'eTIMS'],
      keyProvisions: [
        "Removes compensating tax references",
        "Clarifies electronic invoice requirements",
        "Streamlines deduction rules"
      ]
    },
    {
      id: 10,
      part: "Part II",
      section: "Section 18",
      title: "Transfer Pricing Simplification",
      clauseNumber: "Clause 10",
      year: 2025,
      category: 'Income Tax',
      summary: "Removes complex transfer pricing subsection to simplify regulations",
      fullText: "Section 18 of the Income Tax Act is amended by deleting subsection (6).",
      impactLevel: 'beneficial',
      tags: ['transfer pricing', 'simplification', 'multinational companies'],
      keyProvisions: [
        "Removes complex transfer pricing rules",
        "Simplifies compliance for businesses",
        "Streamlines international transactions"
      ]
    },
    {
      id: 11,
      part: "Part II",
      section: "Section 18D",
      title: "Country-by-Country Reporting Updates",
      clauseNumber: "Clause 11",
      year: 2025,
      category: 'Income Tax',
      summary: "Updates country-by-country reporting requirements for multinational enterprises",
      fullText: "Section 18D of the Income Tax Act is amended— (a) in subsection (8), by deleting the words \"as a surrogate parent entity\" and substituting therefor the words \"to file a country-by-country report and notify the Commissioner by the last day of the reporting financial year of that group in such form as the Commissioner may specify\"; (b) by deleting subsection (9).",
      impactLevel: 'neutral',
      tags: ['country-by-country reporting', 'multinational enterprises', 'BEPS', 'transparency'],
      keyProvisions: [
        "Clarifies reporting obligations",
        "Updates notification requirements",
        "Aligns with international standards"
      ]
    },
    {
      id: 12,
      part: "Part II",
      section: "Section 18G",
      title: "Advance Pricing Agreements",
      clauseNumber: "Clause 12",
      year: 2025,
      category: 'Income Tax',
      summary: "Introduces Advance Pricing Agreements for multinational companies on transfer pricing",
      fullText: "The Income Tax Act is amended by inserting the following new section immediately after section 18F— Advance pricing agreement. 18G. (1) The Commissioner may enter into an advance pricing agreement with a person who undertakes a transaction contemplated under section 18(3) or section 18A. (2) The amount which would have been expected to accrue if that business had been conducted by an independent person dealing at arm's length contemplated under section 18(3) or section 18A, shall be determined in accordance with the advance pricing agreement entered into under subsection (1). (3) The advance pricing agreement entered into under subsection (1) shall be valid for a period not exceeding five consecutive years. (4) Where the Commissioner determines that the person referred to in subsection (1) entered into the advance pricing agreement through misrepresentation of facts, the Commissioner shall declare the agreement void and issue a notice of the declaration in writing, to the person. (5) The Cabinet Secretary may make regulations for the better implementation of this section.",
      impactLevel: 'beneficial',
      tags: ['transfer pricing', 'multinational companies', 'tax certainty', 'advance agreements', 'compliance'],
      keyProvisions: [
        "5-year validity period",
        "Reduces transfer pricing disputes",
        "Provides tax certainty",
        "Can be voided for misrepresentation"
      ],
      comparisonSlug: "advance-pricing",
      relatedMyths: []
    },
    {
      id: 13,
      section: "Third Schedule",
      title: "Digital Asset Tax Reduction",
      sectionNumber: "Clause 28(d)",
      year: 2025,
      category: 'Income Tax',
      summary: "Reduces digital asset tax from 3% to 1.5% of transfer value",
      actualText: "In paragraph 13, by deleting the words \"three per cent\" and substituting therefor the words \"one point five per cent\".",
      impactLevel: 'beneficial',
      tags: ['digital assets', 'cryptocurrency', 'fintech', 'technology', 'blockchain'],
      keyProvisions: [
        "Rate reduced from 3% to 1.5%",
        "Applies to digital asset transfers",
        "Encourages regulated platform usage"
      ],
      comparisonSlug: "digital-asset-tax",
      relatedMyths: [5]
    },
    {
      id: 14,
      section: "Section 15",
      title: "Business Loss Carryforward Limitation",
      sectionNumber: "Clause 8(c)",
      year: 2025,
      category: 'Income Tax',
      summary: "Limits carry forward of business tax losses to 5 years instead of indefinitely",
      actualText: "In subsection (4), by inserting the word \"five\" immediately after the word \"succeeding\".",
      impactLevel: 'costly',
      tags: ['business losses', 'corporate tax', 'long-term investments', 'startups', 'loss limitation'],
      keyProvisions: [
        "Loss carryforward capped at 5 years",
        "Previously unlimited carryforward",
        "Affects long-term investment projects"
      ],
      comparisonSlug: "carry-forward-losses",
      relatedMyths: []
    },
    {
      id: 15,
      section: "Section 59A",
      title: "KRA Data Access Enhancement",
      sectionNumber: "Clause 52",
      year: 2025,
      category: 'Tax Procedures',
      summary: "Enhances KRA's data access powers for tax compliance while protecting sensitive information",
      actualText: "Section 59A of the Tax Procedures Act is amended by deleting subsection (1B).",
      impactLevel: 'neutral',
      tags: ['data access', 'tax compliance', 'digital integration', 'analytics', 'evasion detection'],
      keyProvisions: [
        "Real-time cross-sectoral data integration",
        "Advanced analytics for evasion detection",
        "Protects honest taxpayers from unfair burden"
      ],
      comparisonSlug: "kra-data-access",
      relatedMyths: [8]
    },
    {
      id: 16,
      section: "First Schedule VAT",
      title: "VAT Changes on Clean Technology",
      sectionNumber: "Clause 36",
      year: 2025,
      category: 'VAT',
      summary: "Moves electric bicycles, mobile phones, and clean energy products from zero-rated to exempt",
      actualText: "The supply of locally assembled and manufactured mobile phones, motorcycles, electric bicycles, solar and lithium ion batteries, electric buses, and bioethanol vapor stoves.",
      impactLevel: 'costly',
      tags: ['VAT', 'electric vehicles', 'solar energy', 'mobile phones', 'clean technology', 'exemption'],
      keyProvisions: [
        "Electric bicycles moved to exempt status",
        "Solar batteries exemption changes",
        "Mobile phones VAT structure modified"
      ],
      comparisonSlug: "vat-electric-items",
      relatedMyths: [7]
    },
    {
      id: 17,
      section: "First Schedule Excise",
      title: "Excise Duty on Imported Plastics",
      sectionNumber: "Clause 42",
      year: 2025,
      category: 'Excise Duty',
      summary: "Introduces structured excise duties on imported plastic products at 25% or KES 200 per kg",
      actualText: "Imported other self-adhesive plates, sheets, film, foil, tape, strip and other flat shapes, of plastics - 25% of excisable value or Kshs. 200 per Kilogramme, whichever is higher.",
      impactLevel: 'costly',
      tags: ['excise duty', 'plastics', 'imports', 'manufacturing', 'packaging', 'environment'],
      keyProvisions: [
        "25% or KES 200 per kg duty rate",
        "Covers various plastic products",
        "Excludes EAC origin products"
      ],
      comparisonSlug: "excise-plastics",
      relatedMyths: []
    },
    {
      id: 18,
      section: "Section 89",
      title: "System Error Penalty Waiver",
      sectionNumber: "Clause 56",
      year: 2025,
      category: 'Tax Procedures',
      summary: "Allows waiver of penalties caused by electronic tax system errors or malfunctions",
      actualText: "The Cabinet Secretary may, on the recommendation of the Commissioner, waive the whole or part of any penalty or interest imposed under this Act where the liability to pay the penalty or interest was due to an error generated by an electronic tax system.",
      impactLevel: 'beneficial',
      tags: ['penalties', 'system errors', 'taxpayer relief', 'electronic systems', 'malfunctions'],
      keyProvisions: [
        "Waiver for system-generated errors",
        "Covers duplicated penalties",
        "Protection from technical failures"
      ],
      comparisonSlug: "penalty-waiver",
      relatedMyths: []
    },
    {
      id: 19,
      section: "Third Schedule",
      title: "NIFC Tax Incentives",
      sectionNumber: "Clause 28(b)",
      year: 2025,
      category: 'Income Tax',
      summary: "Introduces reduced corporate tax rates for NIFC-certified companies and startups",
      actualText: "In respect of a company certified by the Nairobi International Financial Centre Authority, fifteen per cent for the first ten years and twenty per cent for subsequent ten years. For startups: fifteen per cent for first three years and twenty per cent for succeeding four years.",
      impactLevel: 'beneficial',
      tags: ['NIFC', 'financial services', 'corporate tax', 'foreign investment', 'startups', 'incentives'],
      keyProvisions: [
        "15% rate for first 10 years (vs 30% standard)",
        "20% rate for subsequent 10 years",
        "Special startup rates available"
      ],
      comparisonSlug: "nifc-incentives",
      relatedMyths: []
    },
    {
      id: 20,
      section: "Section 18G",
      title: "Advance Pricing Agreements",
      sectionNumber: "Clause 12",
      year: 2025,
      category: 'Income Tax',
      summary: "Introduces Advance Pricing Agreements for multinational companies on transfer pricing",
      actualText: "The Commissioner may enter into an advance pricing agreement with a person who undertakes a transaction contemplated under section 18(3) or section 18A. The advance pricing agreement shall be valid for a period not exceeding five consecutive years.",
      impactLevel: 'beneficial',
      tags: ['transfer pricing', 'multinational companies', 'tax certainty', 'advance agreements', 'compliance'],
      keyProvisions: [
        "5-year validity period",
        "Reduces transfer pricing disputes",
        "Provides tax certainty"
      ],
      comparisonSlug: "advance-pricing",
      relatedMyths: []
    },
    {
      id: 21,
      section: "Section 23A",
      title: "Electronic Tax Invoice System",
      sectionNumber: "Clause 43",
      year: 2025,
      category: 'Tax Procedures',
      summary: "Refines electronic tax invoice requirements to exclude certain transaction types",
      actualText: "The electronic tax invoice may exclude payments of emoluments, payments for imports, payments of interest, transactions for accounting for investment allowances, airline passenger ticketing, and payments subject to withholding tax that is a final tax.",
      impactLevel: 'beneficial',
      tags: ['electronic invoices', 'tax compliance', 'eTIMS', 'digital integration', 'business operations'],
      keyProvisions: [
        "Excludes routine employment payments",
        "Simplified for specific transactions",
        "Reduces compliance burden"
      ],
      comparisonSlug: "etims-refinements",
      relatedMyths: []
    },
    {
      id: 22,
      section: "First Schedule Income Tax",
      title: "NIFC Dividend Exemptions",
      sectionNumber: "Clause 26(f)",
      year: 2025,
      category: 'Income Tax',
      summary: "Exempts dividends from NIFC companies that reinvest at least KES 250 million in Kenya",
      actualText: "Dividends paid by a company certified by the Nairobi International Financial Centre Authority where the company reinvests at least two hundred and fifty million shillings in Kenya, in that year of income.",
      impactLevel: 'beneficial',
      tags: ['NIFC', 'dividends', 'reinvestment', 'financial center', 'capital retention'],
      keyProvisions: [
        "Dividend exemption for qualifying companies",
        "Minimum KES 250M annual reinvestment",
        "Promotes capital retention in Kenya"
      ],
      comparisonSlug: "nifc-dividends",
      relatedMyths: []
    },
    {
      id: 23,
      section: "Section 40",
      title: "Property Security Enhancements",
      sectionNumber: "Clause 46(b)",
      year: 2025,
      category: 'Tax Procedures',
      summary: "Provides stamp duty exemption for property transfers under agreed payment plans",
      actualText: "Where a plan has been agreed between the taxpayer and the Commissioner, the liability shall be settled within the agreed payment plan before the notification is lifted; and the transfer of the property shall be exempt from stamp duty.",
      impactLevel: 'beneficial',
      tags: ['property security', 'payment plans', 'stamp duty', 'debt collection', 'taxpayer relief'],
      keyProvisions: [
        "Stamp duty exemption for payment plans",
        "Flexible debt settlement options",
        "Reduces transaction costs"
      ],
      comparisonSlug: "property-security",
      relatedMyths: []
    },
    {
      id: 24,
      section: "Section 117",
      title: "Stamp Duty Internal Reorganization Exemption",
      sectionNumber: "Clause 60",
      year: 2025,
      category: 'Stamp Duty',
      summary: "Exempts stamp duty on property transfers during internal company reorganizations",
      actualText: "The transfer of property by a company to its shareholders as part of an internal reorganisation: Provided that the property is transferred to shareholders in proportion to their shareholding and where the property consists of shares, such shares should be in a subsidiary.",
      impactLevel: 'beneficial',
      tags: ['stamp duty', 'internal reorganization', 'corporate restructuring', 'shareholders', 'subsidiaries'],
      keyProvisions: [
        "Exemption for internal reorganizations",
        "Proportional shareholder transfers",
        "Subsidiary share transfers included"
      ],
      comparisonSlug: "stamp-duty-exemption",
      relatedMyths: []
    }
  ]

  const categories = ['all', 'Income Tax', 'VAT', 'Excise Duty', 'Tax Procedures', 'Stamp Duty', 'Miscellaneous']
  const impacts = ['all', 'beneficial', 'neutral', 'costly']

  const filteredClauses = useMemo(() => {
    return financeBillClauses.filter(clause => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = !searchTerm || 
        clause.title.toLowerCase().includes(searchLower) ||
        clause.summary.toLowerCase().includes(searchLower) ||
        (clause.fullText?.toLowerCase().includes(searchLower) || false) ||
        ((clause as any).actualText?.toLowerCase().includes(searchLower) || false) ||
        (clause.part?.toLowerCase().includes(searchLower) || false) ||
        clause.section.toLowerCase().includes(searchLower) ||
        (clause.clauseNumber?.toLowerCase().includes(searchLower) || false) ||
        ((clause as any).sectionNumber?.toLowerCase().includes(searchLower) || false) ||
        clause.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        clause.keyProvisions.some(provision => provision.toLowerCase().includes(searchLower))
      
      const matchesCategory = selectedCategory === 'all' || clause.category === selectedCategory
      const matchesImpact = selectedImpact === 'all' || clause.impactLevel === selectedImpact

      return matchesSearch && matchesCategory && matchesImpact
    })
  }, [searchTerm, selectedCategory, selectedImpact])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'beneficial': return 'bg-green-100 text-green-800 border-green-200'
      case 'neutral': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'costly': return 'bg-amber-100 text-amber-800 border-amber-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Income Tax': return '💼'
      case 'VAT': return '🧾'
      case 'Excise Duty': return '📊'
      case 'Tax Procedures': return '⚙️'
      case 'Stamp Duty': return '📋'
      default: return '📄'
    }
  }

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return text
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i} className="bg-yellow-200">{part}</mark> : part
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-16 text-center">
          <div className="relative">
            <h1 className="text-5xl font-bold kenya-text-accent mb-6 flex items-center justify-center gap-4">
              <svg className="w-16 h-16 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
              </svg>
              Finance Bill Explorer
            </h1>
            <div className="absolute -top-2 -right-8 text-3xl">
              <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            <div className="absolute -bottom-1 -left-6 text-2xl">
              <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          <p className="text-2xl kenya-text-primary max-w-3xl mx-auto leading-relaxed">
            Search and explore the complete Finance Bill 2025 with <span className="kenya-text-accent font-semibold">full clause text</span> 
            and comprehensive analysis
          </p>
          <div className="mt-6 inline-block px-6 py-2 status-mixed text-white rounded-full text-sm font-medium">
            📜 {financeBillClauses.length} Complete Clauses • 🔍 Full Document Search • 📊 Impact Analysis
          </div>
        </header>

        <div className="kenya-card kenya-shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold kenya-text-primary mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            Search & Filter Clauses
          </h2>
          
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-lg font-bold kenya-text-primary mb-3">
                🔍 Search Finance Bill Text
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search clauses, provisions, tags, or bill text..."
                className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm placeholder-gray-400"
              />
            </div>
            
            <div>
              <label className="block text-lg font-bold kenya-text-primary mb-3">
                📂 Bill Section
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Sections' : `${getCategoryIcon(category)} ${category}`}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-lg font-bold kenya-text-primary mb-3">
                📈 Impact Level
              </label>
              <select
                value={selectedImpact}
                onChange={(e) => setSelectedImpact(e.target.value)}
                className="w-full px-4 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm"
              >
                {impacts.map(impact => (
                  <option key={impact} value={impact}>
                    {impact === 'all' ? 'All Impact Levels' : 
                     impact === 'beneficial' ? '✅ Beneficial' :
                     impact === 'neutral' ? '📊 Neutral' : '⚠️ Requires Attention'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between text-sm kenya-text-primary">
            <span>📋 Showing {filteredClauses.length} of {financeBillClauses.length} clauses</span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-purple-600 hover:text-purple-800 underline"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {filteredClauses.length === 0 ? (
            <div className="kenya-card kenya-shadow p-12 text-center">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold kenya-text-primary mb-4">No clauses found</h3>
              <p className="text-gray-600 text-lg">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            filteredClauses.map(clause => (
              <div key={clause.id} className="kenya-card kenya-shadow-lg transition-all hover:kenya-shadow-lg hover:scale-[1.01]">
                <div className="p-8">
                  <div className="flex flex-wrap justify-between items-start mb-6">
                    <div className="flex-1 min-w-0 mr-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getCategoryIcon(clause.category)}</span>
                        <span className="text-sm font-medium text-gray-600">{clause.category}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm font-medium text-gray-600">
                          {clause.part && `${clause.part} • `}
                          {clause.clauseNumber || (clause as any).sectionNumber || ''}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold kenya-text-primary mb-3">
                        {highlightSearchTerm(clause.title)}
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {highlightSearchTerm(clause.summary)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getImpactColor(clause.impactLevel)}`}>
                        {clause.impactLevel === 'beneficial' ? '✅ Beneficial' :
                         clause.impactLevel === 'neutral' ? '📊 Neutral' : '⚠️ Requires Attention'}
                      </span>
                      <span className="text-xs text-gray-500 text-center">{clause.year}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                      <span className="text-lg mr-2">🎯</span>
                      Key Provisions:
                    </h4>
                    <ul className="space-y-2">
                      {clause.keyProvisions.map((provision, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">{highlightSearchTerm(provision)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {clause.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full border border-purple-200"
                      >
                        #{highlightSearchTerm(tag)}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <button
                      onClick={() => setExpandedClause(expandedClause === clause.id ? null : clause.id)}
                      className="flex items-center text-purple-600 hover:text-purple-800 font-medium text-lg mb-4"
                    >
                      <span className="mr-2">📄</span>
                      {expandedClause === clause.id ? 'Hide' : 'Show'} Actual Bill Text
                      <svg 
                        className={`w-5 h-5 ml-2 transition-transform ${expandedClause === clause.id ? 'rotate-180' : ''}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {expandedClause === clause.id && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                        <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                          <span className="text-lg mr-2">⚖️</span>
                          Complete Bill Text - {clause.part ? `${clause.part}, ` : ''}{clause.section}:
                        </h5>
                        <div className="bg-white p-4 rounded border">
                          <div className="text-sm text-gray-600 mb-2 font-semibold">
                            {clause.clauseNumber || (clause as any).sectionNumber || ''}
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
                            {highlightSearchTerm(clause.fullText || (clause as any).actualText || '')}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-4">
                      {clause.comparisonSlug && (
                        <Link 
                          href={`/clause-comparison?comparison=${clause.comparisonSlug}`}
                          className="kenya-button px-6 py-3 rounded-full text-sm font-medium inline-flex items-center space-x-2"
                        >
                          <span>📊</span>
                          <span>Compare Versions</span>
                          <span>→</span>
                        </Link>
                      )}
                      {clause.relatedMyths && clause.relatedMyths.length > 0 && (
                        <Link 
                          href={`/myth-checker?myth=${clause.relatedMyths[0]}`}
                          className="kenya-button px-6 py-3 rounded-full text-sm font-medium inline-flex items-center space-x-2"
                        >
                          <span>🔍</span>
                          <span>Related Myths</span>
                          <span>→</span>
                        </Link>
                      )}
                      <Link 
                        href="/calculator"
                        className="kenya-button px-6 py-3 rounded-full text-sm font-medium inline-flex items-center space-x-2"
                      >
                        <span>🧮</span>
                        <span>Calculate Impact</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-16 kenya-card-gradient rounded-3xl p-12 text-center security-lines">
          <h3 className="text-3xl font-bold kenya-text-accent mb-4">📚 Comprehensive Bill Analysis</h3>
          <p className="text-lg kenya-text-primary max-w-4xl mx-auto leading-relaxed">
            Complete Finance Bill 2025 text from Kenya Gazette Supplement No. 63. 
            Search through all clauses, parts, and sections with full legislative text and strategic analysis.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/myth-checker" className="kenya-button px-6 py-3 rounded-full text-sm font-medium">
              🚫 Debunk Myths
            </Link>
            <Link href="/calculator" className="kenya-button px-6 py-3 rounded-full text-sm font-medium">
              🧮 Calculate Impact
            </Link>
            <Link href="/clause-comparison" className="kenya-button px-6 py-3 rounded-full text-sm font-medium">
              📊 Compare Changes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}