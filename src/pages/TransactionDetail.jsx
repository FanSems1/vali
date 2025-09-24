import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const InfoRow = ({ label, value, mono = false }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className={`${mono ? 'font-mono' : ''} text-white text-sm`}>{value}</span>
  </div>
);

const TransactionDetail = () => {
  const { hash } = useParams();
  const navigate = useNavigate();

  // Mock data – adapt to your data source later
  const tx = {
    hash: hash || '0xDEMO',
    status: 'success',
    type: 'Delegate',
    block: 4459991,
    time: '18/05/2025, 12:43:31',
    age: '4 months ago',
    from: 'cosmos1...abcd12',
    to: 'cosmosvaloper1...xyz789',
    amount: '50.00 ATOM',
    fee: '0.0023 ATOM',
    gasUsed: '78,234',
    gasPrice: '0.000005 ATOM',
    memo: '—'
  };

  const statusColor = tx.status === 'success' ? 'bg-green-600' : tx.status === 'failed' ? 'bg-red-600' : 'bg-yellow-600';

  const raw = {
    txhash: tx.hash,
    height: tx.block,
    timestamp: tx.time,
    code: 0,
    gas_used: tx.gasUsed,
    gas_wanted: 120000,
    logs: [{ msg_index: 0, events: [{ type: 'delegate', attributes: [{ key: 'amount', value: '50atom' }] }] }]
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="text-sm text-gray-300 hover:text-white">← Back</button>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Transaction</h1>
            <div className="mt-1 text-gray-300 font-mono break-all">{tx.hash}</div>
          </div>
          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${statusColor} text-white capitalize`}>
            {tx.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-700/40 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Type</div>
            <div className="text-white font-semibold">{tx.type}</div>
          </div>
          <div className="bg-gray-700/40 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Block</div>
            <div className="text-white font-semibold">#{tx.block.toLocaleString()}</div>
          </div>
          <div className="bg-gray-700/40 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Time</div>
            <div className="text-white font-semibold">{tx.time} <span className="text-gray-400 font-normal">({tx.age})</span></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-900/30 rounded-xl border border-gray-700 p-4">
            <h3 className="text-sm font-semibold mb-2">Transfer</h3>
            <InfoRow label="From" value={tx.from} mono />
            <InfoRow label="To" value={tx.to} mono />
            <InfoRow label="Amount" value={tx.amount} />
            <InfoRow label="Memo" value={tx.memo} />
          </div>
          <div className="bg-gray-900/30 rounded-xl border border-gray-700 p-4">
            <h3 className="text-sm font-semibold mb-2">Fees & Gas</h3>
            <InfoRow label="Fee" value={tx.fee} />
            <InfoRow label="Gas Used" value={tx.gasUsed} />
            <InfoRow label="Gas Price" value={tx.gasPrice} />
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-400">Details</span>
            <span className="text-gray-600">|</span>
            <span className="text-sm text-gray-400">Raw</span>
            <span className="text-gray-600">|</span>
            <span className="text-sm text-gray-400">Events</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900/30 rounded-xl border border-gray-700 p-4">
              <h3 className="text-sm font-semibold mb-2">Raw JSON</h3>
              <pre className="text-xs text-gray-300 overflow-x-auto">{JSON.stringify(raw, null, 2)}</pre>
            </div>
            <div className="bg-gray-900/30 rounded-xl border border-gray-700 p-4">
              <h3 className="text-sm font-semibold mb-2">Events</h3>
              <div className="space-y-2 text-sm">
                {raw.logs[0].events.map((e, i) => (
                  <div key={i} className="bg-gray-700/40 rounded-lg p-3">
                    <div className="text-gray-300 mb-1">{e.type}</div>
                    {e.attributes.map((a, j) => (
                      <div key={j} className="flex justify-between text-xs text-gray-400"><span>{a.key}</span><span className="text-white">{a.value}</span></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm mt-6">
            <Link to={`/blocks`} className="text-purple-400 hover:text-purple-300">View Block</Link>
            <Link to={`/transactions`} className="text-gray-300 hover:text-white">Back to Transactions</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;


