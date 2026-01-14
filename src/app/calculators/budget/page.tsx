'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import FinancialDisclaimer from '@/components/FinancialDisclaimer'
import TrustBadges from '@/components/TrustBadges'
import AuthorByline from '@/components/AuthorByline'
import { getAuthor } from '@/data/authors'

export default function BudgetCalculator() {
  const author = getAuthor('david-rodriguez') // CPA - Tax & Budget Specialist
  
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000')
  const [housing, setHousing] = useState<string>('1500')
  const [transportation, setTransportation] = useState<string>('500')
  const [food, setFood] = useState<string>('600')
  const [utilities, setUtilities] = useState<string>('200')
  const [insurance, setInsurance] = useState<string>('300')
  const [healthcare, setHealthcare] = useState<string>('200')
  const [entertainment, setEntertainment] = useState<string>('300')
  const [savings, setSavings] = useState<string>('500')
  const [debt, setDebt] = useState<string>('400')
  const [other, setOther] = useState<string>('300')

  const calculateBudget = () => {
    const income = parseFloat(monthlyIncome) || 0
    const expenses = {
      housing: parseFloat(housing) || 0,
      transportation: parseFloat(transportation) || 0,
      food: parseFloat(food) || 0,
      utilities: parseFloat(utilities) || 0,
      insurance: parseFloat(insurance) || 0,
      healthcare: parseFloat(healthcare) || 0,
      entertainment: parseFloat(entertainment) || 0,
      savings: parseFloat(savings) || 0,
      debt: parseFloat(debt) || 0,
      other: parseFloat(other) || 0
    }
    
    const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0)
    const remaining = income - totalExpenses
    const savingsRate = income > 0 ? (expenses.savings / income) * 100 : 0
    
    return {
      income,
      totalExpenses,
      remaining,
      savingsRate,
      expenses
    }
  }

  const results = calculateBudget()

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
            <li><span className="text-gray-900 dark:text-white">Budget Planner</span></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Budget Planner</h1>
              <p className="text-teal-100 text-lg">Take control of your finances with smart budgeting</p>
            </div>
          </div>
        </div>

        {/* Author Byline */}
        {author && <AuthorByline author={author} publishDate="2026-01-10" lastUpdated="2026-01-13" />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Monthly Budget</h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Income ($)</label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    placeholder="5000"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Monthly Expenses</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🏠 Housing</label>
                    <input
                      type="number"
                      value={housing}
                      onChange={(e) => setHousing(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🚗 Transportation</label>
                    <input
                      type="number"
                      value={transportation}
                      onChange={(e) => setTransportation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🍽️ Food & Groceries</label>
                    <input
                      type="number"
                      value={food}
                      onChange={(e) => setFood(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">💡 Utilities</label>
                    <input
                      type="number"
                      value={utilities}
                      onChange={(e) => setUtilities(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🛡️ Insurance</label>
                    <input
                      type="number"
                      value={insurance}
                      onChange={(e) => setInsurance(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🏥 Healthcare</label>
                    <input
                      type="number"
                      value={healthcare}
                      onChange={(e) => setHealthcare(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🎬 Entertainment</label>
                    <input
                      type="number"
                      value={entertainment}
                      onChange={(e) => setEntertainment(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">💰 Savings</label>
                    <input
                      type="number"
                      value={savings}
                      onChange={(e) => setSavings(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">💳 Debt Payments</label>
                    <input
                      type="number"
                      value={debt}
                      onChange={(e) => setDebt(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">📦 Other</label>
                    <input
                      type="number"
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-xl shadow-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Budget Summary</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Monthly Income</div>
                  <div className="text-2xl font-bold">${results.income.toLocaleString()}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Total Expenses</div>
                  <div className="text-2xl font-bold">${results.totalExpenses.toLocaleString()}</div>
                </div>

                <div className={`rounded-lg p-4 ${results.remaining >= 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                  <div className="text-sm font-semibold mb-1">{results.remaining >= 0 ? 'Surplus' : 'Deficit'}</div>
                  <div className="text-2xl font-bold">${Math.abs(results.remaining).toLocaleString()}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Savings Rate</div>
                  <div className="text-2xl font-bold">{results.savingsRate.toFixed(1)}%</div>
                  <div className="text-xs mt-1">Target: 20%</div>
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
      </div>
    </div>
  )
}
