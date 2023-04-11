import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';

import Onboard from '@web3-onboard/core';

// Web3 onboard
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import { Web3OnboardProvider, useConnectWallet } from '@web3-onboard/react';
import init, { WalletState } from '@web3-onboard/core';

import { ethers } from 'ethers';

interface ConnectWalletProps {
    wallet: WalletState | null
    handleConnect: () => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({
    wallet,
    handleConnect
}) => {
    // useEffect(() => {
    //     // If the wallet has a provider than the wallet is connected
    //     if (wallet?.provider) {
    //       setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    //     // if using ethers v6 this is:
    //     // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    //     }
    // }, [wallet])
    // useEffect(() => {
    //     // If the wallet has a provider than the wallet is connected
    //     if (wallet.provider) {
    //       setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    //     // if using ethers v6 this is:
    //     // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    //     }
    //   }, [wallet])

    // useEffect(() => {
    // // If the wallet has a provider than the wallet is connected
    // if (wallet?.provider) {
    //     setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    //     // if using ethers v6 this is:
    //     // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    // }
    // }, [wallet])    

    // if(wallet?.provider) {
    //     return (
    //         <>
    //             <div>
    //                 <div>{ ens?.name ? ens.name : address }</div>
    //                 <div>Connected to {wallet.label}</div>
    //                 <button 
    //                     onClick={() => { disconnect({ label: wallet.label }) }
    //                 >
    //                     Disconnect
    //                 </button>
    //             </div>
    //         </>
    //     )
    // }

    return (
        <Button
            onPress={handleConnect}
        >
            Connect
        </Button>
    )

    
}

export default ConnectWallet;