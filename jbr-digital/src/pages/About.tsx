import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PlaceIcon from '@mui/icons-material/Place'
import VerifiedIcon from '@mui/icons-material/Verified'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import HandshakeIcon from '@mui/icons-material/Handshake'
import SecurityIcon from '@mui/icons-material/Security'
import PillarsBar from '../components/PillarsBar'
import Logo3D from '../components/Logo3D'

const About: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  useEffect(() => {
    document.title = isRTL
      ? 'من نحن — JBR Digital | شركة تطوير وبرمجة البرمجيات'
      : 'About JBR Digital — Software Programming & Digital Solutions'
  }, [isRTL])

  const values = [
    {
      icon: <MilitaryTechIcon sx={{ fontSize: 28 }} />,
      titleEn: 'Precision & Professionalism',
      titleAr: 'الدقة والاحترافية',
      descEn: 'We adhere to clean code conventions, strict type safety, modular microservices, and comprehensive automated test suites.',
      descAr: 'كود نظيف وهيكلية معيارية واختبارات مؤتمتة شاملة تضمن خلو الأنظمة من الثغرات والأخطاء',
      color: '#0055FF',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 28 }} />,
      titleEn: 'Data Sovereignty & Trust',
      titleAr: 'سيادة وأمان البيانات',
      descEn: 'Architected to international engineering and security standards with enterprise-grade data protection.',
      descAr: 'تصميم بنيات برمجية وفق المعايير العالمية',
      color: '#00A3FF',
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 28 }} />,
      titleEn: 'Authentic Partnership',
      titleAr: 'شراكة تقنية حقيقية',
      descEn: 'We embed as your internal engineering taskforce — providing deep technical consulting beyond simple outsourcing.',
      descAr: 'نعمل كذراع تقني استراتيجي لمؤسستك مقدمين استشارات برمجية عميقة تدعم نمو وتوسع أعمالك',
      color: '#22c55e',
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 28 }} />,
      titleEn: 'Human-Crafted Craftsmanship',
      titleAr: 'حرفية برمجية أصيلة',
      descEn: 'Zero cookie-cutter templates. Every line of backend code and frontend component is designed for your unique operational workflow.',
      descAr: 'كل سطر برمجي وكل واجهة مستخدم تُبنى خصيصاً لتناسب نموذج عملك بدقة',
      color: '#8B5CF6',
    },
  ]

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
        {/* Subtle radial glow */}
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
              {isRTL ? 'الهوية والرسالة' : 'Identity & Mission'}
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            {isRTL ? (
              <>
                <span className="gray-gradient-text">نصنع مستقبل البرمجيات</span>{' '}
                <span className="signature-gradient-text">بأعلى المعايير العالمية</span>
              </>
            ) : (
              <>
                <span className="gray-gradient-text">Building Software With</span>{' '}
                <span className="signature-gradient-text">Engineering Excellence</span>
              </>
            )}
          </h1>

          <p
            className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {isRTL
              ? 'شركة برمجية متخصصة في تطوير منصات وأنظمة رقمية متقدمة تواكب تطلعات المؤسسات الرائدة وتحقق الكفاءة العالية والنمو المستدام'
              : 'A specialized software development practice dedicated to high-availability digital platforms, custom business architectures, and reliable enterprise systems.'}
          </p>
        </div>
      </section>


      {/* ── 3. Narrative & Dual Operating Hub ── */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Visual Emblem Badge Card (Left) */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className="relative rounded-3xl p-6 sm:p-8 w-full max-w-md overflow-hidden text-center transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1.5px solid #0055FF',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(0, 85, 255, 0.25)',
                }}
              >
                <div className="flex justify-center mb-6">
                  <Logo3D size={112} shape="rounded" speed={9} depth={8} glow={true} />
                </div>
                <h3 className="text-2xl font-extrabold text-[var(--text-primary)] mb-1 tracking-tight">
                  JBR DIGITAL
                </h3>
                <div className="text-xs sm:text-sm font-bold text-[#00A3FF] mb-3">
                  {isRTL ? 'نحوّل الأفكار إلى حلول رقمية متكاملة' : 'Transforming Ideas Into Integrated Digital Solutions'}
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {isRTL
                    ? 'شركة متخصصة في تطوير البرمجيات وتصميم المنصات الرقمية وبناء تطبيقات ذكية مصممة لتلبية احتياجات الأعمال وتحسين الكفاءة وتحقيق النمو'
                    : 'A specialized software development and digital platform engineering company, building smart applications tailored to meet business needs, improve efficiency, and drive sustainable growth.'}
                </p>

                {/* 3 Metric Boxes at Bottom of Card */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[var(--border-color)]">
                  <div>
                    <div className="font-extrabold text-sm sm:text-base text-[var(--text-primary)] leading-tight">
                      {isRTL ? 'جودة عالية' : 'High Quality'}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] font-semibold mt-1">
                      {isRTL ? 'معايير احترافية' : 'Pro Standards'}
                    </div>
                  </div>
                  <div>
                    <div className="font-extrabold text-xl text-[#00A3FF]">100%</div>
                    <div className="text-[10px] text-[var(--text-muted)] font-semibold mt-1">
                      {isRTL ? 'حلول احترافية' : 'Professional Solutions'}
                    </div>
                  </div>
                  <div>
                    <div className="font-extrabold text-xl text-[#0055FF]">24/7</div>
                    <div className="text-[10px] text-[var(--text-muted)] font-semibold mt-1">
                      {isRTL ? 'دعم مستمر' : '24/7 Support'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Story (Right) */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="editorial-badge mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
                <span className="font-semibold uppercase tracking-wider text-xs">
                  {isRTL ? 'رؤيتنا' : 'Our Vision'}
                </span>
              </div>

              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {isRTL
                  ? 'بناء أنظمة برمجية ترتقي بالمؤسسات وتصنع مستقبل التكنولوجيا'
                  : 'Building software systems that empower enterprises and shape the future of technology'}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {isRTL
                  ? 'انطلقت JBR Digital software programing لتقديم حلول برمجية مبتكرة تجمع بين العمق التقني والتصميم العصري والأداء المتطور متجاوزةً حدود الحلول الجاهزة نحو أنظمة مخصصة تتميز بالمرونة والموثوقية وقابلية التوسع لمواكبة تطلعات الأعمال المستقبلية'
                  : 'JBR Digital software programing was established to deliver innovative software solutions combining technical depth, modern design, and advanced performance—transcending ready-made templates toward custom systems characterized by flexibility, reliability, and scalability to match future business ambitions.'}
              </p>

              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {isRTL
                  ? 'يجمع فريقنا بين الخبرة في لغات البرمجة الحديثة مثل TypeScript وRust وPython وGo والإبداع في تصميم واجهات المستخدم لتطوير حلول رقمية متكاملة تجمع بين السرعة والكفاءة وسهولة الاستخدام وتمنح عملاءنا تجربة تقنية استثنائية'
                  : 'Our team pairs deep expertise in modern programming languages such as TypeScript, Rust, Python, and Go, with creative user interface design, to develop integrated digital solutions uniting speed, efficiency, and usability, delivering an exceptional technical experience.'}
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  to="/projects"
                  className="btn-primary text-xs uppercase tracking-wider px-6 py-3 font-bold"
                  style={{ textDecoration: 'none' }}
                >
                  {isRTL ? 'استكشف مشاريعنا' : 'View Production Work'}
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary text-xs uppercase tracking-wider px-6 py-3 font-bold"
                  style={{ textDecoration: 'none' }}
                >
                  {isRTL ? 'تواصل معنا' : 'Contact Headquarters'}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Values Cards Grid ── */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden border-t border-[var(--border-color)]"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="section-container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="editorial-badge mb-3 mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
              <span className="font-semibold uppercase tracking-wider text-xs">
                {isRTL ? 'المبادئ والقيم' : 'Core Tenets'}
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {isRTL ? 'قيمنا' : 'Our Principles'}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {isRTL
                ? 'الابتكار والجودة والشفافية لنبني شراكات أساسها الثقة لنحوّل الأفكار إلى حلول رقمية تصنع الفرق'
                : 'Innovation, quality, and transparency to build trust-based partnerships, turning ideas into digital solutions that make a real difference.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <Card
                key={idx}
                elevation={0}
                sx={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: `${val.color}70`,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 15px 30px -10px ${val.color}25`,
                  },
                }}
              >
                <CardContent sx={{ p: 3.5, textAlign: isRTL ? 'right' : 'left' }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                      background: `${val.color}18`,
                      border: `1px solid ${val.color}35`,
                      color: val.color,
                    }}
                  >
                    {val.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      color: 'var(--text-primary)',
                      mb: 1.5,
                    }}
                  >
                    {isRTL ? val.titleAr : val.titleEn}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      fontSize: '0.85rem',
                    }}
                  >
                    {isRTL ? val.descAr : val.descEn}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
