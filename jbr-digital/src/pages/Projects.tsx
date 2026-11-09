import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CodeIcon from '@mui/icons-material/Code'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import PaletteIcon from '@mui/icons-material/Palette'
import StorageIcon from '@mui/icons-material/Storage'
import ProjectsShowcase from '../components/ProjectsShowcase'

const Projects: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  useEffect(() => {
    document.title = isRTL
      ? 'المشاريع البرمجية والحلول الرقمية — JBR Digital قطر والمغرب'
      : 'Engineering Portfolio & Deliverables — JBR Digital Qatar & Morocco'
  }, [isRTL])

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        paddingTop: '70px',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
      className="min-h-screen transition-colors duration-200"
    >
      {/* ── Header ── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 relative border-b border-[var(--border-color)]"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="section-container relative z-10 max-w-4xl text-start">
          <div className="editorial-badge mb-4">
            <span>{isRTL ? 'الأنظمة والمشاريع' : 'Production Systems Portfolio'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            {isRTL ? (
              <>
                أنظمة حقيقية مبنية بأعلى{' '}
                <span className="signature-gradient-text">المعايير التقنية والهندسية</span>
              </>
            ) : (
              <>
                Case studies & software systems{' '}
                <span className="signature-gradient-text">engineered to perform</span>
              </>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-8">
            {isRTL
              ? 'تصفح نماذج من الأنظمة البرمجية التي نطورها للشركات والافراد من منصات التجارة وإدارة العمليات إلى حلول الأتمتة وتطبيقات الجوال'
              : 'Explore our portfolio of software platforms for enterprises and individuals from e-commerce and operations platforms to automation solutions and mobile apps'}
          </p>

          {/* Genuine Technical Focus Pillars (No Fake Metrics) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            {[
              {
                labelEn: 'Web Platforms',
                labelAr: 'منصات الويب',
                descEn: 'React 19 & Next.js',
                descAr: 'تطوير سريع ومستقر',
                icon: <CodeIcon sx={{ fontSize: 18, color: '#0055FF' }} />,
              },
              {
                labelEn: 'Mobile Apps',
                labelAr: 'تطبيقات الجوال',
                descEn: 'iOS & Android Flutter',
                descAr: 'أداء أصيل ومتجاوب',
                icon: <PhoneIphoneIcon sx={{ fontSize: 18, color: '#00A3FF' }} />,
              },
              {
                labelEn: 'Design Systems',
                labelAr: 'أنظمة التصميم',
                descEn: 'Arabic RTL & LTR',
                descAr: 'هوية بصرية موحدة',
                icon: <PaletteIcon sx={{ fontSize: 18, color: '#8B5CF6' }} />,
              },
              {
                labelEn: 'Enterprise ERP',
                labelAr: 'أنظمة المؤسسات',
                descEn: 'PostgreSQL & Cloud',
                descAr: 'قواعد بيانات متكاملة',
                icon: <StorageIcon sx={{ fontSize: 18, color: '#FF8A76' }} />,
              },
            ].map((pillar, sIdx) => (
              <div
                key={sIdx}
                className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)]"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {pillar.icon}
                  <span className="font-bold text-xs text-[var(--text-primary)]">
                    {isRTL ? pillar.labelAr : pillar.labelEn}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--text-muted)] font-mono">
                  {isRTL ? pillar.descAr : pillar.descEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Showcase Section ── */}
      <ProjectsShowcase showHeader={true} showTitle={false} showFilterTabs={true} defaultTab="Web" />

      {/* ── Technical Consultation Banner ── */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6 relative border-t border-[var(--border-color)]"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="section-container text-center max-w-3xl">
          <div className="editorial-badge mb-4">
            <span>{isRTL ? 'ابدأ مشروعك' : 'Start Your Project'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            {isRTL ? 'هل لديك فكرة أو متطلب تقني ترغب في تنفيذه' : 'Have a custom system you need engineered?'}
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-8 leading-relaxed">
            {isRTL
              ? 'يقدم مستشارونا التقنيون دراسة متكاملة لمتطلبات مشروعك مع تقدير للجدول الزمني والحلول البرمجية المناسبة'
              : 'Our specialists provide a comprehensive study of your project requirements, with an estimated timeline and tailored software solutions.'}
          </p>

          <Link to="/contact" className="btn-primary py-3 px-6 text-sm">
            <span>{isRTL ? 'تواصل معنا' : 'Contact Us'}</span>
            <ArrowForwardIcon sx={{ fontSize: 15, transform: isRTL ? 'rotate(180deg)' : 'none' }} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Projects
