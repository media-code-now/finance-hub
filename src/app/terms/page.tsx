import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Terms of Service - Finance Hub',
  description: 'Finance Hub Terms of Service. Review our terms and conditions for using our financial calculators and educational resources.',
  keywords: 'terms of service, user agreement, financial terms, website terms',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Last updated: January 10, 2026</p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Agreement to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              By accessing and using Finance Hub ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Use License</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Permission is granted to temporarily download one copy of the materials on Finance Hub's website for personal, non-commercial transitory viewing only.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">This license grants you the right to:</h3>
                <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1">
                  <li>Use our financial calculators for personal financial planning</li>
                  <li>Read and share our educational content</li>
                  <li>Access our blog and resources for informational purposes</li>
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">This license does NOT permit you to:</h3>
                <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-1">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for commercial purposes</li>
                  <li>Remove copyright or proprietary notations</li>
                  <li>Transfer the materials to another person</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">Financial Disclaimer</h2>
            </div>
            <div className="space-y-4 text-yellow-700 dark:text-yellow-300">
              <p className="leading-relaxed">
                <strong>Not Financial Advice:</strong> The information provided on Finance Hub is for educational and informational purposes only and should not be considered as professional financial advice.
              </p>
              <p className="leading-relaxed">
                <strong>Calculator Accuracy:</strong> While we strive for accuracy, our financial calculators are tools for estimation only. Actual results may vary significantly based on numerous factors.
              </p>
              <p className="leading-relaxed">
                <strong>Professional Consultation:</strong> Always consult with qualified financial professionals before making significant financial decisions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Responsibilities</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">You agree to:</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Use the website in compliance with all applicable laws</li>
                <li>Provide accurate information when contacting us</li>
                <li>Respect intellectual property rights</li>
                <li>Not engage in unauthorized access or security breaches</li>
                <li>Not use automated systems to access our services excessively</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Prohibited Activities:</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Distributing malware or harmful content</li>
                <li>Impersonating others or providing false information</li>
                <li>Using our services for illegal activities</li>
                <li>Reproducing or redistributing our content without permission</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service Availability</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We strive to maintain consistent service availability but cannot guarantee uninterrupted access. Services may be temporarily unavailable due to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
              <li>Scheduled maintenance and updates</li>
              <li>Technical difficulties or server issues</li>
              <li>Force majeure events beyond our control</li>
              <li>Legal or regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                All content on Finance Hub, including text, graphics, logos, images, and software, is our property or licensed to us and is protected by copyright and other intellectual property laws.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Content Usage Rights</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  You may share our educational content and calculator links for non-commercial purposes, provided you maintain attribution and do not modify the original content.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-red-800 dark:text-red-200 leading-relaxed mb-4">
                  <strong>Important Legal Notice:</strong> To the fullest extent permitted by law, Finance Hub shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our services.
                </p>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">This includes but is not limited to:</h3>
                <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-1 text-sm">
                  <li>Financial losses based on calculator results</li>
                  <li>Decisions made using our educational content</li>
                  <li>Service interruptions or data loss</li>
                  <li>Third-party actions or omissions</li>
                  <li>Errors in information or calculations</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Indemnification</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              You agree to indemnify and hold Finance Hub harmless from any claims, damages, losses, or expenses (including legal fees) arising from your use of our services or violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices. You can find our Privacy Policy at <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">/privacy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Modifications</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Finance Hub may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  <span className="inline-flex items-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM6 10a1 1 0 01-1 1H4a1 1 0 110-2h1a1 1 0 011 1zM6.464 14.95A1 1 0 105.05 13.536l-.707.707a1 1 0 001.414 1.414l.707-.707zM10 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM14.95 13.536a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 5a3 3 0 000 6 3 3 0 000-6z" />
                    </svg>
                    Stay Informed
                  </span>
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  We recommend reviewing these terms periodically. Continued use of our services after changes constitutes acceptance of the updated terms.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Severability</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
            </p>
          </section>

          <section className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="text-gray-600 dark:text-gray-300">
              <p>Email: legal@financehub.com</p>
              <p>Contact Page: <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Us</Link></p>
            </div>
          </section>

          <section className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3">✓ Acknowledgment</h2>
            <p className="text-green-700 dark:text-green-300 leading-relaxed">
              By using Finance Hub, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
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
              <Link href="/contact" className="text-gray-400 dark:text-gray-500 hover:text-white">Contact Us</Link>
              <Link href="/about" className="text-gray-400 dark:text-gray-500 hover:text-white">About Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}