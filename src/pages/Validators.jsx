import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Validators = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [statusFilter, setStatusFilter] = useState('all');

  const validators = [
    {
      rank: 1,
      name: 'Cosmos Validator',
      address: 'cosmosvaloper1...abc123',
      votingPower: '15.2%',
      commission: '5.0%',
      uptime: '99.8%',
      status: 'active',
      delegators: 1250,
      selfStake: '500,000',
      totalStake: '2,400,000'
    },
    {
      rank: 2,
      name: 'StakeLab',
      address: 'cosmosvaloper1...def456',
      votingPower: '12.8%',
      commission: '3.5%',
      uptime: '99.9%',
      status: 'active',
      delegators: 980,
      selfStake: '450,000',
      totalStake: '2,100,000'
    },
    {
      rank: 3,
      name: 'ValidatorOne',
      address: 'cosmosvaloper1...ghi789',
      votingPower: '10.5%',
      commission: '4.2%',
      uptime: '99.7%',
      status: 'active',
      delegators: 750,
      selfStake: '380,000',
      totalStake: '1,800,000'
    },
    {
      rank: 4,
      name: 'SecureStake',
      address: 'cosmosvaloper1...jkl012',
      votingPower: '8.9%',
      commission: '6.0%',
      uptime: '99.5%',
      status: 'active',
      delegators: 620,
      selfStake: '320,000',
      totalStake: '1,500,000'
    },
    {
      rank: 5,
      name: 'TestNet Validator',
      address: 'cosmosvaloper1...mno345',
      votingPower: '7.3%',
      commission: '2.8%',
      uptime: '99.9%',
      status: 'active',
      delegators: 480,
      selfStake: '280,000',
      totalStake: '1,200,000'
    },
    {
      rank: 6,
      name: 'Inactive Validator',
      address: 'cosmosvaloper1...pqr678',
      votingPower: '5.1%',
      commission: '8.5%',
      uptime: '85.2%',
      status: 'inactive',
      delegators: 320,
      selfStake: '200,000',
      totalStake: '800,000'
    },
    {
      rank: 7,
      name: 'Jailed Validator',
      address: 'cosmosvaloper1...stu901',
      votingPower: '3.8%',
      commission: '10.0%',
      uptime: '45.0%',
      status: 'jailed',
      delegators: 150,
      selfStake: '100,000',
      totalStake: '400,000'
    }
  ];

  const filteredValidators = validators.filter((validator) => {
    const matchesSearch =
      validator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      validator.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || validator.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-600';
      case 'inactive':
        return 'bg-yellow-600';
      case 'jailed':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'jailed':
        return 'Jailed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Validators</h1>
          <p className="text-gray-400 mt-2">Monitor validator performance and statistics</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{validators.filter((v) => v.status === 'active').length} Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>{validators.filter((v) => v.status === 'inactive').length} Inactive</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>{validators.filter((v) => v.status === 'jailed').length} Jailed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search validators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="jailed">Jailed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="rank">Sort by Rank</option>
              <option value="votingPower">Sort by Voting Power</option>
              <option value="commission">Sort by Commission</option>
              <option value="uptime">Sort by Uptime</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Validator</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Voting Power</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Commission</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Uptime</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Delegators</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Stake</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredValidators.map((validator) => (
                <tr key={validator.rank} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-white">#{validator.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">
                          {validator.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          <Link className="text-purple-400 hover:text-purple-300 underline" to={`/validators/${validator.rank}`}>
                            {validator.name}
                          </Link>
                        </div>
                        <div className="text-sm text-gray-400 font-mono">{validator.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white font-medium">{validator.votingPower}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white font-medium">{validator.commission}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white font-medium">{validator.uptime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(validator.status)} text-white`}>
                      {getStatusText(validator.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white font-medium">{validator.delegators.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white font-medium">{validator.totalStake}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Validator Details Modal would go here */}
    </div>
  );
};

export default Validators;



