import Head from 'next/head'
import Image from 'next/image';
import React from 'react';



interface LandingProps {
  address: string | undefined;
}

const Landing: React.FC<LandingProps> = ({
  address
}) => {
  return (
    <>
      <main>w
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
          
        </div>
        
      </main>
    </>
  )
}

export default Landing;