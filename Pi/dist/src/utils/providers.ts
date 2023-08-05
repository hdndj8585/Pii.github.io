import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { RPC } from '@/config/constants/rpc';

const getRpcUrl = (chainId) => {
  return new StaticJsonRpcProvider(RPC[chainId]);
};

export const simpleRpcProvider = getRpcUrl;

export default null;
