import { useState, useEffect, useCallback } from 'react';
import { Grid, Input, Button, Dropdown } from '@nextui-org/react';
import { ethers } from 'ethers';

type sendFormProps = {
    address: string | undefined;
    ethersProvider: ethers.providers.Web3Provider | null | undefined;
};

const SendEtherForm:React.FC<sendFormProps> = ({
    address,
    ethersProvider
}) => {
    const [recipient, setRecipient] = useState<string | undefined>(undefined);
    const [amount, setAmount] = useState<string | undefined>(undefined);
    const [blockscanAddress, setBlockscanAddress] = useState('');
    const [balanceList, setBalanceList] = useState<string[]>([]);
    const [newAddress, setNewAddress] = useState("");
    const [addresses, setAddresses] = useState<string[]>([
        "0x00000E9458d07110844F5E51F39b8A7C2892ccdC",
        "0x777fDB494d0825669Bb50f5B1e075E18e671F8A7",
        "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
        "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
        "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
        "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
        "0x976ea74026e726554db657fa54763abd0c3a0aa9",
        "0x14dc79964da2c08b23698b3d3cc7ca32193d9955",
        "0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f",
        "0xa0ee7a142d267c1f36714e4a8f75612f20a79720"
    ]);
    const balances: string[] = [];

    const handleAddAddress = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newAddress.trim() !== "") {
            setAddresses((prevAddresses) => [...prevAddresses, newAddress.trim()]);
            setNewAddress("");
        }
    };

    const sendEther = async (recipientAddress:string, amount:string) => {
        try {
            if (ethersProvider?.provider) {
                
                const signer = ethersProvider.getSigner();
                
                // Test Print
                console.log("SENDING TO: ");
                console.log(recipientAddress);
                console.log("SENDING AMOUNT:");
                console.log(amount);

                const transaction = await signer.sendTransaction({
                    to: recipientAddress,
                    value: ethers.utils.parseEther(amount),
                });
                
                console.log("Transaction hash:", transaction.hash);
            }
            
            } catch (error) {
                console.error("Error:", error);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        console.log("SENDING FROM:");
        console.log(address);
        
        if ((amount !== undefined) && (recipient !== undefined)) {
            sendEther(recipient, amount);
        }
        
        setAmount(undefined);
    };

    async function getBalance(address:string) {
        if (ethersProvider?.provider) {
            const balance = await ethersProvider?.getBalance(
                address
            )
            return balance
        }
        // let result = ethers.utils.formatEther(balance.toBigInt());
    }

    async function handleRefreshAll() {
        for (const _address of addresses) {
            const _balance = await getBalance(_address);
            if (_balance !== undefined) {
                balances.push(ethers.utils.formatEther(_balance).toString());
            }
        }
        console.log(balances);
        setBalanceList(balances);
    }
    const handleBlockscan = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (blockscanAddress) {
            const blockscanUrl = `https://blockscan.com/address/${blockscanAddress}`;
            window.open(blockscanUrl, '_blank');
        }
    };

    return (
        <Grid>
            <Grid.Container >
            <Grid>
                <form onSubmit={handleSubmit}>
                <Grid.Container gap={2}>
                    <Grid>
                    <h3>Ether / Coin</h3><br />
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
                <Grid.Container gap={0.5}>
                <Grid>
                    <h3>Balances</h3>
                </Grid>
                <Grid>
                    <Button size="sm" onPress={() => handleRefreshAll()}>Refresh All</Button>
                </Grid>
                </Grid.Container>
                {addresses.map((_address, index) => (
                <Grid.Container key={index} gap={0.5}>
                    <Grid>
                    {index} - <Input readOnly initialValue={_address} width="335px"/>
                    </Grid>
                    <Grid>
                    {balanceList[index]}
                    </Grid>
                </Grid.Container>
                ))}
            </Grid>
            <Grid>
                <Grid.Container gap={0.5}>
                    <Grid>
                        <h3>Block explorer</h3>
                    </Grid>
                    
                </Grid.Container>
                <Grid.Container>
                    <form onSubmit={handleBlockscan}>
                        <Grid>
                            <Input
                            placeholder="Blockscan"
                            width="335px"
                            value={blockscanAddress || ""}
                            onChange={(event) => setBlockscanAddress(event.target.value)}
                            />
                        </Grid>
                    </form>
                </Grid.Container>
                <Grid.Container>
                    <Grid>
                        <Dropdown>
                            <Dropdown.Button
                                
                            >Select Explorer Below</Dropdown.Button>
                            <Dropdown.Menu>
                                <Dropdown.Item key="etherscan">Etherscan</Dropdown.Item>
                                <Dropdown.Item key="bscscan">BSCScan</Dropdown.Item>
                                <Dropdown.Item key="arbiscan">Arbiscan</Dropdown.Item>
                                <Dropdown.Item key="optimisticetherscan">Optimistic Etherscan</Dropdown.Item>
                                <Dropdown.Item key="polygonscan">PolygonScan</Dropdown.Item>
                                <Dropdown.Item key="goerlietherscan">Goerli Etherscan</Dropdown.Item>
                                <Dropdown.Item key="sepoliaetherscan">Sepolia Etherscan</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid>
                </Grid.Container>
            </Grid>
            </Grid.Container>
            <Grid.Container gap={0.5}>
                <h2>Other Tools</h2>
            </Grid.Container>
            <Grid.Container gap={1} justify='space-evenly'>
                <Grid>
                    <Grid.Container gap={1}>
                        <p>Add address to watchlist above:</p>
                        <form onSubmit={handleAddAddress}>
                            <Input placeholder='Search address' width='450px'/>
                        </form>
                    </Grid.Container>
                </Grid>
                <Grid>
                    <Grid.Container gap={1}>
                        b
                    </Grid.Container>
                </Grid>
            </Grid.Container>
        </Grid>
    );
};

export default SendEtherForm;