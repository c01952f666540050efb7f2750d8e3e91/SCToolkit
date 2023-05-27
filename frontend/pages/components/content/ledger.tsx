import { useState } from 'react';
import Image from 'next/image';
import React from 'react';

import { ethers } from 'ethers';
import { Button } from '@nextui-org/react';

interface LedgerProps {
  address: string | undefined;
  ethersProviders: ethers.providers.Web3Provider | null | undefined;
}

const Ledger: React.FC<LedgerProps> = ({
    address,
    ethersProviders
}) => {


  return (
    <>
        <div>
            <iframe src="https://live.ledger.tools/" width={1200} height={800}>

            </iframe>
        </div>
    </>
  )
}

export default Ledger;