// Imports
import { useState } from 'react';
import { Button, Grid, Dropdown } from '@nextui-org/react';

import { ethers } from 'ethers';

// local Imports
import SendEtherForm from './send-components/sendetherform';
import SendERC20Form from './send-components/senderc20form';
import SendERC721Form from './send-components/senderc721form';
import SendERC1155Form from './send-components/senderc1155form';


interface transactionProps {
    address: string | undefined;
    ethersProvider: ethers.providers.Web3Provider | null | undefined;
}

const Transaction:React.FC<transactionProps> = ({
    address,
    ethersProvider
}) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const sendTabs = [
        {
            label: "Ether",
            content: <SendEtherForm address={address} ethersProvider={ethersProvider}/>,
        },
        {
            label: "ERC20",
            content: <SendERC20Form address={address} ethersProvider={ethersProvider} />,
            
        },
        {
            label: "ERC721",
            content: <SendERC721Form address={address} ethersProvider={ethersProvider} />,
        },
        {
            label: "ERC1155",
            content: <SendERC1155Form address={address} ethersProvider={ethersProvider} />
        },
    ];

    return (
    <>
        <main>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                
                <Grid.Container gap={0.5}>
                    {
                        sendTabs.map((label, index) => (
                                <Grid key={index}>
                                    <Button
                                        key={index}
                                        auto 
                                        type="button"   
                                        onPress={() => setActiveTabIndex(index)}
                                    >
                                        {sendTabs[index].label}
                                    </Button>
                                </Grid>
                            )
                        )
                    }
                </Grid.Container>
            </div>
            <div>
                {sendTabs[activeTabIndex].content}
            </div>
        </main>
    </>
    )
}

export default Transaction;