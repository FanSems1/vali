import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from './Sidebar';
import WalletConnect from './WalletConnect';
import ProjectSelector from './ProjectSelector';
import { useProject } from '../contexts/ProjectContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentProject } = useProject();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem('vd_theme');
    return (saved === 'light' || saved === 'dark' || saved === 'system') ? saved : 'system';
  });

  const mediaQuery = useMemo(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)'), []);

  useEffect(() => {
    const applyTheme = (value: 'light' | 'dark' | 'system') => {
      const root = document.documentElement;
      if (value === 'system') {
        const prefersDark = mediaQuery?.matches;
        root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      } else {
        root.setAttribute('data-theme', value);
      }
    };

    applyTheme(theme);
    localStorage.setItem('vd_theme', theme);

    if (theme === 'system' && mediaQuery) {
      const handler = () => applyTheme('system');
      mediaQuery.addEventListener ? mediaQuery.addEventListener('change', handler) : mediaQuery.addListener(handler);
      return () => {
        mediaQuery.removeEventListener ? mediaQuery.removeEventListener('change', handler) : mediaQuery.removeListener(handler);
      };
    }
  }, [theme, mediaQuery]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="border-b" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Left - Project Selector */}
              <div className="flex items-center space-x-4">
                <ProjectSelector />
              </div>

              {/* Center - Project Info */}
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-sm font-medium text-white">{currentProject.network.currency.symbol}/USD</div>
                  <div className="text-lg font-bold text-white">$2.45</div>
                  <div className="text-xs" style={{ color: currentProject.color }}>+5.2%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-white">Network Status</div>
                  <div className="text-lg font-bold text-white">Online</div>
                  <div className="text-xs" style={{ color: currentProject.color }}>{currentProject.metrics.networkUptime}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-white">Total Staked</div>
                  <div className="text-lg font-bold text-white">{currentProject.metrics.totalStaked}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{currentProject.validator.totalValidators} validators</div>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setThemeMenuOpen((v) => !v)}
                    className="p-2 text-[var(--text-secondary)] hover:text-white transition-colors"
                  >
                    { (document.documentElement.getAttribute('data-theme') === 'light') ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) }
                  </button>
                  {themeMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white border border-gray-200">
                      <button
                        onClick={() => { setTheme('light'); setThemeMenuOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-sm ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => { setTheme('dark'); setThemeMenuOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-sm ${theme === 'dark' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        Dark
                      </button>
                      <button
                        onClick={() => { setTheme('system'); setThemeMenuOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-sm ${theme === 'system' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        System
                      </button>
                    </div>
                  )}
                </div>
                <button className="relative p-2 text-[var(--text-secondary)] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff6b6b] rounded-full text-xs flex items-center justify-center text-white">3</div>
                </button>
                <WalletConnect />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">U</span>
                  </div>
                  <span className="text-white text-sm font-medium">User</span>
                  <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
