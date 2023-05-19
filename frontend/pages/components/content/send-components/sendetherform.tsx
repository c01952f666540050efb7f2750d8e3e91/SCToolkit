import { useState } from 'react';
import { Grid, Input, Button } from '@nextui-org/react';

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
        
        console.log("SENDING FROM:");
        console.log(address);
        
        if ((amount !== undefined) && (recipient !== undefined)) {
            sendEther(recipient, amount);
        }
        
        setAmount(undefined);
    };
    
    return (
        <Grid.Container>
            <Grid>
                <form onSubmit={handleSubmit}>
                    <Grid.Container gap={2}>
                        <Grid>
                            <h3>Ether</h3><br />
                            Current Address: <br />
                            {address}
                        </Grid>
                    </Grid.Container>
                    <Grid.Container gap={2} justify="center">
                        <Grid xs={24}>
                            <Input
                                label="Address"
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
            </Grid>
            <Grid>
                <Grid.Container>
                    <Grid>
                        <h3>Balances</h3><br />
                    </Grid>
                </Grid.Container>
                <Grid.Container>
                    <Grid>
                        123
                    </Grid>
                </Grid.Container>
            </Grid>
            
        </Grid.Container>
    );
};

export default SendEtherForm;