import { ChainId } from './chainId';

export const RPC = {
  [1337]: `http://localhost:8545`,
  [ChainId.Mainnet]: `https://rpc.ankr.com/eth`,
  [ChainId.BSC]: 'https://rpc.ankr.com/bsc',
  [ChainId.Goerli]: `https://rpc.ankr.com/eth_goerli`,
  [ChainId.OKC]: `https://exchainrpc.okex.org`,
  [ChainId.BSCTestnet]: 'https://rpc.ankr.com/bsc_testnet_chapel',
  [ChainId.Tx]:"https://tx.telegramx.space"
};
