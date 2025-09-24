import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import MetricCard from '../components/MetricCard';

const Dashboard: React.FC = () => {
  const { currentProject } = useProject();
  const [activeTab, setActiveTab] = useState<'project' | 'network'>('project');

  const recentBlocks = [
    { height: 1234567, hash: '0x1a2b3c...', time: '2s ago', txs: 15 },
    { height: 1234566, hash: '0x4d5e6f...', time: '8s ago', txs: 23 },
    { height: 1234565, hash: '0x7g8h9i...', time: '14s ago', txs: 8 },
    { height: 1234564, hash: '0x0j1k2l...', time: '20s ago', txs: 31 },
    { height: 1234563, hash: '0x3m4n5o...', time: '26s ago', txs: 12 },
  ];

  const recentTransactions = [
    { hash: '0x9p8q7r...', type: 'Transfer', amount: '1,250.5', time: '1m ago' },
    { hash: '0x6s5t4u...', type: 'Stake', amount: '500.0', time: '2m ago' },
    { hash: '0x3v2w1x...', type: 'Delegate', amount: '2,100.0', time: '3m ago' },
    { hash: '0x0y9z8a...', type: 'Transfer', amount: '75.5', time: '4m ago' },
    { hash: '0x7b6c5d...', type: 'Unstake', amount: '1,800.0', time: '5m ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === 'project' ? 'text-white' : 'text-[var(--text-secondary)]'
          }`}
          style={{ backgroundColor: activeTab === 'project' ? currentProject.color : 'var(--bg-hover)' }}
          onClick={() => setActiveTab('project')}
        >
          Project Overview
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === 'network' ? 'text-white' : 'text-[var(--text-secondary)]'
          }`}
          style={{ backgroundColor: activeTab === 'network' ? currentProject.color : 'var(--bg-hover)' }}
          onClick={() => setActiveTab('network')}
        >
          Network Overview
        </button>
      </div>

      {activeTab === 'project' ? (
        <>
{/* Top Metrics Row */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <MetricCard
    title="Active Validators"
    value={currentProject.validator.totalValidators.toString()}
    change="+2 since last login"
    changeType="positive"
  />
  <MetricCard
    title="Total Staked"
    value={currentProject.metrics.totalStaked}
    change="+19% from last month"
    changeType="positive"
  />
  <MetricCard
    title="Active Delegations"
    value={currentProject.metrics.activeDelegations.toString()}
    change="+201 since yesterday"
    changeType="positive"
  />
</div>

          {/* Middle Section - Chart and Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left - Network Performance Chart */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{currentProject.displayName} Performance</h2>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 rounded-md text-sm font-medium text-white"
                    style={{ backgroundColor: currentProject.color }}
                  >
                    Monthly
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm font-medium bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-white">
                    Weekly
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm font-medium bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-white">
                    Daily
                  </button>
                </div>
              </div>

              {/* Performance Metrics Row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-[var(--bg-hover)] rounded-lg">
                  <div className="text-2xl font-bold text-white">99.8%</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Uptime
                  </div>
                </div>
                <div className="text-center p-3 bg-[var(--bg-hover)] rounded-lg">
                  <div className="text-2xl font-bold text-white">{currentProject.metrics.blockTime}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Block Time
                  </div>
                </div>
                <div className="text-center p-3 bg-[var(--bg-hover)] rounded-lg">
                  <div className="text-2xl font-bold text-white">{currentProject.metrics.tps.toLocaleString()}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    TPS
                  </div>
                </div>
              </div>

              {/* Chart with more data points */}
              <div className="space-y-4">
                <div className="flex items-end justify-between h-40">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-6 rounded-t" style={{ height: '60px', backgroundColor: currentProject.color }}></div>
                    <span className="text-xs text-[var(--text-secondary)]">Jan</span>
                    <span className="text-xs text-white">26.1K</span>
                    <span className="text-xs" style={{ color: currentProject.color }}>+12%</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-6 rounded-t" style={{ height: '70px', backgroundColor: currentProject.color }}></div>
                    <span className="text-xs text-[var(--text-secondary)]">Feb</span>
                    <span className="text-xs text-white">30.1K</span>
                    <span className="text-xs" style={{ color: currentProject.color }}>+15%</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-6 rounded-t" style={{ height: '80px', backgroundColor: currentProject.color }}></div>
                    <span className="text-xs text-[var(--text-secondary)]">Mar</span>
                    <span className="text-xs text-white">34.7K</span>
                    <span className="text-xs" style={{ color: currentProject.color }}>+18%</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-6 rounded-t" style={{ height: '90px', backgroundColor: currentProject.color }}></div>
                    <span className="text-xs text-[var(--text-secondary)]">Apr</span>
                    <span className="text-xs text-white">39.9K</span>
                    <span className="text-xs" style={{ color: currentProject.color }}>+22%</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-6 rounded-t" style={{ height: '100px', backgroundColor: currentProject.color }}></div>
                    <span className="text-xs text-[var(--text-secondary)]">May</span>
                    <span className="text-xs text-white">45.9K</span>
                    <span className="text-xs" style={{ color: currentProject.color }}>+25%</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-6 rounded-t" style={{ height: '110px', backgroundColor: currentProject.color }}></div>
                    <span className="text-xs text-[var(--text-secondary)]">Jun</span>
                    <span className="text-xs text-white">52.8K</span>
                    <span className="text-xs" style={{ color: currentProject.color }}>+28%</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-6 rounded-t" style={{ height: '120px', backgroundColor: currentProject.color }}></div>
                    <span className="text-xs text-[var(--text-secondary)]">Jul</span>
                    <span className="text-xs text-white">58.2K</span>
                    <span className="text-xs" style={{ color: currentProject.color }}>+32%</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-6 rounded-t" style={{ height: '130px', backgroundColor: currentProject.color }}></div>
                    <span className="text-xs text-[var(--text-secondary)]">Aug</span>
                    <span className="text-xs text-white">64.1K</span>
                    <span className="text-xs" style={{ color: currentProject.color }}>+35%</span>
                  </div>
                </div>

                {/* Additional Performance Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-color)]">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Avg Block Size
                    </span>
                    <span className="text-sm text-white">2.1 MB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Gas Price
                    </span>
                    <span className="text-sm text-white">15 Gwei</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Active Nodes
                    </span>
                    <span className="text-sm text-white">{currentProject.validator.totalValidators}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Network Hash
                    </span>
                    <span className="text-sm text-white">1.2 TH/s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Recent Transactions */}
            <div className="card">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2">Recent Transactions</h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  You made 265 transactions this month.
                </p>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div key={tx.hash} className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: tx.type === 'Unstake' ? '#ff6b6b' : currentProject.color }}
                      >
                        <span className="text-white text-sm">{tx.type === 'Unstake' ? '↘' : '↗'}</span>
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">
                          {currentProject.network.currency.symbol}/USDT
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {tx.type}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-sm font-medium"
                        style={{ color: tx.type === 'Unstake' ? '#ff6b6b' : currentProject.color }}
                      >
                        {tx.type === 'Unstake' ? '-' : '+'}${parseFloat(tx.amount).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left - Top Performing Validators */}
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">Top Performing Validators</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                  <div>
                    <div className="text-white text-sm font-medium">Cosmos Validator</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Active Validator
                    </div>
                  </div>
                  <div className="text-right">
                    <div style={{ color: currentProject.color }} className="text-sm font-medium">
                      +$5,240
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Win Rate 87%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                  <div>
                    <div className="text-white text-sm font-medium">StakeLab</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Active Validator
                    </div>
                  </div>
                  <div className="text-right">
                    <div style={{ color: currentProject.color }} className="text-sm font-medium">
                      +$3,980
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Win Rate 92%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                  <div>
                    <div className="text-white text-sm font-medium">ValidatorOne</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Active Validator
                    </div>
                  </div>
                  <div className="text-right">
                    <div style={{ color: currentProject.color }} className="text-sm font-medium">
                      +$2,340
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Win Rate 98%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Wallet Overview */}
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">Wallet Overview</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">B</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Bitcoin</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        0.76 BTC
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm font-medium">$32,400</div>
                    <div style={{ color: currentProject.color }} className="text-xs">
                      +12.5% ↗
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">E</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Ethereum</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        2.14 ETH
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm font-medium">$8,240</div>
                    <div style={{ color: currentProject.color }} className="text-xs">
                      +8.2% ↗
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">S</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Solana</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        32.5 SOL
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm font-medium">$3,450</div>
                    <div style={{ color: currentProject.color }} className="text-xs">
                      +24.1% ↗
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">U</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">USDT</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        Stablecoin
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm font-medium">$12,500</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="card">
          <h2 className="text-xl font-bold text-white mb-6">Recent Blocks</h2>
          <div className="space-y-4">
            {recentBlocks.map((block) => (
              <div key={block.hash} className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                <div>
                  <div className="text-white text-sm font-medium">Block #{block.height}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Hash: {block.hash}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white">{block.txs} txs</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {block.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;