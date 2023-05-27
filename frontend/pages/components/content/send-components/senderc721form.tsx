import { useState } from 'react';
import { Grid, Input, Button } from '@nextui-org/react';

import { ethers } from 'ethers';

import ERC721ABI from './abis/IERC721.json';

type sendERC721FormProps = {
    address: string | undefined;
    ethersProvider: ethers.providers.Web3Provider | null | undefined;
    
};

const SendERC721Form:React.FC<sendERC721FormProps> = ({
    address,
    ethersProvider
}) => {
    const [spender, setSpender] = useState("");
    const [recipient, setRecipient] = useState("");
    const [contractAddress, setContractAddress] = useState("");
    const [amount, setAmount] = useState<string | undefined>(undefined);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // contractAddress:string, abi: string, spender:string, recipientAddress:string, amount:string
        if ((amount !== undefined) && (address !== undefined)) {
            console.log("function called");
            if (ethersProvider) {
                const signer = ethersProvider.getSigner(address);
                const erc721Contract = new ethers.Contract(contractAddress, ERC721ABI, signer);
                
                const tx = await erc721Contract.transferFrom(
                    spender,
                    recipient,
                    ethers.utils.formatUnits(amount, 'wei')
                )
            }
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
        <>  
            <Grid.Container gap={1}>
                <Grid>
                    <form onSubmit={handleSubmit}>
                        <h3>ERC721</h3>
                        <Grid.Container gap={1} justify="flex-start">
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
                </Grid>
                <Grid>
                    test2
                </Grid>
            </Grid.Container>
            <Grid.Container>
                test
            </Grid.Container>
        </>
    );
};

export default SendERC721Form;