import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useChatbotConfig } from '../../hooks/useChatbotConfig';

export const ChatbotConfigEditor: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { config, loading, saving, error, success, setSuccess, fetchConfig, updateConfig } = useChatbotConfig();

  const [systemPrompt, setSystemPrompt] = useState('');
  const [companyInfo, setCompanyInfo] = useState('');
  const [pricingContext, setPricingContext] = useState('');

  // Sync state when config is loaded
  useEffect(() => {
    if (config) {
      setSystemPrompt(config.system_prompt || '');
      setCompanyInfo(config.company_info || '');
      setPricingContext(config.pricing_context || '');
    }
  }, [config]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateConfig({
        system_prompt: systemPrompt,
        company_info: companyInfo,
        pricing_context: pricingContext,
      });
      setTimeout(() => setSuccess(null), 4000);
    } catch {
      // handled in hook
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <SmartToyOutlinedIcon style={{ color: 'var(--electric-blue)' }} />
            <span>{isRTL ? 'إعدادات وقاعدة معرفة المساعد الذكي' : 'AI Assistant Knowledge Base'}</span>
          </h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {isRTL
              ? 'تخصيص سلوك الذكاء الاصطناعي ومعلومات الشركة وقواعد التسعير للرد على العملاء'
              : 'Customize the AI chatbot instructions, company profile, and dynamic pricing rules'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchConfig()}
            disabled={loading}
            className="p-2.5 rounded-xl border border-zinc-700 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title={isRTL ? 'تحديث' : 'Refresh'}
          >
            <RefreshIcon className={loading ? 'animate-spin' : ''} fontSize="small" />
          </button>
        </div>
      </div>

      {/* Notifications */}
      {success && (
        <div className="p-4 rounded-xl text-sm border bg-emerald-500/10 border-emerald-500/30 text-emerald-400 flex items-center gap-2">
          <CheckCircleOutlinedIcon fontSize="small" />
          <span>{isRTL ? 'تم حفظ إعدادات المساعد الذكي بنجاح!' : success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl text-sm border bg-red-500/10 border-red-500/30 text-red-400">
          {error}
        </div>
      )}

      {/* Helper Banner */}
      <div
        className="p-4 rounded-2xl border flex items-start gap-3 text-xs leading-relaxed"
        style={{
          backgroundColor: 'rgba(0, 163, 255, 0.05)',
          borderColor: 'rgba(0, 163, 255, 0.2)',
          color: 'var(--silver)',
        }}
      >
        <InfoOutlinedIcon style={{ color: 'var(--electric-blue)', fontSize: 20 }} className="flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white block mb-0.5">
            {isRTL ? 'كيف يعمل المساعد الذكي تلقائياً' : 'How the Dynamic AI Works:'}
          </span>
          {isRTL
            ? 'يقوم الخادم تلقائياً بدمج هذه الإعدادات مع أحدث قائمة بالمشاريع النشطة وأسعارها من قاعدة البيانات لتزويد العميل دائماً بأحدث المعلومات بدقة واحترافية'
            : 'The backend merges this prompt with the latest active projects and prices from the database in real-time, giving clients accurate, up-to-date answers.'}
        </div>
      </div>

      {/* Form */}
      {loading && !config ? (
        <div className="py-20 flex flex-col items-center justify-center text-zinc-400">
          <RefreshIcon className="animate-spin text-blue-500 mb-2" fontSize="large" />
          <p className="text-sm">{isRTL ? 'جاري تحميل الإعدادات...' : 'Loading config...'}</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* System Prompt Section */}
          <div
            className="p-6 rounded-2xl border space-y-3"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div>
              <label className="block text-sm font-bold text-white mb-1">
                {isRTL ? 'التعليمات وسلوك المساعد (System Prompt)' : 'System Prompt & Persona'}
              </label>
              <p className="text-xs text-zinc-400">
                {isRTL
                  ? 'يحدد أسلوب التحدث واللهجة وطريقة التعامل مع استفسارات العملاء'
                  : 'Defines the AI persona, tone, language, and guidelines for answering.'}
              </p>
            </div>
            <textarea
              rows={5}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="You are JBR Digital AI Assistant, representing an elite Qatari software development agency..."
              className="w-full p-4 rounded-xl border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono leading-relaxed"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
              }}
            />
          </div>

          {/* Company Info Section */}
          <div
            className="p-6 rounded-2xl border space-y-3"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div>
              <label className="block text-sm font-bold text-white mb-1">
                {isRTL ? 'معلومات الشركة والخدمات (Company Knowledge)' : 'Company & Services Knowledge'}
              </label>
              <p className="text-xs text-zinc-400">
                {isRTL
                  ? 'معلومات عن الوكالة: شركة قطرية بإدارة قطرية فروعنا قنوات الاتصال أرقام الواتساب'
                  : 'Company details, Qatari ownership, contact channels, services offered.'}
              </p>
            </div>
            <textarea
              rows={5}
              value={companyInfo}
              onChange={(e) => setCompanyInfo(e.target.value)}
              placeholder={isRTL ? 'شركة قطرية رائدة في تطوير البرمجيات والذكاء الاصطناعي...' : 'Company information and background...'}
              className="w-full p-4 rounded-xl border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
              }}
            />
          </div>

          {/* Pricing Context Section */}
          <div
            className="p-6 rounded-2xl border space-y-3"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div>
              <label className="block text-sm font-bold text-white mb-1">
                {isRTL ? 'سياق وسياسات التسعير (Pricing Context)' : 'Pricing Context & Rules'}
              </label>
              <p className="text-xs text-zinc-400">
                {isRTL
                  ? 'كيف يجيب المساعد عند سؤاله عن الأسعار وشروط الدفع والعملة ريال قطري QAR'
                  : 'How the AI explains prices, payment terms, and quotes in QAR.'}
              </p>
            </div>
            <textarea
              rows={4}
              value={pricingContext}
              onChange={(e) => setPricingContext(e.target.value)}
              placeholder={isRTL ? 'الأسعار تبدأ من... والعملة الرسمية هي الريال القطري (QAR)...' : 'Pricing guidelines and starting estimates in QAR...'}
              className="w-full p-4 rounded-xl border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
              }}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white shadow-xl hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #0055FF, #00A3FF)',
              }}
            >
              <SaveOutlinedIcon fontSize="small" />
              <span>
                {saving
                  ? isRTL
                    ? 'جاري الحفظ...'
                    : 'Saving Changes...'
                  : isRTL
                  ? 'حفظ جميع التعديلات'
                  : 'Save Configuration'}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default ChatbotConfigEditor;
