import React, { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HeroSlide {
  image: string
  tagEn: string
  tagAr: string
  headlineEn: string
  headlineAr: string
  subEn: string
  subAr: string
}

const heroSlides: HeroSlide[] = [
  {
    image: "/hero-slide-1.jpg",
    tagEn: "Web & Enterprise Solutions",
    tagAr: "\u0645\u0646\u0635\u0627\u062a \u0627\u0644\u0648\u064a\u0628 \u0648\u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u0624\u0633\u0633\u064a\u0629",
    headlineEn: "Modern web platforms",
    headlineAr: "\u0645\u0646\u0635\u0627\u062a \u0648\u064a\u0628 \u0645\u062a\u0642\u062f\u0645\u0629",
    subEn: "built for regional scale",
    subAr: "\u0645\u0635\u0645\u0645\u0629 \u0644\u0644\u062a\u0648\u0633\u0639 \u0627\u0644\u0645\u0624\u0633\u0633\u064a",
  },
  {
    image: "/hero-slide-2.jpg",
    tagEn: "AI & Mobile Systems",
    tagAr: "\u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0630\u0643\u064a\u0629 \u0648\u062a\u0637\u0628\u064a\u0642\u0627\u062a \u0627\u0644\u062c\u0648\u0627\u0644",
    headlineEn: "Intelligent mobile apps",
    headlineAr: "\u062a\u0637\u0628\u064a\u0642\u0627\u062a \u062c\u0648\u0627\u0644 \u0630\u0643\u064a\u0629",
    subEn: "& automated AI workflows",
    subAr: "\u0648\u0623\u062a\u0645\u062a\u0629 \u0630\u0643\u064a\u0629 \u0645\u062a\u0643\u0627\u0645\u0644\u0629",
  },
  {
    image: "/hero-slide-3.jpg",
    tagEn: "Digital Transformation",
    tagAr: "\u0627\u0644\u062a\u062d\u0648\u0644 \u0627\u0644\u0631\u0642\u0645\u064a",
    headlineEn: "Your partner in",
    headlineAr: "\u0634\u0631\u064a\u0643\u0643 \u0641\u064a",
    subEn: "digital transformation",
    subAr: "\u0627\u0644\u062a\u062d\u0648\u0644 \u0627\u0644\u0631\u0642\u0645\u064a \u0627\u0644\u0634\u0627\u0645\u0644",
  },
]

export const HeroSection: React.FC = () => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === "ar"
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return
      setAnimating(true)
      setCurrent(idx)
      setTimeout(() => setAnimating(false), 700)
    },
    [animating]
  )

  const next = useCallback(() => goTo((current + 1) % heroSlides.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + heroSlides.length) % heroSlides.length), [current, goTo])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [paused, next])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
    setPaused(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setPaused(false)
    if (touchStartX === null) return
    const diff = touchStartX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (isRTL) {
        if (diff > 0) prev()
        else next()
      } else {
        if (diff > 0) next()
        else prev()
      }
    }
    setTouchStartX(null)
  }

  return (
    <section
      className="relative w-full overflow-hidden h-[78vh] min-h-[480px] max-h-[620px] sm:h-screen sm:min-h-[580px] sm:max-h-[880px]"
      dir={isRTL ? "rtl" : "ltr"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide images */}
      {heroSlides.map((s, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: idx === current ? 1 : 0, zIndex: idx === current ? 1 : 0 }}
          aria-hidden={idx !== current}
        >
          <img
            src={s.image}
            alt={s.headlineEn}
            className="w-full h-full object-cover object-center"
            style={{
              transform: idx === current ? "scale(1.05)" : "scale(1)",
              transition: "transform 6s ease-out",
            }}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,15,29,0.55) 0%, rgba(10,15,29,0.12) 35%, rgba(10,15,29,0.72) 68%, rgba(10,15,29,0.97) 100%)",
          zIndex: 2,
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "80%",
          height: "300px",
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,85,255,0.2) 0%, transparent 70%)",
          zIndex: 3,
        }}
        aria-hidden="true"
      />

      {/* Arrow controls - top right (desktop) / compact on mobile */}
      <div
        className="absolute top-20 sm:top-28 right-4 sm:right-10 hidden xs:flex items-center gap-1.5 sm:gap-2"
        style={{ zIndex: 10 }}
      >
        <button
          onClick={prev}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
          style={{ backgroundColor: "rgba(10,15,29,0.75)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF" }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={15} />
        </button>
        <button
          onClick={next}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
          style={{ backgroundColor: "rgba(10,15,29,0.75)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF" }}
          aria-label="Next slide"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Main content overlay - vertically balanced on mobile, bottom-anchored on desktop */}
      <div
        className="hero-dark-scope absolute inset-x-0 inset-y-0 sm:inset-y-auto sm:bottom-0 flex flex-col justify-center sm:justify-end items-start px-5 sm:px-10 lg:px-20 pt-16 sm:pt-0 pb-8 sm:pb-18"
        style={{ zIndex: 10, color: '#FFFFFF' }}
      >
        {/* Eyebrow — fixed brand identity */}
        <div className="editorial-badge inline-flex items-center gap-2 mb-3 sm:mb-4 px-3.5 py-1.5 text-xs text-white">
          <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse" />
          <span className="font-semibold text-white" style={{ color: '#FFFFFF' }}>
            {isRTL
              ? "شركة قطرية بإدارة قطرية"
              : "A Qatari company managed by Qatar"}
          </span>
        </div>

        {/* H1 — fixed brand headline */}
        <h1
          className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-white mb-3 sm:mb-4 max-w-4xl"
          style={{ color: '#FFFFFF' }}
        >
          {isRTL
            ? <>نبتكر الحلول الرقمية{" "}<span className="signature-gradient-text">ونصنع المستقبل</span></>
            : <>Innovating Digital Solutions,{" "}<span className="signature-gradient-text">Shaping the Future</span></>}
        </h1>

        {/* Subtitle — fixed brand copy */}
        <p
          className="text-xs sm:text-base md:text-lg text-white mb-5 sm:mb-7 max-w-xl leading-relaxed"
          style={{ color: 'rgba(255, 255, 255, 0.85)' }}
        >
          {isRTL
            ? "شريكك في التحول الرقمي نقدم خدمات متكاملة في البرمجيات والمواقع والتطبيقات والذكاء الاصطناعي"
            : "Your partner in digital transformation We specialize in Software Websites Applications and Artificial Intelligence"}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row items-center gap-2.5 sm:gap-3">
          <Link
            to="/contact"
            className="btn-primary text-xs sm:text-sm py-2.5 sm:py-3 px-5 sm:px-7 font-bold text-white"
            style={{ backgroundColor: "#0055FF", boxShadow: "0 8px 28px rgba(0, 85, 255, 0.5)", color: "#FFFFFF" }}
          >
            {isRTL ? "ابدأ معنا الآن" : "Get Started"}
          </Link>
          <Link
            to="/services"
            className="btn-secondary text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6 text-white"
            style={{
              backgroundColor: "rgba(26,24,37,0.85)",
              backdropFilter: "blur(8px)",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            {isRTL ? "استكشف الخدمات" : "Explore Services"}
          </Link>
        </div>
      </div>

      {/* Dot indicators - bottom right */}
      <div className="absolute bottom-4 sm:bottom-8 right-5 sm:right-8 flex items-center gap-1.5 sm:gap-2" style={{ zIndex: 11 }}>
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              backgroundColor: i === current ? "#00A3FF" : "rgba(255,255,255,0.35)",
            }}
            aria-label={"Slide " + (i + 1)}
          />
        ))}
      </div>

      {/* Laser line slider progress (ghada w katkhtafi mn lore) */}
      <div
        className="absolute bottom-0 inset-x-0 h-[3px] overflow-hidden pointer-events-none"
        style={{ zIndex: 12, backgroundColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          key={current + "-" + paused}
          className={`h-full absolute top-0 ${isRTL ? "hero-laser-line-rtl" : "hero-laser-line-ltr"}`}
          style={{
            width: "30%",
            animation: paused
              ? "none"
              : isRTL
              ? "laserLineRTL 5s linear forwards"
              : "laserLineLTR 5s linear forwards",
          }}
        />
      </div>
    </section>
  )
}

export default HeroSection