import React from 'react'

export interface Logo3DProps {
  size?: number | string
  shape?: 'circle' | 'rounded'
  speed?: number
  className?: string
  glow?: boolean
  depth?: number
  pauseOnHover?: boolean
}

export const Logo3D: React.FC<Logo3DProps> = ({
  size = 42,
  shape = 'rounded',
  speed = 8,
  className = '',
  glow = true,
  depth = 6,
  pauseOnHover = false,
}) => {
  const numericSize = typeof size === 'number' ? `${size}px` : size
  const borderRadius = shape === 'circle' ? '9999px' : '16px'

  return (
    <div
      className={`logo-3d-wrapper relative inline-block shrink-0 select-none ${className}`}
      style={{
        width: numericSize,
        height: numericSize,
        perspective: '1000px',
      }}
    >
      {/* Ambient 3D Glow Backlight */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-75 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(circle, rgba(0, 163, 255, 0.5) 0%, rgba(0, 85, 255, 0.2) 65%, transparent 100%)',
            transform: 'scale(1.22)',
          }}
        />
      )}

      {/* Rotating 3D Object with 360° Continuous Turn */}
      <div
        className={`logo-3d-flipper w-full h-full relative ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          animation: `logoRotate360 ${speed}s linear infinite`,
        }}
      >
        {/* Extruded Rim / Mid Layer for 3D Volumetric Thickness */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: 'translateZ(0px)',
            borderRadius,
            background:
              'linear-gradient(135deg, #0055FF 0%, #002B80 40%, #00A3FF 80%, #0040CC 100%)',
            border: '2px solid rgba(0, 163, 255, 0.7)',
            boxShadow: '0 0 14px rgba(0, 85, 255, 0.5)',
          }}
        />

        {/* Front Face (Facing Viewer at 0deg) */}
        <div
          className="absolute inset-0 overflow-hidden shadow-2xl"
          style={{
            transform: `translateZ(${depth}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius,
            backgroundColor: '#050814',
            border: '1.5px solid rgba(0, 163, 255, 0.75)',
            boxShadow: '0 4px 16px rgba(0, 85, 255, 0.4)',
          }}
        >
          <img
            src="/jbr-logo.jpg"
            alt="JBR Digital 3D Logo"
            className="w-full h-full object-cover object-center pointer-events-none"
            draggable={false}
          />
          {/* Holographic light sweep reflection */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.32) 50%, transparent 80%)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>

        {/* Back Face (Flipped 180deg so it displays upright upon full rotation) */}
        <div
          className="absolute inset-0 overflow-hidden shadow-2xl"
          style={{
            transform: `rotateY(180deg) translateZ(${depth}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius,
            backgroundColor: '#050814',
            border: '1.5px solid rgba(0, 163, 255, 0.75)',
            boxShadow: '0 4px 16px rgba(0, 85, 255, 0.4)',
          }}
        >
          <img
            src="/jbr-logo.jpg"
            alt="JBR Digital 3D Logo"
            className="w-full h-full object-cover object-center pointer-events-none"
            draggable={false}
          />
          {/* Holographic light sweep reflection */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.32) 50%, transparent 80%)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Logo3D
