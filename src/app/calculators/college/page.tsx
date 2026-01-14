'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import FinancialDisclaimer from '@/components/FinancialDisclaimer'
import TrustBadges from '@/components/TrustBadges'
import AuthorByline from '@/components/AuthorByline'
import { getAuthor } from '@/data/authors'

export default function CollegeSavingsCalculator() {
  const author = getAuthor('sarah-johnson') // CFA
  
  const [yearsUntilCollege, setYearsUntilCollege] = useState<string>('10')
  const [currentSavings, setCurrentSavings] = useState<string>('20000')
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500')
  const [annualReturn, setAnnualReturn] = useState<string>('6')
  const [collegeCost, setCollegeCost] = useState<string>('120000')

  const calculateCollege = () => {
    const years = parseFloat(yearsUntilCollege) || 0
    const savings = parseFloat(currentSavings) || 0
    const monthly = parseFloat(monthlyContribution) || 0
    const rate = (parseFloat(annualReturn) || 0) / 100
    const cost = parseFloat(collegeCost) || 0
    
    const monthlyRate = rate / 12
    const totalMonths = years * 12
    
    // Future value of current savings
    const futureValueSavings = savings * Math.pow(1 + monthlyRate, totalMonths)
    
    // Future value of monthly contributions
    const futureValueContributions = monthly * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate
    
    const totalSaved = futureValueSavings + futureValueContributions
    const totalContributed = savings + (monthly * years * 12)
    const investmentGains = totalSaved - totalContributed
    const shortfall = Math.max(0, cost - totalSaved)
    const percentCovered = cost > 0 ? (totalSaved / cost) * 100 : 0
    
    return {
      totalSaved,
      totalContributed,
      investmentGains,
      shortfall,
      percentCovered,
      onTrack: totalSaved >= cost
    }
  }

  const results = calculateCollege()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li><span className="text-gray-500">/</span></li>
            <li><Link href="/calculators" className="text-blue-600 hover:underline">Calculators</Link></li>
            <li><span className="text-gray-500">/</span></li>
            <li><span className="text-gray-900 dark:text-white">College Savings</span></li>
          </ol>
        </nav>

        <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">College Savings Calculator</h1>
              <p className="text-violet-100 text-lg">Plan for your child's educational future</p>
            </div>
          </div>
        </div>

        {author && <AuthorByline author={author} publishDate="2026-01-10" lastUpdated="2026-01-13" />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Education Planning</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Years Until College</label>
                  <input
                    type="number"
                    value={yearsUntilCollege}
                    onChange={(e) => setYearsUntilCollege(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current College Savings ($)</label>
                  <input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                    placeholder="20000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Contribution ($)</label>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                    placeholder="500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Annual Return (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                    placeholder="6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Total College Cost ($)</label>
                  <input
                    type="number"
                    value={collegeCost}
                    onChange={(e) => setCollegeCost(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                    placeholder="120000"
                  />
                  <p className="text-sm text-gray-500 mt-1">Average 4-year public university: $120K | Private: $200K+</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-violet-600 to-purple-700 text-white rounded-xl shadow-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Savings Projection</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Total Saved by College</div>
                  <div className="text-2xl font-bold">${results.totalSaved.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Coverage</div>
                  <div className="text-2xl font-bold">{results.percentCovered.toFixed(0)}%</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Investment Gains</div>
                  <div className="text-2xl font-bold text-green-300">${results.investmentGains.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className={`rounded-lg p-4 ${results.onTrack ? 'bg-green-500' : 'bg-orange-500'}`}>
                  <div className="text-sm font-semibold mb-1">{results.onTrack ? 'Fully Funded!' : 'Shortfall'}</div>
                  <div className="text-2xl font-bold">
                    {results.onTrack ? '✓ On Track' : `$${results.shortfall.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <TrustBadges />
        </div>

        <div className="mt-8">
          <FinancialDisclaimer type="calculator" />
        </div>
      </div>
    </div>
  )
}
