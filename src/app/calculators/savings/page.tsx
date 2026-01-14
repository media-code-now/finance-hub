'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import FinancialDisclaimer from '@/components/FinancialDisclaimer'
import TrustBadges from '@/components/TrustBadges'
import AuthorByline from '@/components/AuthorByline'
import { getAuthor } from '@/data/authors'

export default function SavingsGoalCalculator() {
  const author = getAuthor('sarah-johnson') // CFA - Investment Specialist
  
  const [goalAmount, setGoalAmount] = useState<string>('50000')
  const [currentSavings, setCurrentSavings] = useState<string>('5000')
  const [timeframe, setTimeframe] = useState<string>('5')
  const [interestRate, setInterestRate] = useState<string>('3')

  const calculateSavings = () => {
    const goal = parseFloat(goalAmount) || 0
    const current = parseFloat(currentSavings) || 0
    const years = parseFloat(timeframe) || 0
    const rate = (parseFloat(interestRate) || 0) / 100
    
    const remaining = goal - current
    const months = years * 12
    const monthlyRate = rate / 12
    
    // Calculate monthly payment needed
    let monthlyPayment = 0
    if (monthlyRate > 0) {
      const futureValueCurrent = current * Math.pow(1 + monthlyRate, months)
      const remainingNeeded = goal - futureValueCurrent
      monthlyPayment = (remainingNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)
    } else {
      monthlyPayment = remaining / months
    }
    
    const totalContributions = monthlyPayment * months
    const totalSaved = current + totalContributions
    const interestEarned = goal - totalSaved
    
    return {
      monthlyPayment: Math.max(0, monthlyPayment),
      totalContributions,
      interestEarned: Math.max(0, interestEarned),
      goal,
      timeframe: years
    }
  }

  const results = calculateSavings()

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
            <li><span className="text-gray-900 dark:text-white">Savings Goal Calculator</span></li>
          </ol>
        </nav>

        <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Savings Goal Calculator</h1>
              <p className="text-amber-100 text-lg">Achieve your financial dreams with strategic saving</p>
            </div>
          </div>
        </div>

        {author && <AuthorByline author={author} publishDate="2026-01-10" lastUpdated="2026-01-13" />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Plan Your Savings Goal</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Savings Goal Amount ($)</label>
                  <input
                    type="number"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Savings ($)</label>
                  <input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timeframe (Years)</label>
                  <input
                    type="number"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                    placeholder="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                    placeholder="3"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-amber-600 to-orange-700 text-white rounded-xl shadow-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Your Savings Plan</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Monthly Payment Needed</div>
                  <div className="text-2xl font-bold">${results.monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Goal Amount</div>
                  <div className="text-2xl font-bold">${results.goal.toLocaleString()}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Total Contributions</div>
                  <div className="text-2xl font-bold">${results.totalContributions.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Interest Earned</div>
                  <div className="text-2xl font-bold text-green-300">${results.interestEarned.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
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
