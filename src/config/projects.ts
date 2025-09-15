// Project configuration
export interface ProjectConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  logo: string;
  color: string;
  network: {
    name: string;
    rpcUrl: string;
    chainId: string;
    currency: {
      symbol: string;
      name: string;
      decimals: number;
    };
  };
  validator: {
    totalValidators: number;
    minStake: string;
    maxStake: string;
    commissionRate: string;
    unbondingPeriod: string;
  };
  metrics: {
    totalStaked: string;
    activeDelegations: number;
    networkUptime: string;
    blockTime: string;
    tps: number;
  };
}

const projects: ProjectConfig[] = [
  {
    id: 'aztec',
    name: 'aztec',
    displayName: 'Aztec Network',
    description: 'Privacy-focused zk-rollup for Ethereum',
    logo: 'A',
    color: '#00d4aa',
    network: {
      name: 'Aztec Mainnet',
      rpcUrl: 'https://aztec-mainnet.infura.io',
      chainId: 'aztec-1',
      currency: {
        symbol: 'AZT',
        name: 'Aztec Token',
        decimals: 18
      }
    },
    validator: {
      totalValidators: 150,
      minStake: '10,000',
      maxStake: '1,000,000',
      commissionRate: '5-15%',
      unbondingPeriod: '21 days'
    },
    metrics: {
      totalStaked: '2.4M AZT',
      activeDelegations: 573,
      networkUptime: '99.8%',
      blockTime: '2.5s',
      tps: 1000
    }
  },
  {
    id: '0g',
    name: '0g',
    displayName: '0G Labs',
    description: 'Decentralized AI compute network',
    logo: '0G',
    color: '#8b5cf6',
    network: {
      name: '0G Testnet',
      rpcUrl: 'https://0g-rpc.0g.ai',
      chainId: '0g-1',
      currency: {
        symbol: '0G',
        name: '0G Token',
        decimals: 18
      }
    },
    validator: {
      totalValidators: 89,
      minStake: '5,000',
      maxStake: '500,000',
      commissionRate: '3-12%',
      unbondingPeriod: '14 days'
    },
    metrics: {
      totalStaked: '1.8M 0G',
      activeDelegations: 342,
      networkUptime: '99.5%',
      blockTime: '1.2s',
      tps: 5000
    }
  },
  {
    id: 'soundness',
    name: 'soundness',
    displayName: 'Soundness Protocol',
    description: 'Formal verification for smart contracts',
    logo: 'S',
    color: '#f59e0b',
    network: {
      name: 'Soundness Mainnet',
      rpcUrl: 'https://soundness-rpc.com',
      chainId: 'soundness-1',
      currency: {
        symbol: 'SND',
        name: 'Soundness Token',
        decimals: 18
      }
    },
    validator: {
      totalValidators: 67,
      minStake: '15,000',
      maxStake: '750,000',
      commissionRate: '8-20%',
      unbondingPeriod: '30 days'
    },
    metrics: {
      totalStaked: '3.2M SND',
      activeDelegations: 234,
      networkUptime: '99.9%',
      blockTime: '3.0s',
      tps: 200
    }
  },
  {
    id: 'eigenlayer',
    name: 'eigenlayer',
    displayName: 'EigenLayer',
    description: 'Restaking protocol for Ethereum',
    logo: 'E',
    color: '#3b82f6',
    network: {
      name: 'EigenLayer Mainnet',
      rpcUrl: 'https://eigenlayer-rpc.io',
      chainId: 'eigenlayer-1',
      currency: {
        symbol: 'EIGEN',
        name: 'Eigen Token',
        decimals: 18
      }
    },
    validator: {
      totalValidators: 200,
      minStake: '32',
      maxStake: '1,000,000',
      commissionRate: '2-10%',
      unbondingPeriod: '7 days'
    },
    metrics: {
      totalStaked: '5.1M EIGEN',
      activeDelegations: 1200,
      networkUptime: '99.7%',
      blockTime: '12s',
      tps: 15
    }
  }
];

export function getProjectById(id: string): ProjectConfig | undefined {
  return projects.find(project => project.id === id);
}

export function getDefaultProject(): ProjectConfig {
  return projects[0];
}

export { projects };