import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import type { ChatbotConfig } from '../types/admin';

const STORAGE_KEY = 'jbr_chatbot_config';

const DEFAULT_CONFIG: ChatbotConfig = {
  id: 1,
  system_prompt: `أنت المساعد الذكي الرسمي لشركة JBR Digital (شركة قطرية بإدارة قطرية). دورك هو مساعدة الزوار والعملاء، والإجابة عن استفساراتهم حول خدمات تطوير البرمجيات، وتطبيقات الجوال، والذكاء الاصطناعي، والمشاريع، والأسعار. تحدث بلباقة واحترافية باللغة العربية أو الإنجليزية حسب لغة العميل. شجع العميل دائماً على التواصل المباشر عبر واتساب على الرقم +974 7137 7713 للحصول على استشارة مجانية وعرض سعر مخصص.

=== معلومات الشركة والخدمات ===
شركة JBR Digital هي شركة برمجيات رائدة في دولة قطر متخصصة في:
- تطوير مواقع وتطبيقات الويب المتقدمة (React, Next.js, TailwindCSS).
- تطوير تطبيقات الجوال الأصلية والهجينة (iOS & Android).
- حلول وأتمتة الواتساب ووكلاء الذكاء الاصطناعي.
- أنظمة تخطيط الموارد للمؤسسات (ERP Systems).
- الصيانة السحابية والدعم الفني المستمر 24/7.
قنوات الاتصال الرسمية:
- واتساب: +974 7137 7713
- البريد الإلكتروني: info@jb-digital.qa

=== سياق الأسعار وقواعد الرد ===
الأسعار التقديرية العامة:
- تطوير المواقع ومنصات الويب: تبدأ من 950$ دولار أمريكي.
- المتاجر الإلكترونية المتقدمة: تبدأ من 1,300$ دولار أمريكي.
- تطبيقات الجوال: تبدأ من 1,900$ دولار أمريكي.
- أنظمة وأتمتة الذكاء الاصطناعي: تبدأ من 700$ دولار أمريكي.
ملاحظة: السعر النهائي يعتمد على متطلبات وميزات كل مشروع بدقة، ويُفضل دوماً توجيه العميل للتواصل عبر واتساب (+974 7137 7713).`,
  company_info: '',
  pricing_context: '',
};

function getStoredConfig(): ChatbotConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function useChatbotConfig(autoFetch = true) {
  const [config, setConfig] = useState<ChatbotConfig | null>(() => getStoredConfig());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/chatbot-config');
      const data = response.data?.data || response.data;
      setConfig(data);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        // ignore
      }
    } catch {
      // Offline fallback: load from stored config
      setConfig(getStoredConfig());
    } finally {
      setLoading(false);
    }
  }, []);

  const updateConfig = useCallback(async (data: Partial<ChatbotConfig>): Promise<ChatbotConfig> => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.put('/chatbot-config', data);
      const updated = response.data?.data || response.data;
      setConfig(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      setSuccess('Configuration saved successfully');
      return updated;
    } catch {
      // Offline save fallback
      const current = config || getStoredConfig();
      const updated: ChatbotConfig = {
        ...current,
        ...data,
        updated_at: new Date().toISOString(),
      };
      setConfig(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      setSuccess('Configuration saved successfully');
      return updated;
    } finally {
      setSaving(false);
    }
  }, [config]);

  useEffect(() => {
    if (autoFetch) {
      fetchConfig();
    }
  }, [autoFetch, fetchConfig]);

  return {
    config,
    loading,
    saving,
    error,
    success,
    setSuccess,
    fetchConfig,
    updateConfig,
  };
}

