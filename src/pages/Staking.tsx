import React, { useState } from 'react';

interface StakingInfo {
  totalStaked: string;
  totalDelegators: number;
  averageCommission: string;
  totalRewards: string;
  stakingRatio: string;
}

interface ValidatorStake {
  rank: number;
  name: string;
  address: string;
  commission: string;
  votingPower: string;
  totalStake: string;
  delegators: number;
  uptime: string;
  status: 'active' | 'inactive' | 'jailed';
}

const Staking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'delegate' | 'undelegate' | 'redelegate'>('overview');
  const [selectedValidator, setSelectedValidator] = useState<string>('');
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  const stakingInfo: StakingInfo = {
    totalStaked: '2,400,000',
    totalDelegators: 5420,
    averageCommission: '4.2%',
    totalRewards: '125,000',
    stakingRatio: '68.5%'
  };

  const validators: ValidatorStake[] = [
    {
      rank: 1,
      name: 'Cosmos Validator',
      address: 'cosmosvaloper1...abc123',
      commission: '5.0%',
      votingPower: '15.2%',
      totalStake: '2,400,000',
      delegators: 1250,
      uptime: '99.8%',
      status: 'active'
    },
    {
      rank: 2,
      name: 'StakeLab',
      address: 'cosmosvaloper1...def456',
      commission: '3.5%',
      votingPower: '12.8%',
      totalStake: '2,100,000',
      delegators: 980,
      uptime: '99.9%',
      status: 'active'
    },
    {
      rank: 3,
      name: 'ValidatorOne',
      address: 'cosmosvaloper1...ghi789',
      commission: '4.2%',
      votingPower: '10.5%',
      totalStake: '1,800,000',
      delegators: 750,
      uptime: '99.7%',
      status: 'active'
    },
    {
      rank: 4,
      name: 'SecureStake',
      address: 'cosmosvaloper1...jkl012',
      commission: '6.0%',
      votingPower: '8.9%',
      totalStake: '1,500,000',
      delegators: 620,
      uptime: '99.5%',
      status: 'active'
    },
    {
      rank: 5,
      name: 'TestNet Validator',
      address: 'cosmosvaloper1...mno345',
      commission: '2.8%',
      votingPower: '7.3%',
      totalStake: '1,200,000',
      delegators: 480,
      uptime: '99.9%',
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'inactive': return 'bg-yellow-600';
      case 'jailed': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const handleStake = () => {
    if (!selectedValidator || !stakeAmount) {
      alert('Please select a validator and enter stake amount');
      return;
    }
    alert(`Staking ${stakeAmount} VTEST to ${selectedValidator}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Staking</h1>
          <p className="text-gray-400 mt-2">Delegate, undelegate, and manage your staking positions</p>
        </div>
        <div className="mt-4 sm:mt-0">
          {!isConnected ? (
            <button
              onClick={() => setIsConnected(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
            >
              Connect Wallet to Stake
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                Balance: <span className="text-white font-medium">1,250.5 VTEST</span>
              </div>
              <button
                onClick={() => setIsConnected(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Staking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stakingInfo.totalStaked}</div>
            <div className="text-sm text-gray-400">Total Staked (VTEST)</div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stakingInfo.totalDelegators.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Delegators</div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stakingInfo.averageCommission}</div>
            <div className="text-sm text-gray-400">Avg Commission</div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stakingInfo.totalRewards}</div>
            <div className="text-sm text-gray-400">Total Rewards (VTEST)</div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stakingInfo.stakingRatio}</div>
            <div className="text-sm text-gray-400">Staking Ratio</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'delegate', name: 'Delegate', icon: '🔒' },
              { id: 'undelegate', name: 'Undelegate', icon: '🔓' },
              { id: 'redelegate', name: 'Redelegate', icon: '🔄' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Top Validators by Stake</h3>
              <div className="space-y-4">
                {validators.map((validator) => (
                  <div key={validator.rank} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">#{validator.rank}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{validator.name}</div>
                        <div className="text-sm text-gray-400 font-mono">{validator.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-400">Commission</div>
                        <div className="text-white font-medium">{validator.commission}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-400">Voting Power</div>
                        <div className="text-white font-medium">{validator.votingPower}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-400">Total Stake</div>
                        <div className="text-white font-medium">{validator.totalStake}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-400">Delegators</div>
                        <div className="text-white font-medium">{validator.delegators}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-400">Uptime</div>
                        <div className="text-white font-medium">{validator.uptime}</div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(validator.status)} text-white`}>
                        {validator.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'delegate' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-lg font-semibold text-white">Delegate to Validator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Validator</label>
                  <select
                    value={selectedValidator}
                    onChange={(e) => setSelectedValidator(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Choose a validator...</option>
                    {validators.map((validator) => (
                      <option key={validator.address} value={validator.address}>
                        {validator.name} - {validator.commission} commission
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount to Delegate</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="absolute right-3 top-3 text-gray-400">VTEST</div>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Available Balance</span>
                    <span className="text-white font-medium">1,250.5 VTEST</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Estimated Annual Reward</span>
                    <span className="text-green-400 font-medium">~45.2 VTEST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Transaction Fee</span>
                    <span className="text-white font-medium">0.001 VTEST</span>
                  </div>
                </div>
                <button
                  onClick={handleStake}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200"
                >
                  Delegate
                </button>
              </div>
            </div>
          )}

          {activeTab === 'undelegate' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-lg font-semibold text-white">Undelegate from Validator</h3>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">No active delegations found</div>
                <p className="text-sm text-gray-500">Connect your wallet and delegate to validators to see your positions here.</p>
              </div>
            </div>
          )}

          {activeTab === 'redelegate' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-lg font-semibold text-white">Redelegate to Another Validator</h3>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">No active delegations found</div>
                <p className="text-sm text-gray-500">Connect your wallet and delegate to validators to see your positions here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Staking;

