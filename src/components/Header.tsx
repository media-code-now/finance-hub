'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { MobileMenu } from '@/components/MobileMenu'
import { LiveStockTicker } from '@/components/LiveStockTicker'
import { MarketStatusIndicator } from '@/components/MarketStatusIndicator'
import Logo from '@/components/Logo'

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <MarketStatusIndicator />
      <LiveStockTicker />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />
          <div className="flex items-center space-x-2 sm:space-x-4">
            <nav className="hidden md:flex space-x-4 lg:space-x-8">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/calculators" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Calculators
              </Link>
              <Link href="/tools" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Tools
              </Link>
              <Link href="/charts" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Charts
              </Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                News
              </Link>
            </nav>
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
