import { Chain, Wallet, getWalletConnectConnector } from '@rainbow-me/rainbowkit';
import { InjectedConnector } from 'wagmi/connectors/injected';
import BitkeepConnector from './connectors/BitkeepConnector';

export interface MyWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const Bitkeep = ({ chains, shimDisconnect }: MyWalletOptions): Wallet => ({
  id: 'TokenPocket Wallet',
  name: 'TokenPocket Wallet',
  iconUrl: async () => (await import('./tp.jpg')).default,
  iconBackground: 'transparent',
  downloadUrls: {
    android: 'https://www.tokenpocket.pro/zh/download/app',
    ios: 'https://www.tokenpocket.pro/zh/download/app',
    qrCode: 'https://www.tokenpocket.pro/zh/download/app',
  },
  createConnector: () => {
    const connector = new InjectedConnector({
      chains,
      options: { shimDisconnect },
    });

    return {
      connector,
    };
  },
});
