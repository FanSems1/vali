import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MOCK_VALIDATORS = [
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

const StatusPill = ({ status }) => {
  const color = status === 'active' ? 'bg-green-600' : status === 'inactive' ? 'bg-yellow-600' : 'bg-red-600';
  const text = status === 'active' ? 'Active' : status === 'inactive' ? 'Inactive' : 'Jailed';
  return <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${color} text-white`}>{text}</span>;
};

const Modal = ({ title, isOpen, onClose, onConfirm, value, setValue, max = 1000 }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Amount</label>
            <input
              type="number"
              min={0}
              max={max}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <input
              type="range"
              min={0}
              max={max}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400"><span>0</span><span>{max}</span></div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UptimeGrid = ({ cols = 28, rows = 6 }) => {
  const cells = useMemo(() => Array.from({ length: cols * rows }, () => Math.random() > 0.08), [cols, rows]);
  return (
    <div className="grid gap-0.5 sm:gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {cells.map((ok, idx) => (
        <div key={idx} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 rounded ${ok ? 'bg-green-500' : 'bg-red-500'}`} />
      ))}
    </div>
  );
};

const ValidatorDetail = () => {
  const params = useParams();
  const id = Number(params.id);
  const navigate = useNavigate();
  const validator = MOCK_VALIDATORS.find((v) => v.rank === id);

  const [stakeOpen, setStakeOpen] = useState(false);
  const [unstakeOpen, setUnstakeOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [tab, setTab] = useState('overview'); // overview | staking | activities
  const [stakingTab, setStakingTab] = useState('delegations'); // delegations | undelegations | redelegations
  const [activityTab, setActivityTab] = useState('power'); // power | votes | jails | edits | proposed

  const delegationRows = [
    { account: 'ITRocket', share: '55.04%', amount: '25 398.45 A0GI' },
    { account: '0g1zfsndch...c7dt4gjw3z', share: '42.91%', amount: '19 800.00 A0GI' },
    { account: '0g1em2y4y0...k3rt3c44tj', share: '0.45%', amount: '210.00 A0GI' },
    { account: '0g1wvz2wjl...ea8kw5fpxk', share: '0.13%', amount: '62.77 A0GI' },
    { account: '0g1q5f9ml0...70glvua6dl', share: '0.08%', amount: '37.15 A0GI' }
  ];
  const activityRows = [
    { hash: '351FB2...903E6B', height: '4 459 991', type: 'Delegate', amount: '+50.00', timeAgo: '4 months ago', time: '18/05/2025, 12:43:31' },
    { hash: '8E105F...63CB58', height: '4 414 823', type: 'Delegate', amount: '+50.00', timeAgo: '4 months ago', time: '15/05/2025, 10:09:58' },
    { hash: '098C73...9D3675', height: '4 358 941', type: 'Delegate', amount: '+60.00', timeAgo: '4 months ago', time: '11/05/2025, 14:05:56' },
    { hash: 'D0D836...DD117C', height: '4 243 557', type: 'Delegate', amount: '+20.00', timeAgo: '4 months ago', time: '03/05/2025, 15:31:22' },
    { hash: 'E92F22...FCD1F8', height: '4 167 425', type: 'Delegate', amount: '+10.00', timeAgo: '4 months ago', time: '28/04/2025, 09:29:40' }
  ];

  if (!validator) {
    return (
      <div className="space-y-6">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-300 hover:text-white">← Back</button>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <p>Validator not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{validator.name}</h1>
          <div className="mt-2 flex items-center gap-3 text-gray-400">
            <code className="font-mono">{validator.address}</code>
            <StatusPill status={validator.status} />
          </div>
        </div>
      </div>

      {/* Top Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'staking', label: 'Staking' },
          { id: 'activities', label: 'Activities' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm ${
              tab === t.id ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Single-column content stacked vertically */}
      <div className="space-y-6">
        {/* Actions */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Actions</h3>
          <div className="flex gap-3">
            <button onClick={() => setStakeOpen(true)} className="flex-1 sm:flex-none sm:min-w-[120px] px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500">Stake</button>
            <button onClick={() => setUnstakeOpen(true)} className="flex-1 sm:flex-none sm:min-w-[120px] px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">Unstake</button>
          </div>
        </div>

        {tab === 'overview' && (
          <>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold">Validator Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-gray-400">Voting Power</div>
                  <div className="text-white font-semibold">{validator.votingPower}</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-gray-400">Commission</div>
                  <div className="text-white font-semibold">{validator.commission}</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-gray-400">Delegators</div>
                  <div className="text-white font-semibold">{validator.delegators.toLocaleString?.() || validator.delegators}</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-gray-400">Self Stake</div>
                  <div className="text-white font-semibold">{validator.selfStake}</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-gray-400">Total Stake</div>
                  <div className="text-white font-semibold">{validator.totalStake}</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-gray-400">Uptime</div>
                  <div className="text-white font-semibold">{validator.uptime}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Recent Liveness</h4>
                  <span className="text-xs text-gray-400">Green = OK, Red = Missed</span>
                </div>
                <UptimeGrid />
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold">Staking</h3>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Last updated</span>
                <span><b className="text-gray-200">13/07/2025, 22:00</b></span>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { id: 'delegations', label: 'Delegations' },
                  { id: 'undelegations', label: 'Undelegations' },
                  { id: 'redelegations', label: 'Redelegations' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setStakingTab(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      stakingTab === t.id ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {stakingTab === 'delegations' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-300">
                        <th className="py-3">Account</th>
                        <th className="py-3">Stake Share</th>
                        <th className="py-3">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {delegationRows.map((r) => (
                        <tr key={r.account} className="hover:bg-gray-700/40">
                          <td className="py-3 text-white">{r.account}</td>
                          <td className="py-3 text-white">{r.share}</td>
                          <td className="py-3 text-white">{r.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-3">
                    <span>Showing 1 — 5 out of 58</span>
                    <div className="flex items-center gap-2"><span>5</span></div>
                  </div>
                </div>
              )}
              {stakingTab === 'undelegations' && <div className="text-gray-400 text-sm">No undelegations found.</div>}
              {stakingTab === 'redelegations' && <div className="text-gray-400 text-sm">No redelegations found.</div>}
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold">Activities</h3>
              <div className="flex items-center gap-2">
                {[
                  { id: 'power', label: 'Power Events' },
                  { id: 'votes', label: 'Votes' },
                  { id: 'jails', label: 'Jails' },
                  { id: 'edits', label: 'Edit Events' },
                  { id: 'proposed', label: 'Proposed blocks' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActivityTab(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      activityTab === t.id ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {activityTab === 'power' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-300">
                        <th className="py-3">Tx Hash</th>
                        <th className="py-3">Height</th>
                        <th className="py-3">Type</th>
                        <th className="py-3">Amount</th>
                        <th className="py-3">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {activityRows.map((r) => (
                        <tr key={r.hash} className="hover:bg-gray-700/40">
                          <td className="py-3 text-white font-mono">{r.hash}</td>
                          <td className="py-3 text-white">{r.height}</td>
                          <td className="py-3"><span className="px-2 py-1 rounded-full bg-gray-700 text-gray-200 text-xs">{r.type}</span></td>
                          <td className="py-3 text-green-400">{r.amount}</td>
                          <td className="py-3 text-gray-300">{r.timeAgo}<div className="text-xs text-gray-500">{r.time}</div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-3">
                    <span>Showing 1 — 5 out of 42</span>
                  </div>
                </div>
              )}
              {activityTab === 'votes' && <div className="text-gray-400 text-sm">No votes recorded.</div>}
              {activityTab === 'jails' && <div className="text-gray-400 text-sm">No jail events.</div>}
              {activityTab === 'edits' && <div className="text-gray-400 text-sm">No edit events.</div>}
              {activityTab === 'proposed' && <div className="text-gray-400 text-sm">No proposed blocks.</div>}
            </div>
          </>
        )}

        {tab === 'staking' && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Last updated</span>
              <span><b className="text-gray-200">13/07/2025, 22:00</b></span>
            </div>
            <div className="flex items-center gap-2">
              {[
                { id: 'delegations', label: 'Delegations' },
                { id: 'undelegations', label: 'Undelegations' },
                { id: 'redelegations', label: 'Redelegations' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setStakingTab(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    stakingTab === t.id ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {stakingTab === 'delegations' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-300">
                      <th className="py-3">Account</th>
                      <th className="py-3">Stake Share</th>
                      <th className="py-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {delegationRows.map((r) => (
                      <tr key={r.account} className="hover:bg-gray-700/40">
                        <td className="py-3 text-white">{r.account}</td>
                        <td className="py-3 text-white">{r.share}</td>
                        <td className="py-3 text-white">{r.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-3">
                  <span>Showing 1 — 5 out of 58</span>
                  <div className="flex items-center gap-2"><span>5</span></div>
                </div>
              </div>
            )}
            {stakingTab === 'undelegations' && <div className="text-gray-400 text-sm">No undelegations found.</div>}
            {stakingTab === 'redelegations' && <div className="text-gray-400 text-sm">No redelegations found.</div>}
          </div>
        )}

        {tab === 'activities' && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              {[
                { id: 'power', label: 'Power Events' },
                { id: 'votes', label: 'Votes' },
                { id: 'jails', label: 'Jails' },
                { id: 'edits', label: 'Edit Events' },
                { id: 'proposed', label: 'Proposed blocks' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActivityTab(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    activityTab === t.id ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {activityTab === 'power' && (
              <div className="space-y-3 text-sm">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-700/40 rounded-lg p-3">
                    <div className="text-white">Power change</div>
                    <div className="text-gray-400">+{(Math.random() * 2).toFixed(2)}% • {(Math.floor(Math.random() * 30) + 1)}d ago</div>
                  </div>
                ))}
              </div>
            )}
            {activityTab === 'votes' && <div className="text-gray-400 text-sm">No votes recorded.</div>}
            {activityTab === 'jails' && <div className="text-gray-400 text-sm">No jail events.</div>}
            {activityTab === 'edits' && <div className="text-gray-400 text-sm">No edit events.</div>}
            {activityTab === 'proposed' && <div className="text-gray-400 text-sm">No proposed blocks.</div>}
          </div>
        )}
      </div>

      <Modal
        title="Stake"
        isOpen={stakeOpen}
        onClose={() => setStakeOpen(false)}
        onConfirm={() => setStakeOpen(false)}
        value={amount}
        setValue={setAmount}
        max={1000}
      />
      <Modal
        title="Unstake"
        isOpen={unstakeOpen}
        onClose={() => setUnstakeOpen(false)}
        onConfirm={() => setUnstakeOpen(false)}
        value={amount}
        setValue={setAmount}
        max={1000}
      />
    </div>
  );
};

export default ValidatorDetail;


