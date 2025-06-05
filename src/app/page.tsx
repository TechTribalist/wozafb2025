import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
          <header className="text-center mb-16">
            <div className="relative">
              <h1 className="text-5xl font-bold kenya-text-accent mb-6">
                Finance Bill Navigator 2025
              </h1>
              <div className="absolute -top-4 -right-4 text-4xl">
                🇰🇪
              </div>
              <div className="absolute -bottom-2 -left-8 text-3xl">
                🇰🇪
              </div>
            </div>
            <p className="text-2xl kenya-text-primary max-w-3xl mx-auto leading-relaxed">
              Understanding Kenya's strategic approach to <span className="text-green-700 font-bold text-2xl">broadening the tax base </span> 
              while <span className="text-green-700 font-bold text-2xl">maintaining fair tax rates</span> to boost economic growth
            </p>
            <div className="mt-6 inline-block px-6 py-2 currency-accent-bg text-white rounded-full text-sm font-medium">
              🏛️ Official Analysis • 📊 Real Data • ✅ Fact-Checked
            </div>
          </header>

          {/* Strategic Purpose Section */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="kenya-card-gradient rounded-3xl p-12 security-lines">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold kenya-text-accent mb-6">The Strategic Approach</h2>
                <p className="text-xl kenya-text-primary max-w-4xl mx-auto leading-relaxed">
                  Finance Bill 2025 focuses on <strong className="text-green-700 text-xl">expanding who pays taxes</strong> rather than 
                  increasing how much they pay, creating sustainable revenue growth while supporting economic development.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold kenya-text-primary mb-3">Broaden Tax Base</h3>
                  <p className="text-gray-700">Include more taxpayers in the formal economy, especially digital economy participants and previously exempt sectors</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold kenya-text-primary mb-3">Maintain Fair Rates</h3>
                  <p className="text-gray-700">Keep tax rates competitive while ensuring everyone contributes their fair share to national development</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold kenya-text-primary mb-3">Boost Economy</h3>
                  <p className="text-gray-700">Generate sustainable revenue for development while maintaining business competitiveness and consumer purchasing power</p>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-2 border-green-600 shadow-lg">
                <p className="text-center text-xl font-bold">
                  <strong className="text-green-700 text-2xl">Key Insight:</strong> <span className="text-blue-700">More taxpayers at fair rates = More revenue + Economic growth</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
            <Link href="/myth-checker" className="block group">
              <div className="kenya-card kenya-shadow-lg p-8 group-hover:kenya-shadow-lg">
                <div className="text-5xl mb-6 text-center">
                  <svg className="w-16 h-16 mx-auto text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 kenya-text-primary text-center">Debunk Tax Increase Myths</h2>
                <p className="text-gray-700 text-center leading-relaxed">
                  Verify facts about the bill's <span className="text-green-700 font-semibold">tax base expansion</span> approach vs. false claims about rate increases
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    📊 Base Expansion, Not Rate Hikes
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/clause-comparison" className="block group">
              <div className="kenya-card kenya-shadow-lg p-8 group-hover:kenya-shadow-lg">
                <div className="text-5xl mb-6 text-center">
                  <svg className="w-16 h-16 mx-auto text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 kenya-text-primary text-center">Strategic Changes Analysis</h2>
                <p className="text-gray-700 text-center leading-relaxed">
                  See how 2025 changes expand tax coverage while maintaining competitive rates
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    🎯 Broader Base, Fair Rates
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/calculator" className="block group">
              <div className="kenya-card kenya-shadow-lg p-8 group-hover:kenya-shadow-lg pulse-kenya">
                <div className="text-5xl mb-6 text-center">
                  <svg className="w-16 h-16 mx-auto text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H9v-2h5v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 kenya-text-primary text-center">Your Tax Impact</h2>
                <p className="text-gray-700 text-center leading-relaxed">
                  See how base expansion affects you - most pay same or less while system generates <span className="text-green-700 font-semibold">more revenue</span>
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    📏 Fair Share Calculator
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/explorer" className="block group">
              <div className="kenya-card kenya-shadow-lg p-8 group-hover:kenya-shadow-lg">
                <div className="text-5xl mb-6 text-center">
                  <svg className="w-16 h-16 mx-auto text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 kenya-text-primary text-center">Detailed Provisions</h2>
                <p className="text-gray-700 text-center leading-relaxed">
                  Explore specific clauses that broaden coverage and strengthen compliance mechanisms
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    📜 Comprehensive Coverage
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="kenya-card-gradient rounded-3xl p-12 max-w-6xl mx-auto security-lines">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold kenya-text-accent mb-4">How <span className="text-green-700">Tax Base Expansion</span> Works</h3>
              <p className="text-lg kenya-text-primary">Evidence of the strategic approach: broader coverage with competitive rates</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="kenya-card kenya-shadow p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 status-beneficial rounded-bl-full flex items-center justify-center">
                  <span className="text-2xl">🇰🇪</span>
                </div>
                <h4 className="text-2xl font-bold kenya-text-primary mb-6">Rate Reductions & Reliefs</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                    </svg>
                    <span className="text-gray-700">Per diem increased from <strong className="kenya-text-accent">KES 2,000 to KES 10,000</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                    <span className="text-gray-700">Housing relief up to <strong className="kenya-text-accent">KES 360,000</strong> (from 300,000)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                    <span className="text-gray-700">Self-built homes now qualify for tax relief</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"/>
                    </svg>
                    <span className="text-gray-700">Digital asset tax reduced from <strong className="kenya-text-accent">3% to 1.5%</strong></span>
                  </li>
                </ul>
              </div>
              
              <div className="kenya-card kenya-shadow p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 status-mixed rounded-bl-full flex items-center justify-center">
                  <span className="text-2xl">🇰🇪</span>
                </div>
                <h4 className="text-2xl font-bold kenya-text-primary mb-6">Base Expansion Measures</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z"/>
                    </svg>
                    <span className="text-gray-700">Betting sector contributes more to <strong className="text-orange-600">national development (35% duty)</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.56-3.55C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"/>
                    </svg>
                    <span className="text-gray-700">Businesses contribute consistently with <strong className="text-orange-600">5-year loss limit</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.67 4H14V2c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
                    </svg>
                    <span className="text-gray-700">Clean tech still affordable while <strong className="text-orange-600">expanding tax collection</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                    <span className="text-gray-700">Enhanced compliance tools to <strong className="text-orange-600">include more taxpayers</strong></span>
                  </li>
                </ul>
              </div>
              
              <div className="kenya-card kenya-shadow p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 status-costly rounded-bl-full flex items-center justify-center">
                  <span className="text-2xl">🇰🇪</span>
                </div>
                <h4 className="text-2xl font-bold kenya-text-primary mb-6">Rate Increase Myths</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/>
                    </svg>
                    <span className="text-gray-700">VAT rate is <strong className="text-red-600">NOT</strong> increasing to 18%</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/>
                    </svg>
                    <span className="text-gray-700">No 15% internet access levy</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/>
                    </svg>
                    <span className="text-gray-700">No 10% land tax for owners</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/>
                    </svg>
                    <span className="text-gray-700">No 5% agricultural tax on farmers</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/>
                    </svg>
                    <span className="text-gray-700">No 'Neonatal Tax' on newborn babies</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/>
                    </svg>
                    <span className="text-gray-700">No Diaspora Remittance Tax on money from abroad</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/>
                    </svg>
                    <span className="text-gray-700">No 1% levy on all PayBill/Till transactions</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-10 p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-2xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-800 mb-2">Strategic Reality Check</h3>
                  <p className="text-amber-700 text-lg leading-relaxed">
                    Many online claims wrongly suggest <span className="text-green-700 font-bold">massive tax rate increases</span>. The reality: Finance Bill 2025 
                    focuses on <span className="text-green-700 font-bold">expanding who pays taxes</span>, not increasing rates. Verify the strategic approach with official sources.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Calculator Features */}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold kenya-text-accent mb-4">🧮 Enhanced Tax Calculator Features</h2>
              <p className="text-xl kenya-text-primary max-w-4xl mx-auto">
                Our comprehensive calculator now covers all major Finance Bill 2025 changes, providing detailed 
                comparisons across different tax areas based on your specific situation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="kenya-card kenya-shadow p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl">💼</span>
                  </div>
                  <h3 className="font-bold text-lg kenya-text-primary">Individual Taxes</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ PAYE formula changes (reliefs applied before vs after)</li>
                  <li>✓ Housing relief expansion (KES 300K → 360K)</li>
                  <li>✓ Per diem increases (KES 2K → 10K per day)</li>
                  <li>✓ Construction cost deductions</li>
                  <li>✓ Self-built home qualifications</li>
                </ul>
              </div>

              <div className="kenya-card kenya-shadow p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h3 className="font-bold text-lg kenya-text-primary">Business Taxes</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ VAT threshold change (5M → 8M KES)</li>
                  <li>✓ eTIMS compliance factors</li>
                  <li>✓ Corporate tax rates (NIFC 15% vs 30%)</li>
                  <li>✓ Fringe benefits tax (20% → 30%)</li>
                  <li>✓ 5-year loss carryforward cap</li>
                </ul>
              </div>

              <div className="kenya-card kenya-shadow p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl">💻</span>
                  </div>
                  <h3 className="font-bold text-lg kenya-text-primary">Digital Economy</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Digital Asset Tax (3% → 1.5%)</li>
                  <li>✓ Digital Services Excise (new 20%)</li>
                  <li>✓ Expanded SEPT (no threshold)</li>
                  <li>✓ International client implications</li>
                  <li>✓ Capital gains changes</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link 
                href="/calculator" 
                className="kenya-button px-8 py-4 rounded-xl text-lg font-bold inline-block"
              >
                🚀 Try Enhanced Calculator →
              </Link>
            </div>
          </section>
      </div>
    </div>
  )
}
