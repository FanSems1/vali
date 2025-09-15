import React from 'react';
import Sidebar from './Sidebar';
import WalletConnect from './WalletConnect';
import ProjectSelector from './ProjectSelector';
import { useProject } from '../contexts/ProjectContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentProject } = useProject();

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
                <button className="p-2 text-[var(--text-secondary)] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>
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
