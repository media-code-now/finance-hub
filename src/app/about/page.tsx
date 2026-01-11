import { Metadata } from 'next'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'About Us - Finance Hub',
  description: 'Learn about Finance Hub, our mission to provide free financial tools and resources to help you make informed financial decisions.',
  keywords: 'about finance hub, financial tools, mission, team, financial education',
}

export default function AboutPage() {
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
                <Link href="/calculators" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Calculators</Link>
                <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Blog</Link>
                <Link href="/about" className="text-blue-600 dark:text-blue-400 font-medium">About</Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Finance Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your trusted partner in financial education and planning. We believe everyone deserves access to powerful financial tools and expert insights.
          </p>
        </div>

        {/* Mission Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Finance Hub was created with a simple yet powerful mission: to democratize financial planning by providing free, accurate, and easy-to-use financial calculators and educational resources to everyone.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            We believe that financial literacy should be accessible to all, regardless of background or economic status. Our tools help individuals make informed decisions about mortgages, investments, retirement planning, and budgeting.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Free Calculators</h3>
              <p className="text-gray-600 dark:text-gray-300">Comprehensive financial calculators for mortgages, loans, investments, and retirement planning.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Educational Content</h3>
              <p className="text-gray-600 dark:text-gray-300">Expert insights, market analysis, and educational articles to help you understand financial concepts.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Privacy Focused</h3>
              <p className="text-gray-600 dark:text-gray-300">All calculations are performed locally in your browser. We never store your financial data.</p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                <span className="inline-flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Accuracy
                </span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Our calculators use industry-standard formulas and are regularly updated to ensure precise results.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                <span className="inline-flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Accessibility
                </span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Financial tools should be free and accessible to everyone, regardless of their financial situation.</p>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Privacy</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">We respect your privacy and never collect, store, or share your personal financial information.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">📖 Education</h3>
              <p className="text-gray-600 dark:text-gray-300">We believe in empowering users through education and clear explanations of financial concepts.</p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-blue-600 dark:bg-blue-800 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
          <p className="text-lg mb-6">We'd love to hear from you. Get in touch with any questions, suggestions, or feedback.</p>
          <Link 
            href="/contact" 
            className="bg-white text-blue-600 dark:bg-gray-200 dark:text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-300 transition duration-300"
          >
            Contact Us
          </Link>
        </section>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}