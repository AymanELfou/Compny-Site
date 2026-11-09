import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { useAuth } from '../../hooks/useAuth';

export const AdminLogin: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/admin/projects" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/admin/projects');
    }
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

      <div
        className="w-full max-w-md p-8 rounded-2xl relative z-10 border transition-all duration-300"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--shadow-elevated)',
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 85, 255, 0.2), rgba(0, 163, 255, 0.1))',
              borderColor: 'rgba(0, 163, 255, 0.3)',
            }}
          >
            <ShieldOutlinedIcon style={{ color: 'var(--electric-blue)', fontSize: 30 }} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {isRTL ? 'لوحة تحكم الإدارة' : 'Admin Control Panel'}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {isRTL ? 'سجّل الدخول لإدارة المشاريع والمساعد الذكي' : 'Sign in to manage projects and AI assistant'}
          </p>
        </div>

        {error && (
          <div
            className="mb-6 p-3 rounded-lg text-sm border flex items-center gap-2"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderColor: 'rgba(239, 68, 68, 0.3)',
              color: '#f87171',
            }}
          >
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <EmailOutlinedIcon fontSize="small" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jbr-digital.qa"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-zinc-600"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              {isRTL ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <LockOutlinedIcon fontSize="small" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-zinc-600"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #0055FF, #00A3FF)',
            }}
          >
            {loading ? (
              <span>{isRTL ? 'جاري التحقق...' : 'Signing in...'}</span>
            ) : (
              <>
                <span>{isRTL ? 'تسجيل الدخول' : 'Sign In'}</span>
                <ArrowForwardIcon fontSize="small" className={isRTL ? 'rotate-180' : ''} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;

