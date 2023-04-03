import { useEffect } from 'react'
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'



export default async function ConnectWallet() {

    const MAINNET_RPC_URL = 'https://rpc.payload.de'
    const injected = injectedModule()

    const client = createPublicClient({
        chain: mainnet,
        transport: http('https://rpc.payload.de​')
    })


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

    const wallets = await onboard.connectWallet()
    console.log(wallets)
    
    return (
        <div>
            <button
            >
                Connect
            </button>
        </div>
    )
}