import React from 'react';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'pending' | 'warning';
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label, size = 'md' }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-[#00d4aa]';
      case 'offline': return 'bg-[#ef4444]';
      case 'pending': return 'bg-[#f59e0b]';
      case 'warning': return 'bg-[#3b82f6]';
      default: return 'bg-[#666666]';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-2 h-2';
      case 'md': return 'w-3 h-3';
      case 'lg': return 'w-4 h-4';
      default: return 'w-3 h-3';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`${getSizeClasses()} ${getStatusColor()} rounded-full animate-pulse`}></div>
      <span className="text-sm font-medium text-white">{label}</span>
    </div>
  );
};

export default StatusIndicator;


