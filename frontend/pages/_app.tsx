import '@/styles/globals.css'
import React from 'react';

// NextJS/NextUI
import type { AppProps } from 'next/app'

// Web3 Import
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import { init, Web3OnboardProvider } from '@web3-onboard/react';
import { chains } from './index';

// Modules
const injected = injectedModule()
const ledger = ledgerModule()
const walletConnect = walletConnectModule()


const web3Onboard = init({
    wallets: [
        injected,
        ledger,
        walletConnect
    ],
    chains: chains,
    appMetadata: {
        name: 'SC Toolkit',
        icon: 'icon',
        description: 'SC Toolkit',
        recommendedInjectedWallets: [
            { name: 'MetaMask', url: 'https://metamask.io' },
        //   { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
        ]
    }
})

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <Component {...pageProps} />    
    </Web3OnboardProvider>
  )
}