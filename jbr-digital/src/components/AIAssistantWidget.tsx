import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Sparkles,
  Bot,
  X,
  Send,
  MessageSquare,
  Phone,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  RotateCcw,
} from 'lucide-react'
import { Skeleton } from './ui/skeleton'
import api from '../lib/api'

interface ChatMessage {
  id: string
  sender: 'ai' | 'user'
  text: string
  quickAction?: {
    label: string
    href?: string
    isExternal?: boolean
  }
}

// Parse text to make Markdown links [text](url) and raw URLs clickable
const renderTextWithLinks = (rawText: string) => {
  if (!rawText) return null

  // Matches Markdown link [Anchor text](URL) OR raw URL https?://...
  const tokenRegex = /(\[[^\]\n]+\]\([^\)\s]+\)|https?:\/\/[^\s]+)/g
  const parts = rawText.split(tokenRegex)

  return parts.map((part, i) => {
    if (!part) return null

    // Check for Markdown link: [Label](URL)
    const mdMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (mdMatch) {
      const label = mdMatch[1]
      const url = mdMatch[2].trim()
      const finalHref = url.startsWith('www.') ? `https://${url}` : url

      return (
        <a
          key={i}
          href={finalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00A3FF] hover:text-[#38bdf8] underline underline-offset-4 font-bold transition-colors cursor-pointer inline-flex items-center gap-1 mx-1"
          onClick={(e) => e.stopPropagation()}
          title={label}
        >
          <span>{label}</span>
          <ExternalLink size={12} className="inline shrink-0 opacity-80" />
        </a>
      )
    }

    // Check for standalone URL: https?://...
    if (/^https?:\/\/[^\s]+$/.test(part)) {
      // Clean trailing punctuation like ., ,, ;, :, ), ]
      const cleanUrl = part.replace(/[.,;:!?)\]]+$/, '')
      const trailing = part.slice(cleanUrl.length)

      return (
        <React.Fragment key={i}>
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00A3FF] hover:text-[#38bdf8] underline underline-offset-4 font-bold transition-colors cursor-pointer inline-flex items-center gap-1 mx-1 break-all"
            onClick={(e) => e.stopPropagation()}
            title={cleanUrl}
          >
            <span>{cleanUrl}</span>
            <ExternalLink size={12} className="inline shrink-0 opacity-80" />
          </a>
          {trailing}
        </React.Fragment>
      )
    }

    return <span key={i}>{part}</span>
  })
}

const LiveWritingText: React.FC<{
  text: string
  animate: boolean
  onCharTyped?: () => void
}> = ({ text, animate, onCharTyped }) => {
  const [displayedText, setDisplayedText] = useState(animate ? '' : text)
  const [isDone, setIsDone] = useState(!animate)

  useEffect(() => {
    if (!animate) {
      setDisplayedText(text)
      setIsDone(true)
      return
    }

    setDisplayedText('')
    setIsDone(false)
    let index = 0
    const step = Math.max(1, Math.floor(text.length / 50))
    const timer = setInterval(() => {
      index += step
      if (index >= text.length) {
        setDisplayedText(text)
        setIsDone(true)
        clearInterval(timer)
        onCharTyped?.()
      } else {
        setDisplayedText(text.slice(0, index))
        onCharTyped?.()
      }
    }, 16)

    return () => clearInterval(timer)
  }, [text, animate])

  return (
    <p className="m-0 whitespace-pre-line leading-relaxed">
      {renderTextWithLinks(displayedText)}
      {!isDone && (
        <span className="inline-block w-1.5 h-3.5 bg-[#00A3FF] ml-0.5 animate-pulse align-middle" />
      )}
    </p>
  )
}

const TypewriterBadge: React.FC<{
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseTime?: number
}> = ({ phrases, typingSpeed = 80, deletingSpeed = 45, pauseTime = 2800 }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const targetPhrase = phrases[currentPhraseIndex % phrases.length]
    let timer: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (currentText.length < targetPhrase.length) {
        timer = setTimeout(() => {
          setCurrentText(targetPhrase.slice(0, currentText.length + 1))
        }, typingSpeed)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, pauseTime)
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(targetPhrase.slice(0, currentText.length - 1))
        }, deletingSpeed)
      } else {
        setIsDeleting(false)
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
      }
    }

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime])

  return (
    <span className="inline-flex items-center">
      <span>{currentText}</span>
      <span className="inline-block w-1.5 h-3 bg-[#00A3FF] ml-1 mr-1 animate-pulse rounded-xs" />
    </span>
  )
}

export const AIAssistantWidget: React.FC = () => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const [isOpen, setIsOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [latestAiMsgId, setLatestAiMsgId] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const initialMessages: ChatMessage[] = [
    {
      id: 'welcome-1',
      sender: 'ai',
      text: isRTL
        ? 'مرحباً بك في JBR Digital 🇶🇦 أنا مساعدك الذكي للإجابة عن خدماتنا البرمجية وتقدير تكلفة المشاريع وضمانات الجودة وتنسيق استشارتك التقنية'
        : 'Welcome to JBR Digital 🇶🇦 I am your AI Assistant I can answer questions about our software engineering services project scoping 99.9% uptime SLA and connecting directly with our technical team',
    },
  ]

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

  // Quick prompt questions
  const suggestedQuestions = [
    {
      qEn: 'What services do you provide',
      qAr: 'ما هي الخدمات التي تقدمونها',
      aEn: 'We provide 5 core enterprise services: 1 High-performance Web Platforms (React 19 Next.js) 2 Cross-Platform Mobile Apps (Flutter Native iOS Swift) 3 WhatsApp Cloud API & AI Automation 4 Custom ERP & Business Systems and 5 Cloud Engineering & DevOps (Docker PostgreSQL) Every project is 100% bespoke with zero generic templates',
      aAr: 'نقدم 5 خدمات برمجية متكاملة: 1 منصات الويب عالية الأداء (React 19 و Next.js) 2 تطبيقات الجوال (Flutter و iOS أصلية) 3 أتمتة الواتساب والذكاء الاصطناعي 4 أنظمة ERP وإدارة الأعمال 5 الأنظمة السحابية والدعم المستمر جميع مشاريعنا تُبنى خصيصاً بنسبة 100% بدون أي قوالب مسبقة',
      action: {
        labelEn: 'Explore Full Services',
        labelAr: 'استعرض كافة الخدمات',
        href: '/services',
      },
    },
    {
      qEn: 'Can you develop native iOS & Android apps',
      qAr: 'هل تطورون تطبيقات جوال لنظامي iOS وأندرويد',
      aEn: 'Yes We build high-fidelity mobile applications using unified Flutter codebases and native Swift/Kotlin All apps feature biometric authentication (FaceID) offline-first local sync push notifications and full compliance with Apple App Store and Google Play guidelines',
      aAr: 'نعم بالتأكيد نطور تطبيقات جوال فائقة السرعة باستخدام Flutter وبنيات Swift/Kotlin الأصلية مع دعم كامل للبصمة والتعرف على الوجه ومزامنة البيانات دون إنترنت والنشر المعتمد على متجري App Store و Google Play',
      action: {
        labelEn: 'View Mobile Projects',
        labelAr: 'عرض نماذج التطبيقات',
        href: '/projects',
      },
    },
    {
      qEn: 'What is your 99.9% Uptime SLA guarantee',
      qAr: 'ما هو ضمان الاستقرار بنسبة 99.9%',
      aEn: 'Our systems are backed by strict contractual SLAs: 99.9% Uptime availability sub-100ms API response latency benchmarks automated CI/CD zero-downtime rolling deploys high-performance cloud hosting and enterprise-grade data protection',
      aAr: 'نلتزم بعقود رسمية تضمن: نسبة تشغيل واستقرار 99.9% (Uptime SLA) واستجابة برمجية في أقل من 100ms ونشر مؤتمت بدون انقطاع واستضافة سحابية عالية الأداء مع حماية وموثوقية تامة للبيانات والأنظمة',
      action: {
        labelEn: 'View Architecture Scope',
        labelAr: 'تفاصيل المعايير التقنية',
        href: '/about',
      },
    },
    {
      qEn: 'How to get a project quotation / proposal',
      qAr: 'كيف أحصل على عرض سعر لمشروعي',
      aEn: 'You can request a free technical consultation and SOW scoping document directly through our contact page or reach out to our team via WhatsApp at +974 7137 7713 We typically deliver architectural blueprints and milestone estimates within 24–48 hours',
      aAr: 'يمكنك طلب دراسة تقنية مخصصة وعقد نطاق عمل (SOW) مباشرة عبر نموذج التواصل أو محادثتنا فوراً عبر واتساب على الرقم 7713 7137 974+ نقوم بتقديم التقدير الفني والزمني خلال 24 إلى 48 ساعة',
      action: {
        labelEn: 'Request Project Proposal',
        labelAr: 'طلب عرض سعر للمشروع',
        href: '/contact',
      },
    },
    {
      qEn: 'Where are your offices located',
      qAr: 'أين تقع مكاتبكم الرسمية',
      aEn: 'JBR Digital operates with dual regional hubs: our Administrative & SOW Headquarters is based in Doha Qatar (+974 7137 7713) and our Regional Engineering & Development Hub operates in Casablanca Morocco This gives you both local on-the-ground support and extensive engineering depth',
      aAr: 'تعمل JBR Digital عبر مقرين رئيسيين: المقر الإداري والتعاقدي في الدوحة دولة قطر (هاتف 7713 7137 974+) ومركز تطوير النظم في الدار البيضاء المملكة المغربية هذا يضمن لعملائنا دعماً محلياً مباشراً وقدرات برمجية موسعة',
      action: {
        labelEn: 'Call Doha Office: +974 7137 7713',
        labelAr: 'اتصل بمكتب الدوحة: 7713 7137 974+',
        href: 'tel:+97471377713',
      },
    },
  ]

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendQuestion = async (questionText: string, customAnswer?: string, actionItem?: any) => {
    if (!questionText.trim()) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: questionText,
    }

    setMessages((prev) => [...prev, userMsg])
    setInputMessage('')
    setIsTyping(true)

    let replyText = ''
    let action = actionItem

    if (customAnswer) {
      replyText = customAnswer
    } else {
      // Try querying OpenAI Chat via Laravel backend
      try {
        const historyPayload = messages.slice(-6).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        }))

        const response = await api.post('/chat', {
          message: questionText,
          history: historyPayload,
        })

        if (response.data?.reply) {
          replyText = response.data.reply
          action = {
            labelEn: 'Start Your Project Now',
            labelAr: 'ابدأ مشروعك الآن',
            href: '/contact',
            isExternal: false,
          }
        }
      } catch {
        // Fallback to local keyword rules if backend offline
      }

      // If backend was offline or didn't return reply, use fallback
      if (!replyText) {
        const lower = questionText.toLowerCase()
        if (lower.includes('price') || lower.includes('cost') || lower.includes('سعر') || lower.includes('تكلفة')) {
          replyText = isRTL
            ? 'تُحدد التكلفة بناءً على نطاق العمل الدقيق والميزات المطلوبة وفق منهجية العقود محددة المخرجات (SOW) تبدأ أسعار المواقع من 950$ والتطبيقات من 1900$ دولار أمريكي يمكنك مراسلتنا لحساب السعر الدقيق لمشروعك'
            : 'Pricing depends on your specific architectural requirements Web platforms start from $950 USD and mobile apps from $1900 USD Contact us for an exact quotation'
          action = {
            labelEn: 'Start Your Project Now',
            labelAr: 'ابدأ مشروعك الآن',
            href: '/contact',
            isExternal: false,
          }
        } else if (lower.includes('whatsapp') || lower.includes('واتساب') || lower.includes('bot')) {
          replyText = isRTL
            ? 'نقدم تكاملاً رسمياً مع Meta WhatsApp Cloud API لبناء روبوتات ذكية تؤتمت الردود على الاستفسارات وحجز المواعيد وتوليد الفواتير على مدار الساعة'
            : 'We provide certified integration with the Meta WhatsApp Cloud API to deploy conversational AI agents that automate customer service appointment scheduling and dispatch tracking 24/7'
          action = {
            labelEn: 'Start Your Project Now',
            labelAr: 'ابدأ مشروعك الآن',
            href: '/contact',
            isExternal: false,
          }
        } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('تواصل') || lower.includes('هاتف')) {
          replyText = isRTL
            ? 'يسعدنا التواصل معك مباشرة هاتفنا المعتمد في الدوحة +974 7137 7713 والبريد الإلكتروني Info@jbrdigitalsoftwareprograming.com'
            : 'You can reach our engineering leads directly at +974 7137 7713 (Doha HQ) or by email at Info@jbrdigitalsoftwareprograming.com We look forward to assisting you'
          action = {
            labelEn: 'Start Your Project Now',
            labelAr: 'ابدأ مشروعك الآن',
            href: '/contact',
            isExternal: false,
          }
        } else {
          replyText = isRTL
            ? 'شكراً لاستفسارك في JBR Digital نبني حلولاً برمجية احترافية تشمل منصات الويب وتطبيقات الجوال وأنظمة ERP والأتمتة الذكية يمكنك أيضاً التحدث معنا مباشرة'
            : 'Thank you for your question In JBR Digital we build professional software platforms native mobile apps ERP systems and AI automation Feel free to request a consultation or speak directly with us'
          action = {
            labelEn: 'Start Your Project Now',
            labelAr: 'ابدأ مشروعك الآن',
            href: '/contact',
            isExternal: false,
          }
        }
      }
    }

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: replyText,
      quickAction: action
        ? {
            label: isRTL ? action.labelAr || action.label : action.labelEn || action.label,
            href: action.href,
            isExternal: action.isExternal,
          }
        : undefined,
    }

    setMessages((prev) => [...prev, aiMsg])
    setLatestAiMsgId(aiMsg.id)
    setIsTyping(false)
  }

  const handleReset = () => {
    setMessages(initialMessages)
    setLatestAiMsgId('')
    setIsTyping(false)
  }

  return (
    <>
      {/* ── Floating Animated Trigger with Cloud Speech Bubble ── */}
      <div
        className="fixed z-50 flex flex-col items-center gap-2.5 transition-all duration-300 group bottom-10 sm:bottom-12 left-4 sm:left-6"
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        {/* Cloud-shaped Speech Bubble with Live Typewriting */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="agent-speech-cloud cursor-pointer transition-all duration-300 transform group-hover:scale-105 active:scale-95 mb-1"
            style={{
              outline: 'none',
              background: 'transparent',
              border: 'none',
              padding: 0,
            }}
            aria-label={isRTL ? 'كيف يمكنني مساعدتك اليوم' : 'How can I help you today'}
          >
            <div
              className="relative px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 backdrop-blur-md"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1.2px solid rgba(0, 163, 255, 0.45)',
                boxShadow: '0 8px 24px rgba(0, 85, 255, 0.22), 0 3px 10px rgba(0, 0, 0, 0.4)',
                color: 'var(--text-primary)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div className="text-[11px] font-bold font-heading whitespace-nowrap min-w-[155px] text-start">
                <TypewriterBadge
                  phrases={
                    isRTL
                      ? ['كيف يمكنني مساعدتك اليوم', 'سعيد جداً للدردشة معك']
                      : ['How can I help you today', 'Happy to chat with you']
                  }
                  typingSpeed={80}
                  deletingSpeed={45}
                  pauseTime={2600}
                />
              </div>


              {/* Cloud Tail pointer pointing down to the avatar */}
              <div
                className="absolute -bottom-1 w-2.5 h-2.5 rotate-45 left-1/2 -translate-x-1/2"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRight: '1.2px solid rgba(0, 163, 255, 0.45)',
                  borderBottom: '1.2px solid rgba(0, 163, 255, 0.45)',
                }}
              />
            </div>
          </button>
        )}

        {/* Animated Bot Avatar Circle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 sm:w-15 sm:h-15 rounded-full flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 group-hover:scale-110 active:scale-95 ${
            !isOpen ? 'animate-chat-float' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, #0055FF 0%, #00A3FF 100%)',
            boxShadow: '0 0 25px rgba(0, 85, 255, 0.55), 0 10px 25px rgba(0, 0, 0, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.35)',
          }}
          aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        >
          {/* Animated Ambient Glow Pulse */}
          {!isOpen && (
            <span
              className="absolute inset-0 rounded-full animate-sonar pointer-events-none"
              style={{ backgroundColor: 'rgba(0, 163, 255, 0.45)' }}
            />
          )}

          {isOpen ? (
            <X size={24} className="text-white transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="/assistant-avatar.png"
                alt="JBR Digital Consultant"
                className="w-full h-full object-cover rounded-full scale-110"
              />
            </div>
          )}

          {/* Active Status Dot */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[var(--bg-primary)] shadow-sm animate-pulse" />
        </button>
      </div>

      {/* ── Interactive Chat Panel ── */}
      {isOpen && (
        <div
          className="fixed z-50 w-[92vw] sm:w-[410px] rounded-3xl shadow-2xl transition-all duration-300 flex flex-col overflow-hidden animate-chat-panel bottom-28 sm:bottom-32 left-4 sm:left-6"
          style={{
            height: '560px',
            maxHeight: 'calc(100vh - 120px)',
            backgroundColor: 'var(--bg-card)',
            border: '1.5px solid rgba(0, 163, 255, 0.35)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 85, 255, 0.25)',
            backdropFilter: 'blur(16px)',
            direction: isRTL ? 'rtl' : 'ltr',
          }}
        >
          {/* Header */}
          <div
            className="p-4 sm:p-5 flex items-center justify-between border-b border-[var(--border-color)]"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 85, 255, 0.12) 0%, transparent 100%)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#0055FF] to-[#00A3FF] shadow-md shrink-0 overflow-hidden">
                <img
                  src="/assistant-avatar.png"
                  alt="JBR Digital Consultant"
                  className="w-full h-full object-cover rounded-full scale-110"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute bottom-0 right-0 border-2 border-[var(--bg-card)] shadow-xs animate-pulse" />
              </div>
              <div className="text-start">
                <div className="font-heading font-bold text-sm text-[var(--text-primary)] flex items-center gap-1.5">
                  <span>{isRTL ? 'مرحباً بك في عالمنا الخاص JBR' : 'Welcome to our world JBR'}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                    {isRTL ? 'متصل' : 'Online'}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>{isRTL ? 'متصل الآن' : 'Online'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={isRTL ? 'إعادة ضبط المحادثة' : 'Reset chat'}
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close assistant"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-start">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col animate-chat-bubble ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className={`flex items-end gap-2 max-w-[88%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.sender === 'ai' && (
                    <img
                      src="/assistant-avatar.png"
                      alt="Assistant"
                      className="w-7 h-7 rounded-full object-cover shrink-0 border border-[#00A3FF]/40 shadow-xs mb-1 scale-110"
                    />
                  )}
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0055FF] text-white rounded-br-xs font-medium shadow-md'
                        : 'rounded-bl-xs border border-[var(--border-color)]'
                    }`}
                    style={
                      msg.sender === 'ai'
                        ? {
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                          }
                        : {}
                    }
                  >
                    {msg.sender === 'ai' ? (
                      <LiveWritingText
                        text={msg.text}
                        animate={msg.id === latestAiMsgId}
                        onCharTyped={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                      />
                    ) : (
                      <p className="m-0 whitespace-pre-line">{renderTextWithLinks(msg.text)}</p>
                    )}
                  </div>
                </div>

                {/* Optional Quick Action Link Button */}
                {msg.quickAction && (
                  <div className={`mt-2 ${msg.sender === 'ai' ? (isRTL ? 'mr-9' : 'ml-9') : ''}`}>
                    {msg.quickAction.isExternal ? (
                      <a
                        href={msg.quickAction.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer"
                        style={{ textDecoration: 'none' }}
                      >
                        <MessageSquare size={13} />
                        <span>{msg.quickAction.label}</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <Link
                        to={msg.quickAction.href || '/contact'}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer"
                        style={{ textDecoration: 'none' }}
                      >
                        <MessageSquare size={13} />
                        <span>{msg.quickAction.label}</span>
                        <ArrowRight size={13} className={isRTL ? 'rotate-180' : ''} />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Skeleton Loading State when AI is typing */}
            {isTyping && (
              <div className="flex items-end gap-2 max-w-[85%] animate-chat-bubble">
                <img
                  src="/assistant-avatar.png"
                  alt="Assistant"
                  className="w-7 h-7 rounded-full object-cover shrink-0 border border-[#00A3FF]/40 shadow-xs mb-1 scale-110"
                />
                <div className="p-3.5 rounded-2xl rounded-bl-xs bg-[var(--bg-primary)] border border-[var(--border-color)] w-full space-y-2">
                  <div className="flex items-center gap-1 text-[11px] text-[var(--electric-blue)] mb-1">
                    <Sparkles size={12} className="animate-spin text-[#00A3FF]" />
                    <span>{isRTL ? 'جاري تحضير الرد...' : 'Analyzing & answering...'}</span>
                  </div>
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/5" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions Chips */}
          <div className="p-2.5 border-t border-[var(--border-color)] bg-[var(--bg-primary)]/80">
            <div className="text-[10px] font-semibold text-[var(--text-muted)] mb-1.5 px-1 uppercase tracking-wider text-start">
              {isRTL ? 'أسئلة شائعة للاستفسار الفوري:' : 'Suggested Client Questions:'}
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {suggestedQuestions.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    handleSendQuestion(
                      isRTL ? sq.qAr : sq.qEn,
                      isRTL ? sq.aAr : sq.aEn,
                      sq.action
                    )
                  }
                  className="px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 border border-[var(--border-color)] hover:border-[#00A3FF] hover:text-white"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {isRTL ? sq.qAr : sq.qEn}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendQuestion(inputMessage)
            }}
            className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-card)] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                isRTL
                  ? 'اطرح استفسارك حول مشروعك التقني...'
                  : 'Ask about your software project...'
              }
              className="flex-1 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#0055FF] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white bg-[#0055FF] hover:bg-[#00A3FF] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-sm shrink-0"
              aria-label="Send message"
            >
              <Send size={14} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default AIAssistantWidget
