'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { MobileMenu } from '@/components/MobileMenu'
import { LiveStockTicker } from '@/components/LiveStockTicker'
import { MarketStatusIndicator } from '@/components/MarketStatusIndicator'
import Logo from '@/components/Logo'

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 safe-area-top">
      <MarketStatusIndicator />
      <LiveStockTicker />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo - Optimized for mobile */}
          <div className="flex-shrink-0 touch-target">
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <nav className="hidden md:flex space-x-1 lg:space-x-4">
              <Link 
                href="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-xl text-sm font-medium transition-colors touch-target"
              >
                Home
              </Link>
              <Link 
                href="/calculators" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-xl text-sm font-medium transition-colors touch-target"
              >
                Calculators
              </Link>
              <Link 
                href="/tools" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-xl text-sm font-medium transition-colors touch-target"
              >
                Tools
              </Link>
              <Link 
                href="/charts" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-xl text-sm font-medium transition-colors touch-target"
              >
                Stock Market
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-xl text-sm font-medium transition-colors touch-target"
              >
                News
              </Link>
            </nav>
            
            {/* Theme Toggle - Larger touch target on mobile */}
            <div className="touch-target flex items-center justify-center">
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
