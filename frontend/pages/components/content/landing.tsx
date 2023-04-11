import Head from 'next/head'
import Image from 'next/image';
import React from 'react';

interface LandingProps {
  address: string
}

const testLand = () => {

}

const Landing: React.FC<LandingProps> = ({
  address
}) => {
  return (
    <>
      <Head>
        <title>Staking</title>
      </Head>
      <main>
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Image src="/../public/home_image.jpeg" alt="Home" width={300} height={168} />
        </div>
        <br />
        <div style={{display:'inline', alignItems: 'center', width:'50%'}}>
          <p style={{textAlign:'center'}}>
            With this tool, you can easily manage and organize your cryptocurrency addresses across multiple derivation paths. Whether you are using a hardware wallet or software wallet, this tool allows you to easily send and receive transactions from any of your addresses. Additionally, you can deploy and interact with smart contracts on various blockchain networks, giving you greater flexibility and control over your digital assets. So whether you are an experienced cryptocurrency user or just starting out, this tool has everything you need to manage and interact with your addresses and contracts in a simple and user-friendly interface.
          </p>
          <br />
          <p style={{textAlign:'center'}}>
            <b>Please use this at your own risk, as this was mainly used as a testing platform for myself.</b>
          </p>
          <br />
          <p>
            The current address is: <br />
            <b>{address}</b>
          </p>
        </div>
        
      </main>
    </>
  )
}

export default Landing;