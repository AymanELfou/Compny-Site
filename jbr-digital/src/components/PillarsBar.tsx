import React from 'react'
import { useTranslation } from 'react-i18next'
import CodeIcon from '@mui/icons-material/Code'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import SettingsIcon from '@mui/icons-material/Settings'
import QueryStatsIcon from '@mui/icons-material/QueryStats'

export const PillarsBar: React.FC = () => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  const pillars = [
    {
      icon: <CodeIcon sx={{ fontSize: 22 }} />,
      labelEn: 'WEB APPS',
      labelAr: 'تطبيقات الويب',
      descEn: 'High-performance React & Next.js platforms',
      descAr: 'تطبيقات ويب متقدمة وسريعة باستخدام React و Next.js',
      accent: '#0055FF',
    },
    {
      icon: <PhoneIphoneIcon sx={{ fontSize: 22 }} />,
      labelEn: 'MOBILE APPS',
      labelAr: 'تطبيقات الجوال',
      descEn: 'Cross-platform iOS & Android engineering',
      descAr: 'تطبيقات iOS و Android أصيلة و Flutter متجاوبة',
      accent: '#00A3FF',
    },
    {
      icon: <CloudQueueIcon sx={{ fontSize: 22 }} />,
      labelEn: 'CLOUD & DEVOPS',
      labelAr: 'الحلول السحابية',
      descEn: 'Containerised Docker & high-availability cloud',
      descAr: 'بنية تحتية سحابية مرنة وخدمات موثوقة ومحمية',
      accent: '#8B5CF6',
    },
    {
      icon: <SettingsIcon sx={{ fontSize: 22 }} />,
      labelEn: 'ENTERPRISE ERP',
      labelAr: 'الأنظمة البرمجية',
      descEn: 'Custom CRM, workflow engines & APIs',
      descAr: 'أنظمة ERP وبرمجيات مؤسسية متكاملة وأتمتة العمليات',
      accent: '#0055FF',
    },
    {
      icon: <QueryStatsIcon sx={{ fontSize: 22 }} />,
      labelEn: 'AI AUTOMATION',
      labelAr: 'الأتمتة والذكاء الاصطناعي',
      descEn: 'WhatsApp Business bots & smart data systems',
      descAr: 'روبوتات واتساب الذكية وتحليلات البيانات المتطورة',
      accent: '#FF8A76',
    },
  ]

  return (
    <section className="relative z-10 py-6 section-container" dir={isRTL ? 'rtl' : 'ltr'}>
      <div
        className="rounded-xl p-3 sm:p-4 transition-all duration-200 border"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className={`group flex flex-col items-center text-center p-3 rounded-lg transition-all duration-200 hover:bg-[var(--bg-card-hover)] ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              {/* Icon Container */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 transition-transform duration-200 group-hover:scale-105 shrink-0"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: item.accent,
                }}
              >
                {item.icon}
              </div>

              {/* Title */}
              <div
                className="font-bold text-xs uppercase mb-1 tracking-wider text-[var(--text-primary)]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {isRTL ? item.labelAr : item.labelEn}
              </div>

              {/* Sub-description */}
              <div
                className="text-[11px] leading-tight text-[var(--text-secondary)] opacity-85 group-hover:opacity-100"
              >
                {isRTL ? item.descAr : item.descEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PillarsBar
