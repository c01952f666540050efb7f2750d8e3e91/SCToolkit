import { Grid } from '@nextui-org/react';


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