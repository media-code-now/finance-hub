'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import FinancialDisclaimer from '@/components/FinancialDisclaimer'
import TrustBadges from '@/components/TrustBadges'
import AuthorByline from '@/components/AuthorByline'
import { getAuthor } from '@/data/authors'

export default function AutoLoanCalculator() {
  const author = getAuthor('david-rodriguez') // CPA
  
  const [carPrice, setCarPrice] = useState<string>('35000')
  const [downPayment, setDownPayment] = useState<string>('7000')
  const [tradeInValue, setTradeInValue] = useState<string>('0')
  const [interestRate, setInterestRate] = useState<string>('5.5')
  const [loanTerm, setLoanTerm] = useState<string>('60')

  const calculateAutoLoan = () => {
    const price = parseFloat(carPrice) || 0
    const down = parseFloat(downPayment) || 0
    const trade = parseFloat(tradeInValue) || 0
    const rate = (parseFloat(interestRate) || 0) / 100 / 12
    const months = parseFloat(loanTerm) || 0
    
    const loanAmount = price - down - trade
    
    const monthlyPayment = rate > 0
      ? (loanAmount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
      : loanAmount / months
    
    const totalPaid = monthlyPayment * months
    const totalInterest = totalPaid - loanAmount
    const totalCost = price + totalInterest
    
    return {
      loanAmount,
      monthlyPayment,
      totalInterest,
      totalPaid,
      totalCost
    }
  }

  const results = calculateAutoLoan()

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
            <li><span className="text-gray-900 dark:text-white">Auto Loan Calculator</span></li>
          </ol>
        </nav>

        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-cyan-600 rounded-2xl flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Auto Loan Calculator</h1>
              <p className="text-cyan-100 text-lg">Calculate your car loan payments and compare options</p>
            </div>
          </div>
        </div>

        {author && <AuthorByline author={author} publishDate="2026-01-10" lastUpdated="2026-01-13" />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Vehicle & Loan Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Car Price ($)</label>
                  <input
                    type="number"
                    value={carPrice}
                    onChange={(e) => setCarPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                    placeholder="35000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Down Payment ($)</label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                    placeholder="7000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trade-In Value ($)</label>
                  <input
                    type="number"
                    value={tradeInValue}
                    onChange={(e) => setTradeInValue(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                    placeholder="5.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loan Term (Months)</label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="36">36 months (3 years)</option>
                    <option value="48">48 months (4 years)</option>
                    <option value="60">60 months (5 years)</option>
                    <option value="72">72 months (6 years)</option>
                    <option value="84">84 months (7 years)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-xl shadow-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Loan Summary</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Monthly Payment</div>
                  <div className="text-2xl font-bold">${results.monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Loan Amount</div>
                  <div className="text-2xl font-bold">${results.loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Total Interest</div>
                  <div className="text-2xl font-bold text-orange-300">${results.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Total Cost</div>
                  <div className="text-2xl font-bold">${results.totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
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
