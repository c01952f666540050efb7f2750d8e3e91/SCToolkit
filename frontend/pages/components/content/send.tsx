import Head from 'next/head'
import TopNavbar from '../navbar/navbar';
import SendForm from '../sendform/sendform';

type SendFormProps = {
    onSubmit: (data: { address: string; amount: number }) => void;
};

export default function Send(address: string) {

    const handleSubmit: SendFormProps['onSubmit'] = (data) => {
        console.log(data);
    };

    return (
    <>
        <Head>
            <title>Receive</title>
        </Head>
        <main>
            <p>{address}</p>
            <SendForm onSubmit={handleSubmit}/>
        </main>
    </>
    )
}
