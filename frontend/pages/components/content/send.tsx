import SendForm from "../sendform/sendform"

interface sendProps {
    address: string;
    setAddress: (address: string) => void;
    sendEther: (address: string, amount: string) => Promise<void>;
}



const Send:React.FC<sendProps> = ({
    address,
    setAddress,
    sendEther
}) => {

    return (
    <>
        <main>
            <h1>Send</h1>
            <SendForm 
                address={address}
                setAddress={setAddress}
                sendEther={sendEther}
            />
        </main>
    </>
    )
}

export default Send;