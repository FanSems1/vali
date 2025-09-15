import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon = '📊',
  delay = 0 
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-[#00d4aa]';
      case 'negative': return 'text-[#ef4444]';
      default: return 'text-[var(--text-secondary)]';
    }
  };

  return (
    <div 
      className="stat-card animate-fade-in-up" 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            {title}
          </p>
          <p className="text-3xl font-bold text-white mb-1">{value}</p>
          {change && (
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}>
              <span className="font-medium">{change}</span>
              {changeType === 'positive' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {changeType === 'negative' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-gradient-to-r from-[#00d4aa] to-[#3b82f6] rounded-xl flex items-center justify-center">
          <span className="text-white text-xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;

