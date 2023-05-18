import { useState } from 'react';
import { Grid, Input, Button } from '@nextui-org/react';

import sendDropdown from './dropdown';

type sendFormProps = {
    address: string | undefined;
    sendEther: (address: string, amount: string) => Promise<void>;
};

const SendEtherForm:React.FC<sendFormProps> = ({
    address,
    sendEther
}) => {
    const [recipient, setRecipient] = useState<string | undefined>(undefined);
    const [amount, setAmount] = useState<string | undefined>(undefined);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(address);
        console.log(amount);
        if ((amount !== undefined) && (recipient !== undefined)) {
            sendEther(recipient, amount);
        }
        
        setAmount(undefined);
    };
    
    return (
        <form onSubmit={handleSubmit}>
        <Grid.Container>
            <Grid>
                <h3>ERC20</h3><br />
            </Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
            <Grid xs={24}>
                <Input
                    label="Address"
                    placeholder="Enter recipient's address"
                    value={recipient || ''}
                    onChange={(event) => setRecipient(event.target.value)}
                    
                />
            </Grid>
            <Grid xs={24}>
                <Input
                    type="number"
                    label="Amount"
                    placeholder="Enter amount to send"
                    value={amount || ''}
                    onChange={(event) => setAmount(event.target.value)}
                    // required
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

export default SendEtherForm;