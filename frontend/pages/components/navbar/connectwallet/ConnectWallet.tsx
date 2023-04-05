import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useConnectWallet } from '@web3-onboard/react';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { ethers } from 'ethers';
// import { ether } from 'viem';


export default function ConnectWallet() {
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()
    // const [account, setAccount] = useState<ethers.Wallet | null>(null);
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