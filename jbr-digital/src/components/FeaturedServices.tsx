import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

// Clean SVG Icons
const WebIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

const MobileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 2C6.513 2 2.025 6.488 2.025 12.006c0 1.956.564 3.784 1.543 5.334L2 22.025l4.825-1.53c1.488.887 3.23 1.393 5.206 1.393 5.518 0 10.006-4.488 10.006-10.006C22.037 6.488 17.549 2 12.031 2zm5.82 14.18c-.244.686-1.42 1.306-1.957 1.38-.513.07-1.18.1-3.418-.832-2.863-1.192-4.708-4.104-4.851-4.296-.144-.192-1.157-1.543-1.157-2.943 0-1.4 0.732-2.09 0.993-2.378.261-.287.57-.36.76-.36.19 0 .38 0 .548.009.177.009.414-.067.647.494.244.59.833 2.032.906 2.18.073.148.122.322.024.516-.098.194-.147.315-.292.486-.145.172-.308.384-.44.516-.145.145-.296.303-.127.593.169.29 0.75 1.238 1.61 2.004 1.107.986 2.04 1.291 2.33 1.436.29.145.46.122.63-.073.17-.194.733-.854.928-1.147.195-.293.39-.244.654-.146.264.098 1.678.791 1.966.935.288.145.48.217.552.34.073.123.073.712-.171 1.398z"/>
  </svg>
)

const ERPIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const SupportIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

export interface FeaturedService {
  id: string
  titleAr: string
  titleEn: string
  descAr: string
  descEn: string
  icon: React.ReactNode
  tagEn: string
  tagAr: string
  accent: string
}

export const featuredServicesList: FeaturedService[] = [
  {
    id: 'web-dev',
    titleAr: 'تطوير المواقع والمنصات',
    titleEn: 'Web Development',
    descAr: 'مواقع عصرية وسريعة متوافقة مع جميع الأجهزة مع بنية تحتية سحابية',
    descEn: 'Modern, high-performance web applications built for speed, SEO, and conversion.',
    icon: <WebIcon />,
    tagEn: 'React 19 • Next.js',
    tagAr: 'React 19 • Next.js',
    accent: '#0055FF',
  },
  {
    id: 'mobile-apps',
    titleAr: 'تطبيقات الجوال',
    titleEn: 'Mobile Applications',
    descAr: 'تطبيقات احترافية لنظامي iOS و Android مع دعم أصيل للغة العربية',
    descEn: 'Native-feel iOS and Android mobile applications engineered for smooth performance.',
    icon: <MobileIcon />,
    tagEn: 'iOS • Android • Flutter',
    tagAr: 'iOS • Android • Flutter',
    accent: '#00A3FF',
  },
  {
    id: 'whatsapp-ai',
    titleAr: 'روبوتات واتساب والذكاء الاصطناعي',
    titleEn: 'WhatsApp Bots & AI',
    descAr: 'أتمتة الأعمال وخدمة العملاء والرد الفوري الذكي عبر WhatsApp Cloud API',
    descEn: 'Automated 24/7 customer engagement, lead qualification, and WhatsApp integrations.',
    icon: <WhatsAppIcon />,
    tagEn: 'WhatsApp Cloud API',
    tagAr: 'WhatsApp Cloud API',
    accent: '#8B5CF6',
  },
  {
    id: 'business-systems',
    titleAr: 'أنظمة إدارة الأعمال',
    titleEn: 'ERP & Business Systems',
    descAr: 'برمجيات احترافية لإدارة العمليات والموارد والفواتير وقواعد البيانات',
    descEn: 'Professional CRM and ERP architectures tailored to your exact business workflows.',
    icon: <ERPIcon />,
    tagEn: 'PostgreSQL • APIs',
    tagAr: 'PostgreSQL • APIs',
    accent: '#0055FF',
  },
  {
    id: 'support-maintenance',
    titleAr: 'الدعم الفني والصيانة',
    titleEn: 'Maintenance & Support',
    descAr: 'دعم تقني مستمر وتحديثات برمجية دورية ومراقبة حية على مدار الساعة لضمان الأداء',
    descEn: 'Guaranteed SLA response times, routine system updates, and 24/7 performance monitoring.',
    icon: <SupportIcon />,
    tagEn: 'SLA • System Optimization',
    tagAr: 'اتفاقيات SLA • استقرار الأنظمة',
    accent: '#FF8A76',
  },
]

export const FeaturedServices: React.FC<{ showTitle?: boolean }> = ({ showTitle = true }) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  return (
    <section
      className="relative py-20 px-4 sm:px-6 border-t border-[var(--border-color)]"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="section-container relative z-10">
        {showTitle && (
          <div className="max-w-3xl mb-14 text-start">
            <div className="editorial-badge mb-3">
              <span>{isRTL ? 'القدرات البرمجية' : 'Core Capabilities'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              {isRTL ? (
                <>
                  حلول رقمية مبتكرة <span className="signature-gradient-text">ترتقي بأعمالك</span>
                </>
              ) : (
                <>
                  Innovative digital solutions that{' '}
                  <span className="signature-gradient-text">elevate your business.</span>
                </>
              )}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
              {isRTL
                ? 'نصمّم ونطوّر حلولًا برمجية متكاملة تجمع بين الابتكار والجودة والأداء العالي لنحوّل أفكارك إلى منتجات رقمية احترافية تساعد على نمو أعمالك وتحقيق أهدافك'
                : 'We design and develop integrated software solutions combining innovation, quality, and high performance to turn your ideas into professional digital products that drive growth.'}
            </p>
          </div>
        )}

        {/* 5-Card Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {featuredServicesList.map((service) => (
            <Link
              key={service.id}
              to="/services"
              className="enterpret-card p-6 flex flex-col justify-between text-start group no-underline"
              style={{ textDecoration: 'none' }}
            >
              <div>
                {/* Icon Container */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 shrink-0 transition-transform duration-200 group-hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: service.accent,
                  }}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg mb-2 text-[var(--text-primary)] group-hover:text-[var(--electric-blue)] transition-colors">
                  {isRTL ? service.titleAr : service.titleEn}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {isRTL ? service.descAr : service.descEn}
                </p>
              </div>

              {/* Bottom Tech Tag & Direction Arrow */}
              <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  {isRTL ? service.tagAr : service.tagEn}
                </span>
                <div className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">
                  <ArrowForwardIcon
                    sx={{
                      fontSize: 16,
                      transform: isRTL ? 'rotate(180deg)' : 'none',
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedServices
