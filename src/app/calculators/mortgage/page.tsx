'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import FinancialDisclaimer from '@/components/FinancialDisclaimer'
import TrustBadges from '@/components/TrustBadges'
import AuthorByline from '@/components/AuthorByline'
import { getAuthor } from '@/data/authors'

export default function MortgageCalculator() {
  const author = getAuthor('james-mitchell') // Real estate & mortgage specialist
  
  const [homePrice, setHomePrice] = useState<string>('400000')
  const [downPayment, setDownPayment] = useState<string>('80000')
  const [loanTerm, setLoanTerm] = useState<string>('30')
  const [interestRate, setInterestRate] = useState<string>('6.5')
  const [propertyTax, setPropertyTax] = useState<string>('1.2')
  const [homeInsurance, setHomeInsurance] = useState<string>('1200')
  const [hoaFees, setHoaFees] = useState<string>('0')

  const calculateMortgage = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment)
    const monthlyRate = parseFloat(interestRate) / 100 / 12
    const numPayments = parseFloat(loanTerm) * 12
    
    // Monthly mortgage payment (principal + interest)
    const monthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                     (Math.pow(1 + monthlyRate, numPayments) - 1)
    
    // Monthly property tax
    const monthlyPropertyTax = (parseFloat(homePrice) * parseFloat(propertyTax) / 100) / 12
    
    // Monthly insurance
    const monthlyInsurance = parseFloat(homeInsurance) / 12
    
    // Monthly HOA
    const monthlyHOA = parseFloat(hoaFees) || 0
    
    // PMI (if down payment < 20%)
    const downPaymentPercent = (parseFloat(downPayment) / parseFloat(homePrice)) * 100
    const monthlyPMI = downPaymentPercent < 20 ? (principal * 0.005) / 12 : 0
    
    const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyHOA + monthlyPMI
    const totalInterest = (monthlyPI * numPayments) - principal
    const totalCost = totalMonthlyPayment * numPayments + parseFloat(downPayment)
    
    return {
      monthlyPayment: monthlyPI,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyHOA,
      monthlyPMI,
      totalMonthlyPayment,
      totalInterest,
      totalCost,
      loanAmount: principal,
      downPaymentPercent
    }
  }

  const results = calculateMortgage()

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
            <li><span className="text-gray-900 dark:text-white">Mortgage Calculator</span></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Mortgage Payment Calculator</h1>
              <p className="text-blue-100 text-lg">Calculate your monthly mortgage payments and total homeownership costs</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="font-semibold">Complete Analysis</div>
              <div className="text-sm text-blue-100">Principal, interest, taxes, insurance</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="font-semibold">Total Cost Breakdown</div>
              <div className="text-sm text-blue-100">See all costs over loan lifetime</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
                </svg>
              </div>
              <div className="font-semibold">PMI Analysis</div>
              <div className="text-sm text-blue-100">Calculate private mortgage insurance</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Input */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏡 Mortgage Details</h2>
              
              {/* Instructions */}
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-8">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  <span className="inline-flex items-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM6 10a1 1 0 01-1 1H4a1 1 0 110-2h1a1 1 0 011 1zM6.464 14.95A1 1 0 105.05 13.536l-.707.707a1 1 0 001.414 1.414l.707-.707zM10 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM14.95 13.536a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 5a3 3 0 000 6 3 3 0 000-6z" />
                    </svg>
                    How to Use This Calculator
                  </span>
                </h3>
                <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>1. Enter the home purchase price</li>
                  <li>2. Input your down payment amount</li>
                  <li>3. Set the loan term (typically 15 or 30 years)</li>
                  <li>4. Enter current interest rate</li>
                  <li>5. Add property tax rate and insurance costs</li>
                  <li>6. Include HOA fees if applicable</li>
                </ol>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="homePrice" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Home Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                      <input
                        id="homePrice"
                        type="text"
                        value={homePrice}
                        onChange={(e) => setHomePrice(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="400,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="downPayment" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      💵 Down Payment
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="downPayment"
                        type="text"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="80,000"
                      />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {results.downPaymentPercent.toFixed(1)}% of home price
                    </div>
                  </div>

                  <div>
                    <label htmlFor="loanTerm" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      📅 Loan Term
                    </label>
                    <select
                      id="loanTerm"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="15">15 years</option>
                      <option value="20">20 years</option>
                      <option value="30">30 years</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="interestRate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Interest Rate
                    </label>
                    <div className="relative">
                      <input
                        id="interestRate"
                        type="text"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="6.5"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="propertyTax" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      🏛️ Property Tax Rate
                    </label>
                    <div className="relative">
                      <input
                        id="propertyTax"
                        type="text"
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(e.target.value)}
                        className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="1.2"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Annual rate (varies by location)
                    </div>
                  </div>

                  <div>
                    <label htmlFor="homeInsurance" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      🛡️ Home Insurance (Annual)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="homeInsurance"
                        type="text"
                        value={homeInsurance}
                        onChange={(e) => setHomeInsurance(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="1,200"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="hoaFees" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      HOA Fees (Monthly)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="hoaFees"
                        type="text"
                        value={hoaFees}
                        onChange={(e) => setHoaFees(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <span className="inline-flex items-center">
                        <svg className="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM6 10a1 1 0 01-1 1H4a1 1 0 110-2h1a1 1 0 011 1zM6.464 14.95A1 1 0 105.05 13.536l-.707.707a1 1 0 001.414 1.414l.707-.707zM10 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM14.95 13.536a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 5a3 3 0 000 6 3 3 0 000-6z" />
                        </svg>
                        Loan Summary
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Loan Amount:</span>
                        <span>${results.loanAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Down Payment:</span>
                        <span>{results.downPaymentPercent.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PMI Required:</span>
                        <span>{results.downPaymentPercent < 20 ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Monthly Payment</h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                      ${Math.round(results.totalMonthlyPayment).toLocaleString()}
                    </div>
                    <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Monthly Payment</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Principal & Interest</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${Math.round(results.monthlyPayment).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Property Tax</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${Math.round(results.monthlyPropertyTax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Home Insurance</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${Math.round(results.monthlyInsurance).toLocaleString()}</span>
                  </div>
                  {results.monthlyHOA > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">HOA Fees</span>
                      <span className="font-semibold text-gray-900 dark:text-white">${Math.round(results.monthlyHOA).toLocaleString()}</span>
                    </div>
                  )}
                  {results.monthlyPMI > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">PMI</span>
                      <span className="font-semibold text-orange-600 dark:text-orange-400">${Math.round(results.monthlyPMI).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Loan Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400">Total Interest Paid</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">${Math.round(results.totalInterest).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400">Total Loan Cost</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${Math.round(results.totalCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400">Loan-to-Value Ratio</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{(100 - results.downPaymentPercent).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example Calculation */}
        <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">Example: First-Time Homebuyer</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">Purchase Details</h4>
              <ul className="text-yellow-700 dark:text-yellow-300 space-y-2">
                <li>• <strong>Home Price:</strong> $350,000</li>
                <li>• <strong>Down Payment:</strong> $35,000 (10%)</li>
                <li>• <strong>Loan Amount:</strong> $315,000</li>
                <li>• <strong>Interest Rate:</strong> 6.75%</li>
                <li>• <strong>Loan Term:</strong> 30 years</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">Monthly Breakdown:</h4>
              <ul className="text-yellow-700 dark:text-yellow-300 space-y-2">
                <li>• <strong>Principal & Interest:</strong> $2,043</li>
                <li>• <strong>Property Tax:</strong> $350</li>
                <li>• <strong>Insurance:</strong> $125</li>
                <li>• <strong>PMI:</strong> $131 (10% down)</li>
                <li>• <strong>Total Monthly:</strong> $2,649</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔗 Related Financial Tools</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/calculators/investment" className="block group">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Investment Calculator</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Calculate investment returns and compound growth</p>
                <div className="mt-4 text-green-600 dark:text-green-400 font-medium text-sm group-hover:text-green-800">
                  Invest Instead →
                </div>
              </div>
            </Link>

            <Link href="/calculators/loan" className="block group">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Loan Calculator</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Calculate payments for personal or auto loans</p>
                <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-800">
                  Calculate Loans →
                </div>
              </div>
            </Link>

            <Link href="/calculators/refinance" className="block group">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Refinance Calculator</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">See if refinancing your mortgage makes sense</p>
                <div className="mt-4 text-purple-600 dark:text-purple-400 font-medium text-sm group-hover:text-purple-800">
                  Check Refinance →
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link href="/tools" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
              View All Financial Tools
            </Link>
          </div>
        </div>

        {/* Author & Trust Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            {author && <AuthorByline author={author} lastUpdated="January 2026" />}
          </div>
          <div>
            <TrustBadges />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8">
          <FinancialDisclaimer type="calculator" />
        </div>

        {/* Data Sources */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Data Sources & Methodology
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Calculation Standards:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>Standard amortization formula verified by <a href="https://www.consumerfinance.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Consumer Financial Protection Bureau</a></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>PMI calculations based on industry standards (0.5-1% annually)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>Property tax data from <a href="https://www.census.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">U.S. Census Bureau</a></span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Additional Resources:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">→</span>
                  <span><a href="https://www.freddiemac.com/pmms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Freddie Mac</a> - Current mortgage rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">→</span>
                  <span><a href="https://www.fhfa.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">FHFA</a> - Housing finance data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">→</span>
                  <span><a href="https://www.irs.gov/credits-deductions/individuals/mortgage-interest-deduction" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IRS</a> - Mortgage interest deduction info</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">Finance Hub</h5>
              <p className="text-gray-400 dark:text-gray-500">Your trusted source for financial calculators, tools, and insights.</p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Popular Tools</h6>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li><Link href="/calculators/mortgage" className="hover:text-white">Mortgage Calculator</Link></li>
                <li><Link href="/calculators/investment" className="hover:text-white">Investment Calculator</Link></li>
                <li><Link href="/calculators/retirement" className="hover:text-white">Retirement Planning</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Resources</h6>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li><Link href="/blog" className="hover:text-white">Financial Blog</Link></li>
                <li><Link href="/tools" className="hover:text-white">All Tools</Link></li>
                <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Company</h6>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>&copy; 2026 Finance Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}