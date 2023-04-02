import Head from 'next/head'
import TopNavbar from './components/navbar/navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Staking</title>
      </Head>
      <main>
        <TopNavbar />
      </main>
    </>
  )
}
