import { useState, useEffect } from 'react';
import { Grid, Input, Button } from '@nextui-org/react';

import { ethers } from 'ethers';
import IERC20ABI from './abis/IERC20.json';
import { symbolName } from 'typescript';

type sendERC20FormProps = {
    address: string | undefined;
    ethersProvider: ethers.providers.Web3Provider | null | undefined;
};

type TokenMetadata = {
    decimals: Number,
    symbol: symbol
}


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
    const [tokenDecimals, setTokenDecimals] = useState<number | undefined>(undefined);
    const [tokenSymbol, setTokenSymbol] = useState<string | undefined>(undefined);
    const [searchContract, setSearchContract] = useState("");
    const [searchedTokenMetadata, setSearchedTokenMetadata] = useState<TokenMetadata | null>(null);

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

        if (amount !== undefined && address !== undefined && ethersProvider) {
            try {
            const signer = ethersProvider.getSigner(address);
            const contract = new ethers.Contract(contractAddress, IERC20ABI, signer);
    
            // Check the account's token balance
            const currentBalance = await contract.balanceOf(address);
            const tokenAmount = ethers.utils.parseUnits(amount, 8);
            
            if (currentBalance.gte(tokenAmount)) {
                const transaction = await contract.transfer(recipient, tokenAmount);
                console.log(transaction);
                // Waiting for the transaction to be mined
            } else {
                console.log("Insufficient balance");
            }
            } catch (error) {
            console.error("Error:", error);
            }
        }
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
                    <h3>ERC20</h3><br/>
                    <b>Address: </b>{address || ''}<br />
                    <b>Ether Balance</b>: {balance || ''}
                    <Grid.Container gap={1}>
                        <form onSubmit={handleSubmit}>
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
                        </form>
                    </Grid.Container>
                </Grid>
                <Grid>
                    <Grid.Container>
                        <h3>Search Tokens</h3><br />
                    </Grid.Container>
                    <Grid.Container>
                        <Input 
                                type="search"
                                label="token contract"
                                placeholder="enter contract only"
                                value={searchContract || ''}
                                onChange={(event) => setSearchContract(event.target.value)}
                            />
                    </Grid.Container>
                    <Grid.Container>
                        <Grid>Symbol: {String(searchedTokenMetadata?.symbol) || ""}</Grid>
                    </Grid.Container>
                    <Grid.Container>
                        <Grid>Decimals: {String(searchedTokenMetadata?.decimals) || ""}</Grid>
                    </Grid.Container>
                </Grid>
            </Grid.Container>
        </>
    );
};

export default SendERC20Form;