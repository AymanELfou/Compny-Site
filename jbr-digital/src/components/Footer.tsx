import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MapPin, Mail, Phone, Clock, ChevronRight, FileText, CheckCircle2, X } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { FlagQatar, FlagMorocco } from './Flags'

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; title: string; content: string } | null>(null)

  const services = [
    { name: isRTL ? 'تطوير المواقع والمنصات' : 'Web Development', path: '/services' },
    { name: isRTL ? 'تطبيقات الجوال' : 'Mobile Applications', path: '/services' },
    { name: isRTL ? 'روبوتات واتساب والذكاء الاصطناعي' : 'WhatsApp Bots & AI', path: '/services' },
    { name: isRTL ? 'أنظمة إدارة الأعمال ERP' : 'Business Systems & ERP', path: '/services' },
    { name: isRTL ? 'الدعم الفني والصيانة المستمرة' : 'SLA Maintenance & Support', path: '/services' },
  ]

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/about', label: t('nav.about') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/contact', label: t('nav.contact') },
  ]

  const openLegalModal = (type: 'privacy' | 'terms') => {
    if (type === 'privacy') {
      setLegalModal({
        isOpen: true,
        title: isRTL ? 'سياسة الخصوصية — مسودة قيد المراجعة' : 'Privacy Policy — Working Draft',
        content: isRTL
          ? 'تلتزم شركة JBR Digital بحماية بيانات عملائها وشركائها في دولة قطر والمملكة المغربية بما يتوافق مع القوانين واللوائح السارية هذه الوثيقة مسودة عمل استرشادية تخضع للمراجعة القانونية النهائية'
          : 'JBR Digital is committed to protecting client data privacy across our Qatar and Morocco operations in accordance with applicable regional data protection regulations. This document represents an operational working draft subject to final regulatory review.',
      })
    } else {
      setLegalModal({
        isOpen: true,
        title: isRTL ? 'شروط الخدمة — مسودة تعاقدية' : 'Terms of Service — Working Draft',
        content: isRTL
          ? 'تخضع جميع المشاريع والاتفاقيات البرمجية لعقود رسمية محددة النطاق (SOW) تضمن حقوق الملكية الفكرية وتسليم الشيفرات المصدرية ومعايير الجودة المتفق عليها'
          : 'All engineering engagements and software deliverables are governed by formal Scope of Work (SOW) agreements, establishing strict IP ownership, source code transfer milestones, and verified delivery standards.',
      })
    }
  }

  return (
    <footer
      className="relative border-t border-[var(--border-color)] transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Main Footer Container */}
      <div className="section-container px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand & Verified Presence (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <BrandLogo size="md" />
              </div>
              <p className="text-sm leading-relaxed max-w-md text-[var(--text-secondary)] mb-6">
                {isRTL
                  ? 'نطوّر حلولًا برمجية متكاملة تجمع بين الجودة التقنية والأداء العالي لتلبية احتياجات أعمالك ودعم نموها بكفاءة واستدامة'
                  : 'We develop integrated software solutions combining technical quality and high performance to meet your business needs and drive growth with efficiency and sustainability'}
              </p>

              {/* Verified Direct Channels */}
              <div className="inline-flex flex-wrap items-center gap-2.5 p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] max-w-xl">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/97471377713?text=${encodeURIComponent(
                    isRTL
                      ? 'مرحباً JBR Digital أود الاستفسار عن استشارة تقنية لمشروعي'
                      : 'Hello JBR Digital, I would like to consult with your engineering team regarding a project.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--text-primary)] hover:text-[#25D366] font-medium transition-colors"
                  title="WhatsApp: +974 7137 7713"
                  aria-label="WhatsApp"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                    <path d="M12.031 2C6.513 2 2.025 6.488 2.025 12.006c0 1.956.564 3.784 1.543 5.334L2 22.025l4.825-1.53c1.488.887 3.23 1.393 5.206 1.393 5.518 0 10.006-4.488 10.006-10.006C22.037 6.488 17.549 2 12.031 2zm5.82 14.18c-.244.686-1.42 1.306-1.957 1.38-.513.07-1.18.1-3.418-.832-2.863-1.192-4.708-4.104-4.851-4.296-.144-.192-1.157-1.543-1.157-2.943 0-1.4 0.732-2.09 0.993-2.378.261-.287.57-.36.76-.36.19 0 .38 0 .548.009.177.009.414-.067.647.494.244.59.833 2.032.906 2.18.073.148.122.322.024.516-.098.194-.147.315-.292.486-.145.172-.308.384-.44.516-.145.145-.296.303-.127.593.169.29 0.75 1.238 1.61 2.004 1.107.986 2.04 1.291 2.33 1.436.29.145.46.122.63-.073.17-.194.733-.854.928-1.147.195-.293.39-.244.654-.146.264.098 1.678.791 1.966.935.288.145.48.217.552.34.073.123.073.712-.171 1.398z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <span className="text-xs text-[var(--text-muted)]">•</span>

                {/* Email */}
                <a
                  href="mailto:jbrdigitalsoftwareprograming@gmail.com"
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--text-primary)] hover:text-[var(--primary)] font-medium transition-colors"
                >
                  <Mail size={13} className="text-[#00A3FF]" />
                  <span>Info@jbrdigitalsoftwareprograming.com</span>
                </a>

                <span className="text-xs text-[var(--text-muted)]">•</span>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/jbrdigitalprograming?srtk=NzBzMXE2MGxxOTIz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--text-primary)] hover:text-[#E1306C] font-medium transition-colors"
                  title="Instagram: @jbrdigitalprograming"
                  aria-label="Instagram"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#E1306C]">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                  <span>Instagram</span>
                </a>

                <span className="text-xs text-[var(--text-muted)]">•</span>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@jbr.digital.progr?_r=1&_t=ZS-9B9KL5sWpgQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--text-primary)] hover:text-[#69C9D0] font-medium transition-colors"
                  title="TikTok: @jbr.digital.progr"
                  aria-label="TikTok"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#69C9D0]">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.53V6.77a4.84 4.84 0 0 1-1.02-.08z"/>
                  </svg>
                  <span>TikTok</span>
                </a>

                <span className="text-xs text-[var(--text-muted)]">•</span>

                {/* Snapchat */}
                <a
                  href="https://www.snapchat.com/add/jbrdigital?share_id=1-N7S9Pe3TQ&locale=en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--text-primary)] hover:text-[#FFFC00] font-medium transition-colors"
                  title="Snapchat: @jbrdigital"
                  aria-label="Snapchat"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#FFFC00]">
                    <path d="M12.002 2c-3.642 0-5.908 2.505-5.908 5.753 0 .798.243 1.948.455 2.66.082.28.077.41-.01.538-.11.16-.388.293-.767.464-.69.31-1.597.717-1.748 1.554-.092.51.107.97.575 1.284.622.417 1.635.485 2.274.51.156.006.273.076.31.185.05.147.004.343-.11.536-.407.69-1.07 1.815-1.07 2.656 0 .618.375 1.103.993 1.295.602.187 1.433.197 2.27.197.382 0 .762-.01 1.135-.03.24-.012.457.086.58.267.37.545 1.05 1.137 1.848 1.137.797 0 1.478-.592 1.847-1.137.124-.18.34-.28.58-.267.374.02.754.03 1.136.03.837 0 1.668-.01 2.27-.197.618-.192.993-.677.993-1.295 0-.841-.663-1.966-1.07-2.656-.114-.193-.16-.39-.11-.536.037-.11.154-.18.31-.185.639-.025 1.652-.093 2.274-.51.468-.314.667-.774.575-1.284-.151-.837-1.058-1.244-1.748-1.554-.379-.17-.657-.304-.767-.464-.087-.128-.092-.258-.01-.538.212-.712.455-1.862.455-2.66C17.91 4.505 15.644 2 12.002 2z"/>
                  </svg>
                  <span>Snapchat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links (2 Cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">
              {t('footer.nav_title')}
            </h3>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors py-0.5"
                  >
                    <ChevronRight
                      size={13}
                      className={`text-[var(--primary)] opacity-70 ${isRTL ? 'rotate-180' : ''}`}
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links (3 Cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">
              {t('footer.services_title')}
            </h3>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              {services.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors py-0.5"
                  >
                    <ChevronRight
                      size={13}
                      className={`text-[var(--electric-blue)] opacity-70 ${isRTL ? 'rotate-180' : ''}`}
                    />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (2 Cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">
              {t('footer.contact_title')}
            </h3>
            <div className="space-y-3.5 text-xs leading-relaxed">
              <div className="flex items-center gap-2.5">
                <FlagQatar size={21} />
                <div className="text-[var(--text-primary)] font-medium">
                  {isRTL ? 'المقر الرئيسي : دولة قطر - الدوحة' : 'Headquarters: State of Qatar - Doha'}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <FlagMorocco size={21} />
                <div className="text-[var(--text-primary)] font-medium">
                  {isRTL ? 'فرع : المملكة المغربية - الدارالبيضاء' : 'Branch: Kingdom of Morocco - Casablanca'}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Clock size={14} className="text-[var(--primary)] shrink-0" />
                <span className="text-[var(--text-muted)]">
                  {t('contact.hours')}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Draft Legal Modals */}
      <div className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] py-4 px-4 sm:px-6">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              © {new Date().getFullYear()} JBR Digital {t('footer.rights')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => openLegalModal('privacy')}
              className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors underline-offset-4 hover:underline cursor-pointer bg-transparent border-0 p-0 text-xs"
            >
              {isRTL ? 'سياسة الخصوصية (مسودة)' : 'Privacy Policy (Draft)'}
            </button>
            <span>•</span>
            <button
              onClick={() => openLegalModal('terms')}
              className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors underline-offset-4 hover:underline cursor-pointer bg-transparent border-0 p-0 text-xs"
            >
              {isRTL ? 'شروط الخدمة (مسودة)' : 'Terms of Service (Draft)'}
            </button>
          </div>
        </div>
      </div>

      {/* Legal Draft Modal */}
      {legalModal && legalModal.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setLegalModal(null)}
        >
          <div
            className="w-full max-w-lg p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4">
              <div className="flex items-center gap-2 text-[var(--primary)]">
                <FileText size={18} />
                <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] m-0">
                  {legalModal.title}
                </h4>
              </div>
              <button
                onClick={() => setLegalModal(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-6">
              {legalModal.content}
            </p>

            <div className="p-3 rounded-md bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-muted)] mb-5">
              {isRTL
                ? 'إشعار توثيقي تخضع مسودات السياسات للمراجعة القانونية التنظيمية للامتثال التجاري في دولة قطر والمملكة المغربية'
                : 'Notice: Official regulatory compliance review in progress for Qatar and Morocco commercial jurisdictions.'}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="btn-primary text-xs px-4 py-2"
              >
                {isRTL ? 'إغلاق الإشعار' : 'Acknowledge & Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
