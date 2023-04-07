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



type HomeProps = {
    web3Onboard: any
    page: any
    address: any
}

// Content Function
const Home: React.FC<HomeProps> = (
    { web3Onboard, page, address }
) => {

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
                            web3Onboard={web3Onboard}
                        />
                        <Content
                            page={page}
                            address={address}
                        />
                    </Web3OnboardProvider>
                </NextUIProvider>
            </NextThemesProvider>    
        </div>
    
        
    )
}

export default Home