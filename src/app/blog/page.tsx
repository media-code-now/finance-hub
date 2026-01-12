'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { LiveNewsFeed, TrustedSources } from '@/components/LiveNewsFeed'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Live News Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Live Financial News & Market Analysis
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Real-time financial news from trusted sources including Reuters, Bloomberg, Financial Times, and MarketWatch. Stay ahead of market movements.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search live news, companies, or market topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Live Update Indicator */}
            <div className="mt-6 flex items-center justify-center text-green-300">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium">Live Updates Every 5 Minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trusted Sources */}
        <TrustedSources />
        
        {/* Live News Feed */}
        <LiveNewsFeed searchQuery={searchQuery} />
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Real-Time Financial Intelligence
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our live news feed aggregates the most important financial news from trusted sources worldwide. 
              All articles are updated in real-time to keep you informed of market-moving events.
            </p>
            <div className="mt-6 flex justify-center space-x-6">
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                Financial Tools
              </Link>
              <Link href="/calculators" className="text-blue-600 dark:text-blue-400 hover:underline">
                Calculators
              </Link>
              <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:underline">
                Market Data
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}