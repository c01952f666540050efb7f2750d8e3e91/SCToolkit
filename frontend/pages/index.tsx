// React Import
import React, { useState } from 'react';

// Import NextJS/NextUI
import { createTheme, NextUIProvider, useTheme, changeTheme  } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Menu Bar Import
import TopNavbar from './components/navbar/navbar';
import Content from './components/content/content';

// Web3 Import
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import { Web3OnboardProvider, useConnectWallet } from '@web3-onboard/react';
import init from '@web3-onboard/core';
    

// Content Function
export default function Home() {
    
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

    // Theme
    const theme = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        changeTheme(isDarkMode ? 'light' : 'dark');
    };

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
    // Web3 Onboarding 
    const web3Onboard = init({
        theme: 'dark',
        wallets,
        chains,
        appMetadata
    })

    // Address
    const [address, setAddress] = React.useState("0x");

    // Page State
    const [page, setPage] = React.useState("Landing");


    return (
        
        <div>    
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
                        <TopNavbar 
                            currentTheme={isDarkMode} 
                            toggleTheme={handleToggleDarkMode} 
                            web3wallet={wallets} 
                            web3chains={chains}
                            web3appMetadata={appMetadata}
                        />
                        <Content
                            page={page}
                            setPage={setPage}
                            address={address}
                        />
                    </Web3OnboardProvider>
                </NextUIProvider>
            </NextThemesProvider>    
        </div>
    
        
    )
    }