import { useState } from 'react';
import Image from 'next/image';
import React from 'react';

import { ethers } from 'ethers';
import { Button } from '@nextui-org/react';

interface LandingProps {
  address: string | undefined;
  ethersProviders: ethers.providers.Web3Provider | null | undefined;
  getBalance: (address: string) => void;
}

const Landing: React.FC<LandingProps> = ({
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
      <main>
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Image src="/../public/home_image.jpeg" alt="Home" width={300} height={168} />
        </div>
        <div style={{display:'inline', alignItems: 'center', width:'50%'}}>
          <br />
          <p style={{textAlign:'center'}}>
            <b>Please use this at your own risk, as this was mainly used as a testing platform for myself.</b> <br />
            The current address is: <br />
            <b>{address}</b>
          </p>
          <br />
          <b>Balance</b>
          <br />
          {balance}
          <br />
          <Button
            onPress={() => handleBalance()}
          >
            PRESS ME
          </Button>
        </div>
        
      </main>
    </>
  )
}

export default Landing;