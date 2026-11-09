import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, ArrowDown, Flag } from 'lucide-react'

interface Slide {
  image: string
  titleKey: string
  title2Key: string
  descKey: string
}

const slides: Slide[] = [
  {
    image: '/hero-slide-1.jpg',
    titleKey: 'hero.slide1_title',
    title2Key: 'hero.slide1_title2',
    descKey: 'hero.slide1_desc',
  },
  {
    image: '/hero-slide-2.jpg',
    titleKey: 'hero.slide2_title',
    title2Key: 'hero.slide2_title2',
    descKey: 'hero.slide2_desc',
  },
  {
    image: '/hero-slide-3.jpg',
    titleKey: 'hero.slide3_title',
    title2Key: 'hero.slide3_title2',
    descKey: 'hero.slide3_desc',
  },
]

const HeroSlider: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 100)
  }, [animating])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo])

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(next, 6000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [next])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 6000)
  }, [next])

  const handlePrev = () => { prev(); resetTimer() }
  const handleNext = () => { next(); resetTimer() }
  const handleDot = (i: number) => { goTo(i); resetTimer() }

  const scrollDown = () => {
    const el = document.getElementById('services-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="hero-slider" aria-label="Hero slider" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Slides */}
      {slides.map((slide, i) => (
        <div key={i} className={`hero-slide ${i === current ? 'active' : ''}`}>
          <img
            src={slide.image}
            alt=""
            className="hero-slide-bg"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="hero-overlay" />
        </div>
      ))}



      {/* Content */}
      <div className="hero-content">
        <div className="section-container" style={{ width: '100%' }}>
          <div style={{ maxWidth: '600px' }}>
            {/* Badge */}
            <div
              className="hero-badge animate-fade-up animate-delay-1"
            >
              <Flag size={13} style={{ color: '#D6A85F' }} />
              {t('hero.badge')}
            </div>

            {/* Title */}
            <h1
              className="hero-title animate-fade-up animate-delay-2"
              style={{ color: '#fff' }}
            >
              <span>{t(slides[current].titleKey)}</span>
              <br />
              <span className="gradient-text">{t(slides[current].title2Key)}</span>
            </h1>

            {/* Desc */}
            <p className="hero-desc animate-fade-up animate-delay-3">
              {t(slides[current].descKey)}
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-up animate-delay-4"
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <Link
                to="/contact"
                className="btn-primary"
              >
                <ChevronRight size={16} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                {t('hero.cta_primary')}
              </Link>
              <Link
                to="/projects"
                className="btn-secondary"
                style={{ color: '#fff', borderColor: 'rgba(221,229,239,0.3)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--accent)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(221,229,239,0.3)'
                  ;(e.currentTarget as HTMLElement).style.color = '#fff'
                }}
              >
                {t('hero.cta_secondary')}
                <ChevronRight size={16} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide counter + arrows */}
      <div className="slider-arrows">
        <button
          className="slider-arrow-btn"
          onClick={isRTL ? handleNext : handlePrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="slider-counter">
          <span style={{ color: 'var(--silver)' }}>
            {String(current + 1).padStart(2, '0')}
          </span>
          <span style={{ color: 'rgba(221,229,239,0.4)', fontSize: '0.75rem' }}>
            {' '}/{' '}{String(slides.length).padStart(2, '0')}
          </span>
        </div>
        <button
          className="slider-arrow-btn"
          onClick={isRTL ? handlePrev : handleNext}
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Dots */}
      <div className="slider-dots" role="tablist" aria-label="Slide navigation">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === current ? 'active' : ''}`}
            onClick={() => handleDot(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <button
        className="scroll-indicator"
        onClick={scrollDown}
        aria-label="Scroll down"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'rgba(221,229,239,0.6)', textTransform: 'uppercase' }}>
          {t('hero.scroll_down')}
        </span>
        <div className="scroll-indicator-circle">
          <ArrowDown size={14} style={{ color: 'rgba(221,229,239,0.8)' }} />
        </div>
      </button>

      {/* Laser line slider progress (ghada w katkhtafi mn lore) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'rgba(221,229,239,0.08)',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 10,
      }}>
        <div
          key={current}
          className={`h-full absolute top-0 ${isRTL ? 'hero-laser-line-rtl' : 'hero-laser-line-ltr'}`}
          style={{
            width: '30%',
            animation: isRTL ? 'laserLineRTL 6s linear forwards' : 'laserLineLTR 6s linear forwards',
          }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  )
}

export default HeroSlider
