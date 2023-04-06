import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';

import Onboard from '@web3-onboard/core';
import { ethers } from 'ethers';

import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import { Web3OnboardProvider, useConnectWallet } from '@web3-onboard/react';
import init from '@web3-onboard/core';

type ConnectWalletProps = {
    web3wallet: any[]
    web3chains: any
    web3appMetadata: any
}


export default function ConnectWallet(
    { web3wallet, web3chains, web3appMetadata }: ConnectWalletProps
) {
    

    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()
    
    // TODO - Have to fix error: "Cannot find name 'Account'"
    const [account, setAccount] = useState<Account | null>(null)
    const { name, avatar } = wallet?.accounts[0].ens ?? {}

    

    useEffect(() => {
        if (wallet?.provider) {
            const { name, avatar } = wallet?.accounts[0].ens ?? {}

            setAccount({
                address: wallet.accounts[0].address,
                balance: wallet.accounts[0].balance,
                ens: { name, avatar: avatar?.url }
            })
        }
    }, [wallet])
    
    useEffect(() => {
        // If the wallet has a provider than the wallet is connected
        if (wallet?.provider) {
        setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
    }, [wallet])

    if(wallet?.provider) {
        const handleDisconnect = async () => {
            await disconnect({ label: wallet.label})
        }
        return (
            
            
            // <div>Connected to {wallet.label}</div>
            <Button
                onPress={handleDisconnect}
            >
            Disconnect {wallet.accounts[0].address}
            </Button>
        )
    }

    const handleConnect = async () => {
        await connect();
    };

    return (
        <Button
            onPress={handleConnect}
        >
        Connect
        </Button>
    )
}