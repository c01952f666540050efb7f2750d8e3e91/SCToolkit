import { useState } from 'react';
import { Grid, Input, Button } from '@nextui-org/react';

import { ethers } from 'ethers';

type sendTransactionFormProps = {
    address: string | undefined;
    ethersProvider: ethers.providers.Web3Provider | null | undefined;
};

const sendTransactionForm:React.FC<sendTransactionFormProps> = ({
    address,
    ethersProvider
}) => {
    
    

    return (
        <>
            <h3>Send</h3><br/>
            
        </>
    );
};

export default sendTransactionForm;