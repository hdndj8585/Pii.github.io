import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import BatchTransfer from '@/page/BatchTransfer/Index';
import Invite from '@/page/Invite/Index';

import toast, { Toaster } from 'react-hot-toast';

import './App.css';
import '@rainbow-me/rainbowkit/styles.css';

import { connectorsForWallets, RainbowKitProvider, wallet } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { bsc, bscTest, localhost, tx } from '@/config/constants/supportChain';
import { Box } from '@mui/material';
import { RPC } from './config/constants/rpc';
import './i18n/config';

import { Bitkeep } from './bitkkep';

const { chains, provider } = configureChains(
  [bsc, tx],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        return { http: RPC[chain.id] };
      },
    }),
    publicProvider(),
  ]
);
const needsInjectedWalletFallback =
  typeof window !== 'undefined' && window.ethereum && !window.ethereum.isMetaMask && !window.ethereum.isCoinbaseWallet;

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      Bitkeep({ chains }),
      wallet.metaMask({ chains, shimDisconnect: true }),
      wallet.walletConnect({ chains }),
      wallet.coinbase({ appName: 'Duck', chains }),
      ...(needsInjectedWalletFallback ? [wallet.injected({ chains, shimDisconnect: true })] : []),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function APP() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Box className="App" sx={{ position: 'relative', height: '100vh' }}>
          <Router>
            <Box sx={{ height: '100%' }}>
              <Toaster
                toastOptions={{
                  className: '',
                  style: {
                    wordBreak: 'break-all',
                  },
                }}
              ></Toaster>
              <Box sx={{ height: '100%' }}>
                <Switch>
                  <Route path="/" exact component={BatchTransfer} />
                  <Route path="/invite" exact component={Invite} />
                </Switch>
              </Box>
            </Box>
          </Router>
        </Box>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
