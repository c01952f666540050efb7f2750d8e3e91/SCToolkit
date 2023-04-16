import { useState } from 'react';
import { Grid, Input, Button } from '@nextui-org/react';

type sendERC20FormProps = {
    address: string | undefined;
    setAddress: (address: string) => void;
    sendERC20: (contractAddress:string, abi: string, spender:string, recipientAddress:string, amount:string) => Promise<void>;
};

const SendERC20Form:React.FC<sendERC20FormProps> = ({
    address,
    setAddress,
    sendERC20
}) => {
    const [spender, setSpender] = useState("");
    const [recipient, setRecipient] = useState("");
    const [contractAddress, setContractAddress] = useState("");
    const [amount, setAmount] = useState<string | undefined>(undefined);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(address);
        console.log(amount);

        // contractAddress:string, abi: string, spender:string, recipientAddress:string, amount:string
        if ((amount !== undefined) && (address !== undefined)) {
            // TODO - update this to import contract address from dropdown and abi is ERC20 always
            // Spender needs to be the from address and recipient sending to
            sendERC20(contractAddress, "abi", spender, recipient, amount);
        }
        
        setAmount(undefined);
    };
    
    const handleSpenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpender(event.target.value);
    };

    const handleRecipientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRecipient(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };
    
    return (
        <form onSubmit={handleSubmit}>
        <Grid.Container gap={1} justify="center">
            <Grid xs={24}>
                    <Input
                        label={"Contract Address" || {spender}}
                        placeholder="Enter contract address"
                        value={contractAddress || ''}
                        onChange={(event) => setContractAddress(event.target.value)}
                        required
                    /> 
            </Grid>
            <Grid xs={24}>
                <Input
                    label="Spender"
                    placeholder="Enter spender's address"
                    value={spender || ''}
                    onChange={(event) => setSpender(event.target.value)}
                    required
                />
            </Grid>
            <Grid xs={24}>
                <Input
                    label="Recipient"
                    placeholder="Enter recipient's address"
                    value={recipient || ''}
                    onChange={(event) => setRecipient(event.target.value)}
                    required
                />
            </Grid>
            <Grid xs={24}>
                <Input
                    type="number"
                    label="Amount"
                    placeholder="Enter amount to send"
                    value={amount || ''}
                    onChange={(event) => setAmount(event.target.value)}
                    required
                />
            </Grid>
            <Grid xs={24}>
            <Button type="submit" color="primary" auto>
                Send
            </Button>
            </Grid>
        </Grid.Container>
    </form>
    );
};

export default SendERC20Form;