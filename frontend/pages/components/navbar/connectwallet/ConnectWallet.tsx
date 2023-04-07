import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';

import Onboard from '@web3-onboard/core';

// Web3 onboard
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import { Web3OnboardProvider, useConnectWallet } from '@web3-onboard/react';
import init from '@web3-onboard/core';

import { ethers } from 'ethers';
const injected = injectedModule()
const ledger = ledgerModule()
const walletConnect = walletConnectModule()




export default function ConnectWallet(
    
) {

    return (
        <Button
            // onPress={handleConnect}
        >
        Connect
        </Button>
    )
}