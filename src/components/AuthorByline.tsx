'use client'

import { Author } from '@/data/authors'

interface AuthorBylineProps {
  author: Author
  publishDate?: string
  lastUpdated?: string
}

export default function AuthorByline({ author, publishDate, lastUpdated }: AuthorBylineProps) {
  return (
    <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/10 rounded-r-lg mb-6">
      <div className="flex items-center gap-3 mb-2">
        {/* Author Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {author.name.split(' ').map(n => n[0]).join('')}
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {author.name}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {author.title}
          </p>
        </div>
      </div>

      {/* Credentials */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {author.credentials.slice(0, 2).map((cred, idx) => (
          <span
            key={idx}
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          >
            ✓ {cred}
          </span>
        ))}
      </div>

      {/* Experience & Dates */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          {author.yearsExperience}+ years
        </span>
        {publishDate && (
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Published: {publishDate}
          </span>
        )}
        {lastUpdated && (
          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Updated: {lastUpdated}
          </span>
        )}
      </div>

      {/* Verification Badge */}
      <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Verified Expert</span>
          <span className="text-gray-500">•</span>
          <span>Credentials independently verified by Finance Hub editorial team</span>
        </p>
      </div>
    </div>
  )
}
