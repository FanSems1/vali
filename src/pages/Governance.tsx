import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Proposal {
  id: number;
  title: string;
  description: string;
  status: 'deposit_period' | 'voting_period' | 'passed' | 'rejected' | 'failed';
  proposer: string;
  submitTime: string;
  votingStartTime: string;
  votingEndTime: string;
  totalDeposit: string;
  yesVotes: string;
  noVotes: string;
  abstainVotes: string;
  noWithVetoVotes: string;
  turnout: string;
}

const Governance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'proposals' | 'create'>('proposals');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const proposals: Proposal[] = [
    {
      id: 1,
      title: 'Increase Validator Commission Cap',
      description: 'Proposal to increase the maximum validator commission from 20% to 25% to allow validators more flexibility in setting their commission rates.',
      status: 'voting_period',
      proposer: 'cosmos1...abc123',
      submitTime: '2024-01-15 10:00:00 UTC',
      votingStartTime: '2024-01-16 10:00:00 UTC',
      votingEndTime: '2024-01-23 10:00:00 UTC',
      totalDeposit: '1,000 VTEST',
      yesVotes: '45.2%',
      noVotes: '32.1%',
      abstainVotes: '15.3%',
      noWithVetoVotes: '7.4%',
      turnout: '68.5%'
    },
    {
      id: 2,
      title: 'Community Pool Spending Proposal',
      description: 'Allocate 50,000 VTEST from the community pool to fund development of new validator tools and educational resources.',
      status: 'passed',
      proposer: 'cosmos1...def456',
      submitTime: '2024-01-10 14:30:00 UTC',
      votingStartTime: '2024-01-11 14:30:00 UTC',
      votingEndTime: '2024-01-18 14:30:00 UTC',
      totalDeposit: '500 VTEST',
      yesVotes: '78.9%',
      noVotes: '12.4%',
      abstainVotes: '5.2%',
      noWithVetoVotes: '3.5%',
      turnout: '72.1%'
    },
    {
      id: 3,
      title: 'Network Upgrade to v2.1.0',
      description: 'Upgrade the network to version 2.1.0 which includes performance improvements and new staking features.',
      status: 'deposit_period',
      proposer: 'cosmos1...ghi789',
      submitTime: '2024-01-20 09:15:00 UTC',
      votingStartTime: 'TBD',
      votingEndTime: 'TBD',
      totalDeposit: '250 VTEST',
      yesVotes: '0%',
      noVotes: '0%',
      abstainVotes: '0%',
      noWithVetoVotes: '0%',
      turnout: '0%'
    },
    {
      id: 4,
      title: 'Reduce Block Time to 5 Seconds',
      description: 'Proposal to reduce the target block time from 6 seconds to 5 seconds to improve transaction throughput.',
      status: 'rejected',
      proposer: 'cosmos1...jkl012',
      submitTime: '2024-01-05 16:45:00 UTC',
      votingStartTime: '2024-01-06 16:45:00 UTC',
      votingEndTime: '2024-01-13 16:45:00 UTC',
      totalDeposit: '750 VTEST',
      yesVotes: '28.7%',
      noVotes: '58.3%',
      abstainVotes: '8.9%',
      noWithVetoVotes: '4.1%',
      turnout: '65.2%'
    },
    {
      id: 5,
      title: 'Add New Validator Requirements',
      description: 'Implement stricter requirements for new validators including minimum self-stake and uptime guarantees.',
      status: 'failed',
      proposer: 'cosmos1...mno345',
      submitTime: '2024-01-12 11:20:00 UTC',
      votingStartTime: '2024-01-13 11:20:00 UTC',
      votingEndTime: '2024-01-20 11:20:00 UTC',
      totalDeposit: '300 VTEST',
      yesVotes: '35.6%',
      noVotes: '41.2%',
      abstainVotes: '12.8%',
      noWithVetoVotes: '10.4%',
      turnout: '58.9%'
    }
  ];

  const filteredProposals = proposals.filter(proposal => 
    statusFilter === 'all' || proposal.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deposit_period': return 'bg-yellow-600';
      case 'voting_period': return 'bg-blue-600';
      case 'passed': return 'bg-green-600';
      case 'rejected': return 'bg-red-600';
      case 'failed': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'deposit_period': return 'Deposit Period';
      case 'voting_period': return 'Voting Period';
      case 'passed': return 'Passed';
      case 'rejected': return 'Rejected';
      case 'failed': return 'Failed';
      default: return 'Unknown';
    }
  };

  const getVoteColor = (percentage: string) => {
    const num = parseFloat(percentage);
    if (num > 50) return 'text-green-400';
    if (num > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const [showVote, setShowVote] = useState<null | Proposal>(null);
  const [showDeposit, setShowDeposit] = useState<null | Proposal>(null);
  const [voteChoice, setVoteChoice] = useState<'yes' | 'no' | 'abstain' | 'no_with_veto'>('yes');
  const [depositAmt, setDepositAmt] = useState<number>(0);
  const [slider, setSlider] = useState<number>(0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Governance</h1>
          <p className="text-gray-400 mt-2">Participate in network governance and vote on proposals</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{proposals.filter(p => p.status === 'voting_period').length} Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>{proposals.filter(p => p.status === 'deposit_period').length} Deposit</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{proposals.filter(p => p.status === 'passed').length} Passed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Governance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{proposals.length}</div>
            <div className="text-sm text-gray-400">Total Proposals</div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{proposals.filter(p => p.status === 'passed').length}</div>
            <div className="text-sm text-gray-400">Passed</div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{proposals.filter(p => p.status === 'voting_period' || p.status === 'deposit_period').length}</div>
            <div className="text-sm text-gray-400">Active</div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">68.5%</div>
            <div className="text-sm text-gray-400">Avg Turnout</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('proposals')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'proposals'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Proposals
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'create'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Create Proposal
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'proposals' && (
            <div className="space-y-6">
              {/* Filter */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">All Proposals</h3>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Status</option>
                  <option value="deposit_period">Deposit Period</option>
                  <option value="voting_period">Voting Period</option>
                  <option value="passed">Passed</option>
                  <option value="rejected">Rejected</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              {/* Proposals List */}
              <div className="space-y-4">
                {filteredProposals.map((proposal) => (
                  <div key={proposal.id} className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-lg font-bold text-white">#{proposal.id}</span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(proposal.status)} text-white`}>
                            {getStatusText(proposal.status)}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">{proposal.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{proposal.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Proposer</div>
                        <div className="text-sm font-mono text-gray-300">{proposal.proposer}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Total Deposit</div>
                        <div className="text-sm text-white font-medium">{proposal.totalDeposit}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Submit Time</div>
                        <div className="text-sm text-white">{proposal.submitTime}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Voting End</div>
                        <div className="text-sm text-white">{proposal.votingEndTime}</div>
                      </div>
                    </div>

                    {/* Voting Results */}
                    {(proposal.status === 'voting_period' || proposal.status === 'passed' || proposal.status === 'rejected' || proposal.status === 'failed') && (
                      <div className="border-t border-gray-600 pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">Yes</div>
                            <div className={`text-sm font-medium ${getVoteColor(proposal.yesVotes)}`}>{proposal.yesVotes}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">No</div>
                            <div className={`text-sm font-medium ${getVoteColor(proposal.noVotes)}`}>{proposal.noVotes}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">Abstain</div>
                            <div className="text-sm font-medium text-gray-300">{proposal.abstainVotes}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">No with Veto</div>
                            <div className="text-sm font-medium text-red-400">{proposal.noWithVetoVotes}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">Turnout</div>
                            <div className="text-sm font-medium text-white">{proposal.turnout}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 mt-4">
                      {proposal.status === 'voting_period' && (
                        <>
                          <button onClick={() => setShowVote(proposal)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                            Vote / Deposit
                          </button>
                        </>
                      )}
                      {proposal.status === 'deposit_period' && (
                        <button onClick={() => setShowDeposit(proposal)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                          Add Deposit
                        </button>
                      )}
                      <Link to={`/governance/proposals/${proposal.id}`} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-lg font-semibold text-white">Create New Proposal</h3>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">Proposal creation requires wallet connection</div>
                <p className="text-sm text-gray-500 mb-6">Connect your wallet to create governance proposals and participate in network decisions.</p>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200">
                  Connect Wallet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Vote Modal */}
      {showVote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowVote(null)} />
          <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Vote on Proposal #{showVote.id}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Choice</label>
                <select value={voteChoice} onChange={(e) => setVoteChoice(e.target.value as any)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="abstain">Abstain</option>
                  <option value="no_with_veto">No with Veto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Optional Deposit</label>
                <input type="number" min={0} value={depositAmt} onChange={(e) => setDepositAmt(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                <input type="range" min={0} max={1000} value={slider} onChange={(e)=>{ setSlider(Number(e.target.value)); setDepositAmt(Number(e.target.value)); }} className="w-full mt-2" />
                <div className="flex justify-between text-xs text-gray-400"><span>0</span><span>1000</span></div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowVote(null)} className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">Cancel</button>
                <button onClick={() => setShowVote(null)} className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500">Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowDeposit(null)} />
          <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Deposit to Proposal #{showDeposit.id}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Amount</label>
                <input type="number" min={0} value={depositAmt} onChange={(e) => setDepositAmt(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowDeposit(null)} className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">Cancel</button>
                <button onClick={() => setShowDeposit(null)} className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Governance;


