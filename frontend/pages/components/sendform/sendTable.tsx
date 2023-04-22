import { Grid } from '@nextui-org/react';

import { ethers } from 'ethers';


type sendERC20FormProps = {
    address: string | undefined;
    setAddress: (address: string) => void;
    sendERC20: (contractAddress:string, abi: string, spender:string, recipientAddress:string, amount:string) => Promise<void>;
};

const SendTable:React.FC<sendERC20FormProps> = ({
    address,
    setAddress,
    sendERC20
}) => {
    // const [spender, setSpender] = useState("");
    // const [recipient, setRecipient] = useState("");
    // const [contractAddress, setContractAddress] = useState("");
    // const [amount, setAmount] = useState<string | undefined>(undefined);

    

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     console.log(address);
    //     console.log(amount);

        

    //     // contractAddress:string, abi: string, spender:string, recipientAddress:string, amount:string
    //     if ((amount !== undefined) && (address !== undefined)) {
            
    //         // TODO - update this to import contract address from dropdown and abi is ERC20 always
    //         // Spender needs to be the from address and recipient sending to
    //         sendERC20(contractAddress, "abi", spender, recipient, amount);
    //         console.log("function called");
    //     }
        
    //     setAmount(undefined);
    // };
    
    // const handleSpenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSpender(event.target.value);
    // };

    // const handleRecipientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRecipient(event.target.value);
    // };

    // const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setAmount(event.target.value);
    // };
    
    return (
        <>
            <Grid.Container gap={0} justify="flex-start">
                <Grid xs={24} sm={12} style={{ border: 'none', padding: 0 }}>
                    test1
                </Grid>
                <Grid xs={24} sm={12} style={{ border: 'none', padding: 0 }}>
                    test2
                </Grid>
            </Grid.Container>
        </>
    );
};

export default SendTable;