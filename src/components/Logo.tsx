import Link from 'next/link'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        {/* Gradient Circle Background */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 flex items-center justify-center shadow-lg">
          {/* Dollar Sign */}
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" 
            />
          </svg>
        </div>
        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
      </div>
      
      {/* Text Logo */}
      <div className="flex flex-col leading-none">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Finance Hub
        </span>
        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">
          Smart Money Tools
        </span>
      </div>
    </Link>
  )
}
