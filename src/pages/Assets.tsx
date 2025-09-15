import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';

const Assets: React.FC = () => {
  const { currentProject } = useProject();
  const [activeTab, setActiveTab] = useState<'overview' | 'staking' | 'rewards'>('overview');

  // Mock user portfolio data
  const portfolioData = {
    totalValue: 125430.50,
    totalValueChange: 8.24,
    assets: [
      {
        id: 1,
        symbol: currentProject.network.currency.symbol,
        name: currentProject.network.currency.name,
        balance: 125430.50,
        usdValue: 125430.50,
        change24h: 8.24,
        change7d: 15.67,
        staked: 100000.00,
        available: 25430.50,
        rewards: 1250.75,
        color: currentProject.color
      },
      {
        id: 2,
        symbol: 'ETH',
        name: 'Ethereum',
        balance: 2.45,
        usdValue: 4890.25,
        change24h: -2.15,
        change7d: 5.32,
        staked: 0,
        available: 2.45,
        rewards: 0,
        color: '#627eea'
      },
      {
        id: 3,
        symbol: 'USDC',
        name: 'USD Coin',
        balance: 5000.00,
        usdValue: 5000.00,
        change24h: 0.01,
        change7d: 0.01,
        staked: 0,
        available: 5000.00,
        rewards: 0,
        color: '#2775ca'
      }
    ],
    stakingInfo: {
      totalStaked: 100000.00,
      totalRewards: 1250.75,
      apy: 12.5,
      nextReward: '2h 15m',
      validators: 3
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Portfolio Overview</h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Manage your {currentProject.displayName} assets and staking
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{formatCurrency(portfolioData.totalValue)}</div>
            <div className={`text-sm ${portfolioData.totalValueChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {portfolioData.totalValueChange >= 0 ? '+' : ''}{portfolioData.totalValueChange}% (24h)
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-[var(--bg-hover)] p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-gray-900'
                : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('staking')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'staking'
                ? 'bg-white text-gray-900'
                : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            Staking
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'rewards'
                ? 'bg-white text-gray-900'
                : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            Rewards
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Assets List */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-6">Your Assets</h2>
            <div className="space-y-4">
              {portfolioData.assets.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between p-4 bg-[var(--bg-hover)] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: asset.color }}
                    >
                      {asset.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{asset.symbol}</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{asset.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{formatNumber(asset.balance)} {asset.symbol}</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {formatCurrency(asset.usdValue)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {asset.change7d >= 0 ? '+' : ''}{asset.change7d}% (7d)
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-[var(--bg-secondary)] text-white text-sm rounded-md hover:bg-opacity-80">
                      Send
                    </button>
                    <button className="px-3 py-1 bg-[var(--bg-secondary)] text-white text-sm rounded-md hover:bg-opacity-80">
                      Receive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-[var(--bg-hover)] text-white rounded-lg hover:bg-opacity-80 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: currentProject.color }}>
                      <span className="text-sm">↗</span>
                    </div>
                    <span>Stake {currentProject.network.currency.symbol}</span>
                  </div>
                </button>
                <button className="w-full p-3 bg-[var(--bg-hover)] text-white rounded-lg hover:bg-opacity-80 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: currentProject.color }}>
                      <span className="text-sm">↘</span>
                    </div>
                    <span>Unstake {currentProject.network.currency.symbol}</span>
                  </div>
                </button>
                <button className="w-full p-3 bg-[var(--bg-hover)] text-white rounded-lg hover:bg-opacity-80 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: currentProject.color }}>
                      <span className="text-sm">💰</span>
                    </div>
                    <span>Claim Rewards</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">Market Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Market Cap</span>
                  <span className="text-sm text-white">$2.4B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>24h Volume</span>
                  <span className="text-sm text-white">$45.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Circulating Supply</span>
                  <span className="text-sm text-white">980M {currentProject.network.currency.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total Supply</span>
                  <span className="text-sm text-white">1B {currentProject.network.currency.symbol}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>Staked 1,000 {currentProject.network.currency.symbol}</span>
                  <span className="text-green-400">+$1,250</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>Received 50 {currentProject.network.currency.symbol}</span>
                  <span className="text-green-400">+$62.50</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>Claimed rewards</span>
                  <span className="text-green-400">+$125.75</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>Sent 100 {currentProject.network.currency.symbol}</span>
                  <span className="text-red-400">-$125.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'staking' && (
        <div className="space-y-6">
          {/* Staking Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{formatNumber(portfolioData.stakingInfo.totalStaked)}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total Staked</div>
                <div className="text-xs" style={{ color: currentProject.color }}>{currentProject.network.currency.symbol}</div>
              </div>
            </div>
            <div className="card">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{portfolioData.stakingInfo.apy}%</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>APY</div>
                <div className="text-xs" style={{ color: currentProject.color }}>Current Rate</div>
              </div>
            </div>
            <div className="card">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{formatNumber(portfolioData.stakingInfo.totalRewards)}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total Rewards</div>
                <div className="text-xs" style={{ color: currentProject.color }}>{currentProject.network.currency.symbol}</div>
              </div>
            </div>
            <div className="card">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{portfolioData.stakingInfo.validators}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Validators</div>
                <div className="text-xs" style={{ color: currentProject.color }}>Active</div>
              </div>
            </div>
          </div>

          {/* Staking Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">Stake {currentProject.network.currency.symbol}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Amount to Stake</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full p-3 bg-[var(--bg-hover)] border border-[var(--border-color)] rounded-lg text-white placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary-color)]"
                    />
                    <div className="absolute right-3 top-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {currentProject.network.currency.symbol}
                    </div>
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Available: {formatNumber(portfolioData.assets[0].available)} {currentProject.network.currency.symbol}
                  </div>
                </div>
                <button className="w-full p-3 text-white rounded-lg font-medium" style={{ backgroundColor: currentProject.color }}>
                  Stake Now
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">Unstake {currentProject.network.currency.symbol}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Amount to Unstake</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full p-3 bg-[var(--bg-hover)] border border-[var(--border-color)] rounded-lg text-white placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary-color)]"
                    />
                    <div className="absolute right-3 top-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {currentProject.network.currency.symbol}
                    </div>
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Staked: {formatNumber(portfolioData.stakingInfo.totalStaked)} {currentProject.network.currency.symbol}
                  </div>
                </div>
                <button className="w-full p-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">
                  Unstake Now
                </button>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Unbonding period: {currentProject.validator.unbondingPeriod}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="space-y-6">
          {/* Rewards Overview */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-6">Rewards & Earnings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-[var(--bg-hover)] rounded-lg">
                <div className="text-3xl font-bold text-white">{formatNumber(portfolioData.stakingInfo.totalRewards)}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total Rewards</div>
                <div className="text-xs" style={{ color: currentProject.color }}>{currentProject.network.currency.symbol}</div>
              </div>
              <div className="text-center p-6 bg-[var(--bg-hover)] rounded-lg">
                <div className="text-3xl font-bold text-white">{formatCurrency(portfolioData.stakingInfo.totalRewards * 1.25)}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>USD Value</div>
                <div className="text-xs" style={{ color: currentProject.color }}>Current Price</div>
              </div>
              <div className="text-center p-6 bg-[var(--bg-hover)] rounded-lg">
                <div className="text-3xl font-bold text-white">{portfolioData.stakingInfo.nextReward}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Next Reward</div>
                <div className="text-xs" style={{ color: currentProject.color }}>Estimated</div>
              </div>
            </div>
          </div>

          {/* Claim Rewards */}
          <div className="card">
            <h3 className="text-lg font-bold text-white mb-4">Claim Rewards</h3>
            <div className="flex items-center justify-between p-4 bg-[var(--bg-hover)] rounded-lg">
              <div>
                <div className="text-white font-medium">Available Rewards</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {formatNumber(portfolioData.stakingInfo.totalRewards)} {currentProject.network.currency.symbol}
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{formatCurrency(portfolioData.stakingInfo.totalRewards * 1.25)}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>USD Value</div>
              </div>
              <button className="px-6 py-2 text-white rounded-lg font-medium" style={{ backgroundColor: currentProject.color }}>
                Claim All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assets;
