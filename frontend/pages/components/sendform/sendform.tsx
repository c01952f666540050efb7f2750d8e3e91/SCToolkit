import { useState } from 'react';
import { Grid, Input, Button } from '@nextui-org/react';

type sendFormProps = {
    address: string;
    setAddress: (address: string) => void;
};

const SendForm:React.FC<sendFormProps> = ({
    address,
    setAddress
}) => {
    
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        setAmount(undefined);
    };
    
    return (
        <form onSubmit={handleSubmit}>
        <Grid.Container gap={2} justify="center">
            <Grid xs={24}>
            <Input
                label="Address"
                placeholder="Enter recipient's address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
            />
            </Grid>
            <Grid xs={24}>
            <Input
                type="number"
                label="Amount"
                placeholder="Enter amount to send"
                value={amount || ''}
                onChange={(event) => setAmount(Number(event.target.value))}
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

export default SendForm;