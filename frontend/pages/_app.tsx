import '@/styles/globals.css'
import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import TopNavbar from './components/navbar/navbar';
import { useTheme, changeTheme } from '@nextui-org/react';

// Web3 onbaord
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import { Web3OnboardProvider, useConnectWallet } from '@web3-onboard/react';
import Onboard from '@web3-onboard/core';

// ethers
import { Wallet, ethers } from 'ethers';

const injected = injectedModule()
const ledger = ledgerModule()
const walletConnect = walletConnectModule()

// Wallets supported
const wallets =[
  injected,
  ledger,
  walletConnect
]

type Web3OnboardProviderProps = {
  web3Onboard: OnboardAPI;
};

// chains - c5c8a3d6513a41e5a923ef787c03e6de
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

export default function App({ Component, pageProps }: AppProps) {

  // Theme
  const theme = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    changeTheme(isDarkMode ? 'light' : 'dark');
  };

  // Address
  const [address, setAddress] = React.useState();

  // Page State
  const [page, setPage] = React.useState("Landing");
  
  // Web3 Onboarding 
  const web3Onboard = Onboard({
    theme: 'dark',
    wallets,
    chains,
    appMetadata
  })


  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()
  
  // TODO - Have to fix error: "Cannot find name 'Account'"
  const [account, setAccount] = useState<Account | null>(null)
  const { name, avatar } = wallet?.accounts[0].ens ?? {}

  // wallet?.label.address
  
  return (
    
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className
        }}
      >
        <NextUIProvider>
          <Web3OnboardProvider web3Onboard={web3Onboard}>
            <TopNavbar currentTheme={isDarkMode} toggleTheme={handleToggleDarkMode} web3Onboard={web3Onboard}/>
            <Component {...pageProps} />
          </Web3OnboardProvider>
        </NextUIProvider>
      </NextThemesProvider>
    
  )
}