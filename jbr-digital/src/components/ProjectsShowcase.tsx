import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../lib/api'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import LaunchIcon from '@mui/icons-material/Launch'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

// Authentic Tool Icons
const FigmaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
)

const AfterEffectsIcon = () => (
  <div className="w-3.5 h-3.5 rounded bg-[#00005b] border border-[#d6a5ff] flex items-center justify-center font-bold text-[8px] text-[#d6a5ff] leading-none">
    Ae
  </div>
)

const BlenderIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z" fill="#ea7600"/>
    <circle cx="13" cy="12" r="2.5" fill="#236192"/>
  </svg>
)

export type ProjectCategory = 'Web' | 'Ecommerce' | 'iOS & Mobile' | 'AI & Automation'

export interface ProjectItem {
  id: string
  title: string
  subtitleEn: string
  subtitleAr: string
  category: ProjectCategory
  categories?: ProjectCategory[]
  tags: Array<{ label: string; icon?: React.ReactNode }>
  image: string
  client: string
  scopeEn: string
  scopeAr: string
  impactEn: string
  impactAr: string
  techStack: string[]
  isFeatured?: boolean
}

export const projectsData: ProjectItem[] = [
  {
    id: 'aura-store',
    title: 'Aura Luxe Store',
    subtitleEn: 'High-Performance Luxury E-Commerce & Checkout Platform',
    subtitleAr: 'متجر إلكتروني متقدم للمنتجات الفاخرة مع بوابة دفع ذكية',
    category: 'Ecommerce',
    categories: ['Web', 'Ecommerce'],
    tags: [
      { label: 'Web' },
      { label: 'E-Commerce' },
      { label: 'Figma', icon: <FigmaIcon /> },
      { label: 'Ae', icon: <AfterEffectsIcon /> },
    ],
    image: '/projects/aura-store.jpg',
    client: 'Aura Luxury Brands Ltd',
    scopeEn: 'Bespoke headless e-commerce architecture, instantaneous client-side filtering, multi-currency checkout, and real-time inventory synchronization',
    scopeAr: 'تصميم وبناء متجر إلكتروني فائق السرعة مع تجربة تسوق تفاعلية وتكامل بوابات الدفع الإلكتروني وتتبع المخزون والطلبات لحظياً',
    impactEn: 'Achieved 42% lift in mobile checkout conversion and sub-second catalog page load',
    impactAr: 'زيادة معدل إتمام عمليات الشراء عبر الجوال بنسبة 42% مع سرعة تحميل أقل من ثانية لصفحات المنتجات',
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'Stripe', 'PostgreSQL', 'Figma'],
    isFeatured: true,
  },
  {
    id: 'quantumyield',
    title: 'QuantumYield',
    subtitleEn: 'AI-Powered DeFi optimizer on Solana',
    subtitleAr: 'منصة تحسين عوائد مالية لا مركزية بالذكاء الاصطناعي على Solana',
    category: 'Web',
    categories: ['Web', 'Ecommerce'],
    tags: [
      { label: 'Web' },
      { label: 'Figma', icon: <FigmaIcon /> },
    ],
    image: '/projects/quantumyield.jpg',
    client: 'Quantum Capital Corp',
    scopeEn: 'Full UI/UX Design system, high-frequency React dashboard, Web3 Solana wallet integration, and sub-second price streaming',
    scopeAr: 'نظام تصميم UI/UX كامل ولوحة تحكم سريعة بتقنية React وربط محافظ Solana ومزامنة الأسعار اللحظية في أجزاء من الثانية',
    impactEn: 'Achieved $42M+ TVL in initial 90 days with 99.98% uptime',
    impactAr: 'تحقيق أكثر من 42 مليون دولار في إجمالي القيمة المقفلة خلال 90 يوماً بنسبة استقرار 99.98%',
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'Solana Web3.js', 'Framer Motion'],
  },
  {
    id: 'solanatap',
    title: 'SolanaTap',
    subtitleEn: 'Web App in Telegram',
    subtitleAr: 'تطبيق ويب سريع مدمج داخل تيليجرام',
    category: 'Web',
    categories: ['Web', 'iOS & Mobile'],
    tags: [
      { label: 'Web' },
      { label: 'Figma', icon: <FigmaIcon /> },
    ],
    image: '/projects/solanatap.jpg',
    client: 'Tap Labs Global',
    scopeEn: 'Custom Telegram Mini-App architecture with micro-transaction support, real-time balance sync, and anti-fraud rate limiting',
    scopeAr: 'بنية تطبيق مصغر لتيليجرام يدعم المعاملات الدقيقة وتزامن الرصيد المباشر وحماية متقدمة من التلاعب',
    impactEn: 'Onboarded 1.4 million active users in 3 weeks with zero server bottlenecks',
    impactAr: 'استقطاب أكثر من 1.4 مليون مستخدم نشط خلال 3 أسابيع بدون أي انقطاع بالخوادم',
    techStack: ['React 19', 'Telegram Mini Apps SDK', 'Node.js', 'Redis', 'PostgreSQL'],
  },
  {
    id: 'al-rayyan-vault',
    title: 'Al Rayyan Mobile Vault',
    subtitleEn: 'Native iOS & Android Biometric Banking App',
    subtitleAr: 'تطبيق الخدمات المصرفية المتقدمة بالبصمة البيومترية والمصادقة الآمنة',
    category: 'iOS & Mobile',
    categories: ['iOS & Mobile'],
    tags: [
      { label: 'iOS & Mobile' },
      { label: 'Swift' },
      { label: 'Flutter' },
    ],
    image: '/projects/solanatap.jpg',
    client: 'Al Rayyan Financial Group',
    scopeEn: 'Native iOS Swift & Flutter cross-platform banking client with FaceID authentication, hardware key encryption, and sub-second transaction routing',
    scopeAr: 'تطبيق جوال أصيل مبني بـ Swift و Flutter مع دعم FaceID وتشفير بالمفاتيح المادية ومزامنة فورية للعمليات',
    impactEn: 'Over 450,000 monthly active users with 99.99% uptime and high performance',
    impactAr: 'أكثر من 450 ألف مستخدم نشط شهرياً مع استقرار برمجي وكفاءة عالية',
    techStack: ['Flutter', 'iOS Swift', 'Kotlin', 'gRPC', 'PostgreSQL'],
  },
  {
    id: 'doha-fleet-ai',
    title: 'DohaFleet AI',
    subtitleEn: 'Autonomous Logistics & Computer Vision Dispatch',
    subtitleAr: 'منصة التوزيع الذكي وأتمتة حركة الأساطيل بالرؤية الحاسوبية',
    category: 'AI & Automation',
    categories: ['AI & Automation'],
    tags: [
      { label: 'AI & Automation' },
      { label: 'Computer Vision' },
      { label: 'Python' },
    ],
    image: '/hero-slide-2.jpg',
    client: 'Qatar Logistics Holdings',
    scopeEn: 'Real-time fleet telemetry, predictive demand modeling, automated route allocation, and Meta WhatsApp Cloud notifications',
    scopeAr: 'تتبع مباشر لأسطول النقل ونمذجة تنبؤية للطلب وتوزيع تلقائي للمسارات مع إشعارات فورية عبر واتساب',
    impactEn: 'Reduced fleet turnaround time by 34% across industrial zones',
    impactAr: 'تخفيض زمن الاستجابة والتوصيل بنسبة 34% في المناطق الصناعية',
    techStack: ['Python', 'FastAPI', 'YOLOv8', 'Redis', 'PostgreSQL'],
  },
  {
    id: 'whatsapp-concierge',
    title: 'Concierge AI',
    subtitleEn: 'Automated WhatsApp Booking & Lead Conversion Agent',
    subtitleAr: 'وكيل خدمة عملاء ذكي عبر واتساب لحجز المواعيد وتأهيل الطلبات',
    category: 'AI & Automation',
    categories: ['AI & Automation', 'iOS & Mobile'],
    tags: [
      { label: 'AI & Automation' },
      { label: 'Meta API' },
      { label: 'NLP' },
    ],
    image: '/hero-slide-2.jpg',
    client: 'Doha Medical & Hospitality Network',
    scopeEn: 'Official WhatsApp Cloud API bot trained on custom enterprise knowledge base, handling 24/7 inquiries in Arabic and English with sub-second response',
    scopeAr: 'ربط رسمي مع WhatsApp Cloud API مدعوم بالذكاء الاصطناعي للرد على استفسارات العملاء بالعربية والإنجليزية على مدار الساعة',
    impactEn: 'Processed 120,000+ patient inquiries with 92% automated resolution rate',
    impactAr: 'معالجة أكثر من 120 ألف استفسار بنسبة حل تلقائي تجاوزت 92%',
    techStack: ['Python', 'Meta Cloud API', 'FastAPI', 'LangChain', 'Redis'],
  },
  {
    id: 'nexura-erp',
    title: 'Nexura Commerce & ERP',
    subtitleEn: 'Enterprise E-Commerce & Multi-Warehouse Sync',
    subtitleAr: 'متجر ومنصة تجارة إلكترونية متكاملة مع مزامنة المستودعات وسلاسل الإمداد',
    category: 'Ecommerce',
    categories: ['Ecommerce', 'Web'],
    tags: [
      { label: 'E-Commerce' },
      { label: 'React 19' },
      { label: 'Docker' },
    ],
    image: '/hero-slide-1.jpg',
    client: 'Qatar Commercial Consortium',
    scopeEn: 'Multi-tenant E-Commerce & ERP architecture with checkout, inventory sync, automated invoice generation, and warehouse barcode sync',
    scopeAr: 'متجر إلكتروني ونظام ERP متعدد الفروع بصلاحيات دقيقة وتتبع تدقيق مالي وفواتير آلية ومزامنة فورية لباركود المستودعات',
    impactEn: 'Integrated 8 regional distribution centers with 99.99% operational continuity',
    impactAr: 'ربط 8 مراكز توزيع إقليمية مع ضمان استمرارية تشغيلية بنسبة 99.99%',
    techStack: ['React 19', 'Node.js', 'PostgreSQL', 'Docker', 'Prisma'],
  },
  {
    id: 'cryptomus',
    title: 'Cryptomus',
    subtitleEn: 'Digital payment gateway platform & web experience',
    subtitleAr: 'بوابة دفع إلكترونية متطورة وتجربة ويب تفاعلية',
    category: 'Ecommerce',
    categories: ['Ecommerce', 'Web'],
    tags: [
      { label: 'E-Commerce' },
      { label: 'Payments' },
      { label: 'Ae', icon: <AfterEffectsIcon /> },
    ],
    image: '/projects/cryptomus.jpg',
    client: 'Cryptomus Payments',
    scopeEn: 'High-converting interactive web experience and checkout gateway for digital merchant payments',
    scopeAr: 'تصميم وبرمجة واجهات دفع رقمية للمتاجر الإلكترونية مع تجربة ويب تفاعلية وسريعة',
    impactEn: 'Generated 3.2M views across social platforms and increased API signups by 68%',
    impactAr: 'حصد أكثر من 3.2 مليون مشاهدة ورفع نسبة التسجيل في بوابة المطورين بنسبة 68%',
    techStack: ['React', 'Next.js', 'TailwindCSS', 'Figma'],
  },
  {
    id: 'x2664',
    title: 'x2664',
    subtitleEn: 'Complete design and web trading platform for x2664',
    subtitleAr: 'تصميم ومنصة ويب متكاملة لـ x2664',
    category: 'Web',
    categories: ['Web'],
    tags: [
      { label: 'Web' },
      { label: 'Banners' },
      { label: 'Blender', icon: <BlenderIcon /> },
      { label: 'Ae', icon: <AfterEffectsIcon /> },
    ],
    image: '/projects/x2664.jpg',
    client: 'x2664 Trading Network',
    scopeEn: 'Multi-screen institutional trading cockpit design, dark-mode data density system, and 3D brand assets',
    scopeAr: 'تصميم منصة تداول مؤسسية متعددة الشاشات مع معالجة بيانات عالية الكثافة وهوية ثلاثية الأبعاد',
    impactEn: 'Standardised cross-platform UI reducing operator error by 45%',
    impactAr: 'توحيد واجهات التداول عبر الشاشات وتخفيض أخطاء الإدخال بنسبة 45%',
    techStack: ['Blender 4.0', 'After Effects', 'Figma', 'WebGL', 'TailwindCSS'],
  },
]

export const ProjectsShowcase: React.FC<{
  limit?: number
  showHeader?: boolean
  showTitle?: boolean
  showFilterTabs?: boolean
  defaultTab?: 'All' | ProjectCategory
  showFooterCta?: boolean
}> = ({
  limit,
  showHeader = true,
  showTitle = true,
  showFilterTabs = true,
  defaultTab = 'Web',
  showFooterCta = Boolean(limit),
}) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const [activeTab, setActiveTab] = useState<'All' | ProjectCategory>(defaultTab)
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [allProjects, setAllProjects] = useState<ProjectItem[]>(projectsData)

  useEffect(() => {
    let isMounted = true
    api.get('/projects?active_only=1')
      .then((res) => {
        if (!isMounted) return
        const list = Array.isArray(res.data) ? res.data : res.data?.data || []
        if (list.length > 0) {
          const mapped: ProjectItem[] = list.map((p: any) => {
            const existing = projectsData.find(
              (item) => item.title.toLowerCase() === p.title.toLowerCase()
            )
            const catMap: Record<string, ProjectCategory> = {
              Web: 'Web',
              Ecommerce: 'Ecommerce',
              'E-Commerce': 'Ecommerce',
              Mobile: 'iOS & Mobile',
              'iOS & Mobile': 'iOS & Mobile',
              AI: 'AI & Automation',
              'AI & Automation': 'AI & Automation',
              ERP: 'Web',
            }
            const normalizedCat: ProjectCategory = catMap[p.category] || 'Web'

            return {
              id: String(p.id),
              title: p.title,
              subtitleEn: p.description || p.title,
              subtitleAr: p.description || p.title,
              category: normalizedCat,
              categories: [normalizedCat],
              tags: Array.isArray(p.tags) && p.tags.length > 0
                ? p.tags.map((t: string) => ({ label: t }))
                : existing?.tags || [{ label: normalizedCat }],
              image: p.image_url || existing?.image || '/projects/solanatap.jpg',
              client: existing?.client || 'JBR Digital Client',
              scopeEn: p.description || existing?.scopeEn || '',
              scopeAr: p.description || existing?.scopeAr || '',
              impactEn: p.price > 0 ? `Starting from $${Number(p.price).toLocaleString()}` : (existing?.impactEn || ''),
              impactAr: p.price > 0 ? `يبدأ من $${Number(p.price).toLocaleString()}` : (existing?.impactAr || ''),
              techStack: Array.isArray(p.tags) ? p.tags : existing?.techStack || ['React', 'TypeScript'],
              isFeatured: p.is_featured ?? existing?.isFeatured,
            }
          })
          setAllProjects(mapped)
        }
      })
      .catch(() => {
        // Keep initial projectsData fallback
      })

    return () => {
      isMounted = false
    }
  }, [])

  const filterTabs: Array<{ id: 'All' | ProjectCategory; labelEn: string; labelAr: string; isAllAction?: boolean }> = [
    { id: 'Web', labelEn: 'Websites', labelAr: 'موقع إلكتروني' },
    { id: 'Ecommerce', labelEn: 'E-Commerce', labelAr: 'متجر إلكتروني' },
    { id: 'iOS & Mobile', labelEn: 'Mobile Apps', labelAr: 'تطبيقات الجوال' },
    { id: 'AI & Automation', labelEn: 'AI & Automation', labelAr: 'ذكاء اصطناعي وأتمتة' },
    { id: 'All', labelEn: 'All Projects →', labelAr: 'جميع المشاريع ←', isAllAction: true },
  ]

  const filteredProjects = allProjects.filter((p) => {
    if (activeTab === 'All') return true
    return p.category === activeTab || p.categories?.includes(activeTab)
  })

  const displayList = limit ? filteredProjects.slice(0, limit) : filteredProjects

  return (
    <section
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden border-t border-[var(--border-color)]"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Subtle Radial Gradient (Enterpret glow) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, #0055FF 0%, #8B5CF6 45%, transparent 75%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {showHeader && (
          <div className="flex flex-col items-center text-center mb-10">
            {showTitle && (
              <>
                {/* Title - exactly as in Screenshot 1 */}
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  {isRTL ? (
                    <>
                      مشاريعنا <span className="signature-gradient-text">تتحدث عنا</span>
                    </>
                  ) : (
                    <>
                      Our Projects <span className="signature-gradient-text">Speak for Us</span>
                    </>
                  )}
                </h2>

                {/* Subtitle Pill Capsule - exactly as in Screenshot 1 */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-8"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {isRTL ? 'كل مشروع' : 'Every project'}
                  </span>
                  <span>—</span>
                  <span>{isRTL ? 'تصميم وكود يحلان مشكلات حقيقية' : 'is design and code that solve real problems'}</span>
                </div>
              </>
            )}

            {/* Filter Tabs Pills Bar */}
            {showFilterTabs && (
              <div className="flex items-center justify-center flex-wrap gap-2 p-1.5 rounded-full">
                {filterTabs.map((tab) => {
                  const isActive = activeTab === tab.id

                  // If on Home page (limit is defined) and tab is "All", let it navigate directly to /projects
                  if (tab.id === 'All' && limit) {
                    return (
                      <Link
                        key={tab.id}
                        to="/projects"
                        className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-white hover:border-[var(--primary)]"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          textDecoration: 'none',
                        }}
                      >
                        <span>{isRTL ? tab.labelAr : tab.labelEn}</span>
                      </Link>
                    )
                  }

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-white text-black shadow-lg font-bold'
                          : 'text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-white hover:border-[var(--primary)]'
                      }`}
                      style={
                        !isActive
                          ? { backgroundColor: 'var(--bg-card)' }
                          : { backgroundColor: '#FFFFFF', color: '#000000' }
                      }
                    >
                      <span>{isRTL ? tab.labelAr : tab.labelEn}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* 3-Column Responsive Card Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-6">
          {displayList.map((project) => {
            const isSelected = project.isFeatured || (activeTab === 'Web' && project.id === 'aura-store')
            return (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-xl sm:rounded-2xl p-3 sm:p-3.5 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: isSelected
                    ? '1.5px solid #0055FF'
                    : '1px solid var(--border-color)',
                  boxShadow: isSelected
                    ? '0 0 20px rgba(0, 85, 255, 0.2), 0 15px 35px -10px rgba(0, 0, 0, 0.7)'
                    : '0 15px 35px -10px rgba(0, 0, 0, 0.6)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00A3FF'
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 163, 255, 0.28), 0 18px 40px -8px rgba(0, 0, 0, 0.8)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isSelected ? '#0055FF' : 'var(--border-color)'
                  e.currentTarget.style.boxShadow = isSelected
                    ? '0 0 20px rgba(0, 85, 255, 0.2), 0 15px 35px -10px rgba(0, 0, 0, 0.7)'
                    : '0 15px 35px -10px rgba(0, 0, 0, 0.6)'
                }}
              >
                {/* Media Container with Framed Mockup */}
                <div
                  className="relative w-full aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden mb-3 bg-black/60"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Subtle inner dark vignette gradient */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, transparent 50%, rgba(10, 15, 29, 0.75) 100%)',
                    }}
                  />

                  {/* Floating Badges at Bottom-Left of Image */}
                  <div className="absolute bottom-2.5 left-2.5 flex flex-wrap items-center gap-1 z-10">
                    {project.tags.map((tag, tIdx) => (
                      <div
                        key={tIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-white/95 backdrop-blur-md"
                        style={{
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                        }}
                      >
                        {tag.icon && <span>{tag.icon}</span>}
                        <span>{tag.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Top-Right Quick View Trigger Icon */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:text-white group-hover:bg-[#0055FF] group-hover:border-[#0055FF] transition-all duration-300">
                    <LaunchIcon sx={{ fontSize: 13 }} />
                  </div>
                </div>

                {/* Content Area */}
                <div className="px-1.5 pb-1 text-start">
                  <h3
                    className="text-base sm:text-lg font-bold tracking-tight transition-colors duration-200"
                    style={{
                      color: isSelected ? 'var(--electric-blue)' : 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-xs mt-1 line-clamp-1 font-normal"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {isRTL ? project.subtitleAr : project.subtitleEn}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        {/* View All Projects CTA button - matching Screenshot 1 */}
        {showFooterCta && (
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0055FF'
                e.currentTarget.style.borderColor = '#00A3FF'
                e.currentTarget.style.color = '#FFFFFF'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 85, 255, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-card)'
                e.currentTarget.style.borderColor = 'var(--border-color)'
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span>{isRTL ? 'استكشف كافة المشاريع والأنظمة' : 'Explore All Production Projects'}</span>
              <ArrowForwardIcon sx={{ fontSize: 15, transform: isRTL ? 'rotate(180deg)' : 'none' }} />
            </Link>
          </div>
        )}
      </div>

      {/* MUI Dialog Modal for Project Case Study */}
      <Dialog
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 40px rgba(0, 85, 255, 0.25)',
              backgroundImage: 'none',
            },
          },
        }}
      >
        {selectedProject && (
          <div dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="relative">
              <div className="w-full h-64 sm:h-80 overflow-hidden relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 40%, var(--bg-card) 100%)',
                  }}
                />
              </div>
              <IconButton
                onClick={() => setSelectedProject(null)}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: isRTL ? 'auto' : 16,
                  left: isRTL ? 16 : 'auto',
                  backgroundColor: 'rgba(0,0,0,0.65)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.85)' },
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>

            <DialogTitle sx={{ pt: 1, pb: 1, px: 4 }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  {selectedProject.title}
                </span>
                <span
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{
                    background: 'rgba(0, 85, 255, 0.15)',
                    color: 'var(--electric-blue)',
                    border: '1px solid rgba(0, 163, 255, 0.3)',
                  }}
                >
                  {selectedProject.category}
                </span>
              </div>
              <p className="text-sm mt-1 font-normal" style={{ color: 'var(--text-secondary)' }}>
                {isRTL ? selectedProject.subtitleAr : selectedProject.subtitleEn}
              </p>
            </DialogTitle>

            <DialogContent sx={{ px: 4, pb: 4 }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--electric-blue)' }}>
                      {isRTL ? 'نطاق العمل والبنية البرمجية' : 'Architecture & Scope'}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {isRTL ? selectedProject.scopeAr : selectedProject.scopeEn}
                    </p>
                  </div>

                  <div
                    className="p-3.5 rounded-xl flex items-start gap-3"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <CheckCircleOutlinedIcon sx={{ color: '#22c55e', fontSize: 22, mt: 0.3 }} />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-primary)' }}>
                        {isRTL ? 'الأثر والنتائج' : 'Measured Impact & Performance'}
                      </div>
                      <div className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {isRTL ? selectedProject.impactAr : selectedProject.impactEn}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="space-y-4 p-4 rounded-xl"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-1 font-semibold" style={{ color: 'var(--text-muted)' }}>
                      {isRTL ? 'العميل' : 'Client Organization'}
                    </div>
                    <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{selectedProject.client}</div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: 'var(--text-muted)' }}>
                      {isRTL ? 'التقنيات المستخدمة' : 'Production Stack'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md text-xs font-mono"
                          style={{
                            background: 'rgba(0, 85, 255, 0.1)',
                            color: 'var(--electric-blue)',
                            border: '1px solid rgba(0, 163, 255, 0.25)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between flex-wrap gap-3">
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {isRTL
                    ? 'تم تنفيذ المشروع بمعايير الجودة والأمان لشركة JBR Digital قطر'
                    : 'Engineered in accordance with JBR Digital Qatar production standards.'}
                </div>
                <Link
                  to="/contact"
                  className="btn-primary text-xs px-5 py-2.5 font-bold flex items-center gap-2"
                  style={{ textDecoration: 'none' }}
                >
                  <span>{isRTL ? 'طلب استشارة مماثلة' : 'Request Similar Architecture'}</span>
                  <ArrowForwardIcon sx={{ fontSize: 14 }} />
                </Link>
              </div>
            </DialogContent>
          </div>
        )}
      </Dialog>
    </section>
  )
}

export default ProjectsShowcase
