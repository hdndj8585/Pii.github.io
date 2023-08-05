import { useMemo } from 'react';
import { getProviderOrSigner } from '../utils';
import { AddressZero } from '@ethersproject/constants';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { getGuangTouAddress, getMultiTransferAddress, getUsdtAddress } from '@/utils/addressHelpers';
import bep20TransferAbi from '@/config/abi/erc20Transfer.json';
import bep20Abi from '@/config/abi/erc20.json';
import guangTouAbi from '@/config/abi/guangTou.json';

import { isAddress } from '@/utils/address';
import { useNetwork, useProvider, useSigner } from 'wagmi';
import defaultChainId from '@/config/constants/defaultChainId';

export const useERC20 = (address: string) => {
  return createDynamicContract(address, bep20Abi);
};

export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
const createDynamicContract = <TContract extends Contract = Contract>(
  address: string | undefined,
  ABI: ContractInterface,
  asSigner = true
): Contract | null => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useMemo(() => {
    if (!address) return null;
    const providerOrSigner = asSigner && signer ? signer : provider;
    return new Contract(address, ABI, providerOrSigner) as TContract;
  }, [address, asSigner, signer, provider]);
};

export const useGuangTouContract = () => {
  const { chain = { id: defaultChainId } } = useNetwork();
  const address = getGuangTouAddress(chain.id);
  return createDynamicContract(address, guangTouAbi);
};

export const useUsdtContract = () => {
  const { chain = { id: defaultChainId } } = useNetwork();
  const address = getUsdtAddress(chain.id);
  return createDynamicContract(address, bep20Abi);
};
