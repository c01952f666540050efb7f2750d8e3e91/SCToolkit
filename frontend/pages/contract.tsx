import { useEffect, useState } from 'react';
import Head from 'next/head'
import ConnectWallet from './components/navbar/connectwallet/ConnectWallet';


export default function Contract() {


    return (
    <>
        <Head>
            <title>Receive</title>
        </Head>
        <main>
            
            <ConnectWallet />
        </main>
    </>
    )
}
