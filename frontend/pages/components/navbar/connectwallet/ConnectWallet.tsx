import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useConnectWallet } from '@web3-onboard/react';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { ethers } from 'ethers';
// import { ether } from 'viem';

// const client = createPublicClient({
//     chain: mainnet,
//     transport: http(),
//   });
  
  // 3. Consume an action!



export default function ConnectWallet() {
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    // const [w3client, setW3Client] = useState<typeof createPublicClient | null>()
    const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()
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
      // if using ethers v6 this is:
        //  ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    }
    }, [wallet])
    if(wallet?.provider) {
        const handleDisconnect = async () => {
            await disconnect({ label: wallet.label})
        }
        return (
            
            // <div>Connected to {wallet.label}</div>
            <Button
                onClick={handleDisconnect}
            >
            Disconnect
            </Button>
        )
    }

    const handleConnect = async () => {
        await connect();
    };

    

    return (
        <Button
            onClick={handleConnect}
        >
        Connect
        </Button>
    )
}