import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search'
import BalanceIcon from '@mui/icons-material/Balance'
import CalculateIcon from '@mui/icons-material/Calculate'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import HomeIcon from '@mui/icons-material/Home'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import CasinoIcon from '@mui/icons-material/Casino'
import TimelineIcon from '@mui/icons-material/Timeline'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull'
import LockIcon from '@mui/icons-material/Lock'
import BlockIcon from '@mui/icons-material/Block'

export default function Home() {
  return (
    <main className="min-h-screen currency-bg">
      <div className="min-h-screen bg-gradient-to-br from-white/98 via-white/95 to-white/98">
        <div className="container mx-auto px-4 py-12">
          <header className="text-center mb-16">
            <div className="relative">
              <h1 className="text-6xl font-bold kenya-text-accent mb-6">
                Finance Bill Navigator 2025
              </h1>
              <div className="absolute -top-4 -right-4 text-4xl">
                🇰🇪
              </div>
              <div className="absolute -bottom-2 -left-8 text-3xl">
                <AttachMoneyIcon sx={{ fontSize: 40, color: 'var(--kenya-green)' }} />
              </div>
            </div>
            <p className="text-2xl kenya-text-primary max-w-3xl mx-auto leading-relaxed">
              Understand Kenya's Finance Bill 2025 with <span className="kenya-text-accent font-semibold">facts</span>, 
              <span className="kenya-text-accent font-semibold"> comparisons</span>, and 
              <span className="kenya-text-accent font-semibold"> personalized tax calculations</span>
            </p>
            <div className="mt-6 inline-block px-6 py-2 currency-accent-bg text-white rounded-full text-sm font-medium">
              🏛️ Official Analysis • 📊 Real Data • ✅ Fact-Checked
            </div>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
            <Link href="/myth-checker" className="block group">
              <div className="kenya-card kenya-shadow-lg p-8 group-hover:kenya-shadow-lg">
                <div className="text-5xl mb-6 text-center">
                  <SearchIcon sx={{ fontSize: 60, color: 'var(--kenya-red)' }} />
                </div>
                <h2 className="text-2xl font-bold mb-4 kenya-text-primary text-center">Myth vs Truth</h2>
                <p className="text-gray-700 text-center leading-relaxed">
                  Fact-check common misconceptions about the Finance Bill with verified sources
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    🚫 Busting 9 Myths
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/clause-comparison" className="block group">
              <div className="kenya-card kenya-shadow-lg p-8 group-hover:kenya-shadow-lg">
                <div className="text-5xl mb-6 text-center">
                  <BalanceIcon sx={{ fontSize: 60, color: 'var(--kenya-blue)' }} />
                </div>
                <h2 className="text-2xl font-bold mb-4 kenya-text-primary text-center">Clause Comparison</h2>
                <p className="text-gray-700 text-center leading-relaxed">
                  Compare 2024 vs 2025 clauses side-by-side to see what changed
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    📊 6 Key Changes
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/calculator" className="block group">
              <div className="kenya-card kenya-shadow-lg p-8 group-hover:kenya-shadow-lg pulse-kenya">
                <div className="text-5xl mb-6 text-center">
                  <CalculateIcon sx={{ fontSize: 60, color: 'var(--kenya-green)' }} />
                </div>
                <h2 className="text-2xl font-bold mb-4 kenya-text-primary text-center">Tax Calculator</h2>
                <p className="text-gray-700 text-center leading-relaxed">
                  Calculate your personal tax impact under the new bill
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    💰 Personal Impact
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/explorer" className="block group">
              <div className="kenya-card kenya-shadow-lg p-8 group-hover:kenya-shadow-lg">
                <div className="text-5xl mb-6 text-center">
                  <MenuBookIcon sx={{ fontSize: 60, color: 'var(--kenya-violet)' }} />
                </div>
                <h2 className="text-2xl font-bold mb-4 kenya-text-primary text-center">Bill Explorer</h2>
                <p className="text-gray-700 text-center leading-relaxed">
                  Search and explore all clauses in the Finance Bill
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    🔎 12 Provisions
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="kenya-card-gradient rounded-3xl p-12 max-w-6xl mx-auto security-lines">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold kenya-text-accent mb-4">Key Changes in Finance Bill 2025</h3>
              <p className="text-lg kenya-text-primary">Based on official KPMG analysis and government documents</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="kenya-card kenya-shadow p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 status-beneficial rounded-bl-full flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <h4 className="text-2xl font-bold kenya-text-primary mb-6">Good News</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <AttachMoneyIcon sx={{ fontSize: 20, color: '#10b981' }} />
                    <span className="text-gray-700">Per diem increased from <strong className="kenya-text-accent">KES 2,000 to KES 10,000</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <HomeIcon sx={{ fontSize: 20, color: '#10b981' }} />
                    <span className="text-gray-700">Housing relief up to <strong className="kenya-text-accent">KES 360,000</strong> (from 300,000)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <HomeIcon sx={{ fontSize: 20, color: '#10b981' }} />
                    <span className="text-gray-700">Self-built homes now qualify for tax relief</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <PhoneAndroidIcon sx={{ fontSize: 20, color: '#10b981' }} />
                    <span className="text-gray-700">Digital asset tax reduced from <strong className="kenya-text-accent">3% to 1.5%</strong></span>
                  </li>
                </ul>
              </div>
              
              <div className="kenya-card kenya-shadow p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 status-mixed rounded-bl-full flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h4 className="text-2xl font-bold kenya-text-primary mb-6">Important Changes</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CasinoIcon sx={{ fontSize: 20, color: '#f97316' }} />
                    <span className="text-gray-700">Betting excise duty increased to <strong className="text-orange-600">35%</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <TimelineIcon sx={{ fontSize: 20, color: '#f97316' }} />
                    <span className="text-gray-700">Tax losses capped to <strong className="text-orange-600">5-year</strong> carryforward</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BatteryChargingFullIcon sx={{ fontSize: 20, color: '#f97316' }} />
                    <span className="text-gray-700">Some clean tech items moved from zero-rated to exempt</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <LockIcon sx={{ fontSize: 20, color: '#f97316' }} />
                    <span className="text-gray-700">KRA gets broader data access powers</span>
                  </li>
                </ul>
              </div>
              
              <div className="kenya-card kenya-shadow p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 status-costly rounded-bl-full flex items-center justify-center">
                  <span className="text-2xl">❌</span>
                </div>
                <h4 className="text-2xl font-bold kenya-text-primary mb-6">Common Myths</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <BlockIcon sx={{ fontSize: 20, color: '#ef4444' }} />
                    <span className="text-gray-700">VAT rate is <strong className="text-red-600">NOT</strong> increasing to 18%</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BlockIcon sx={{ fontSize: 20, color: '#ef4444' }} />
                    <span className="text-gray-700">No 15% internet access levy</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BlockIcon sx={{ fontSize: 20, color: '#ef4444' }} />
                    <span className="text-gray-700">No 10% land tax for owners</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BlockIcon sx={{ fontSize: 20, color: '#ef4444' }} />
                    <span className="text-gray-700">No 5% agricultural tax on farmers</span>
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
                  <h3 className="text-xl font-bold text-amber-800 mb-2">Reality Check</h3>
                  <p className="text-amber-700 text-lg leading-relaxed">
                    Many claims circulating online about the Finance Bill 2025 are false or 
                    taken from other bills/reports. Use this app to verify facts with official sources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
