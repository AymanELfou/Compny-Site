import React from 'react'
import { Link } from 'react-router-dom'
import Logo3D from './Logo3D'

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const pixelSize = {
    sm: 36,
    md: 44,
    lg: 54,
  }[size]

  return (
    <Link
      to="/"
      className={`group flex items-center gap-3 text-decoration-none transition-all duration-200 ${className}`}
      style={{ textDecoration: 'none' }}
      aria-label="JBR Digital Home"
    >
      {/* Official 3D JBR Logo Badge with 360° continuous rotation */}
      <Logo3D
        size={pixelSize}
        shape="rounded"
        speed={8}
        depth={5}
        glow={true}
      />

      {showText && (
        <div className="flex items-center gap-1.5 shrink-0" dir="ltr" style={{ whiteSpace: 'nowrap' }}>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: size === 'sm' ? '0.88rem' : size === 'lg' ? '1.25rem' : '1.05rem',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}
          >
            JBR
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: size === 'sm' ? '0.88rem' : size === 'lg' ? '1.25rem' : '1.05rem',
              letterSpacing: '-0.02em',
              color: '#0055FF',
            }}
          >
            Digital
          </span>
          <span
            className="signature-gradient-text"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: size === 'sm' ? '0.78rem' : size === 'lg' ? '1.05rem' : '0.9rem',
              letterSpacing: '-0.01em',
            }}
          >
            Software Programming
          </span>
        </div>
      )}
    </Link>
  )
}

export default BrandLogo
