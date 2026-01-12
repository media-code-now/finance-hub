'use client'

import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  onClose: () => void
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000) // Auto-close after 5 seconds
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-blue-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 max-w-md">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">Breaking News</p>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

interface NewBadgeProps {
  publishedDate: Date
}

export function NewBadge({ publishedDate }: NewBadgeProps) {
  const isNew = (Date.now() - publishedDate.getTime()) < 30 * 60 * 1000 // 30 minutes

  if (!isNew) return null

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-500 text-white animate-pulse">
      NEW
    </span>
  )
}
