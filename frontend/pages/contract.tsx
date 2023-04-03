import { useEffect, useState } from 'react';
import Head from 'next/head'
import TopNavbar from './components/navbar/navbar';
import ConnectWallet from './components/navbar/connectwallet/ConnectWallet';
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'


export default function Contract() {

    const [walletConnected, setWalletConnected] = useState(false);

    
    const MAINNET_RPC_URL = 'https://rpc.payload.de'
    const injected = injectedModule()

    const client = createPublicClient({
        chain: mainnet,
        transport: http('https://rpc.payload.de​')
    })

    const unwatch = client.watchBlockNumber( 
        { onBlockNumber: blockNumber => console.log(blockNumber) }
    )
    

    const onboard = Onboard({
        wallets: [injected],
        chains: [
        {
            id: '0x1',
            token: 'ETH',
            label: 'Ethereum Mainnet',
            rpcUrl: MAINNET_RPC_URL
        }
        ]
    })


    useEffect(() => {
        // perform asynchronous operation here
        // update walletConnected state based on the result
        
        setWalletConnected(true);
        
    }, []);


    return (
    <>
        <Head>
            <title>Receive</title>
        </Head>
        <main>
            
            <ConnectWallet label="connect wallet" />
        </main>
    </>
    )
}
