import binanceSvg from '@/assets/binance.svg';
import txSvg from '@/assets/tx.png';

import { RPC } from './rpc';

export const SCAN_ADDRESS = {
  31337: '',
  1337: '',
  56: 'https://bscscan.com',
  97: 'https://testnet.bscscan.com',
  66: 'https://www.oklink.com/okc',
  8989:"https://www.telegramx.link/"
};

export const localhost: any = {
  id: 31337,
  name: 'ETH',
  network: 'ETH',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  iconUrl: 'https://static.okx.com/cdn/wallet/logo/okt.png',
  rpcUrls: {
    default: RPC[31337],
    public: RPC[31337],
  },
  blockExplorers: { default: { name: 'ETH', url: SCAN_ADDRESS[31337] } },
};
export const tx: any = {
  id: 8989,
  name: 'TX',
  network: 'TX',
  nativeCurrency: {
    name: 'TX',
    symbol: 'TX',
    decimals: 18,
  },
  iconUrl:txSvg,
  rpcUrls: {
    default: RPC[8989],
    public: RPC[8989],
  },
  blockExplorers: { default: { name: 'TX', url: SCAN_ADDRESS[8989] } },
};
export const bsc: any = {
  id: 56,
  name: 'BSC',
  network: 'BSC',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  iconUrl: binanceSvg,
  rpcUrls: {
    default: RPC[56],
    public: RPC[56],
  },
  blockExplorers: { default: { name: 'BSC', url: SCAN_ADDRESS[56] } },
};

export const bscTest: any = {
  id: 97,
  name: 'BSCTEST',
  network: 'BSCTEST',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  iconUrl: binanceSvg,
  rpcUrls: {
    default: RPC[97],
    public: RPC[97],
  },
  blockExplorers: { default: { name: 'BSC-TEST', url: SCAN_ADDRESS[97] } },
};
