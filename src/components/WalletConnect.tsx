import React, { useState } from 'react';

interface Wallet {
  name: string;
  icon: string;
  installed: boolean;
  type: 'installed' | 'qr' | 'not-installed';
}

const WalletConnect: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');

  const wallets: Wallet[] = [
    { name: 'Phantom', icon: '👻', installed: true, type: 'installed' },
    { name: 'OKX Wallet', icon: '🔷', installed: true, type: 'installed' },
    { name: 'Backpack', icon: '🎒', installed: true, type: 'installed' },
    { name: 'Keplr', icon: '🔵', installed: true, type: 'installed' },
    { name: 'MetaMask', icon: '🦊', installed: true, type: 'installed' },
    { name: 'HaHa', icon: '😄', installed: false, type: 'not-installed' },
    { name: 'WalletConnect', icon: '🔗', installed: true, type: 'qr' },
  ];

  const handleWalletConnect = (walletName: string) => {
    // Simulate wallet connection
    const mockAddress = '0x2545dsf' + Math.random().toString(36).substr(2, 9);
    setConnectedWallet(walletName);
    setWalletAddress(mockAddress);
    setIsConnected(true);
    setIsModalOpen(false);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnectedWallet('');
    setWalletAddress('');
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 10)}...${address.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-4">
        {/* Portfolio Value */}
        <div className="text-right">
          <div className="text-sm font-medium text-white">$125,430.50</div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>+8.24% (24h)</div>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center space-x-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span>Assets</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="h-6 w-px" style={{ background: 'var(--border-color)' }}></div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{connectedWallet.charAt(0)}</span>
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-white">{connectedWallet}</div>
              <div className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{truncateAddress(walletAddress)}</div>
            </div>
            <button
              onClick={handleDisconnect}
              className="text-[var(--text-muted)] hover:text-white transition-colors p-1 rounded hover:bg-[var(--bg-hover)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn-primary px-4 py-2 text-sm rounded-lg"
      >
        Connect Wallet
      </button>

      {/* Wallet Connect Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl w-full max-w-md mx-4">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Wallet List */}
            <div className="p-6">
              <div className="space-y-3">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => handleWalletConnect(wallet.name)}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center text-2xl">
                        {wallet.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-white font-medium">{wallet.name}</div>
                        <div className="text-sm text-gray-400">
                          {wallet.type === 'installed' && 'Ready to connect'}
                          {wallet.type === 'qr' && 'Scan QR code'}
                          {wallet.type === 'not-installed' && 'Not installed'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {wallet.installed && (
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        wallet.type === 'installed' 
                          ? 'bg-green-600 text-white' 
                          : wallet.type === 'qr'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {wallet.type === 'installed' && 'INSTALLED'}
                        {wallet.type === 'qr' && 'QR CODE'}
                        {wallet.type === 'not-installed' && 'NOT INSTALLED'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* All Wallets Section */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium">All Wallets</div>
                      <div className="text-sm text-gray-400">40+ wallets available</div>
                    </div>
                  </div>
                  <div className="text-blue-400 font-medium">40+</div>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <span>UX by</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span>/</span>
                  <button className="px-2 py-1 bg-gray-700 rounded text-white hover:bg-gray-600 transition-colors">
                    reown
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect;
