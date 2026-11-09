import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PaletteIcon from '@mui/icons-material/Palette'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
import DnsIcon from '@mui/icons-material/Dns'

export interface ServiceItem {
  id: string
  icon: React.ReactNode
  badge: string
  titleEn: string
  titleAr: string
  descEn: string
  descAr: string
  featuresEn: string[]
  featuresAr: string[]
  techTags: string[]
  accentColor: string
}

const servicesList: ServiceItem[] = [
  {
    id: 'web',
    icon: <LanguageIcon sx={{ fontSize: 28 }} />,
    badge: 'Web Platforms',
    titleEn: 'Digital Platforms & Web Systems',
    titleAr: 'تطوير وبرمجة المنصات الرقمية',
    descEn: 'Designing and developing integrated web platforms with flexible architectures and optimized performance to support complex operations and business expansion.',
    descAr: 'تصميم وتطوير منصات ويب متكاملة بهياكل برمجية مرنة وأداء محسّن تدعم تعقيد العمليات وتواكب توسّع الأعمال',
    featuresEn: [
      'React 19 & Modern Web Architectures',
      'High-throughput GraphQL / REST API Integration',
      'Lighthouse 95+ Performance & Core Web Vitals',
    ],
    featuresAr: [
      'تطبيقات React المتقدمة وعالية الأداء',
      'تكامل واجهات GraphQL و REST عالية الأداء',
      'تحقيق مؤشرات Lighthouse فوق 95 للأداء والسرعة',
    ],
    techTags: ['React', 'TypeScript', 'Node.js'],
    accentColor: '#1685F8',
  },
  {
    id: 'mobile',
    icon: <PhoneIphoneIcon sx={{ fontSize: 28 }} />,
    badge: 'Mobile Development',
    titleEn: 'Mobile App Development',
    titleAr: 'تطوير وبرمجة تطبيقات الجوال',
    descEn: 'Developing advanced mobile applications with consistent user experiences and seamless integration with backend services and digital systems.',
    descAr: 'تطوير تطبيقات جوال متقدمة بتجربة استخدام متناسقة وتكامل موثوق مع الخدمات الخلفية والأنظمة الرقمية',
    featuresEn: [
      'Native Swift & Kotlin or Flutter Engines',
      'Biometric Auth & Secure Hardware Storage',
      'Real-time WebSockets & Push Notifications',
    ],
    featuresAr: [
      'محركات Swift و Kotlin أو بيئات Flutter المتطورة',
      'مصادقة بيومترية وحماية بالمفاتيح المشفرة',
      'إشعارات لحظية ومزامنة حية للبيانات',
    ],
    techTags: ['Flutter', 'Swift', 'Kotlin', 'Firebase'],
    accentColor: '#38bdf8',
  },
  {
    id: 'ai',
    icon: <SmartToyIcon sx={{ fontSize: 28 }} />,
    badge: 'AI & Intelligent Systems',
    titleEn: 'AI & Intelligent Systems',
    titleAr: 'الأنظمة الذكية والأتمتة المتقدمة',
    descEn: 'Developing AI-driven solutions for data processing, information retrieval, workflow automation, and integrating intelligent models into business systems.',
    descAr: 'تطوير حلول تعتمد على الذكاء الاصطناعي لمعالجة البيانات واسترجاع المعلومات وأتمتة سير العمل وربط النماذج الذكية بأنظمة الأعمال',
    featuresEn: [
      'Private Enterprise RAG & Vector Embeddings',
      'Automated Document Processing Pipelines',
      'Predictive Analytics & Executive Dashboards',
    ],
    featuresAr: [
      'أنظمة RAG خاصة مع قواعد بيانات متجهة مشفرة',
      'أتمتة معالجة المستندات والفواتير بذكاء',
      'تحليلات تنبؤية ولوحات قيادة تنفيذية',
    ],
    techTags: ['Python', 'LLMs', 'RAG', 'FastAPI'],
    accentColor: '#a855f7',
  },
  {
    id: 'ui',
    icon: <PaletteIcon sx={{ fontSize: 28 }} />,
    badge: 'Product Design',
    titleEn: 'Product Design & UI/UX Systems',
    titleAr: 'تصميم التجربة والواجهات الرقمية',
    descEn: 'Designing thoughtful digital experiences and design systems balancing ease of use, visual consistency, and product specifications.',
    descAr: 'تصميم تجارب رقمية مدروسة وأنظمة واجهات متكاملة تحقق التوازن بين سهولة الاستخدام والاتساق البصري ومتطلبات المنتج',
    featuresEn: [
      'Complete Tokenized Figma Component Libraries',
      'Native RTL / LTR Bilingual Typography Systems',
      'Interactive Prototyping & Usability Benchmarks',
    ],
    featuresAr: [
      'مكتبات مكونات Figma قياسية موثقة بدقة',
      'تصميم ثنائي اللغة يدعم الخطوط العربية والإنجليزية باحتراف',
      'اختبارات قابلية الاستخدام ونماذج تفاعلية دقيقة',
    ],
    techTags: ['Figma', 'Design Systems', 'Prototyping', 'UI/UX'],
    accentColor: '#D6A85F',
  },
  {
    id: 'cloud',
    icon: <CloudDoneIcon sx={{ fontSize: 28 }} />,
    badge: 'Cloud Infrastructure',
    titleEn: 'Cloud Infrastructure & Operations',
    titleAr: 'البنية السحابية وإدارة التشغيل',
    descAr: 'إعداد بيئات تشغيل قابلة للتوسع وأتمتة عمليات البناء والنشر ومراقبة الأداء لحماية الأنظمة وضمان استمراريتها',
    descEn: 'Configuring scalable runtime environments, automating CI/CD build and deployment pipelines, and active monitoring for high system availability.',
    featuresEn: [
      'Terraform / OpenTofu Infrastructure as Code',
      'Kubernetes (EKS/AKS) Orchestration & Helm',
      'SOC-2 / ISO-27001 Security Hardening',
    ],
    featuresAr: [
      'إدارة البنية ككود عبر Terraform و OpenTofu',
      'إدارة حاويات Kubernetes وخطوط النشر المستمر',
      'تطبيق أعلى معايير الأمان والامتثال',
    ],
    techTags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    accentColor: '#06b6d4',
  },
  {
    id: 'erp',
    icon: <DnsIcon sx={{ fontSize: 28 }} />,
    badge: 'Enterprise Solutions',
    titleEn: 'Professional Enterprise Systems',
    titleAr: 'أنظمة وحلول المؤسسات الاحترافية',
    descEn: 'End-to-end bespoke enterprise resource platforms, billing gateways, inventory workflows, and cross-departmental databases.',
    descAr: 'أنظمة إدارة موارد المؤسسات المصممة خصيصاً وبوابات الدفع وإدارة العمليات والبيانات الحيوية',
    featuresEn: [
      'Role-Based Granular Access Control (RBAC)',
      'Secure High-Capacity Payment Processing Gateway',
      'Multi-tenant Modular Architecture',
    ],
    featuresAr: [
      'صلاحيات وصول دقيقة ومحمية حسب الأدوار (RBAC)',
      'تكامل بوابات الدفع الإلكتروني المعتمدة',
      'بنية برمجية نمطية متعددة المستأجرين قابلة للتوسع',
    ],
    techTags: ['PostgreSQL', 'Redis', 'NestJS', 'Docker'],
    accentColor: '#22c55e',
  },
]

export const ServicesSection: React.FC = () => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  return (
    <section
      className="py-24 px-4 sm:px-6 relative overflow-hidden border-t border-[var(--border-color)]"
      style={{
        backgroundColor: 'var(--bg-secondary)',
      }}
    >

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="editorial-badge mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-xs">
              {isRTL ? 'التميز التقني' : 'Technical Excellence'}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.025em' }}
          >
            {isRTL ? 'حلول برمجية مصممة بمعايير احترافية' : 'Software Solutions Engineered to Professional Standards'}
          </h2>

          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {isRTL
              ? 'نطوّر أنظمة رقمية احترافية تجمع بين الجودة والأمان والأداء العالي لتلبية احتياجات أعمالك وتوفير بنية تقنية مرنة وقابلة للتوسع'
              : 'We develop professional digital systems combining quality, security, and high performance to meet your business needs and provide a flexible, scalable technical infrastructure.'}
          </p>
        </div>

        {/* 3-Column MUI Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesList.map((service) => (
            <Card
              key={service.id}
              elevation={0}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '24px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  borderColor: `${service.accentColor}70`,
                  boxShadow: `0 20px 40px -15px ${service.accentColor}25, 0 0 25px rgba(0, 85, 255, 0.15)`,
                },
              }}
            >
              {/* Subtle accent bar at top */}
              <Box
                sx={{
                  height: '3px',
                  width: '100%',
                  background: `linear-gradient(90deg, transparent 0%, ${service.accentColor} 50%, transparent 100%)`,
                }}
              />

              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header row: Icon + Category Badge */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div
                    className="w-13 h-13 rounded-2xl flex items-center justify-center transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${service.accentColor}20 0%, ${service.accentColor}05 100%)`,
                      border: `1.5px solid ${service.accentColor}40`,
                      color: service.accentColor,
                    }}
                  >
                    {service.icon}
                  </div>

                  <Chip
                    label={service.badge}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      color: service.accentColor,
                      border: `1px solid ${service.accentColor}30`,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* Title */}
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: '#ffffff',
                    mb: 1.5,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {isRTL ? service.titleAr : service.titleEn}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#8fa3bb',
                    lineHeight: 1.7,
                    fontSize: '0.885rem',
                    mb: 3,
                  }}
                >
                  {isRTL ? service.descAr : service.descEn}
                </Typography>

                {/* Concrete Deliverable Points */}
                <div className="space-y-2 mb-6 flex-grow">
                  {(isRTL ? service.featuresAr : service.featuresEn).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      <CheckCircleOutlinedIcon
                        sx={{
                          fontSize: 16,
                          color: service.accentColor,
                          mt: 0.3,
                          flexShrink: 0,
                        }}
                      />
                      <span className="text-xs text-slate-300 leading-snug font-medium">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mt-auto">
                  {service.techTags.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#94a3b8',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Consulting Banner */}
        <div
          className="mt-16 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1.5px solid #0055FF',
            boxShadow: '0 15px 40px rgba(0, 85, 255, 0.15)',
          }}
        >
          <div className="text-start">
            <div className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              {isRTL ? 'هل لديك متطلبات تقنية معقدة أو مشروع محترف' : 'Need a professional architecture or technical roadmap?'}
            </div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {isRTL
                ? 'فريقنا التقني مستعد لمناقشة التفاصيل وتقديم دراسة جدوى تقنية ومخطط هيكلي متكامل'
                : 'Our engineering team is ready to review your requirements, conduct architectural discovery, and deliver a comprehensive spec.'}
            </div>
          </div>

          <Link
            to="/contact"
            className="btn-primary px-7 py-3 text-sm font-bold shrink-0"
            style={{ textDecoration: 'none' }}
          >
            <span>{isRTL ? 'تحدث معنا' : 'Talk with Us'}</span>
            <ArrowForwardIcon sx={{ fontSize: 16, transform: isRTL ? 'rotate(180deg)' : 'none' }} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
