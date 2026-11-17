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

  const [fullPrompt, setFullPrompt] = useState('');

  // Sync state when config is loaded: combine into a single complete prompt
  useEffect(() => {
    if (config) {
      let combined = (config.system_prompt || '').trim();
      const company = (config.company_info || '').trim();
      const pricing = (config.pricing_context || '').trim();

      if (company && !combined.includes(company)) {
        combined += (combined ? '\n\n=== معلومات الشركة والخدمات ===\n' : '') + company;
      }
      if (pricing && !combined.includes(pricing)) {
        combined += (combined ? '\n\n=== سياق الأسعار وقواعد الرد ===\n' : '') + pricing;
      }

      setFullPrompt(combined);
    }
  }, [config]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateConfig({
        system_prompt: fullPrompt,
        company_info: '',
        pricing_context: '',
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
            <span>{isRTL ? 'إعدادات وموجه المساعد الذكي' : 'AI Assistant System Prompt'}</span>
          </h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {isRTL
              ? 'إدارة الموجه الكامل للذكاء الاصطناعي ومعلومات الشركة وقواعد الرد في حقل موحد'
              : 'Manage the complete AI assistant prompt, company background, and conversation rules in a single field'}
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
          <span>{isRTL ? 'تم حفظ موجه المساعد الذكي بنجاح!' : success}</span>
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
            {isRTL ? 'الموجه الكامل الموحد (Unified Prompt)' : 'Unified Complete Prompt:'}
          </span>
          {isRTL
            ? 'تم دمج كافة حقول الإعدادات في حقل واحد مباشر. يمكنك كتابة تعليمات الذكاء الاصطناعي، أسلوب الرد، معلومات الشركة، والأسعار هنا بكل سهولة.'
            : 'All configuration inputs are merged into one prompt field. You can define instructions, company details, tone, and pricing guidelines here seamlessly.'}
        </div>
      </div>

      {/* Form with SINGLE complete prompt input */}
      {loading && !config ? (
        <div className="py-20 flex flex-col items-center justify-center text-zinc-400">
          <RefreshIcon className="animate-spin text-blue-500 mb-2" fontSize="large" />
          <p className="text-sm">{isRTL ? 'جاري تحميل الموجه...' : 'Loading prompt...'}</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Single Unified Prompt Section */}
          <div
            className="p-6 rounded-2xl border space-y-3"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <label className="block text-sm font-bold text-white mb-1">
                  {isRTL ? 'موجه المساعد الذكي الكامل (Complete System Prompt)' : 'Complete Chatbot System Prompt'}
                </label>
                <p className="text-xs text-zinc-400">
                  {isRTL
                    ? 'يحدد شخصية المساعد، اختصاصاته، معلومات الشركة الرسمية، وسياسات الرد على الزوار'
                    : 'Defines the full AI persona, company background, services, policies, and behavior.'}
                </p>
              </div>
              <div className="text-xs text-zinc-500 font-mono">
                {fullPrompt.length} {isRTL ? 'حرف' : 'characters'}
              </div>
            </div>

            <textarea
              rows={15}
              required
              value={fullPrompt}
              onChange={(e) => setFullPrompt(e.target.value)}
              placeholder={
                isRTL
                  ? 'أنت المساعد الذكي الرسمي لشركة JBR Digital...\n\nمعلومات الشركة والخدمات:\n- تطوير مواقع وتطبيقات الويب...\n\nقواعد الرد والأسعار:\n- تحدث باحترافية...\n- شجع العميل على التواصل عبر واتساب...'
                  : 'You are JBR Digital AI Assistant, representing an elite Qatari software development agency...\n\nCompany Information:\n- Bespoke Web & Mobile Development...\n\nGuidelines & Pricing:\n- Answer professionally in Arabic or English...\n- Encourage contacting WhatsApp +974 7137 7713...'
              }
              className="w-full p-4 rounded-xl border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono leading-relaxed"
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
                  ? 'حفظ الموجه بالكامل'
                  : 'Save Complete Prompt'}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default ChatbotConfigEditor;
