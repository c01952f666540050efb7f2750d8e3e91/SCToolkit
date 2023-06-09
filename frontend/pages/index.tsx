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

// ABI
import IERC20ABI from './components/content/send-components/abis/IERC20.json';
import IERC721ABI from './components/content/send-components/abis/IERC721.json';
import IERC1155ABI from './components/content/send-components/abis/IERC1155.json';
// import ERC721ABI from '../../abi/IERC721.json';
// import ERC1155ABI from '../../abi/IERC1155.json';

// Dotenv - TODO
// import dotenv from 'dotenv';
// dotenv.config();

// Modules
const injected = injectedModule()
const ledger = ledgerModule()
const walletConnect = walletConnectModule()

declare global {
    interface Window {
        ethereum?: any;
    }
}

export const chains = [
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
        id: '0xAA36A7',
        token: 'ETH',
        label: 'Sepolia',
        rpcUrl: process.env.SEPOLIA_RPC_URL
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
        rpcUrl: 'localhost:8545'
    }
];

const web3Onboard = init({
    theme: 'dark',
    wallets: [
        injected,
        ledger,
        walletConnect
    ],
    chains: chains,
    appMetadata: {
        name: 'Smart Contract frontend',
        icon: 'Logos/Ledger/LEDGER-WORDMARK-SINGLE-CHARACTER-BLACK-CMYK-01.svg',
        description: 'SC Toolkit',
        recommendedInjectedWallets: [
            { name: 'MetaMask', url: 'https://metamask.io' },
        //   { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
        ]
    }
});



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
    const [network, setNetwork] = useState("")
    const connectedWallets = useWallets()

    useEffect(() => {
        // If the wallet has a provider than the wallet is connected
        
        if (wallet?.provider) {
            setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
            
            console.log("CONNECTED TO ->");
            console.log(connectedChain?.namespace);
            console.log(connectedChain?.id);
            
        }
    }, [wallet, connectedChain])

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
            console.log(wallet.chains);
        }
        
    }
    
    function handleDisconnect() {
        
        if (wallet?.provider) {
            disconnect({ label: wallet.label })
        }
        if (connectedChain?.id) {
            console.log(connectedChain.id);
        }
        
        isConnected = false
    }

    async function handleNetwork() {
        
        if (connectedChain?.id) {

            if (ethersProvider) {
                
                const network = await ethersProvider.getNetwork();
                
                setNetwork(network.chainId.toString());
                // You can perform additional actions based on the chain ID here
            }
            
        } 

    }

    const changeNetwork = async (chainId: string) => {

        
        if (window.ethereum) {
            try {
                const network = chains.find((chain) => chain.label === chainId);
                
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: network?.id }],
                });
                if (network?.label !== undefined) {
                    setNetwork(network.label.toString());
                }
                
            } catch (error) {
                console.error('Failed to switch network:', error);
            }
        } else {
            console.error('No injected Ethereum provider found');
        }
    };
    // ------------------------------

    // Navbar
    const [currentPage, setPage] = useState("Home");
    
    // set the page
    function handleMenu(newPage: string) {
        setPage(newPage);
        
    }

    // Account details
    const [address, setAddress] = useState("test");

    
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
                            handleNetwork={handleNetwork}
                            currentNetwork={network}
                            ethersProvider={ethersProvider}
                            changeNetwork={changeNetwork}
                        />
                        <Content
                            currentPage={currentPage}
                            address={wallet?.accounts[0].address}
                            ethersProvider={ethersProvider}
                        />
                    </Web3OnboardProvider>
                </NextUIProvider>
            </NextThemesProvider>    
        </div>
    
        
    )
}

export default Home