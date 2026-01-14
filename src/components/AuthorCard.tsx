'use client'

import { Author } from '@/data/authors'
import Link from 'next/link'

interface AuthorCardProps {
  author: Author
  showFull?: boolean
}

export default function AuthorCard({ author, showFull = false }: AuthorCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start gap-4">
        {/* Author Image Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {author.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {author.name}
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
            {author.title}
          </p>

          {/* Credentials */}
          <div className="flex flex-wrap gap-2 mb-3">
            {author.credentials.slice(0, showFull ? undefined : 2).map((cred, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              >
                ✓ {cred}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
            {author.bio}
          </p>

          {/* Experience Badge */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              {author.yearsExperience}+ years experience
            </span>
          </div>

          {showFull && (
            <>
              {/* Expertise Areas */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Areas of Expertise:
                </p>
                <div className="flex flex-wrap gap-2">
                  {author.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Education:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {author.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Publications */}
              {author.publications && author.publications.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Recent Publications:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {author.publications.map((pub, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" /><path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg>
                        {pub}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Social Links */}
          <div className="flex items-center gap-3 mt-4">
            {author.linkedIn && (
              <Link
                href={author.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                LinkedIn →
              </Link>
            )}
            {author.twitter && (
              <Link
                href={`https://twitter.com/${author.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                Twitter →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
