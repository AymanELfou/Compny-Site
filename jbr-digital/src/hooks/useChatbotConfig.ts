import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import type { ChatbotConfig } from '../types/admin';

export function useChatbotConfig(autoFetch = true) {
  const [config, setConfig] = useState<ChatbotConfig | null>(null);
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
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load chatbot configuration');
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
      setSuccess('Configuration saved successfully');
      return updated;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to save configuration';
      setError(msg);
      throw new Error(msg);
    } finally {
      setSaving(false);
    }
  }, []);

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

