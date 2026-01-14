'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import FinancialDisclaimer from '@/components/FinancialDisclaimer'
import TrustBadges from '@/components/TrustBadges'
import AuthorByline from '@/components/AuthorByline'
import { getAuthor } from '@/data/authors'

export default function LoanCalculator() {
  const author = getAuthor('david-rodriguez') // CPA - Tax & Financial Planning Expert
  
  const [loanAmount, setLoanAmount] = useState<string>('25000')
  const [interestRate, setInterestRate] = useState<string>('5.5')
  const [loanTerm, setLoanTerm] = useState<string>('5')
  const [loanType, setLoanType] = useState<string>('auto')

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount) || 0
    const monthlyRate = (parseFloat(interestRate) || 0) / 100 / 12
    const numberOfPayments = (parseFloat(loanTerm) || 0) * 12
    
    if (monthlyRate === 0) {
      return {
        monthlyPayment: principal / numberOfPayments,
        totalPayment: principal,
        totalInterest: 0
      }
    }
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    
    const totalPayment = monthlyPayment * numberOfPayments
    const totalInterest = totalPayment - principal
    
    return {
      monthlyPayment,
      totalPayment,
      totalInterest
    }
  }

  const results = calculateLoan()

  const loanTypeRates = {
    auto: { min: 3.0, max: 8.0, typical: 5.5 },
    personal: { min: 5.0, max: 15.0, typical: 9.0 },
    student: { min: 3.5, max: 7.0, typical: 5.0 },
    home: { min: 6.0, max: 8.0, typical: 6.5 }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">Finance Hub</Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/calculators" className="text-blue-600 font-medium">Calculators</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
            </nav>
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
            <li><span className="text-gray-900">Loan Calculator</span></li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Loan Calculator</h1>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="loanType" className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Type
                </label>
                <select
                  id="loanType"
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="auto">Auto Loan</option>
                  <option value="personal">Personal Loan</option>
                  <option value="student">Student Loan</option>
                  <option value="home">Home Equity Loan</option>
                </select>
              </div>

              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount ($)
                </label>
                <input
                  type="number"
                  id="loanAmount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="25000"
                />
              </div>

              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (% APR)
                </label>
                <input
                  type="number"
                  id="interestRate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5.5"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Typical {loanType} loan rates: {loanTypeRates[loanType as keyof typeof loanTypeRates].min}% - {loanTypeRates[loanType as keyof typeof loanTypeRates].max}%
                </p>
              </div>

              <div>
                <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term (Years)
                </label>
                <select
                  id="loanTerm"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5 years</option>
                  <option value="6">6 years</option>
                  <option value="7">7 years</option>
                  <option value="10">10 years</option>
                  <option value="15">15 years</option>
                </select>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                <span className="inline-flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM6 10a1 1 0 01-1 1H4a1 1 0 110-2h1a1 1 0 011 1zM6.464 14.95A1 1 0 105.05 13.536l-.707.707a1 1 0 001.414 1.414l.707-.707zM10 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM14.95 13.536a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 5a3 3 0 000 6 3 3 0 000-6z" />
                  </svg>
                  Loan Tips:
                </span>
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Shop around for the best interest rates</li>
                <li>• Consider shorter terms to save on total interest</li>
                <li>• Check your credit score before applying</li>
                <li>• Avoid borrowing more than you need</li>
              </ul>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Summary</h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Monthly Payment</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${results.monthlyPayment.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Loan Details:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Amount</span>
                    <span className="font-medium">${parseFloat(loanAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-medium">{parseFloat(interestRate).toFixed(2)}% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Term</span>
                    <span className="font-medium">{loanTerm} years ({parseFloat(loanTerm) * 12} months)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total of Payments</span>
                    <span className="font-medium">${results.totalPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest Paid</span>
                    <span className="font-medium text-red-600">${results.totalInterest.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Interest vs Principal:</h3>
                <div className="relative bg-gray-100 h-4 rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${(parseFloat(loanAmount) / results.totalPayment) * 100}%`
                    }}
                    title={`Principal: ${((parseFloat(loanAmount) / results.totalPayment) * 100).toFixed(1)}%`}
                  />
                  <div 
                    className="absolute right-0 top-0 h-full bg-red-500 rounded-full"
                    style={{
                      width: `${(results.totalInterest / results.totalPayment) * 100}%`
                    }}
                    title={`Interest: ${((results.totalInterest / results.totalPayment) * 100).toFixed(1)}%`}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Principal ({((parseFloat(loanAmount) / results.totalPayment) * 100).toFixed(1)}%)</span>
                  <span>Interest ({((results.totalInterest / results.totalPayment) * 100).toFixed(1)}%)</span>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Consider These Options:</h4>
                <div className="text-sm text-yellow-700 space-y-2">
                  {parseFloat(loanTerm) > 3 && (
                    <p>• Shortening your loan term to 3 years could save you ${(results.totalInterest - calculateLoan().totalInterest).toFixed(2)} in interest</p>
                  )}
                  {parseFloat(interestRate) > 6 && (
                    <p>• Shop for better rates - even 1% lower could save thousands</p>
                  )}
                  <p>• Consider making extra principal payments to reduce total interest</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Comparison */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Type Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(loanTypeRates).map(([type, rates]) => (
              <div key={type} className="p-4 border rounded-lg hover:shadow-md transition duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                  {type.replace(/([A-Z])/g, ' $1').trim()} Loan
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate Range:</span>
                    <span className="font-medium">{rates.min}% - {rates.max}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Typical Rate:</span>
                    <span className="font-medium">{rates.typical}%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {type === 'auto' && 'Secured by vehicle, typically lower rates'}
                    {type === 'personal' && 'Unsecured, higher rates but flexible use'}
                    {type === 'student' && 'Education loans with potential benefits'}
                    {type === 'home' && 'Secured by home equity, tax deductible'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Calculators */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/calculators/mortgage" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mortgage Calculator</h3>
              <p className="text-gray-600">Calculate home loan payments and compare mortgage options.</p>
            </Link>
            <Link href="/calculators/investment" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Calculator</h3>
              <p className="text-gray-600">Plan your investment strategy with compound interest.</p>
            </Link>
            <Link href="/calculators/budget" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Budget Planner</h3>
              <p className="text-gray-600">Plan your budget and manage loan payments effectively.</p>
            </Link>
          </div>
        </div>

        {/* Author & Trust Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
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
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Data Sources & Methodology
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Calculation Standards:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>Standard loan amortization formulas used by <a href="https://www.consumerfinance.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CFPB</a></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>Interest rate data from <a href="https://www.federalreserve.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Federal Reserve</a></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>APR calculations per federal Truth in Lending Act</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Additional Resources:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">→</span>
                  <span><a href="https://studentaid.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Federal Student Aid</a> - Student loan info</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">→</span>
                  <span><a href="https://www.irs.gov/credits-deductions/individuals/interest-deduction" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IRS</a> - Loan interest deductions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">→</span>
                  <span><a href="https://www.ftc.gov/consumer-advice" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">FTC</a> - Consumer loan protections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}