import { useState, useEffect } from 'react';
import { Grid, Input, Button } from '@nextui-org/react';

import { ethers } from 'ethers';

type sendERC20FormProps = {
    address: string | undefined;
    sendERC20: (contractAddress:string, spender:string, recipientAddress:string, amount:string) => Promise<void> | "";
    ethersProviders: ethers.providers.Web3Provider | null | undefined;
    getBalance: (address: string) => void;
};



const SendERC20Form:React.FC<sendERC20FormProps> = ({
    address,
    sendERC20,
    ethersProviders,
    getBalance,
}) => {
    const [spender, setSpender] = useState("");
    const [recipient, setRecipient] = useState("");
    const [contractAddress, setContractAddress] = useState("");
    const [amount, setAmount] = useState<string | undefined>(undefined);
    const [abi, setAbi] = useState<any>();
    const [balance, setBalance] = useState<string | undefined>(undefined);

    useEffect(() => {
        const getBalance = async () => {
            // Perform your balance retrieval logic here
            // For example, using ethers.js
            console.log(balance);
            const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
            const _balance = await provider.getBalance("0x00000e9458d07110844f5e51f39b8a7c2892ccdc"); // Replace `address` with the desired address
            console.log(_balance);
            setBalance(_balance.toString());
            
        }
        getBalance();
    }, [ethersProviders, address, balance]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // contractAddress:string, abi: string, spender:string, recipientAddress:string, amount:string
        if ((amount !== undefined) && (address !== undefined)) {
            
            // TODO - update this to import contract address from dropdown and abi is ERC20 always
            // Spender needs to be the from address and recipient sending to
            sendERC20(contractAddress, spender, recipient, amount);
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
            <h3>ERC20</h3><br/>
            {address || ''}<br />
            {balance || ''}
            <form onSubmit={handleSubmit}>
                <Grid.Container gap={1} justify="center">
                    <Grid xs={24}>
                            <Input
                                label={"Contract Address"}
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
        </>
    );
};

export default SendERC20Form;