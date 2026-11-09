import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SecurityIcon from '@mui/icons-material/Security'
import StorageIcon from '@mui/icons-material/Storage'
import BoltIcon from '@mui/icons-material/Bolt'
import ServicesSection from '../components/ServicesSection'
import PillarsBar from '../components/PillarsBar'
import FeaturedServices from '../components/FeaturedServices'

const Services: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  useEffect(() => {
    document.title = isRTL
      ? 'خدمات البرمجيات والحلول الرقمية — JBR Digital قطر والمغرب'
      : 'Software & Digital Systems Services — JBR Digital Qatar & Morocco'
  }, [isRTL])

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen transition-colors duration-200"
      style={{
        paddingTop: '70px',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      {/* ── 1. Hero Header ── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 relative border-b border-[var(--border-color)] overflow-hidden"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        {/* Subtle radial glow mesh */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(ellipse, #0055FF 0%, #8B5CF6 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          aria-hidden="true"
        />

        <div className="section-container relative z-10 max-w-4xl text-center mx-auto">
          <div className="editorial-badge mb-4 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-xs">
              {isRTL ? 'خدمات برمجية متكاملة' : 'Full-Spectrum Software Services'}
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            {isRTL ? (
              <>
                أنظمة برمجية عالية{' '}
                <span className="signature-gradient-text">الموثوقية والأداء</span>
              </>
            ) : (
              <>
                Architected for{' '}
                <span className="signature-gradient-text">Scale, Speed & Security</span>
              </>
            )}
          </h1>

          <p
            className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {isRTL
              ? 'نقدّم حلولاً برمجية متقدمة ومتكاملة للشركات والمؤسسات والأفراد تجمع بين الابتكار والتقنيات الحديثة والأداء العالي لبناء أنظمة ذكية قابلة للتوسع تُحسّن الكفاءة وتُسرّع الإنجاز وتدعم نمو الأعمال في العصر الرقمي'
              : 'We deliver advanced, integrated software solutions for enterprises, organizations, and individuals—combining innovation, cutting-edge technologies, and peak performance to build scalable smart systems that enhance efficiency, accelerate delivery, and empower business growth in the digital age.'}
          </p>
        </div>
      </section>

      {/* ── 2. The 5 Core Services ── */}
      <FeaturedServices />

      {/* ── 4. Main Services Cards Grid (MUI Architectural Specs & Tech Tags) ── */}
      <ServicesSection />

      {/* ── 5. Technical Standards Grid & SLAs ── */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden border-t border-[var(--border-color)]"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="section-container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="editorial-badge mb-3 mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
              <span className="font-semibold uppercase tracking-wider text-xs">
                {isRTL ? 'الجودة البرمجية' : 'Software Quality'}
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {isRTL ? 'برمجة متقدمة بمعايير احترافية' : 'Professional Software Standards'}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {isRTL
                ? 'نطوّر حلولًا رقمية احترافية تعتمد على بنية برمجية مدروسة وأداء محسّن وتقنيات حديثة تواكب تطور احتياجات الأعمال'
                : 'We develop professional digital solutions built on thoughtful architectures, optimized performance, and modern technologies that keep pace with growing business needs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <BoltIcon sx={{ fontSize: 32, color: '#00A3FF' }} />,
                titleEn: 'Advanced Software Performance',
                titleAr: 'أداء برمجي متقدم',
                descEn: 'We build fast, efficient applications capable of high-throughput data processing and delivering a seamless user experience at scale.',
                descAr: 'نطوّر تطبيقات سريعة وفعّالة قادرة على معالجة البيانات بكفاءة عالية وتقديم تجربة استخدام سلسة حتى مع تزايد حجم العمليات',
              },
              {
                icon: <SecurityIcon sx={{ fontSize: 32, color: '#22c55e' }} />,
                titleEn: 'Scalable Software Architecture',
                titleAr: 'بنية برمجية قابلة للتوسع',
                descEn: 'We build software systems with flexible architectures that accommodate business growth and allow extending features without impacting stability.',
                descAr: 'نبني أنظمة برمجية بهياكل مرنة ومدروسة تستوعب نمو الأعمال وتتيح تطوير الوظائف وتوسيع الإمكانيات دون التأثير على استقرار النظام',
              },
              {
                icon: <StorageIcon sx={{ fontSize: 32, color: '#0055FF' }} />,
                titleEn: 'Systems & Services Integration',
                titleAr: 'تكامل الأنظمة والخدمات',
                descEn: 'We connect applications, databases, and APIs within a unified ecosystem, ensuring smooth data flow and operational synergy across systems.',
                descAr: 'نربط التطبيقات وقواعد البيانات وواجهات البرمجة ضمن منظومة موحّدة تضمن تدفق البيانات بسلاسة وتكامل العمليات بين مختلف الأنظمة',
              },
            ].map((std, i) => (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-2xl transition-all duration-300 text-start"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div className="mb-4">{std.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {isRTL ? std.titleAr : std.titleEn}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {isRTL ? std.descAr : std.descEn}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 font-bold text-sm"
              style={{ textDecoration: 'none' }}
            >
              <span>{isRTL ? 'اكتشف الحلول المناسبة لمشروعك' : 'Discover the Right Solutions for Your Project'}</span>
              <ArrowForwardIcon sx={{ fontSize: 16, transform: isRTL ? 'rotate(180deg)' : 'none' }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
