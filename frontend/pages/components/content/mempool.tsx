import { useState } from 'react';
import Image from 'next/image';
import React from 'react';

import { ethers } from 'ethers';
import { Button } from '@nextui-org/react';

import BlocknativeSdk from 'bnc-sdk';

interface BlocknativeOptions {
    dappId: string;
    networkId: number;
    system?: string; // optional, defaults to ethereum
    transactionHandlers: Array<(event: any) => void>; 
    ws?: typeof WebSocket; // only necessary in server environments 
    name?: string; // optional, use when running multiple instances
    onerror?: (error: any) => void; // optional, use to catch errors
  }
  


interface MempoolProps {
  address: string | undefined;
  ethersProviders: ethers.providers.Web3Provider | null | undefined;
}

const Mempool: React.FC<MempoolProps> = ({
    address,
    ethersProviders
}) => {
      // create options object
    const options: BlocknativeOptions = {
        dappId: 'Your dappId here',
        networkId: 1,
        system: 'bitcoin', 
        transactionHandlers: [event => console.log(event.transaction)],
        ws: WebSocket,
        name: 'Instance name here', 
        onerror: (error) => {console.log(error)}
    }

//   const blocknative = new BlocknativeSdk(options);

  return (
    <>
        <div>
          Mempool
            
        </div>
    </>
  )
}

export default Mempool;