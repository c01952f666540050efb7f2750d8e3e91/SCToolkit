import Head from 'next/head'
import TopNavbar from './components/navbar/navbar';
import SendForm from './components/sendform/sendform';



type SendFormProps = {
    onSubmit: (data: { address: string; amount: number }) => void;
};

export default function Send() {

    const handleSubmit: SendFormProps['onSubmit'] = (data) => {
        console.log(data);
      };

    return (
    <>
        <Head>
            <title>Receive</title>
        </Head>
        <main>
            <TopNavbar />
            <SendForm onSubmit={handleSubmit}/>
        </main>
    </>
    )
}
