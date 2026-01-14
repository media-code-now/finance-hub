'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import FinancialDisclaimer from '@/components/FinancialDisclaimer'
import TrustBadges from '@/components/TrustBadges'
import AuthorByline from '@/components/AuthorByline'
import { getAuthor } from '@/data/authors'

export default function TaxCalculator() {
  const author = getAuthor('david-rodriguez') // CPA - Tax Specialist
  
  const [filingStatus, setFilingStatus] = useState<string>('single')
  const [income, setIncome] = useState<string>('75000')
  const [deductions, setDeductions] = useState<string>('13850')
  const [state, setState] = useState<string>('california')

  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0
    const standardDeduction = parseFloat(deductions) || 13850
    const taxableIncome = Math.max(0, grossIncome - standardDeduction)
    
    // 2026 Federal Tax Brackets (Single)
    let federalTax = 0
    if (taxableIncome <= 11000) {
      federalTax = taxableIncome * 0.10
    } else if (taxableIncome <= 44725) {
      federalTax = 1100 + (taxableIncome - 11000) * 0.12
    } else if (taxableIncome <= 95375) {
      federalTax = 5147 + (taxableIncome - 44725) * 0.22
    } else if (taxableIncome <= 182100) {
      federalTax = 16290 + (taxableIncome - 95375) * 0.24
    } else if (taxableIncome <= 231250) {
      federalTax = 37104 + (taxableIncome - 182100) * 0.32
    } else if (taxableIncome <= 578125) {
      federalTax = 52832 + (taxableIncome - 231250) * 0.35
    } else {
      federalTax = 174238.5 + (taxableIncome - 578125) * 0.37
    }
    
    // Simplified state tax (CA: ~9.3%)
    const stateTax = taxableIncome * 0.093
    
    const totalTax = federalTax + stateTax
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0
    const takeHome = grossIncome - totalTax
    
    return {
      federalTax,
      stateTax,
      totalTax,
      effectiveRate,
      takeHome,
      taxableIncome
    }
  }

  const results = calculateTax()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li><span className="text-gray-500">/</span></li>
            <li><Link href="/calculators" className="text-blue-600 hover:underline">Calculators</Link></li>
            <li><span className="text-gray-500">/</span></li>
            <li><span className="text-gray-900 dark:text-white">Tax Calculator</span></li>
          </ol>
        </nav>

        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Tax Calculator</h1>
              <p className="text-indigo-100 text-lg">Estimate your federal and state tax liability</p>
            </div>
          </div>
        </div>

        {author && <AuthorByline author={author} publishDate="2026-01-10" lastUpdated="2026-01-13" />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tax Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filing Status</label>
                  <select
                    value={filingStatus}
                    onChange={(e) => setFilingStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="single">Single</option>
                    <option value="married">Married Filing Jointly</option>
                    <option value="head">Head of Household</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Annual Income ($)</label>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="75000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deductions ($)</label>
                  <input
                    type="number"
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="13850"
                  />
                  <p className="text-sm text-gray-500 mt-1">Standard deduction: $13,850 (Single)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="california">California</option>
                    <option value="texas">Texas (No State Tax)</option>
                    <option value="newyork">New York</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-xl shadow-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Tax Summary</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Federal Tax</div>
                  <div className="text-2xl font-bold">${results.federalTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">State Tax</div>
                  <div className="text-2xl font-bold">${results.stateTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Total Tax</div>
                  <div className="text-2xl font-bold text-red-300">${results.totalTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Effective Rate</div>
                  <div className="text-2xl font-bold">{results.effectiveRate.toFixed(1)}%</div>
                </div>

                <div className="bg-green-500 rounded-lg p-4">
                  <div className="text-sm font-semibold mb-1">Take-Home Pay</div>
                  <div className="text-2xl font-bold">${results.takeHome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <TrustBadges />
        </div>

        <div className="mt-8">
          <FinancialDisclaimer type="tax" />
        </div>
      </div>
    </div>
  )
}
