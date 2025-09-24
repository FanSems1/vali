import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const mainItems = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'My Assets', href: '/assets', icon: '💼' },
    { name: 'My Analytics', href: '/analytics', icon: '📈' },
  ];

  const validatorItems = [
    { name: 'Validators', href: '/validators', icon: '⚡' },
    { name: 'Blocks', href: '/blocks', icon: '📦' },
    { name: 'Transactions', href: '/transactions', icon: '💸' },
    { name: 'Staking', href: '/staking', icon: '🔒' },
    { name: 'Governance', href: '/governance', icon: '🗳️' },
  ];

  // const systemItems = [
  //   { name: 'Settings', href: '/settings', icon: '⚙️' },
  //   { name: 'Logout', href: '/logout', icon: '🚪' },
  // ];

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#00d4aa] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Validator Explorer</h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Testnet Dashboard</p>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="sidebar-section">
        <div className="sidebar-title">Main</div>
        {mainItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`sidebar-item ${location.pathname === item.href ? 'active' : ''}`}
          >
            <div className="sidebar-item-icon">
              <span>{item.icon}</span>
            </div>
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Validator Section */}
      <div className="sidebar-section">
        <div className="sidebar-title">Validator & Network</div>
        {validatorItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`sidebar-item ${location.pathname === item.href ? 'active' : ''}`}
          >
            <div className="sidebar-item-icon">
              <span>{item.icon}</span>
            </div>
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* System Section */}
      {/* <div className="sidebar-section">
        {systemItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`sidebar-item ${location.pathname === item.href ? 'active' : ''}`}
          >
            <div className="sidebar-item-icon">
              <span>{item.icon}</span>
            </div>
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </div> */}

      {/* User Profile */}
      <div className="mt-auto p-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#00d4aa] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">U</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white">CryptoValidator</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>0x2545...9f2a</div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Premium Plan</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-medium text-white">$125.4K</div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>+8.24%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
