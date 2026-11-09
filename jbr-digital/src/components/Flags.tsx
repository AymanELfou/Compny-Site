import React from 'react'

export const FlagQatar: React.FC<{ size?: number; className?: string }> = ({
  size = 22,
  className = '',
}) => {
  const width = size
  const height = Math.round(size * 0.66)
  return (
    <span
      className={`flag-animated flag-qatar inline-flex items-center justify-center rounded-xs overflow-hidden shadow-xs shrink-0 cursor-pointer ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: '1px solid rgba(255, 255, 255, 0.22)',
      }}
      title="Qatar"
      aria-label="Qatar Flag"
    >
      <svg
        viewBox="0 0 28 18"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="28" height="18" fill="#8D1B3D" />
        <path
          d="M0,0 L7.5,0 L10.5,1 L7.5,2 L10.5,3 L7.5,4 L10.5,5 L7.5,6 L10.5,7 L7.5,8 L10.5,9 L7.5,10 L10.5,11 L7.5,12 L10.5,13 L7.5,14 L10.5,15 L7.5,16 L10.5,17 L7.5,18 L0,18 Z"
          fill="#FFFFFF"
        />
      </svg>
    </span>
  )
}

export const FlagMorocco: React.FC<{ size?: number; className?: string }> = ({
  size = 22,
  className = '',
}) => {
  const width = size
  const height = Math.round(size * 0.66)
  return (
    <span
      className={`flag-animated flag-morocco inline-flex items-center justify-center rounded-xs overflow-hidden shadow-xs shrink-0 cursor-pointer ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: '1px solid rgba(255, 255, 255, 0.22)',
      }}
      title="Morocco"
      aria-label="Morocco Flag"
    >
      <svg
        viewBox="0 0 27 18"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="27" height="18" fill="#C1272D" />
        <path
          d="M13.5,4.0 L16.44,13.05 L8.75,7.45 L18.25,7.45 L10.56,13.05 Z"
          fill="none"
          stroke="#006233"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
