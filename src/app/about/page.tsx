import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import AuthorCard from '@/components/AuthorCard'
import { getAllAuthors } from '@/data/authors'

export const metadata: Metadata = {
  title: 'About Us - Finance Hub | Expert Financial Advisors & Analysts',
  description: 'Meet our team of CFP®, CFA®, and CPA certified financial experts with 75+ years combined experience. Learn about our mission to provide trusted financial guidance.',
  keywords: 'about finance hub, financial experts, CFP, CFA, CPA, certified financial planners, financial advisors, expert team',
}

export default function AboutPage() {
  const authors = getAllAuthors()
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Finance Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
            Your trusted partner in financial education and planning, backed by certified financial experts with 75+ years of combined experience.
          </p>
          
          {/* Credentials Badge */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-md border-2 border-green-500">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-gray-900 dark:text-white">CFP® Certified</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-md border-2 border-blue-500">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-gray-900 dark:text-white">CFA® Certified</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-md border-2 border-purple-500">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-gray-900 dark:text-white">CPA Certified</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-md border-2 border-orange-500">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span className="font-bold text-gray-900 dark:text-white">PhD Economics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Finance Hub was created with a simple yet powerful mission: to democratize financial planning by providing free, accurate, and easy-to-use financial calculators and educational resources backed by certified financial professionals.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            We believe that financial literacy should be accessible to all, regardless of background or economic status. Our tools and content are developed by CFP®, CFA®, and CPA certified professionals with decades of combined experience in financial services, investment management, and tax planning.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              <span className="text-blue-600 dark:text-blue-400 font-bold">Our Commitment:</span> Every calculator, article, and piece of advice on Finance Hub is reviewed by certified financial experts to ensure accuracy, compliance with current financial regulations, and alignment with industry best practices.
            </p>
          </div>
        </section>

        {/* Expert Team Section */}
        <section className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Expert Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our team consists of certified financial professionals with credentials from leading industry organizations and decades of real-world experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {authors.map(author => (
              <AuthorCard key={author.id} author={author} showFull={true} />
            ))}
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white text-center">
              <div className="text-4xl font-bold mb-2">75+</div>
              <div className="text-sm">Years Combined Experience</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white text-center">
              <div className="text-4xl font-bold mb-2">8</div>
              <div className="text-sm">Professional Certifications</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white text-center">
              <div className="text-4xl font-bold mb-2">$2B+</div>
              <div className="text-sm">Assets Advised</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white text-center">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-sm">Clients Served</div>
            </div>
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Editorial Standards</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            We maintain the highest standards of accuracy and integrity in all our content. Here's how we ensure quality:
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Expert Review</h3>
                <p className="text-gray-600 dark:text-gray-300">All content is written or reviewed by certified financial professionals (CFP®, CFA®, CPA) with relevant expertise.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Verified Calculations</h3>
                <p className="text-gray-600 dark:text-gray-300">Our calculators use industry-standard formulas verified against IRS publications, financial institution guidelines, and academic research.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Authoritative Sources</h3>
                <p className="text-gray-600 dark:text-gray-300">We cite data from trusted sources including Federal Reserve, IRS, Bureau of Labor Statistics, and leading financial research institutions.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Regular Updates</h3>
                <p className="text-gray-600 dark:text-gray-300">Content is reviewed quarterly and updated to reflect current tax laws, interest rates, and financial regulations.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Clear Disclaimers</h3>
                <p className="text-gray-600 dark:text-gray-300">We clearly distinguish between educational content and personalized financial advice, always recommending consultation with qualified professionals for individual situations.</p>
              </div>
            </div>
          </div>
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