import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Bill Navigator 2025 - WozaFB2025",
  description: "Understand Kenya's Finance Bill 2025 with facts, comparisons, and personalized tax impact calculations. Comprehensive tax calculator, myth checker, and clause-by-clause analysis.",
  keywords: "Kenya Finance Bill 2025, tax calculator, PAYE, VAT, digital tax, myth checker, Kenya tax policy",
  authors: [{ name: "WozaFB2025 Team" }],
  openGraph: {
    title: "Finance Bill Navigator 2025 - Comprehensive Kenya Tax Analysis",
    description: "Navigate Kenya's Finance Bill 2025 with confidence. Get personalized tax impact calculations, verify facts vs myths, and explore detailed clause comparisons.",
    url: "https://wozafb2025.vercel.app",
    siteName: "WozaFB2025 - Finance Bill Navigator",
    images: [
      {
        url: "https://wozafb2025.vercel.app/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Finance Bill Navigator 2025 - Kenya Tax Calculator and Analysis Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Bill Navigator 2025 - Kenya Tax Analysis",
    description: "Comprehensive Finance Bill 2025 calculator and fact-checker for Kenya. Calculate your tax impact and verify myths vs truth.",
    images: ["https://wozafb2025.vercel.app/images/og-preview.png"],
    creator: "@WozaFB2025",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Enhanced Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 -z-10"></div>
        <div className="fixed inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -z-10"></div>
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main className="relative">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🇰🇪</span>
                </div>
                <span className="font-bold text-lg">WozaFinanceBill2025</span>
              </div>
              
              <div className="text-sm text-gray-400">
                <p>© 2025 Finance Bill Navigator. Educational content for informed citizenship.</p>
              </div>
              
              <div className="flex space-x-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
