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
  rawCategory?: string
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
  link?: string
}

export const projectsData: ProjectItem[] = []

const normalizeCategory = (cat: string): ProjectCategory => {
  const c = (cat || '').trim().toLowerCase()
  if (c.includes('web') || c.includes('site') || c.includes('موقع')) return 'Web'
  if (c.includes('com') || c.includes('shop') || c.includes('store') || c.includes('متجر')) return 'Ecommerce'
  if (c.includes('mob') || c.includes('ios') || c.includes('android') || c.includes('app') || c.includes('جوال') || c.includes('تطبيق')) return 'iOS & Mobile'
  if (c.includes('ai') || c.includes('auto') || c.includes('ذكاء') || c.includes('أتمتة')) return 'AI & Automation'
  return 'Web'
}

const mapApiProjectToItem = (p: any): ProjectItem => {
  const rawCat = (p.category || 'Web').trim()
  const normalizedCat = normalizeCategory(rawCat)

  const rawLink = p.link || (Array.isArray(p.tags) && p.tags[0]?.startsWith('http') ? p.tags[0] : '') || ''
  const formattedLink = rawLink && !/^https?:\/\//i.test(rawLink) ? `https://${rawLink}` : rawLink

  const tagsList: string[] = Array.isArray(p.tags)
    ? p.tags.filter((t: string) => !/^https?:\/\//i.test(t))
    : typeof p.tags === 'string' && !p.tags.startsWith('http')
    ? p.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : []

  const finalTags = tagsList.length > 0 ? tagsList : [rawCat]

  return {
    id: String(p.id),
    title: p.title || 'Untitled Project',
    subtitleEn: p.description || p.title || 'Software Engineering Project',
    subtitleAr: p.description || p.title || 'مشروع هندسة برمجية متكامل',
    category: normalizedCat,
    rawCategory: rawCat,
    categories: [normalizedCat],
    tags: finalTags.map((t: string) => ({ label: t })),
    image: p.image_url || '/projects/solanatap.jpg',
    client: p.client || 'JBR Digital Client',
    scopeEn: p.description || 'Full-cycle engineering architecture, scalable cloud infrastructure and clean modern UI.',
    scopeAr: p.description || 'تطوير برمجي متكامل ومعمارية برمجية حديثة مع واجهات مستخدم متجاوبة وعالية السرعة.',
    impactEn: formattedLink ? formattedLink : (Number(p.price) > 0 ? `Starting from $${Number(p.price).toLocaleString()}` : 'Tailored Architecture'),
    impactAr: formattedLink ? formattedLink : (Number(p.price) > 0 ? `يبدأ من $${Number(p.price).toLocaleString()}` : 'معمارية مخصصة'),
    techStack: finalTags.length > 0 ? finalTags : ['React', 'TypeScript', 'TailwindCSS'],
    isFeatured: Boolean(p.is_featured),
    link: formattedLink,
  }
}

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
  const [allProjects, setAllProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const loadProjects = React.useCallback(async () => {
    try {
      const res = await api.get('/projects?active_only=1')
      const remoteList = Array.isArray(res.data) ? res.data : res.data?.data || []
      
      let localList: any[] = []
      try {
        const raw = localStorage.getItem('jbr_custom_projects')
        localList = raw ? JSON.parse(raw) : []
      } catch {
        localList = []
      }

      const mergedMap = new Map<string | number, any>()
      remoteList.filter((p: any) => p.is_active !== false).forEach((p: any) => mergedMap.set(p.id, p))
      localList.filter((p: any) => p.is_active !== false).forEach((p: any) => {
        if (!mergedMap.has(p.id)) {
          mergedMap.set(p.id, p)
        }
      })

      const combined = Array.from(mergedMap.values())
      setAllProjects(combined.map(mapApiProjectToItem))
    } catch {
      // Offline fallback: load from localStorage
      try {
        const raw = localStorage.getItem('jbr_custom_projects')
        const localList: any[] = raw ? JSON.parse(raw) : []
        const activeOnly = localList.filter((p: any) => p.is_active !== false)
        setAllProjects(activeOnly.map(mapApiProjectToItem))
      } catch {
        setAllProjects([])
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProjects()

    const handleUpdate = () => {
      loadProjects()
    }

    window.addEventListener('projects_updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return () => {
      window.removeEventListener('projects_updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [loadProjects])

  const filterTabs: Array<{ id: 'All' | ProjectCategory; labelEn: string; labelAr: string; isAllAction?: boolean }> = [
    { id: 'Web', labelEn: 'Websites', labelAr: 'موقع إلكتروني' },
    { id: 'Ecommerce', labelEn: 'E-Commerce', labelAr: 'متجر إلكتروني' },
    { id: 'iOS & Mobile', labelEn: 'Mobile Apps', labelAr: 'تطبيقات الجوال' },
    { id: 'AI & Automation', labelEn: 'AI & Automation', labelAr: 'ذكاء اصطناعي وأتمتة' },
    { id: 'All', labelEn: 'All Projects →', labelAr: 'جميع المشاريع ←', isAllAction: true },
  ]

  const filteredProjects = allProjects.filter((p) => {
    if (activeTab === 'All') return true
    return (
      p.category === activeTab ||
      p.categories?.includes(activeTab) ||
      normalizeCategory(p.rawCategory || '') === activeTab
    )
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
                {/* Title */}
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

                {/* Subtitle Pill Capsule */}
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

        {/* Projects Display or Colorful Animated Empty State */}
        {displayList.length === 0 ? (
          <div
            className="animated-empty-card mt-8 py-16 sm:py-20 px-6 rounded-2xl sm:rounded-3xl border text-center relative overflow-hidden flex flex-col items-center justify-center"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderWidth: '1.5px',
            }}
          >
            {/* Colorful animated ambient background glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none opacity-25"
              style={{
                background: 'radial-gradient(circle, #0055FF 0%, #8B5CF6 35%, #EC4899 65%, transparent 80%)',
                filter: 'blur(70px)',
              }}
              aria-hidden="true"
            />

            {/* Elegant Animated Floating Icon */}
            <div
              className="animated-empty-icon relative mb-5 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 85, 255, 0.18), rgba(139, 92, 246, 0.18))',
                border: '1.5px solid rgba(0, 163, 255, 0.35)',
                boxShadow: '0 10px 25px rgba(0, 85, 255, 0.25)',
              }}
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#empty-gradient)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <defs>
                  <linearGradient id="empty-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00A3FF" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                <path d="m9 13 2 2 4-4" />
              </svg>
            </div>

            {/* The animated colored phrase: "No projects yet" / "لا توجد مشاريع حتى الآن" */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight animated-rainbow-text mb-2">
              {isRTL ? 'لا توجد مشاريع حتى الآن' : 'No projects yet'}
            </h3>

            {/* Subtitle / explanation */}
            <p
              className="text-xs sm:text-sm mt-1 max-w-md mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {isRTL
                ? 'لم يتم إضافة أي مشاريع في هذا القسم حتى الآن، سيتم نشر مشاريع جديدة فور إضافتها من قبل الإدارة.'
                : 'No projects have been published in this section yet. New projects added by the admin will appear here.'}
            </p>

            {/* If admin is logged in, show a quick shortcut button to add a project */}
            {Boolean(localStorage.getItem('admin_token')) && (
              <Link
                to="/admin/projects"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #0055FF, #00A3FF)',
                  textDecoration: 'none',
                }}
              >
                <span>+</span>
                <span>{isRTL ? 'إضافة مشروع جديد كمسؤول' : 'Add New Project'}</span>
              </Link>
            )}
          </div>
        ) : (
          /* 3-Column Responsive Card Showcase Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-6">
            {displayList.map((project) => {
              const isSelected = Boolean(project.isFeatured)
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

                    {/* Top-Right Quick View / External Link Trigger Icon */}
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white hover:bg-[#0055FF] hover:border-[#0055FF] transition-all duration-300 z-20"
                        title={isRTL ? 'زيارة رابط المشروع في نافذة جديدة' : 'Open project in new tab'}
                      >
                        <LaunchIcon sx={{ fontSize: 13 }} />
                      </a>
                    ) : (
                      <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:text-white group-hover:bg-[#0055FF] group-hover:border-[#0055FF] transition-all duration-300">
                        <LaunchIcon sx={{ fontSize: 13 }} />
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="px-1.5 pb-1 text-start">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className="text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 line-clamp-1"
                        style={{
                          color: isSelected ? 'var(--electric-blue)' : 'var(--text-primary)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {project.title}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00A3FF] hover:text-white hover:underline transition-colors flex-shrink-0"
                          title={isRTL ? 'فتح رابط المشروع' : 'Visit project'}
                        >
                          <span>{isRTL ? 'زيارة' : 'Visit'}</span>
                          <LaunchIcon sx={{ fontSize: 11 }} />
                        </a>
                      )}
                    </div>
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
        )}

        {/* View All Projects CTA button */}
        {showFooterCta && allProjects.length > 0 && (
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
                        {selectedProject.link ? (isRTL ? 'رابط المشروع المباشر' : 'Live Project URL') : (isRTL ? 'الأثر والنتائج' : 'Measured Impact & Performance')}
                      </div>
                      <div className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {selectedProject.link ? (
                          <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1 font-medium break-all"
                          >
                            <span>{selectedProject.link}</span>
                            <LaunchIcon sx={{ fontSize: 13 }} />
                          </a>
                        ) : (
                          isRTL ? selectedProject.impactAr : selectedProject.impactEn
                        )}
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
                <div className="flex items-center gap-2">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs px-5 py-2.5 font-bold flex items-center gap-2"
                      style={{
                        textDecoration: 'none',
                        background: 'linear-gradient(135deg, #0055FF, #00A3FF)',
                      }}
                    >
                      <span>{isRTL ? 'زيارة رابط المشروع' : 'Visit Live Project'}</span>
                      <LaunchIcon sx={{ fontSize: 14 }} />
                    </a>
                  )}
                  <Link
                    to="/contact"
                    className="btn-secondary text-xs px-4 py-2.5 font-bold flex items-center gap-2"
                    style={{ textDecoration: 'none' }}
                  >
                    <span>{isRTL ? 'طلب استشارة' : 'Consultation'}</span>
                    <ArrowForwardIcon sx={{ fontSize: 14, transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                  </Link>
                </div>
              </div>
            </DialogContent>
          </div>
        )}
      </Dialog>
    </section>
  )
}

export default ProjectsShowcase
