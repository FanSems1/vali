import React, { useState } from 'react';

interface Block {
  height: number;
  hash: string;
  time: string;
  proposer: string;
  transactions: number;
  gasUsed: string;
  gasLimit: string;
  size: string;
}

const Blocks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blocksPerPage = 20;

  const blocks: Block[] = Array.from({ length: 100 }, (_, i) => ({
    height: 1234567 - i,
    hash: `0x${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}...`,
    time: `${Math.floor(Math.random() * 60)}s ago`,
    proposer: `cosmosvaloper1...${Math.random().toString(36).substr(2, 6)}`,
    transactions: Math.floor(Math.random() * 50) + 1,
    gasUsed: `${Math.floor(Math.random() * 10000000) + 1000000}`,
    gasLimit: `${Math.floor(Math.random() * 20000000) + 20000000}`,
    size: `${Math.floor(Math.random() * 1000) + 100} KB`
  }));

  const filteredBlocks = blocks.filter(block =>
    block.height.toString().includes(searchTerm) ||
    block.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.proposer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlocks.length / blocksPerPage);
  const startIndex = (currentPage - 1) * blocksPerPage;
  const endIndex = startIndex + blocksPerPage;
  const currentBlocks = filteredBlocks.slice(startIndex, endIndex);

  const formatGasUsage = (used: string, limit: string) => {
    const usedNum = parseInt(used);
    const limitNum = parseInt(limit);
    const percentage = ((usedNum / limitNum) * 100).toFixed(1);
    return `${usedNum.toLocaleString()} / ${limitNum.toLocaleString()} (${percentage}%)`;
  };

  const getGasUsageColor = (used: string, limit: string) => {
    const usedNum = parseInt(used);
    const limitNum = parseInt(limit);
    const percentage = (usedNum / limitNum) * 100;
    
    if (percentage > 90) return 'text-red-400';
    if (percentage > 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Blocks</h1>
          <p className="text-gray-400 mt-2">Explore blockchain blocks and their details</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Latest: #{blocks[0].height}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Avg Block Time: 6.2s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by block height, hash, or proposer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{blocks.length}</div>
            <div className="text-sm text-gray-400">Total Blocks</div>
          </div>
        </div>
      </div>

      {/* Blocks Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Height</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hash</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Proposer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Transactions</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Gas Used</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {currentBlocks.map((block) => (
                <tr key={block.height} className="hover:bg-gray-700 transition-colors cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-xs">#{block.height.toString().slice(-3)}</span>
                      </div>
                      <span className="text-sm font-medium text-white">#{block.height.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-300">{block.hash}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{block.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-300">{block.proposer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-white font-medium">{block.transactions}</span>
                      {block.transactions > 0 && (
                        <div className="ml-2 w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getGasUsageColor(block.gasUsed, block.gasLimit)}`}>
                      {formatGasUsage(block.gasUsed, block.gasLimit)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{block.size}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredBlocks.length)} of {filteredBlocks.length} blocks
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blocks;


