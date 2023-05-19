import { useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';

import { ethers } from 'ethers';
import { Button } from '@nextui-org/react';

interface LandingProps {
  address: string | undefined;
  ethersProvider: ethers.providers.Web3Provider | null | undefined;
}

const Landing: React.FC<LandingProps> = ({
  address,
  ethersProvider
}) => {
  const [balance, setBalance] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    const getBalance = async () => {
      if (address && ethersProvider) {
        const _balance: ethers.BigNumber = await ethersProvider.getBalance(address);
        if (_balance) {
          const formattedBalance = ethers.utils.formatEther(_balance);
          setBalance(formattedBalance.toString());
        } else {
          setBalance("");
        }
      } else {
        setBalance("");
      }
    };

    getBalance();
    }, [ethersProvider, address]);
  
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
            <br />
            <b>Balance</b>
            <br />
            {balance} Ether
            <br />
            
          </p>
          
        </div>
        
      </main>
    </>
  )
}

export default Landing;