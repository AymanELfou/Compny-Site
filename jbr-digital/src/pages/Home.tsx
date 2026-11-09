import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import TerminalIcon from '@mui/icons-material/Terminal'
import LayersIcon from '@mui/icons-material/Layers'
import MemoryIcon from '@mui/icons-material/Memory'
import SecurityIcon from '@mui/icons-material/Security'
import PhoneIcon from '@mui/icons-material/Phone'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import HeroSection from '../components/HeroSection'
import PillarsBar from '../components/PillarsBar'
import FeaturedServices from '../components/FeaturedServices'
import ProjectsShowcase from '../components/ProjectsShowcase'
import Logo3D from '../components/Logo3D'

const Home: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  useEffect(() => {
    document.title = isRTL
      ? 'JBR Digital — شركة برمجة برمجيات وحلول رقمية متكاملة'
      : 'JBR Digital — Software Programming & Digital Solutions'
  }, [isRTL])

  const engineeringProcess = [
    {
      step: '01',
      titleEn: 'Requirements Analysis & Planning',
      titleAr: 'تحليل المتطلبات والتخطيط',
      descEn: 'We analyze your project goals and define technical needs to set a clear roadmap ensuring the right solutions from day one',
      descAr: 'ندرس أهداف مشروعك ونحدد احتياجاته التقنية لنضع خطة واضحة تضمن اختيار الحلول المناسبة من البداية',
      icon: <TerminalIcon sx={{ fontSize: 20, color: '#00A3FF' }} />,
    },
    {
      step: '02',
      titleEn: 'Design & User Experience',
      titleAr: 'التصميم وتجربة المستخدم',
      descEn: 'We craft modern, intuitive interfaces blending visual elegance with seamless navigation across all devices',
      descAr: 'نصمم واجهات عصرية وسهلة الاستخدام تجمع بين جاذبية التصميم وسلاسة التصفح على مختلف الأجهزة',
      icon: <LayersIcon sx={{ fontSize: 20, color: '#8B5CF6' }} />,
    },
    {
      step: '03',
      titleEn: 'Development & Implementation',
      titleAr: 'التطوير والبرمجة',
      descEn: 'We transform designs into comprehensive digital products with a focus on code quality, high performance, and future scalability',
      descAr: 'نحوّل التصاميم إلى منتجات رقمية متكاملة مع التركيز على جودة الكود وسرعة الأداء وقابلية التطوير مستقبلاً',
      icon: <MemoryIcon sx={{ fontSize: 20, color: '#FF8A76' }} />,
    },
    {
      step: '04',
      titleEn: 'Testing & Launch',
      titleAr: 'الاختبار والإطلاق',
      descEn: 'We test functionality and performance, resolving bugs before launch to guarantee a stable, production-ready user experience',
      descAr: 'نختبر الوظائف والأداء ونعالج الأخطاء قبل إطلاق المشروع لضمان تجربة استخدام مستقرة وجاهزة للعمل',
      icon: <SecurityIcon sx={{ fontSize: 20, color: '#0055FF' }} />,
    },
  ]

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* ── 1. Hero Section (Enterpret x Beehiiv Inspired) ── */}
      <HeroSection />

      {/* ── 2. Services Overview (The 5 Confirmed Services) ── */}
      <FeaturedServices />

      {/* ── 4. Showcase Section (Screenshot 1: "Our Projects Speak for Us" + Filter Pills + 3-Col Responsive Mockups) ── */}
      <ProjectsShowcase limit={3} showHeader={true} />

      {/* ── 5. Corporate Credibility & Engineering Standards (Screenshot 2: Silicon-Valley Standards + JBR SLA Card) ── */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden border-t border-[var(--border-color)]"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        {/* Subtle background glow */}
        <div
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-15"
          style={{
            background: 'radial-gradient(circle, #0055FF 0%, #00A3FF 40%, transparent 70%)',
            filter: 'blur(90px)',
          }}
          aria-hidden="true"
        />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Visual Emblem Badge Card (Left) - exactly as in Screenshot 2 */}
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

            {/* Description & Value Props (Right) - exactly as in Screenshot 2 */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="editorial-badge mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
                <span className="font-semibold uppercase tracking-wider text-xs">
                  {isRTL ? 'لماذا يختار الشركاء JBR DIGITAL' : 'WHY LEADING ORGANIZATIONS CHOOSE JBR DIGITAL'}
                </span>
              </div>

              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {isRTL ? (
                  <>
                    برمجة بأعلى المعايير العالمية{' '}
                    <span className="signature-gradient-text">
                      والتقنية بأحدث الابتكارات في مجال الذكاء الاصطناعي والبرمجة
                    </span>
                  </>
                ) : (
                  <>
                    World-Class Software Engineering{' '}
                    <span className="signature-gradient-text">
                      & Technical Excellence with the Latest Innovations in AI & Programming
                    </span>
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {isRTL
                  ? 'نمزج بين الخبرة المتقدمة والابتكار البرمجي لبناء أنظمة ذكية ومتطورة تجمع بين الأداء الفائق والاستجابة الفورية والموثوقية العالية لتقديم حلول تقنية متكاملة تواكب المستقبل وتصنع الفرق'
                  : 'We blend advanced expertise and software innovation to engineer intelligent, cutting-edge systems that combine peak performance, instant responsiveness, and high reliability—delivering integrated solutions that shape the future.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    titleEn: 'Professional Software Development',
                    titleAr: 'تطوير برمجي محترف',
                    descEn: 'We turn your ideas into tailored digital solutions designed to match your goals and support your business growth.',
                    descAr: 'نحوّل أفكارك إلى حلول رقمية مصممة لتناسب أهدافك وتدعم نمو أعمالك',
                  },
                  {
                    titleEn: 'Advanced Software Engineering',
                    titleAr: 'هندسة برمجية متقدمة',
                    descEn: 'We engineer scalable architectures and clean code tailored for high-load systems and long-term stability.',
                    descAr: 'نبني معمارية برمجية متطورة وكوداً نظيفاً عالي الأداء مصمماً للتوسع واستقرار الأنظمة',
                  },
                  {
                    titleEn: 'High Technical Quality',
                    titleAr: 'جودة تقنية عالية',
                    descEn: 'We build robust, high-performance software utilizing modern technologies and engineering excellence.',
                    descAr: 'نبني برمجيات موثوقة وعالية الأداء باستخدام تقنيات حديثة ومعايير احترافية',
                  },
                  {
                    titleEn: 'Execution Transparency',
                    titleAr: 'شفافية في التنفيذ',
                    descEn: "Continuous updates on your project's progress at every stage, ensuring clarity and confidence until final launch.",
                    descAr: 'نوافيك بتحديثات مستمرة حول تقدّم مشروعك في كل مرحلة لضمان الوضوح والثقة حتى الإطلاق النهائي',
                  },
                ].map((prop, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-3.5 p-4 rounded-xl transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <CheckCircleOutlinedIcon sx={{ fontSize: 20, color: '#00A3FF', mt: 0.3, flexShrink: 0 }} />
                    <div>
                      <div className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {isRTL ? prop.titleAr : prop.titleEn}
                      </div>
                      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {isRTL ? prop.descAr : prop.descEn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Practical Engineering Delivery Process (Beehiiv editorial layout) ── */}
      <section
        className="py-20 px-4 sm:px-6 relative border-t border-[var(--border-color)]"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="section-container relative z-10">
          <div className="max-w-3xl mb-14 text-start">
            <div className="editorial-badge mb-3">
              <span>{isRTL ? 'نهجنا التقني' : 'Our Technical Approach'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              {isRTL ? (
                <>
                  من الفكرة إلى الإطلاق <span className="signature-gradient-text">بخطوات مدروسة</span>
                </>
              ) : (
                <>
                  From Concept to Launch, with{' '}
                  <span className="signature-gradient-text">Calculated Steps.</span>
                </>
              )}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
              {isRTL
                ? 'نتبع منهجية عمل واضحة تجمع بين التخطيط الدقيق والتطوير الاحترافي والاختبارات المستمرة لضمان تقديم حلول رقمية موثوقة تلبي احتياجات مشروعك'
                : 'We follow a clear work methodology combining meticulous planning, professional engineering, and continuous testing to deliver reliable digital solutions that meet your goals.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {engineeringProcess.map((item, idx) => (
              <div
                key={idx}
                className="enterpret-card p-6 flex flex-col justify-between text-start"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[var(--text-muted)]">
                      {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-primary)] border border-[var(--border-color)]">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-[var(--text-primary)] mb-2">
                    {isRTL ? item.titleAr : item.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed m-0">
                    {isRTL ? item.descAr : item.descEn}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--border-color)] text-[11px] font-mono text-[var(--text-muted)]">
                  {isRTL ? `المرحلة ${item.step}` : `Phase ${item.step}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Direct Action CTA Banner ── */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6 relative border-t border-[var(--border-color)]"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="section-container">
          <div className="enterpret-card p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Subtle radial glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none opacity-20"
              style={{
                background: 'radial-gradient(circle, #0055FF 0%, #8B5CF6 50%, transparent 80%)',
                filter: 'blur(70px)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="editorial-badge mb-4">
                <span>{isRTL ? 'مشروعك الرقمي' : 'Your Digital Project'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                {isRTL ? (
                  <>
                    لديك مشروع رقمي <span className="signature-gradient-text">دعنا نحوله إلى واقع</span>
                  </>
                ) : (
                  <>
                    Have a digital project?{' '}
                    <span className="signature-gradient-text">Let us turn it into reality.</span>
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-8 leading-relaxed">
                {isRTL
                  ? 'نساعدك على تحويل رؤيتك إلى حل رقمي متكامل من تحديد المتطلبات إلى اختيار التقنيات المناسبة وتطوير منتج يلبي أهدافك'
                  : 'We help you transform your vision into an integrated digital solution, from scoping requirements to choosing the right technologies and developing a product that fulfills your goals.'}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/contact" className="btn-primary py-3 px-6 text-sm sm:text-base">
                  <span>{isRTL ? 'ناقش مشروعك معنا' : 'Discuss Your Project'}</span>
                  <ArrowForwardIcon sx={{ fontSize: 16, transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                </Link>
                <a
                  href={`https://wa.me/97471377713?text=${encodeURIComponent(
                    isRTL
                      ? 'مرحباً JBR Digital أود الاستفسار عن خدماتكم وتفاصيل المشروع'
                      : 'Hello JBR Digital, I would like to inquire about your software engineering services.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary py-3 px-6 text-sm sm:text-base flex items-center gap-2 cursor-pointer"
                  title={isRTL ? 'تواصل معنا عبر واتساب' : 'Contact us on WhatsApp'}
                >
                  <WhatsAppIcon sx={{ fontSize: 20, color: '#25D366' }} />
                  <span>{isRTL ? 'تواصل عبر واتساب' : 'WhatsApp'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
