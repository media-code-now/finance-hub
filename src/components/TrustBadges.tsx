'use client'

export default function TrustBadges() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
        TRUSTED BY THOUSANDS • VERIFIED EXPERTS
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* CFP Verified */}
        <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <svg className="w-10 h-10 text-green-600 dark:text-green-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-bold text-gray-900 dark:text-white text-center">CFP® Certified</span>
          <span className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">Verified Experts</span>
        </div>

        {/* Data Security */}
        <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <svg className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-bold text-gray-900 dark:text-white text-center">Secure & Private</span>
          <span className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">No Data Stored</span>
        </div>

        {/* Industry Standard */}
        <div className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <svg className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-bold text-gray-900 dark:text-white text-center">Industry Formulas</span>
          <span className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">IRS Verified</span>
        </div>

        {/* Regularly Updated */}
        <div className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <svg className="w-10 h-10 text-orange-600 dark:text-orange-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-bold text-gray-900 dark:text-white text-center">Updated Quarterly</span>
          <span className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">Current Laws</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">75+</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Years Experience</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">10K+</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Users Served</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">100%</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Free Tools</div>
        </div>
      </div>
    </div>
  )
}
