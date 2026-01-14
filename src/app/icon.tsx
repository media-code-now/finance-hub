import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #2563EB 0%, #9333EA 50%, #2563EB 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '25%',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
        }}
      >
        <svg 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}