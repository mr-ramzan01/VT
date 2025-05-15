import { Network } from '../store/slices/onboardingSlice';

// Network options
export const networkOptions: Network[] = [
  {
    id: 'ethereum',
    name: 'ETHEREUM (BSC)',
    icon: '/icons/ethereum.png',
    symbol: 'ETH (ETH)',
    description: 'A decentralized, open-source blockchain with smart contract functionality, known for its robust ecosystem and being the foundation for many decentralized applications (dApps)',
    fees: 'high',
    speed: 'medium',
    shield: true,
  },
  {
    id: 'polygon',
    name: 'Polygon',
    icon: '/icons/poly.png',
    symbol: 'POL (POL)',
    description: 'The Polygon network, fully compatible with Ethereum\'s smart contracts and tooling, offers scalable solutions with high throughput and low transaction costs.',
    fees: 'low',
    speed: 'fast',
    shield: true,
  },
  {
    id: 'binance',
    name: 'Binance Smart Chain (BSC)',
    icon: '/icons/bnb.png',
    symbol: 'BNB Smart Chain Token (BNB)',
    description: 'A blockchain developed by Binance, offering smart contract functionality and compatibility with the Ethereum Virtual Machine (EVM) for faster and cheaper transactions',
    fees: 'low',
    speed: 'fast',
    shield: true,
  },
  {
    id: 'base',
    name: 'BASE mainnet',
    icon: '/icons/basemainnet.png',
    symbol: 'BNB Smart Chain Token (BNB)',
    description: 'A Layer 2 scaling solution for Ethereum developed by Coinbase, designed to offer lower transaction costs and improved scalability while maintaining security and decentralization',
    fees: 'low',
    speed: 'fast',
    shield: true,
  }
];

// Network SVG Icons mapping