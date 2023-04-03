import Head from 'next/head'
import TopNavbar from './components/navbar/navbar';
import ConnectWallet from './components/navbar/connectwallet/ConnectWallet';

export default function Contract() {
    return (
    <>
        <Head>
            <title>Receive</title>
        </Head>
        <main>
            <TopNavbar />
            <ConnectWallet />
        </main>
    </>
    )
}
