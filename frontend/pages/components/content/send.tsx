import SendForm from "../sendform/sendform"

interface sendProps {
    address: string;
    setAddress: (address: string) => void;
}



const Send:React.FC<sendProps> = ({
    address,
    setAddress
}) => {

    return (
    <>
        <main>
            <h1>Send</h1>
            <SendForm 
                address={address}
                setAddress={setAddress}
            />
        </main>
    </>
    )
}

export default Send;