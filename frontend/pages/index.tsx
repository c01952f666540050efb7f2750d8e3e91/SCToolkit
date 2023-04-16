// React Import
import React, { useState, useEffect } from 'react';

// Import NextJS/NextUI
import { createTheme, NextUIProvider, useTheme, changeTheme, Button  } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Local Import
import TopNavbar from './components/navbar/navbar';
import Content from './components/content/content';
import LedgerSVG from '../public/Logos/Ledger/LEDGER-WORDMARK-SINGLE-CHARACTER-BLACK-CMYK-01.svg' // TODO

// Web3 Import
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import { init, Web3OnboardProvider, useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react';

// Ethers
import { ethers } from 'ethers';

// Dotenv - TODO
// import dotenv from 'dotenv';
// dotenv.config();

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
            rpcUrl: process.env.ETH_RPC_URL
        },  
        {
            id: '0x5',
            token: 'ETH',
            label: 'Goerli',
            rpcUrl: process.env.GOERLI_RPC_URL
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
        },
        {
            id: '0x539',
            token: 'ETH',
            label: 'Anvil',
            rpcUrl: 'http://127.0.0.1:8545'
        }

    ],
    appMetadata: {
        name: 'Staking frontend',
        icon: 'i',
        description: 'Staking test',
        recommendedInjectedWallets: [
            { name: 'MetaMask', url: 'https://metamask.io' },
        //   { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
        ]
    }
})



// Content Function
const Home: React.FC = ({

}) => {

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
    // Web3
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

    let isConnected = false;
    if (wallet?.provider) {
        isConnected = true;
    }

    function handleConnect() {
        connect();
        if (wallet?.accounts[0]) {
            console.log("test");
            setAddress(wallet.accounts[0].address);
            console.log(wallet.accounts[0].address);
        }
        
    }
    
    function handleDisconnect() {
        if (wallet?.provider) {
            disconnect({ label: wallet.label })
        }
        isConnected = false
    }
    // ------------------------------

    // Navbar
    const [currentPage, setPage] = useState("Home");
    

    function handleMenu(newPage: string) {
        setPage(newPage);
    }

    // Account details
    const [address, setAddress] = useState("test");

    const sendEther = async (recipientAddress:string, amount:string) => {
        try {
            if (ethersProvider?.provider) {
                const signer = ethersProvider.getSigner();
                // const Network = (await ethersProvider.getNetwork()).chainId;
                const transaction = await signer.sendTransaction({
                    to: recipientAddress,
                    value: ethers.utils.parseEther(amount),
                });
                console.log("Transaction hash:", transaction.hash);
            }
            
            } catch (error) {
            console.error("Error:", error);
        }
    };

    function handleSend(receive:string, amount:string) {
        sendEther(receive, amount);
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
                            address={wallet?.accounts[0].address}
                            isConnected={isConnected}
                            isDarkMode={isDarkMode}
                            handleToggleDarkMode={handleToggleDarkMode}
                            handleConnect={handleConnect}
                            handleDisconnect={handleDisconnect}
                            handleMenu={handleMenu}
                        />
                        <Content
                            currentPage={currentPage}
                            address={wallet?.accounts[0].address}
                            setAddress={setAddress}
                            sendEther={sendEther}
                        />
                    </Web3OnboardProvider>
                </NextUIProvider>
            </NextThemesProvider>    
        </div>
    
        
    )
}

export default Home