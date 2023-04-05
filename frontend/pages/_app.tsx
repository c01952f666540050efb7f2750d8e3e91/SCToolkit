import '@/styles/globals.css'
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import TopNavbar from './components/navbar/navbar';
import { useTheme, changeTheme } from '@nextui-org/react';

// Web3 onbaord
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import { Web3OnboardProvider } from '@web3-onboard/react';
import Onboard from '@web3-onboard/core';

// ethers
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

const web3Onboard = Onboard({
  theme: 'dark',
  wallets,
  chains,
  appMetadata
})

export default function App({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    changeTheme(isDarkMode ? 'light' : 'dark');
  };
  
  
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
            <TopNavbar currentTheme={isDarkMode} toggleTheme={handleToggleDarkMode} />
            <Component {...pageProps} />
          </Web3OnboardProvider>
        </NextUIProvider>
      </NextThemesProvider>
    
  )
}