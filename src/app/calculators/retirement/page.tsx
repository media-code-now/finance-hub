'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import FinancialDisclaimer from '@/components/FinancialDisclaimer'
import TrustBadges from '@/components/TrustBadges'
import AuthorByline from '@/components/AuthorByline'
import { getAuthor } from '@/data/authors'

export default function RetirementCalculator() {
  const author = getAuthor('michael-chen') // CFP - Retirement Planning Specialist
  
  const [currentAge, setCurrentAge] = useState<string>('35')
  const [retirementAge, setRetirementAge] = useState<string>('65')
  const [currentSavings, setCurrentSavings] = useState<string>('50000')
  const [monthlyContribution, setMonthlyContribution] = useState<string>('1000')
  const [annualReturn, setAnnualReturn] = useState<string>('7')
  const [retirementIncome, setRetirementIncome] = useState<string>('60000')

  const calculateRetirement = () => {
    const age = parseFloat(currentAge) || 0
    const retAge = parseFloat(retirementAge) || 0
    const savings = parseFloat(currentSavings) || 0
    const monthly = parseFloat(monthlyContribution) || 0
    const rate = (parseFloat(annualReturn) || 0) / 100
    const income = parseFloat(retirementIncome) || 0
    
    const yearsToRetirement = retAge - age
    const monthlyRate = rate / 12
    const totalMonths = yearsToRetirement * 12
    
    // Future value of current savings
    const futureValueSavings = savings * Math.pow(1 + monthlyRate, totalMonths)
    
    // Future value of monthly contributions
    const futureValueContributions = monthly * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate
    
    const totalAtRetirement = futureValueSavings + futureValueContributions
    const totalContributed = savings + (monthly * yearsToRetirement * 12)
    const totalEarnings = totalAtRetirement - totalContributed
    
    // Years of retirement (assume age 90)
    const retirementYears = 90 - retAge
    const neededForRetirement = income * retirementYears
    const shortfall = neededForRetirement - totalAtRetirement
    
    return {
      totalAtRetirement,
      totalContributed,
      totalEarnings,
      yearsToRetirement,
      retirementYears,
      neededForRetirement,
      shortfall: Math.max(0, shortfall),
      onTrack: totalAtRetirement >= neededForRetirement
    }
  }

  const results = calculateRetirement()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">Finance Hub</Link>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</Link>
                <Link href="/calculators" className="text-blue-600 dark:text-blue-400 font-medium">Calculators</Link>
                <Link href="/tools" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Tools</Link>
                <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Blog</Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li><span className="text-gray-500">/</span></li>
            <li><Link href="/calculators" className="text-blue-600 hover:underline">Calculators</Link></li>
            <li><span className="text-gray-500">/</span></li>
            <li><span className="text-gray-900 dark:text-white">Retirement Planning</span></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Retirement Planning Calculator</h1>
              <p className="text-purple-100 text-lg">Plan your dream retirement with confidence</p>
            </div>
          </div>
        </div>

        {/* Author Byline */}
        {author && <AuthorByline author={author} publishDate="2026-01-10" lastUpdated="2026-01-13" />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Retirement</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Age</label>
                  <input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="35"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Retirement Age</label>
                  <input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="65"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Retirement Savings ($)</label>
                  <input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Contribution ($)</label>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Annual Return (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="7"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Desired Annual Retirement Income ($)</label>
                  <input
                    type="number"
                    value={retirementIncome}
                    onChange={(e) => setRetirementIncome(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="60000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl shadow-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Your Retirement Outlook</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Total at Retirement</div>
                  <div className="text-2xl font-bold">${results.totalAtRetirement.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Years to Retirement</div>
                  <div className="text-2xl font-bold">{results.yearsToRetirement} years</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Total Contributed</div>
                  <div className="text-2xl font-bold">${results.totalContributed.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Investment Earnings</div>
                  <div className="text-2xl font-bold text-green-300">${results.totalEarnings.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className={`rounded-lg p-4 ${results.onTrack ? 'bg-green-500' : 'bg-orange-500'}`}>
                  <div className="text-sm font-semibold mb-1">Status</div>
                  <div className="text-lg font-bold">
                    {results.onTrack ? '✓ On Track!' : '⚠ Shortfall'}
                  </div>
                  {!results.onTrack && (
                    <div className="text-sm mt-2">Need ${results.shortfall.toLocaleString('en-US', { maximumFractionDigits: 0 })} more</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8">
          <TrustBadges />
        </div>

        {/* Disclaimer */}
        <div className="mt-8">
          <FinancialDisclaimer type="calculator" />
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Understanding Retirement Planning</h2>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Retirement planning is crucial for ensuring financial security in your later years. This calculator helps you determine if your current savings and contributions will meet your retirement goals.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Key Factors</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>401(k) and IRA Contributions:</strong> Maximize employer matches and tax-advantaged accounts</li>
              <li><strong>Investment Returns:</strong> Historical stock market returns average 7-10% annually</li>
              <li><strong>Retirement Age:</strong> Delaying retirement even a few years significantly increases savings</li>
              <li><strong>Lifestyle Expectations:</strong> Plan for 70-80% of pre-retirement income</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Data Sources</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• <a href="https://www.ssa.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Social Security Administration</a> - Retirement benefits data</li>
                <li>• <a href="https://www.dol.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Department of Labor</a> - 401(k) and pension guidance</li>
                <li>• <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IRS</a> - Retirement account contribution limits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
