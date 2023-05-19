import { useState } from 'react';
import Image from 'next/image';
import React from 'react';

import { ethers } from 'ethers';
import { Button } from '@nextui-org/react';

interface ConnectionProps {
  address: string | undefined;
  ethersProviders: ethers.providers.Web3Provider | null | undefined;
  getBalance: (address: string) => void;
}

const Connection: React.FC<ConnectionProps> = ({
    address,
    ethersProviders,
    getBalance
}) => {
  const [balance, setBalance] = useState("");

  async function handleBalance() {
    if (ethersProviders == undefined) {
      console.log("UNDEFINED");
    }
    if (address !== undefined) {
      const _balance = await ethersProviders?.getBalance(
        address
      );
      let number = ethers.BigNumber.from(_balance).toBigInt().toString();
      setBalance(ethers.utils.formatEther(number).toString());
    }
  };


  return (
    <>
        <div>
            <Button
                onPress={() => handleBalance()}
            >
                PRESS ME
            </Button>
        </div>
    </>
  )
}

export default Connection;