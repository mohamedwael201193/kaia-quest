import { http, createConfig } from 'wagmi';
import { klaytn, klaytnBaobab } from 'wagmi/chains';
import { injected, metaMask, walletConnect } from 'wagmi/connectors';

// Kaia Mainnet configuration
const kaiaMainnet = {
  ...klaytn,
  id: 8217,
  name: 'Kaia Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'KAIA',
    symbol: 'KAIA',
  },
  rpcUrls: {
    default: {
      http: [import.meta.env.VITE_MAINNET_RPC || 'https://public-en.node.kaia.io'],
    },
    public: {
      http: [import.meta.env.VITE_MAINNET_RPC || 'https://public-en.node.kaia.io'],
    },
  },
  blockExplorers: {
    default: { name: 'KaiaScope', url: 'https://kaiascope.com' },
  },
};

// Kairos Testnet configuration  
const kaiaTestnet = {
  ...klaytnBaobab,
  id: 1001,
  name: 'Kairos Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'KAIA',
    symbol: 'KAIA',
  },
  rpcUrls: {
    default: {
      http: [import.meta.env.VITE_TESTNET_RPC || 'https://public-en-kairos.node.kaia.io'],
    },
    public: {
      http: [import.meta.env.VITE_TESTNET_RPC || 'https://public-en-kairos.node.kaia.io'],
    },
  },
  blockExplorers: {
    default: { name: 'KaiaScope Testnet', url: 'https://kairos.kaiascope.com' },
  },
};

export const config = createConfig({
  chains: [kaiaTestnet, kaiaMainnet],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: 'kaia-quest-mini-dapp',
    }),
  ],
  transports: {
    [kaiaMainnet.id]: http(),
    [kaiaTestnet.id]: http(),
  },
});

export const targetChainId = parseInt(import.meta.env.VITE_CHAIN_ID || '1001');
export const isTestnet = targetChainId === 1001;

export { kaiaMainnet, kaiaTestnet };