import React from 'react';
import { NavLink, Outlet, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FolderSpecialOutlinedIcon from '@mui/icons-material/FolderSpecialOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../../hooks/useAuth';

export const AdminLayout: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { isAuthenticated, user, logout } = useAuth();

  const handleLanguageChange = (lang: 'ar' | 'en') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('jbd-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navLinks = [
    {
      to: '/admin/projects',
      label: isRTL ? 'إدارة المشاريع' : 'Projects Manager',
      icon: <FolderSpecialOutlinedIcon fontSize="small" />,
    },
    {
      to: '/admin/chatbot',
      label: isRTL ? 'إعدادات المساعد الذكي' : 'Chatbot AI Config',
      icon: <SmartToyOutlinedIcon fontSize="small" />,
    },
  ];

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col md:flex-row text-white"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Sidebar */}
      <aside
        className="w-full md:w-72 flex-shrink-0 border-b md:border-b-0 md:border-r p-6 flex flex-col justify-between"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div>
          {/* Brand header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 85, 255, 0.2), rgba(0, 163, 255, 0.1))',
                borderColor: 'rgba(0, 163, 255, 0.3)',
              }}
            >
              <AdminPanelSettingsIcon style={{ color: 'var(--electric-blue)' }} />
            </div>
            <div>
              <div className="font-bold text-base leading-tight">JBR Digital</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {isRTL ? 'لوحة تحكم المالك' : 'Owner CMS'}
              </div>
            </div>
          </div>

          {/* Language Switcher Bar */}
          <div className="mb-6 p-1 rounded-xl bg-black/40 border border-zinc-800 flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleLanguageChange('ar')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isRTL
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🇶🇦</span>
              <span>العربية</span>
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                !isRTL
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🌐</span>
              <span>English</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-6 border-t space-y-2" style={{ borderColor: 'var(--border-subtle)' }}>
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span>{isRTL ? 'عرض الموقع الرسمي' : 'View Public Site'}</span>
            <OpenInNewIcon fontSize="inherit" />
          </Link>

          <div className="px-4 py-2 text-xs truncate" style={{ color: 'var(--text-muted)' }}>
            {user?.email || 'admin@jbr-digital.qa'}
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogoutOutlinedIcon fontSize="small" />
            <span>{isRTL ? 'تسجيل الخروج' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};
export default AdminLayout;

