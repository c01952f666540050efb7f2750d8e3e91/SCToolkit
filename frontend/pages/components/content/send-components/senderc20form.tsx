import { useState, useEffect } from 'react';
import { Grid, Input, Button } from '@nextui-org/react';

import { ethers } from 'ethers';
import IERC20ABI from './abis/IERC20.json';

type sendERC20FormProps = {
    address: string | undefined;
    ethersProvider: ethers.providers.Web3Provider | null | undefined;
};




const SendERC20Form:React.FC<sendERC20FormProps> = ({
    address,
    ethersProvider
}) => {
    const [spender, setSpender] = useState("");
    const [recipient, setRecipient] = useState("");
    const [contractAddress, setContractAddress] = useState("");
    const [amount, setAmount] = useState<string | undefined>(undefined);
    const [abi, setAbi] = useState<any>();
    const [balance, setBalance] = useState<string | undefined>(undefined);

    useEffect(() => {
        const getBalance = async () => {
            if (address && ethersProvider) {
            const _balance: ethers.BigNumber = await ethersProvider.getBalance(address);
            if (_balance) {
                const formattedBalance = ethers.utils.formatEther(_balance);
                setBalance(formattedBalance.toString());
            } else {
                setBalance("");
            }
            } else {
            setBalance("");
            }
        };
        getBalance();
    }, [ethersProvider, address]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // contractAddress:string, abi: string, spender:string, recipientAddress:string, amount:string
        if ((amount !== undefined) && (address !== undefined) && (ethersProvider)) {

            try {
                if (ethersProvider?.provider) {
                    const signer = ethersProvider.getSigner(address);
                    
                    const contract = new ethers.Contract(contractAddress, IERC20ABI, signer);
                    const currentBalance = await contract.balanceOf(address);
                    console.log(currentBalance);
                    // const data = contract.interface.encodeFunctionData("transfer", [recipient, amount]);
                    
                    // const currentAllowance = await contract.allowance(address, recipient);
                    
                    // const transaction = await contract.transfer(recipient, 100);
                    // console.log(transaction);
                    // Waiting for the transaction to be mined
                    
                    // console.log("TransferFrom transaction hash:", tx0.hash);
    
                    // TODO - Adjust amount to be based on decimals
                    // const tx1 = await contract.transfer(recipientAddress, amount);
                    // await tx1.wait();
                    
                    // console.log("TransferFrom transaction hash:", tx1.hash);
                    
                }
                } catch (error) {
                    console.error("Error:", error);
            }
            // const _balance: ethers.BigNumber = await ethersProvider.getBalance(address);
            // // Create a wallet instance from the private key
            // const erc20Contract = new ethers.Contract(contractAddress, IERC20ABI, ethersProvider);
            // // const wallet = new ethers.Wallet(privateKey, ethersProvider);
            // // const tx0 = erc20Contract.transferFrom(spender, recipient, "100000");
            // // Get the decimal places of the token
            // let balance = await erc20Contract.functions.balanceOf("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
            // console.log(balance);
            // Calculate the token amount with the appropriate decimal places
            // const tokenAmount = ethers.utils.parseUnits('100', decimals); // Sending 100 tokens

            // Send the ERC20 token to the recipient address
            // const transaction = await tokenContract.transfer(recipient, tokenAmount);

            // console.log('Transaction hash:', transaction.hash);
            // if (_balance) {
            //     const formattedBalance = ethers.utils.formatEther(_balance);
            //     setBalance(formattedBalance.toString());
            // } else {
            //     setBalance("");
            // }
            // } else {
            // setBalance("");
        }
        
        setAmount("");
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
            <b>Address: </b>{address || ''}<br />
            <b>Ether Balance</b>: {balance || ''}
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
                <Grid.Container gap={1}>

                </Grid.Container>
            </form>
        </>
    );
};

export default SendERC20Form;