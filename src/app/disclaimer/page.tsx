import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Disclaimer - Finance Hub',
  description: 'Important disclaimers regarding financial information and calculators on Finance Hub. Please read before using our financial tools.',
  keywords: 'financial disclaimer, investment disclaimer, calculator disclaimer, financial advice',
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Disclaimer</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Last updated: January 10, 2026</p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
          {/* Critical Warning */}
          <section className="bg-red-50 dark:bg-red-900/40 border-l-4 border-red-500 p-6 rounded-r-lg">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">Important Legal Notice</h2>
            </div>
            <p className="text-red-700 dark:text-red-300 leading-relaxed font-semibold">
              The information provided on Finance Hub is for educational and informational purposes only. It is not intended as, and should not be considered, professional financial, investment, tax, or legal advice.
            </p>
          </section>

          {/* Financial Advice Disclaimer */}
          <section>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Advice Disclaimer</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Not Professional Advice</h3>
                <ul className="text-yellow-700 dark:text-yellow-300 space-y-2">
                  <li>• Finance Hub does not provide personalized financial advice</li>
                  <li>• We are not licensed financial advisors, brokers, or investment professionals</li>
                  <li>• Content is general in nature and may not be suitable for your specific situation</li>
                  <li>• Always consult with qualified professionals before making financial decisions</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Recommended Professional Consultation</h3>
                <p className="text-blue-700 dark:text-blue-300 mb-3">Before making significant financial decisions, please consult with:</p>
                <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Certified Financial Planners (CFP)</li>
                  <li>• Licensed Investment Advisors</li>
                  <li>• Tax Professionals (CPA, EA)</li>
                  <li>• Estate Planning Attorneys</li>
                  <li>• Insurance Specialists</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Calculator Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🔧 Calculator Disclaimers</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 dark:bg-purple-900/30 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
                    <span className="inline-flex items-center">
                      <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mortgage Calculator
                    </span>
                  </h3>
                  <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
                    <li>• Estimates only - actual rates vary</li>
                    <li>• Does not include PMI, taxes, insurance</li>
                    <li>• Interest rates change frequently</li>
                    <li>• Lender terms may differ significantly</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/30 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                    <span className="inline-flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Investment Calculator
                    </span>
                  </h3>
                  <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                    <li>• Past performance doesn't predict future results</li>
                    <li>• Assumes consistent returns (unrealistic)</li>
                    <li>• Doesn't account for inflation</li>
                    <li>• Market volatility not considered</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-900/30 p-5 rounded-lg">
                  <div className="flex items-center mb-3">
                    <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">Loan Calculator</h3>
                  </div>
                  <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1">
                    <li>• Basic calculations only</li>
                    <li>• Excludes fees and penalties</li>
                    <li>• Credit score impacts not included</li>
                    <li>• Variable rate changes not considered</li>
                  </ul>
                </div>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
                    <span className="inline-flex items-center">
                      <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      All Calculators
                    </span>
                  </h3>
                  <ul className="text-indigo-700 dark:text-indigo-300 text-sm space-y-1">
                    <li>• For estimation purposes only</li>
                    <li>• Results may contain computational errors</li>
                    <li>• Simplified models used</li>
                    <li>• Not suitable for legal documentation</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">
                  <span className="inline-flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Calculator Accuracy Warning
                  </span>
                </h3>
                <p className="text-red-700 dark:text-red-300 leading-relaxed">
                  <strong>Important:</strong> While we strive for accuracy, our calculators use simplified models and assumptions that may not reflect real-world conditions. Actual results may vary significantly. Always verify calculations independently and obtain official quotes from financial institutions.
                </p>
              </div>
            </div>
          </section>

          {/* Investment Disclaimers */}
          <section>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Risk Disclaimers</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Market Risk Warning</h3>
                </div>
                <ul className="text-red-700 dark:text-red-300 space-y-2">
                  <li>• All investments involve risk of loss</li>
                  <li>• Past performance does not guarantee future results</li>
                  <li>• Investment values can go down as well as up</li>
                  <li>• You may lose some or all of your invested capital</li>
                  <li>• Diversification does not guarantee against loss</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3">
                  <span className="inline-flex items-center">
                    <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    Specific Risk Factors
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-orange-700 dark:text-orange-300 space-y-1 text-sm">
                    <li>• Market volatility risk</li>
                    <li>• Inflation risk</li>
                    <li>• Interest rate risk</li>
                    <li>• Currency risk</li>
                  </ul>
                  <ul className="text-orange-700 dark:text-orange-300 space-y-1 text-sm">
                    <li>• Credit risk</li>
                    <li>• Liquidity risk</li>
                    <li>• Political/regulatory risk</li>
                    <li>• Sector concentration risk</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Information Accuracy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📚 Information Accuracy</h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  While we make reasonable efforts to provide accurate and up-to-date information, we make no representations or warranties of any kind about:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>The completeness, accuracy, or reliability of information</li>
                  <li>The availability or operation of our calculators</li>
                  <li>That our content is error-free or up-to-date</li>
                  <li>The suitability of information for any particular purpose</li>
                </ul>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded">
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    <strong>
                      <svg className="w-4 h-4 text-yellow-500 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM6 10a1 1 0 01-1 1H4a1 1 0 110-2h1a1 1 0 011 1zM6.464 14.95A1 1 0 105.05 13.536l-.707.707a1 1 0 001.414 1.414l.707-.707zM10 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM14.95 13.536a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 5a3 3 0 000 6 3 3 0 000-6z" />
                      </svg>
                      Best Practice:
                    </strong> Always verify important financial information from multiple sources and consult with professionals before making decisions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tax and Legal */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">⚖️ Tax and Legal Disclaimers</h2>
            <div className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">Tax Information</h3>
                <ul className="text-purple-700 dark:text-purple-300 space-y-2">
                  <li>• Tax laws are complex and change frequently</li>
                  <li>• Information may not reflect current tax regulations</li>
                  <li>• Tax implications vary by individual circumstances</li>
                  <li>• Always consult a qualified tax professional</li>
                </ul>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Legal Information</h3>
                <ul className="text-indigo-700 dark:text-indigo-300 space-y-2">
                  <li>• No attorney-client relationship is created</li>
                  <li>• Information is not legal advice</li>
                  <li>• Laws vary by jurisdiction</li>
                  <li>• Consult an attorney for legal matters</li>
                </ul>
              </div>
            </div>
          </section>

          {/* External Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🔗 External Links and Third Parties</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg">
              <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed mb-4">
                Our website may contain links to third-party websites or services. We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>Content, accuracy, or practices of external websites</li>
                <li>Privacy policies or terms of third-party services</li>
                <li>Products or services offered by external providers</li>
                <li>Any damages resulting from use of third-party services</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🛡️ Limitation of Liability</h2>
            <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-red-700 dark:text-red-300 leading-relaxed mb-4">
                <strong>To the maximum extent permitted by law, Finance Hub and its operators shall not be liable for any:</strong>
              </p>
              <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-1">
                <li>Financial losses resulting from use of our calculators or information</li>
                <li>Investment decisions based on our content</li>
                <li>Errors or omissions in calculations or information</li>
                <li>Interruption or unavailability of services</li>
                <li>Consequences of relying on our estimates or projections</li>
              </ul>
            </div>
          </section>

          {/* Updates and Changes */}
          <section>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Updates and Changes</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              This disclaimer may be updated periodically. Continued use of our website after changes indicates acceptance of the updated disclaimer. We recommend reviewing this page regularly for any changes.
            </p>
          </section>

          <section className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Questions About This Disclaimer</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              If you have questions about this disclaimer or need clarification on any points, please contact us:
            </p>
            <div className="text-gray-600 dark:text-gray-300">
              <p>Email: legal@financehub.com</p>
              <p>Contact Page: <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Us</Link></p>
            </div>
          </section>

          <section className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center mb-3">
              <svg className="w-6 h-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <h2 className="text-xl font-bold text-green-800 dark:text-green-200">Acknowledgment</h2>
            </div>
            <p className="text-green-700 dark:text-green-300 leading-relaxed">
              By using Finance Hub, you acknowledge that you have read, understood, and agree to this disclaimer. You understand the limitations and risks associated with using our tools and information.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="text-2xl font-bold mb-4 block">Finance Hub</Link>
            <div className="flex justify-center space-x-6">
              <Link href="/privacy" className="text-gray-400 dark:text-gray-500 hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 dark:text-gray-500 hover:text-white">Terms of Service</Link>
              <Link href="/contact" className="text-gray-400 dark:text-gray-500 hover:text-white">Contact Us</Link>
              <Link href="/about" className="text-gray-400 dark:text-gray-500 hover:text-white">About Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}