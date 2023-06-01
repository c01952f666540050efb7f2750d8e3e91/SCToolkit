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
          Ledger specific
          
        </div>
    </>
  )
}

export default Ledger;