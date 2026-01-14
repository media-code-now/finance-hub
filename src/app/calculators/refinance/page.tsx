'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import FinancialDisclaimer from '@/components/FinancialDisclaimer'
import TrustBadges from '@/components/TrustBadges'
import AuthorByline from '@/components/AuthorByline'
import { getAuthor } from '@/data/authors'

export default function RefinanceCalculator() {
  const author = getAuthor('james-mitchell') // Mortgage Specialist
  
  const [currentLoanBalance, setCurrentLoanBalance] = useState<string>('300000')
  const [currentRate, setCurrentRate] = useState<string>('6')
  const [currentTerm, setCurrentTerm] = useState<string>('25')
  const [newRate, setNewRate] = useState<string>('4.5')
  const [newTerm, setNewTerm] = useState<string>('30')
  const [closingCosts, setClosingCosts] = useState<string>('5000')

  const calculateRefinance = () => {
    const balance = parseFloat(currentLoanBalance) || 0
    const oldRate = (parseFloat(currentRate) || 0) / 100 / 12
    const oldMonths = (parseFloat(currentTerm) || 0) * 12
    const refRate = (parseFloat(newRate) || 0) / 100 / 12
    const refMonths = (parseFloat(newTerm) || 0) * 12
    const costs = parseFloat(closingCosts) || 0
    
    // Current payment
    const currentPayment = oldRate > 0 
      ? (balance * oldRate * Math.pow(1 + oldRate, oldMonths)) / (Math.pow(1 + oldRate, oldMonths) - 1)
      : 0
    
    // New payment
    const newPayment = refRate > 0
      ? (balance * refRate * Math.pow(1 + refRate, refMonths)) / (Math.pow(1 + refRate, refMonths) - 1)
      : 0
    
    const monthlySavings = currentPayment - newPayment
    const breakEvenMonths = monthlySavings > 0 ? costs / monthlySavings : 999
    const lifetimeSavings = (monthlySavings * refMonths) - costs
    
    return {
      currentPayment,
      newPayment,
      monthlySavings,
      breakEvenMonths,
      lifetimeSavings,
      worthIt: lifetimeSavings > 0 && breakEvenMonths < 60
    }
  }

  const results = calculateRefinance()

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
            <li><span className="text-gray-900 dark:text-white">Refinance Calculator</span></li>
          </ol>
        </nav>

        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Refinance Calculator</h1>
              <p className="text-emerald-100 text-lg">Discover if refinancing will save you money</p>
            </div>
          </div>
        </div>

        {author && <AuthorByline author={author} publishDate="2026-01-10" lastUpdated="2026-01-13" />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Refinance Details</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Current Loan</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Balance ($)</label>
                      <input
                        type="number"
                        value={currentLoanBalance}
                        onChange={(e) => setCurrentLoanBalance(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.125"
                        value={currentRate}
                        onChange={(e) => setCurrentRate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Years Remaining</label>
                      <input
                        type="number"
                        value={currentTerm}
                        onChange={(e) => setCurrentTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">New Loan</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.125"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Loan Term (Years)</label>
                      <input
                        type="number"
                        value={newTerm}
                        onChange={(e) => setNewTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Closing Costs ($)</label>
                      <input
                        type="number"
                        value={closingCosts}
                        onChange={(e) => setClosingCosts(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-xl shadow-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Refinance Analysis</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Current Payment</div>
                  <div className="text-2xl font-bold">${results.currentPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">New Payment</div>
                  <div className="text-2xl font-bold">${results.newPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Monthly Savings</div>
                  <div className="text-2xl font-bold text-green-300">${results.monthlySavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Break-Even Point</div>
                  <div className="text-xl font-bold">{results.breakEvenMonths < 600 ? `${Math.ceil(results.breakEvenMonths)} months` : 'N/A'}</div>
                </div>

                <div className={`rounded-lg p-4 ${results.worthIt ? 'bg-green-500' : 'bg-orange-500'}`}>
                  <div className="text-sm font-semibold mb-1">Recommendation</div>
                  <div className="text-lg font-bold">{results.worthIt ? '✓ Worth Refinancing' : '⚠ Consider Waiting'}</div>
                  <div className="text-sm mt-2">Lifetime savings: ${results.lifetimeSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
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
