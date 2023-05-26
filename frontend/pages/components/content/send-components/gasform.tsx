import { useState, useEffect } from 'react';
import { Grid, Input, Button } from '@nextui-org/react';

import { ethers } from 'ethers';
import setChain from '@web3-onboard/core/dist/chain';

type gasFormProps = {
    address: string | undefined;
    ethersProvider: ethers.providers.Web3Provider | null | undefined;
};




const GasForm:React.FC<gasFormProps> = ({
    address,
    ethersProvider
}) => {
    const [chainID, setChainID] = useState("");

    useEffect(() => {
        const checkChainID = async () => {
        if (ethersProvider) {
            const network = await ethersProvider.getNetwork();
            console.log('Chain ID:', network.chainId);
            setChainID(network.chainId.toString());
            // You can perform additional actions based on the chain ID here
        }
        };
    
        checkChainID();
    }, [ethersProvider]);
    
    return (
        <>
            <h3>Gas</h3><br/>
            <Grid.Container gap={1} justify="center">
                {address} / {chainID}
            </Grid.Container>
        </>
    );
};

export default GasForm;