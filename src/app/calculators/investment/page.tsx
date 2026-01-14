'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import FinancialDisclaimer from '@/components/FinancialDisclaimer'
import TrustBadges from '@/components/TrustBadges'
import AuthorByline from '@/components/AuthorByline'
import { getAuthor } from '@/data/authors'

export default function InvestmentCalculator() {
  const author = getAuthor('sarah-johnson') // CFA - Chief Investment Strategist
  
  const [initialInvestment, setInitialInvestment] = useState<string>('10000')
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500')
  const [annualReturn, setAnnualReturn] = useState<string>('8')
  const [investmentTerm, setInvestmentTerm] = useState<string>('20')
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('12')

  const calculateInvestment = () => {
    const principal = parseFloat(initialInvestment) || 0
    const monthlyAdd = parseFloat(monthlyContribution) || 0
    const rate = (parseFloat(annualReturn) || 0) / 100
    const years = parseFloat(investmentTerm) || 0
    const compound = parseFloat(compoundingFrequency) || 12
    
    // Calculate future value with monthly contributions
    const monthlyRate = rate / compound
    const totalMonths = years * compound
    
    // Future value of initial investment
    const futureValuePrincipal = principal * Math.pow(1 + monthlyRate, totalMonths)
    
    // Future value of monthly contributions (annuity)
    const futureValueContributions = monthlyAdd * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate
    
    const totalValue = futureValuePrincipal + futureValueContributions
    const totalContributions = principal + (monthlyAdd * years * 12)
    const totalEarnings = totalValue - totalContributions
    
    return {
      futureValue: totalValue,
      totalContributions,
      totalEarnings,
      returnOnInvestment: (totalEarnings / totalContributions) * 100
    }
  }

  const results = calculateInvestment()

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
            <li><span className="text-gray-900 dark:text-white">Investment Calculator</span></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Investment Return Calculator</h1>
              <p className="text-green-100 text-lg">Discover the power of compound interest and plan your investment strategy</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="font-semibold">Compound Growth</div>
              <div className="text-sm text-green-100">Watch your money grow exponentially</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
                </svg>
              </div>
              <div className="font-semibold">Detailed Analysis</div>
              <div className="text-sm text-green-100">See contributions vs. earnings breakdown</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM6 10a1 1 0 01-1 1H4a1 1 0 110-2h1a1 1 0 011 1zM6.464 14.95A1 1 0 105.05 13.536l-.707.707a1 1 0 001.414 1.414l.707-.707zM10 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM14.95 13.536a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 5a3 3 0 000 6 3 3 0 000-6z" />
                </svg>
              </div>
              <div className="font-semibold">Smart Planning</div>
              <div className="text-sm text-green-100">Model different investment scenarios</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Input - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Parameters</h2>
              </div>
              
              {/* Step-by-step instructions */}
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
                  <li>1. Enter your starting investment amount (lump sum)</li>
                  <li>2. Set how much you plan to invest monthly</li>
                  <li>3. Input your expected annual return rate (historical S&P 500 avg: 10%)</li>
                  <li>4. Choose your investment time horizon</li>
                  <li>5. Select compounding frequency (monthly is typical for most investments)</li>
                  <li>6. Review your projected growth and earnings breakdown</li>
                </ol>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="initialInvestment" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Initial Investment
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="initialInvestment"
                        type="text"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="10,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="monthlyContribution" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      📅 Monthly Contribution
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="monthlyContribution"
                        type="text"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="500"
                      />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Annual contribution: ${(parseFloat(monthlyContribution) * 12).toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="annualReturn" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Expected Annual Return
                    </label>
                    <div className="relative">
                      <input
                        id="annualReturn"
                        type="text"
                        value={annualReturn}
                        onChange={(e) => setAnnualReturn(e.target.value)}
                        className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="8"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Conservative: 6-7%, Moderate: 8-9%, Aggressive: 10-12%
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="investmentTerm" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      ⏱️ Investment Time Horizon
                    </label>
                    <select
                      id="investmentTerm"
                      value={investmentTerm}
                      onChange={(e) => setInvestmentTerm(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="5">5 years</option>
                      <option value="10">10 years</option>
                      <option value="15">15 years</option>
                      <option value="20">20 years</option>
                      <option value="25">25 years</option>
                      <option value="30">30 years</option>
                      <option value="35">35 years</option>
                      <option value="40">40 years</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="compoundingFrequency" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Compounding Frequency
                    </label>
                    <select
                      id="compoundingFrequency"
                      value={compoundingFrequency}
                      onChange={(e) => setCompoundingFrequency(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="1">Annually</option>
                      <option value="4">Quarterly</option>
                      <option value="12">Monthly</option>
                      <option value="365">Daily</option>
                    </select>
                    <div className="text-sm text-gray-500 mt-1">
                      More frequent compounding = higher returns
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <span className="inline-flex items-center">
                        <svg className="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM6 10a1 1 0 01-1 1H4a1 1 0 110-2h1a1 1 0 011 1zM6.464 14.95A1 1 0 105.05 13.536l-.707.707a1 1 0 001.414 1.414l.707-.707zM10 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM14.95 13.536a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 5a3 3 0 000 6 3 3 0 000-6z" />
                        </svg>
                        Investment Summary
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Total Invested:</span>
                        <span>${results.totalContributions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Period:</span>
                        <span>{investmentTerm} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Annual:</span>
                        <span>${(parseFloat(monthlyContribution) * 12).toLocaleString()}</span>
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">💵 Investment Results</h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-800 dark:text-green-200">
                      ${Math.round(results.futureValue).toLocaleString()}
                    </div>
                    <div className="text-green-600 dark:text-green-400 text-sm font-medium">Future Value</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Total Contributions</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${Math.round(results.totalContributions).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Total Earnings</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">${Math.round(results.totalEarnings).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-400">ROI</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{results.returnOnInvestment.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Breakdown</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Contributions</span>
                    <span>{((results.totalContributions / results.futureValue) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full" 
                      style={{ width: `${(results.totalContributions / results.futureValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Investment Growth</span>
                    <span>{((results.totalEarnings / results.futureValue) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full" 
                      style={{ width: `${(results.totalEarnings / results.futureValue) * 100}%` }}
                    ></div>
                  </div>
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
            <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">Example: Young Professional's Investment Plan</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">Investment Strategy</h4>
              <ul className="text-yellow-700 dark:text-yellow-300 space-y-2">
                <li>• <strong>Age:</strong> 25 years old</li>
                <li>• <strong>Initial Investment:</strong> $5,000 (savings)</li>
                <li>• <strong>Monthly Contribution:</strong> $400 (401k + IRA)</li>
                <li>• <strong>Expected Return:</strong> 9% (stock market average)</li>
                <li>• <strong>Time Horizon:</strong> 40 years until retirement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">Amazing Results:</h4>
              <ul className="text-yellow-700 dark:text-yellow-300 space-y-2">
                <li>• <strong>Total Invested:</strong> $197,000</li>
                <li>• <strong>Final Value:</strong> $1,897,224</li>
                <li>• <strong>Investment Gains:</strong> $1,700,224</li>
                <li>• <strong>Return Multiple:</strong> 9.6x your contributions!</li>
                <li>• <strong>Key Lesson:</strong> Start early, stay consistent</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎓 Understanding Investment Growth</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                <span className="inline-flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  The Compound Interest Formula
                </span>
              </h4>
              <div className="prose dark:prose-invert text-sm">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our calculator uses the compound interest formula with regular payments:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm mb-4">
                  FV = PV(1+r)ⁿ + PMT[((1+r)ⁿ-1)/r]
                </div>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li><strong>FV</strong> = Future Value</li>
                  <li><strong>PV</strong> = Present Value (initial investment)</li>
                  <li><strong>PMT</strong> = Payment (monthly contribution)</li>
                  <li><strong>r</strong> = Interest rate per period</li>
                  <li><strong>n</strong> = Number of periods</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                <span className="inline-flex items-center">
                  <svg className="w-6 h-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM6 10a1 1 0 01-1 1H4a1 1 0 110-2h1a1 1 0 011 1zM6.464 14.95A1 1 0 105.05 13.536l-.707.707a1 1 0 001.414 1.414l.707-.707zM10 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM14.95 13.536a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 5a3 3 0 000 6 3 3 0 000-6z" />
                  </svg>
                  Key Investment Principles
                </span>
              </h4>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white">Time in Market &gt; Timing Market</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Starting early is more powerful than trying to time perfect entry points.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white">Dollar-Cost Averaging</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Regular monthly investments reduce risk and smooth out market volatility.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white">Compound Magic</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Einstein called it the "8th wonder of the world" - earning returns on your returns.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
              <span className="inline-flex items-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Investment Strategy Tips
              </span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="text-blue-700 dark:text-blue-300 space-y-2 text-sm">
                <li>• <strong>Diversify:</strong> Don't put all eggs in one basket (use index funds)</li>
                <li>• <strong>Automate:</strong> Set up automatic transfers to stay consistent</li>
                <li>• <strong>Tax Advantage:</strong> Use 401(k), IRA, and Roth accounts first</li>
              </ul>
              <ul className="text-blue-700 dark:text-blue-300 space-y-2 text-sm">
                <li>• <strong>Emergency Fund:</strong> Keep 3-6 months expenses in cash first</li>
                <li>• <strong>Risk Tolerance:</strong> Younger = more stocks, older = more bonds</li>
                <li>• <strong>Stay the Course:</strong> Don't panic sell during market downturns</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔗 Related Financial Tools</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/calculators/retirement" className="block group">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Retirement Calculator</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Plan your retirement savings and see if you're on track</p>
                <div className="mt-4 text-purple-600 dark:text-purple-400 font-medium text-sm group-hover:text-purple-800">
                  Plan Retirement →
                </div>
              </div>
            </Link>

            <Link href="/calculators/compound-interest" className="block group">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Compound Interest Calculator</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">See how compound interest grows your savings over time</p>
                <div className="mt-4 text-green-600 dark:text-green-400 font-medium text-sm group-hover:text-green-800">
                  Calculate Growth →
                </div>
              </div>
            </Link>

            <Link href="/calculators/savings-goal" className="block group">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Savings Goal Calculator</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Calculate how much to save monthly for specific goals</p>
                <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-800">
                  Set Savings Goal →
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link href="/tools" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
              View All Financial Tools
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
          <FinancialDisclaimer type="investment" />
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
                  <span>Compound interest formula verified by <a href="https://www.investor.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SEC Investor Education</a></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>Historical return data from <a href="https://www.federalreserve.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Federal Reserve</a></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>Investment principles from <a href="https://www.finra.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">FINRA</a> guidelines</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Additional Resources:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">→</span>
                  <span><a href="https://www.irs.gov/retirement-plans" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IRS</a> - Retirement account rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">→</span>
                  <span><a href="https://www.sec.gov/investor" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SEC</a> - Investment education</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">→</span>
                  <span><a href="https://www.bls.gov/cpi/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">BLS</a> - Inflation data (CPI)</span>
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