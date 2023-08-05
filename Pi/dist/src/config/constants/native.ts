import { ChainId } from '@/config/constants/chainId';
export const NATIVE = {
  [ChainId.Mainnet]: {
    name: 'ETH Token',
    symbol: 'ETH',
    address: '',
    chainId: ChainId.Mainnet,
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png',
  },
  [ChainId.BSC]: {
    name: 'BNB Token',
    symbol: 'BNB',
    address: '',
    chainId: ChainId.BSC,
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png',
  },
  [ChainId.Goerli]: {
    name: 'ETH Token',
    symbol: 'ETH',
    address: '',
    chainId: ChainId.Goerli,
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png',
  },
  [ChainId.OKC]: {
    name: 'OKT Token',
    symbol: 'OKT',
    address: '',
    chainId: ChainId.OKC,
    decimals: 18,
    logoURI: 'https://static.okx.com/cdn/wallet/logo/okt.png',
  },
  [ChainId.BSCTestnet]: {
    name: 'BNB Token',
    symbol: 'BNB',
    address: '',
    chainId: ChainId.BSCTestnet,
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png',
  },
};

export const getNative = (chainId) => {
  return NATIVE[chainId];
};
