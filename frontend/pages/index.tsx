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
import IERC20ABI from './components/sendform/abis/IERC20.json';
import IERC721ABI from './components/sendform/abis/IERC721.json';
import IERC1155ABI from './components/sendform/abis/IERC1155.json';
// import ERC721ABI from '../../abi/IERC721.json';
// import ERC1155ABI from '../../abi/IERC1155.json';

// Dotenv - TODO
// import dotenv from 'dotenv';
// dotenv.config();

// Modules
const injected = injectedModule()
const ledger = ledgerModule()
const walletConnect = walletConnectModule()

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
    const [networkIndex, setNetworkIndex] = useState(0)
    const connectedWallets = useWallets()

    useEffect(() => {
        // If the wallet has a provider than the wallet is connected
        
        if (wallet?.provider) {
            setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
            // setChain(chains[2])
            console.log(connectedChain?.namespace);
            
            wallet.chains[0]
            console.log(connectedChain?.id);
        // if using ethers v6 this is:
        // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
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

    async function handleNetwork(chainID: string) {
        console.log(chainID);
        if (connectedChain?.id) {

            const success = await setChain({
                chainId: "0x539", // hex encoded string
                // chainNamespace: 'evm', // defaults to 'evm' (currently the only valid value, but will add more in future updates)
                // wallet: "Sepolia" // the wallet.label of the wallet to set chain
                // rpcUrl: "string", // if chain was instantiated without rpcUrl, include here. Used for network requests
                // token: "ETH", // if chain was instantiated without token, include here. Used for display, eg Ethereum Mainnet
                // label: "SplETH", // if chain was instantiated without label, include here. The native token symbol, eg ETH, BNB, MATIC
            })

            console.log(success);
        }
    }
    // ------------------------------

    // Navbar
    const [currentPage, setPage] = useState("Home");
    
    // set the page
    function handleMenu(newPage: string) {
        setPage(newPage);
        
    }

    // Account details
    const [address, setAddress] = useState("test");

    const sendEther = async (recipientAddress:string, amount:string) => {
        try {
            if (ethersProvider?.provider) {
                
                const signer = ethersProvider.getSigner();
                
                // Test Print
                console.log("SENDING TO: ");
                console.log(recipientAddress);
                console.log("SENDING AMOUNT:");
                console.log(amount);

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

    const sendERC20 = async (contractAddress:string, spender:string, recipientAddress:string, amount:string) => {
        try {
            if (ethersProvider?.provider) {
                const signer = ethersProvider.getSigner();
                const contract = new ethers.Contract(contractAddress, IERC20ABI, signer);
                const data = contract.interface.encodeFunctionData("transfer", [recipientAddress, amount] )

                const tx0 = await contract.allowance({
                    to: contractAddress,
                    from: signer._address,
                    value: ethers.utils.parseUnits(amount, 'ether'),
                    data: data
                })
                console.log(tx0);
                
                // console.log("TransferFrom transaction hash:", tx0.hash);

                // TODO - Adjust amount to be based on decimals
                const tx1 = await contract.transfer(recipientAddress, amount);
                await tx1.wait();
                
                console.log("TransferFrom transaction hash:", tx1.hash);
                
            }
            } catch (error) {
                console.error("Error:", error);
        }
    };
    
    const sendERC721 = async (contractAddress:string, spender:string, recipientAddress:string, amount:string) => {
        try {
            if (ethersProvider?.provider) {
                const signer = ethersProvider.getSigner();
                
                const contract = new ethers.Contract(contractAddress, IERC721ABI, signer);
                // const tx0 = await contract.allowance(recipientAddress, spender);
                // await tx0.wait();
                // console.log("TransferFrom transaction hash:", tx0.hash);

                // TODO - Adjust amount to be based on decimals
                const tx1 = await contract.transfer(recipientAddress, amount);
                await tx1.wait();
                
                console.log("TransferFrom transaction hash:", tx1.hash);
                
            }
            } catch (error) {
                console.error("Error:", error);
        }
    };

    const sendERC1155 = async (contractAddress:string, spender:string, recipientAddress:string, amount:string) => {
        try {
            if (ethersProvider?.provider) {
                const signer = ethersProvider.getSigner();
                
                const contract = new ethers.Contract(contractAddress, IERC1155ABI, signer);
                // const tx0 = await contract.allowance(recipientAddress, spender);
                // await tx0.wait();
                // console.log("TransferFrom transaction hash:", tx0.hash);

                // TODO - Adjust amount to be based on decimals
                const tx1 = await contract.transfer(recipientAddress, amount);
                await tx1.wait();
                
                console.log("TransferFrom transaction hash:", tx1.hash);
                
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
                            handleNetwork={handleNetwork}
                        />
                        <Content
                            currentPage={currentPage}
                            address={wallet?.accounts[0].address}
                            setAddress={setAddress}
                            sendEther={sendEther}
                            sendERC20={sendERC20}
                            sendERC721={sendERC721}
                        />
                    </Web3OnboardProvider>
                </NextUIProvider>
            </NextThemesProvider>    
        </div>
    
        
    )
}

export default Home