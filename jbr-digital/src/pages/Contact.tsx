import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building2,
  Building,
  User,
} from 'lucide-react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { FlagQatar, FlagMorocco } from '../components/Flags'
import api from '../lib/api'

const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'يرجى إدخال الاسم / Please enter your name' }),
  clientType: z
    .enum(['company', 'individual']),
  phone: z
    .string()
    .min(6, { message: 'يرجى إدخال رقم الهاتف / Please enter phone number' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  subject: z
    .string()
    .min(3, { message: 'Subject must be at least 3 characters' }),
  message: z
    .string()
    .min(10, { message: 'Please provide at least 10 characters describing your project' }),
})

type ContactFormData = z.infer<typeof contactSchema>

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    document.title = isRTL
      ? 'تواصل معنا — JBR Digital قطر والمغرب'
      : 'Discuss a Project — JBR Digital Qatar & Morocco'
  }, [isRTL])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      clientType: 'company',
      phone: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const selectedClientType = watch('clientType') || 'company'

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionStatus('submitting')
    setErrorMessage(null)

    try {
      await api.post('/contact', data)
      setSubmissionStatus('submitted')
    } catch (err: any) {
      console.error('Contact form submission error:', err)
      const errorMsg =
        err?.response?.data?.message ||
        (isRTL
          ? 'تعذر إرسال الطلب في الوقت الحالي. يرجى المحاولة لاحقاً أو التواصل عبر الواتساب أو الهاتف مباشرة.'
          : 'Could not send your inquiry. Please try again later or reach out via WhatsApp/Phone.')
      setErrorMessage(errorMsg)
      setSubmissionStatus('idle')
    }
  }

  const handleResetForm = () => {
    reset()
    setErrorMessage(null)
    setSubmissionStatus('idle')
  }

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
      {/* ── Page Header ── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 relative border-b border-[var(--border-color)]"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="section-container relative z-10 max-w-4xl text-start">
          <div className="editorial-badge mb-4">
            <span>{isRTL ? 'تواصل معنا' : 'Contact Us'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            {isRTL ? (
              <>
                دعنا نحول متطلباتك إلى{' '}
                <span className="signature-gradient-text">حلول برمجية عملية</span>
              </>
            ) : (
              <>
                Let’s turn your requirements into{' '}
                <span className="signature-gradient-text">practical software</span>
              </>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {isRTL
              ? 'تواصل مباشرة مع فريقنا التقني للحصول على تقييم شامل لمتطلبات مشروعك والجدول الزمني التقديري الأنسب لنشاطك'
              : 'Connect directly with our technical team to review project feasibility, estimated timelines, and tailored solutions.'}
          </p>
        </div>
      </section>

      {/* ── Main Content: Form + Contact Details ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Form Column (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="enterpret-card p-6 sm:p-10 text-start">
                
                {submissionStatus === 'submitted' ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={32} />
                    </div>

                    <h2 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">
                      {isRTL ? 'تم إرسال تفاصيل مشروعك بنجاح' : 'Project Details Sent Successfully'}
                    </h2>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto mb-6">
                      {isRTL
                        ? 'شكراً لتواصلك معنا! تم إرسال تفاصيل مشروعك مباشرة إلى البريد الرسمي للشركة (jbrdigitalsoftwareprograming@gmail.com). سيقوم فريقنا التقني بمراجعة متطلباتك والرد عليك في أقرب وقت.'
                        : 'Thank you for reaching out! Your project specifications have been dispatched directly to our company email (jbrdigitalsoftwareprograming@gmail.com). Our team will review your outline and get back to you promptly.'}
                    </p>

                    <div className="p-4 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] max-w-md mx-auto mb-8 text-xs text-[var(--text-muted)] space-y-1 font-mono">
                      <div>Official Email: jbrdigitalsoftwareprograming@gmail.com</div>
                      <div>Direct Phone: +974 7137 7713</div>
                    </div>

                    <button
                      onClick={handleResetForm}
                      className="btn-secondary text-xs px-5 py-2.5 cursor-pointer"
                    >
                      {isRTL ? 'إرسال استفسار آخر' : 'Submit Another Inquiry'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                        {isRTL ? 'نموذج دراسة المشروع' : 'Project Scoping Inquiry'}
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        {isRTL
                          ? 'يرجى تزويدنا بالمعلومات الأساسية وسيقوم فريقنا بالرد خلال يوم عمل واحد'
                          : 'Provide your project outline and our technical team will respond within one business day.'}
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="mb-5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-[#EF4444] text-xs flex items-start gap-2.5">
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{errorMessage}</span>
                      </div>
                    )}

                    {/* Entity Type: شركة / فرد */}
                    <div className="mb-5">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                        <span className="text-[#EF4444] font-bold">*</span>
                        <span>{isRTL ? 'شركة / فرد' : 'Company / Individual'}</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setValue('clientType', 'company')}
                          className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedClientType === 'company'
                              ? 'bg-[#0055FF] text-white shadow-md border border-[#00A3FF]/40'
                              : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          <Building size={14} />
                          <span>{isRTL ? 'شركة' : 'Company'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setValue('clientType', 'individual')}
                          className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedClientType === 'individual'
                              ? 'bg-[#0055FF] text-white shadow-md border border-[#00A3FF]/40'
                              : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          <User size={14} />
                          <span>{isRTL ? 'فرد' : 'Individual'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Name: الاسم */}
                    <div className="mb-5">
                      <label
                        htmlFor="fullName"
                        className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2"
                      >
                        <span className="text-[#EF4444] font-bold">*</span>
                        <span>{isRTL ? 'الاسم' : 'Name'}</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder={isRTL ? 'الاسم' : 'Your Name'}
                        {...register('fullName')}
                        aria-invalid={errors.fullName ? 'true' : 'false'}
                        className={`form-input ${errors.fullName ? 'border-[#EF4444]' : ''}`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-[#EF4444] mt-1.5 flex items-center gap-1" role="alert">
                          <AlertCircle size={13} />
                          <span>{errors.fullName.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number: رقم الهاتف */}
                    <div className="mb-5">
                      <label
                        htmlFor="phone"
                        className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2"
                      >
                        <span className="text-[#EF4444] font-bold">*</span>
                        <span>{isRTL ? 'رقم الهاتف' : 'Phone Number'}</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        dir={isRTL ? (watch('phone') ? 'ltr' : 'rtl') : 'ltr'}
                        placeholder={isRTL ? 'رقم الهاتف' : 'Phone Number'}
                        {...register('phone')}
                        aria-invalid={errors.phone ? 'true' : 'false'}
                        className={`form-input text-start ${errors.phone ? 'border-[#EF4444]' : ''}`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-[#EF4444] mt-1.5 flex items-center gap-1" role="alert">
                          <AlertCircle size={13} />
                          <span>{errors.phone.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2"
                      >
                        <span className="text-[#EF4444] font-bold">*</span>
                        <span>{isRTL ? 'البريد الإلكتروني' : 'Business Email Address'}</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder={isRTL ? 'name@company.qa' : 'name@company.com'}
                        {...register('email')}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        className={`form-input ${errors.email ? 'border-[#EF4444]' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-xs text-[#EF4444] mt-1.5 flex items-center gap-1" role="alert">
                          <AlertCircle size={13} />
                          <span>{errors.email.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="mb-5">
                      <label
                        htmlFor="subject"
                        className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2"
                      >
                        <span className="text-[#EF4444] font-bold">*</span>
                        <span>{isRTL ? 'نوع المشروع أو الخدمة المطلوبة' : 'Project Subject / Category'}</span>
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder={isRTL ? 'مثال: نظام إدارة عمليات مخصص ERP' : 'e.g. Custom Web Platform & Inventory ERP'}
                        {...register('subject')}
                        aria-invalid={errors.subject ? 'true' : 'false'}
                        className={`form-input ${errors.subject ? 'border-[#EF4444]' : ''}`}
                      />
                      {errors.subject && (
                        <p className="text-xs text-[#EF4444] mt-1.5 flex items-center gap-1" role="alert">
                          <AlertCircle size={13} />
                          <span>{errors.subject.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Message / Description */}
                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2"
                      >
                        <span className="text-[#EF4444] font-bold">*</span>
                        <span>{isRTL ? 'تفاصيل المتطلبات والجدول الزمني' : 'Project Scope & Requirements'}</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder={
                          isRTL
                            ? 'يرجى تقديم نبذة عن أهداف المشروع والأنظمة الحالية المراد ربطها والموعد المستهدف للإطلاق'
                            : 'Describe your core deliverables, existing stack or integrations, target launch timeline...'
                        }
                        {...register('message')}
                        aria-invalid={errors.message ? 'true' : 'false'}
                        className={`form-input ${errors.message ? 'border-[#EF4444]' : ''}`}
                      />
                      {errors.message && (
                        <p className="text-xs text-[#EF4444] mt-1.5 flex items-center gap-1" role="alert">
                          <AlertCircle size={13} />
                          <span>{errors.message.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submissionStatus === 'submitting'}
                      className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submissionStatus === 'submitting' ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span>{isRTL ? 'جاري إرسال تفاصيل المشروع...' : 'Sending Project Details...'}</span>
                        </span>
                      ) : (
                        <>
                          <Send size={15} className={isRTL ? 'rotate-180' : ''} />
                          <span>{isRTL ? 'إرسال تفاصيل مشروعك' : 'Send Your Project Details'}</span>
                        </>
                      )}
                    </button>

                    <div className="mt-4 text-center">
                      <span className="text-[11px] text-[var(--text-muted)] flex items-center justify-center gap-1.5">
                        <ShieldCheck size={13} className="text-[#00A3FF]" />
                        {isRTL
                          ? 'بياناتك مشفرة ومحمية وفق معايير الخصوصية'
                          : 'Your specifications are governed by strict confidentiality.'}
                      </span>
                    </div>
                  </form>
                )}

              </div>
            </div>

            {/* Contact Details & Direct Channels (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Direct Communication Channels */}
              <div className="enterpret-card p-6 sm:p-8 text-start">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--electric-blue)] mb-4">
                  <CheckCircle2 size={16} />
                  <span>{isRTL ? 'قنوات مباشرة معتمدة' : 'Verified Direct Inquiries'}</span>
                </div>

                <div className="space-y-4">
                  {/* WhatsApp Direct */}
                  <a
                    href={`https://wa.me/97471377713?text=${encodeURIComponent(
                      isRTL
                        ? 'مرحباً JBR Digital أود الاستفسار عن استشارة تقنية لمشروعي'
                        : 'Hello JBR Digital, I would like to consult with your engineering team regarding a project.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] no-underline text-inherit hover:border-[#25D366] transition-all group"
                  >
                    <div className="w-9 h-9 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-105 transition-transform">
                      <WhatsAppIcon sx={{ fontSize: 20 }} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{isRTL ? 'محادثة واتساب الفورية' : 'Instant WhatsApp Chat'}</span>
                      </div>
                      <div
                        dir="ltr"
                        style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
                        className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[#25D366] transition-colors font-mono"
                      >
                        +974 7137 7713
                      </div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+97471377713"
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] no-underline text-inherit hover:border-[var(--primary)] transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[#0055FF] shrink-0">
                      <Phone size={17} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                        {isRTL ? 'الاتصال الهاتفي المباشر' : 'Direct Phone Line'}
                      </div>
                      <div
                        dir="ltr"
                        style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
                        className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors font-mono"
                      >
                        +974 7137 7713
                      </div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:jbrdigitalsoftwareprograming@gmail.com"
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] no-underline text-inherit hover:border-[var(--primary)] transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[#00A3FF] shrink-0">
                      <Mail size={17} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                        {isRTL ? 'البريد الإلكتروني الرسمي' : 'Official Project Email'}
                      </div>
                      <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                        Info@jbrdigitalsoftwareprograming.com
                      </div>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/jbrdigitalprograming?srtk=NzBzMXE2MGxxOTIz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] no-underline text-inherit hover:border-[#E1306C] transition-all group"
                  >
                    <div className="w-9 h-9 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                      style={{ color: '#E1306C' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                        {isRTL ? 'صفحة انستغرام الرسمية' : 'Official Instagram Page'}
                      </div>
                      <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[#E1306C] transition-colors">
                        @jbrdigitalprograming
                      </div>
                    </div>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@jbr.digital.progr?_r=1&_t=ZS-9B9KL5sWpgQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] no-underline text-inherit hover:border-[#69C9D0] transition-all group"
                  >
                    <div className="w-9 h-9 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                      style={{ color: '#69C9D0' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.53V6.77a4.84 4.84 0 0 1-1.02-.08z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                        {isRTL ? 'صفحة تيك توك الرسمية' : 'Official TikTok Page'}
                      </div>
                      <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[#69C9D0] transition-colors">
                        @jbr.digital.progr
                      </div>
                    </div>
                  </a>

                  {/* Snapchat */}
                  <a
                    href="https://www.snapchat.com/add/jbrdigital?share_id=1-N7S9Pe3TQ&locale=en-US"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] no-underline text-inherit hover:border-[#FFFC00] transition-all group"
                  >
                    <div className="w-9 h-9 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                      style={{ color: '#FFFC00' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.002 2c-3.642 0-5.908 2.505-5.908 5.753 0 .798.243 1.948.455 2.66.082.28.077.41-.01.538-.11.16-.388.293-.767.464-.69.31-1.597.717-1.748 1.554-.092.51.107.97.575 1.284.622.417 1.635.485 2.274.51.156.006.273.076.31.185.05.147.004.343-.11.536-.407.69-1.07 1.815-1.07 2.656 0 .618.375 1.103.993 1.295.602.187 1.433.197 2.27.197.382 0 .762-.01 1.135-.03.24-.012.457.086.58.267.37.545 1.05 1.137 1.848 1.137.797 0 1.478-.592 1.847-1.137.124-.18.34-.28.58-.267.374.02.754.03 1.136.03.837 0 1.668-.01 2.27-.197.618-.192.993-.677.993-1.295 0-.841-.663-1.966-1.07-2.656-.114-.193-.16-.39-.11-.536.037-.11.154-.18.31-.185.639-.025 1.652-.093 2.274-.51.468-.314.667-.774.575-1.284-.151-.837-1.058-1.244-1.748-1.554-.379-.17-.657-.304-.767-.464-.087-.128-.092-.258-.01-.538.212-.712.455-1.862.455-2.66C17.91 4.505 15.644 2 12.002 2z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                        {isRTL ? 'حساب سناب شات الرسمي' : 'Official Snapchat Account'}
                      </div>
                      <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[#FFFC00] transition-colors">
                        @jbrdigital
                      </div>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)]">
                    <div className="w-9 h-9 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[#8B5CF6] shrink-0">
                      <Clock size={17} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                        {isRTL ? 'ساعات العمل الرسمية' : 'Operating Hours'}
                      </div>
                      <div className="text-xs font-semibold text-[var(--text-primary)]">
                        {isRTL ? 'ساعات العمل 24 ساعة 7 أيام' : '24/7 Operations (24 Hours / 7 Days)'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regional Office Presence Card */}
              <div className="enterpret-card p-6 sm:p-8 text-start space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  <Building2 size={16} />
                  <span>{isRTL ? 'المقرات الإقليمية' : 'Regional Offices'}</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-between">
                  <span className="font-bold text-xs text-[var(--text-primary)]">
                    {isRTL ? 'المقر الرئيسي : دولة قطر - الدوحة' : 'Headquarters: State of Qatar - Doha'}
                  </span>
                  <FlagQatar size={24} />
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-between">
                  <span className="font-bold text-xs text-[var(--text-primary)]">
                    {isRTL ? 'فرع : المملكة المغربية - الدارالبيضاء' : 'Branch: Kingdom of Morocco - Casablanca'}
                  </span>
                  <FlagMorocco size={24} />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
