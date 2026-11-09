import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, ChevronRight, Sun, Moon, Phone } from 'lucide-react'
import TranslateIcon from '@mui/icons-material/Translate'
import BrandLogo from './BrandLogo'
import { useTheme } from '../context/ThemeContext'

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isRTL = i18n.language === 'ar'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  // Automatically close mobile menu if resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lock body scroll and mask header when mobile drawer is open (only on mobile)
  useEffect(() => {
    if (mobileOpen && window.innerWidth <= 900) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('jbd-lang', next)
    document.documentElement.lang = next
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
  }

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/about', label: t('nav.about') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/contact', label: t('nav.contact') },
  ]

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'header-masked-mobile' : ''}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="section-container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '70px',
            }}
          >
            {/* Official Brand Logo */}
            <BrandLogo size="md" />

            {/* Desktop Navigation Links */}
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
              className="desktop-nav"
            >
              {navLinks.map((link) => {
                const active = isActive(link.to)
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: active ? 600 : 500,
                        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'all 0.18s ease',
                        backgroundColor: active ? 'var(--bg-card-hover)' : 'transparent',
                        display: 'block',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          ;(e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                          ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-card)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                          ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Right Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Theme Toggle (Desktop only) */}
              <button
                onClick={toggleTheme}
                className="desktop-control"
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)'
                }}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Language Switch (Desktop only) */}
              <button
                onClick={toggleLang}
                className="desktop-control"
                style={{
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.75rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                }}
                title="Switch language"
                aria-label="Switch language"
              >
                <TranslateIcon sx={{ fontSize: 16 }} />
                <span>{i18n.language === 'en' ? 'ع' : 'EN'}</span>
              </button>

              {/* Primary CTA: Discuss a Project */}
              <Link
                to="/contact"
                className="btn-primary desktop-control"
              >
                <span>{isRTL ? 'ابدأ مشروعك' : 'Discuss a Project'}</span>
                <ChevronRight size={14} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </Link>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="hamburger-btn"
                style={{
                  width: '38px',
                  height: '38px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
                aria-label="Open menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Nav Panel (Drawer) */}
      <div
        className={`mobile-nav-panel ${mobileOpen ? 'open' : ''}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--bg-primary)',
          }}
        >
          <BrandLogo size="sm" />
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav style={{ padding: '1.25rem 1rem', flex: 1, overflowY: 'auto' }}>
          {navLinks.map((link) => {
            const active = isActive(link.to)
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.875rem 1rem',
                  borderRadius: '8px',
                  marginBottom: '0.35rem',
                  color: active ? 'var(--primary)' : 'var(--text-primary)',
                  backgroundColor: active ? 'rgba(0, 85, 255, 0.08)' : 'transparent',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{link.label}</span>
                <ChevronRight
                  size={16}
                  style={{ opacity: 0.5, transform: isRTL ? 'rotate(180deg)' : 'none' }}
                />
              </Link>
            )
          })}

          {/* Primary CTA in Drawer */}
          <div style={{ marginTop: '1.5rem' }}>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '0.9375rem',
                borderRadius: '8px',
              }}
            >
              <span>{isRTL ? 'ابدأ مشروعك' : 'Discuss a Project'}</span>
              <ChevronRight size={16} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
            </Link>
          </div>
        </nav>

        {/* Bottom Drawer Actions */}
        <div
          style={{
            padding: '1.25rem',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {/* Controls row: Theme & Language */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button
              onClick={toggleTheme}
              style={{
                padding: '0.625rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
              }}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>

            <button
              onClick={toggleLang}
              style={{
                padding: '0.625rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
              }}
            >
              <TranslateIcon sx={{ fontSize: 16 }} />
              <span>{i18n.language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>

          {/* Verified Phone Direct Action */}
          <a
            href="tel:+97471377713"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.625rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(0, 85, 255, 0.08)',
              border: '1px solid rgba(0, 85, 255, 0.25)',
              color: 'var(--electric-blue)',
              fontSize: '0.875rem',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <Phone size={14} />
            <span dir="ltr" style={{ direction: 'ltr', unicodeBidi: 'isolate' }}>+974 7137 7713</span>
          </a>

          {/* Tagline */}
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {isRTL ? 'برمجيات وحلول رقمية متطورة' : 'Next-Gen Software & Digital Solutions'}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-control { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .desktop-control { display: inline-flex !important; }
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar
