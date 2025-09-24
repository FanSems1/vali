import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProposalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const proposal = {
    id,
    title: 'Increase Validator Commission Cap',
    status: 'voting_period',
    proposer: 'cosmos1...abc123',
    summary: 'Proposal to increase maximum validator commission from 20% to 25%.',
    details: 'This upgrade aims to provide validators more flexibility while ensuring competitive rates.',
    deposit: '1,000 VTEST',
    votingStart: '2024-01-16 10:00:00 UTC',
    votingEnd: '2024-01-23 10:00:00 UTC',
    results: { yes: '45.2%', no: '32.1%', abstain: '15.3%', veto: '7.4%' }
  };

  const statusColor = proposal.status === 'voting_period' ? 'bg-blue-600' : proposal.status === 'passed' ? 'bg-green-600' : proposal.status === 'rejected' ? 'bg-red-600' : 'bg-gray-600';

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="text-sm text-gray-300 hover:text-white">← Back</button>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Proposal #{proposal.id}</h1>
            <div className="text-gray-300 mt-1">{proposal.title}</div>
          </div>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor} text-white capitalize`}>
            {proposal.status.replace('_', ' ')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-700/40 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Proposer</div>
            <div className="text-white font-mono">{proposal.proposer}</div>
          </div>
          <div className="bg-gray-700/40 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Deposit</div>
            <div className="text-white font-semibold">{proposal.deposit}</div>
          </div>
          <div className="bg-gray-700/40 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Voting</div>
            <div className="text-white font-semibold">{proposal.votingStart} → {proposal.votingEnd}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-900/30 rounded-xl border border-gray-700 p-4">
            <h3 className="text-sm font-semibold mb-2">Summary</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{proposal.summary}</p>
            <p className="text-gray-400 text-sm leading-relaxed mt-2">{proposal.details}</p>
          </div>
          <div className="bg-gray-900/30 rounded-xl border border-gray-700 p-4">
            <h3 className="text-sm font-semibold mb-2">Current Votes</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-700/40 rounded-lg p-3"><div className="text-gray-400">Yes</div><div className="text-green-400 font-semibold">{proposal.results.yes}</div></div>
              <div className="bg-gray-700/40 rounded-lg p-3"><div className="text-gray-400">No</div><div className="text-red-400 font-semibold">{proposal.results.no}</div></div>
              <div className="bg-gray-700/40 rounded-lg p-3"><div className="text-gray-400">Abstain</div><div className="text-gray-300 font-semibold">{proposal.results.abstain}</div></div>
              <div className="bg-gray-700/40 rounded-lg p-3"><div className="text-gray-400">No with Veto</div><div className="text-red-300 font-semibold">{proposal.results.veto}</div></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-900/30 rounded-xl border border-gray-700 p-4">
            <h3 className="text-sm font-semibold mb-2">Timeline</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>Submitted • 2024-01-15 10:00:00 UTC</li>
              <li>Voting Start • {proposal.votingStart}</li>
              <li>Voting End • {proposal.votingEnd}</li>
            </ul>
          </div>
          <div className="bg-gray-900/30 rounded-xl border border-gray-700 p-4">
            <h3 className="text-sm font-semibold mb-2">Recent Votes</h3>
            <div className="space-y-2 text-sm">
              {['yes','no','abstain','yes','veto'].map((v,i)=> (
                <div key={i} className="flex items-center justify-between bg-gray-700/40 rounded-lg p-2">
                  <span className="text-gray-300">Account {i+1}</span>
                  <span className={`text-xs px-2 py-1 rounded ${v==='yes'?'bg-green-600':v==='no'?'bg-red-600':v==='veto'?'bg-red-500':'bg-gray-600'} text-white capitalize`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;


