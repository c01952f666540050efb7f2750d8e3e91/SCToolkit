import '@/styles/globals.css'
import React, { useState, useEffect } from 'react';

// NextJS/NextUI
import { createTheme, NextUIProvider, useTheme, changeTheme  } from '@nextui-org/react';
import type { AppProps } from 'next/app'


import TopNavbar from './components/navbar/navbar';

// Web3 onboard
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import { Web3OnboardProvider, useConnectWallet } from '@web3-onboard/react';
import init from '@web3-onboard/core';

import { ethers } from 'ethers';
const injected = injectedModule()
const ledger = ledgerModule()
const walletConnect = walletConnectModule()

// Wallets supported
const wallets =[
  injected,
  ledger,
  walletConnect
]

// chains
const chains = [
{
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://rpc.ankr.com/eth`
},
{
    id: '0x5',
    token: 'ETH',
    label: 'Goerli',
    rpcUrl: `https://rpc.ankr.com/eth_goerli`
}
]

const appMetadata = {
name: 'Wallet',
icon: 'icon',
description: 'Example frontend',
recommendedInjectedWallets: []
}


export default function App({ Component, pageProps }: AppProps) {
    // Themes
    const lightTheme = createTheme({
      type: 'dark',
      theme: {
      colors: {}, // optional
      }
  })

  const darkTheme = createTheme({
      type: 'dark',
      theme: {
      colors: {}, // optional
      }
  })
  
  const theme = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const handleToggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      changeTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <>
      <TopNavbar  
        isDarkMode={isDarkMode}
        handleToggleDarkMode={handleToggleDarkMode}
      />
      <Component {...pageProps} />
    </>
  )
}