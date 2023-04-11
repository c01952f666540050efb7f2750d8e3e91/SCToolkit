// React Import
import React, { useState, useEffect } from 'react';

// Import NextJS/NextUI
import { createTheme, NextUIProvider, useTheme, changeTheme, Button  } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Local Import
import TopNavbar from './components/navbar/navbar';
import Content from './components/content/content';
import ConnectWallet from './components/navbar/connectwallet/ConnectWallet';

// Web3 Import
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import { init, Web3OnboardProvider, useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react';

// Ethers
import { ethers } from 'ethers';


// Modules
const injected = injectedModule()
const ledger = ledgerModule()
const walletConnect = walletConnectModule()


const web3Onboard = init({
    theme: 'dark',
    wallets: [
        injected,
        ledger,
        walletConnect
    ],
    chains: [
        {
            id: '0x1',
            token: 'ETH',
            label: 'Ethereum Mainnet',
            rpcUrl: `https://mainnet.infura.io/v3/`
        },
        {
            id: '0x5',
            token: 'ETH',
            label: 'Goerli',
            rpcUrl: `https://goerli.infura.io/v3/`
        },
        {
            id: '0x13881',
            token: 'MATIC',
            label: 'Polygon - Mumbai',
            rpcUrl: 'https://matic-mumbai.chainstacklabs.com'
        },
        {
            id: '0x38',
            token: 'BNB',
            label: 'Binance',
            rpcUrl: 'https://bsc-dataseed.binance.org/'
        },
        {
            id: '0xA',
            token: 'OETH',
            label: 'Optimism',
            rpcUrl: 'https://mainnet.optimism.io'
        },
        {
            id: '0xA4B1',
            token: 'ARB-ETH',
            label: 'Arbitrum',
            rpcUrl: 'https://rpc.ankr.com/arbitrum'
        }
    ],
    appMetadata: {
        name: 'Staking frontend',
        icon: 'icon',
        description: 'Staking test',
        recommendedInjectedWallets: [
            { name: 'MetaMask', url: 'https://metamask.io' },
        //   { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
        ]
    }
})


type HomeProps = {
    // web3Onboard: typeof OnboardAPI
    page: any
    address: any
}

// Content Function
const Home: React.FC<HomeProps> = (
    { page, address }
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

    const theme = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        changeTheme(isDarkMode ? 'light' : 'dark');
    };
    // ------------------------------

    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
    const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()
    const connectedWallets = useWallets()
    
    useEffect(() => {
        // If the wallet has a provider than the wallet is connected
        if (wallet?.provider) {
            setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
        // if using ethers v6 this is:
        // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
        }
    }, [wallet])

    function handleConnect() {
        connect();
    }

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
                            wallet={wallet}
                            isDarkMode={isDarkMode}
                            handleToggleDarkMode={handleToggleDarkMode}
                            handleConnect={handleConnect}
                        />
                        <Button
                            onPress={handleConnect}
                        >
                            {wallet?.accounts[0].address}
                        </Button>
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