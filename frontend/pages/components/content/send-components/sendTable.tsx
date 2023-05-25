import { Grid } from '@nextui-org/react';
import SendEtherForm from './sendetherform';
import SendERC20Form from './senderc20form';
import SendERC721Form from './senderc721form';
import SendERC1155Form from './senderc1155form';

type sendTableFormProps = {
    address: string | undefined;
    // ethersProvider: 
};

const SendTable:React.FC<sendTableFormProps> = ({
    address,
    // setAddress
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