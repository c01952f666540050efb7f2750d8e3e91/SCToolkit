// React Import
import React from 'react';

// NextJS/NextUI Import
import { Navbar, Button, Grid, Switch, Dropdown } from '@nextui-org/react';

// Local Import
import ConnectWallet from './connectwallet/ConnectWallet';
import { chains } from '../../index';
import { useSetChain } from '@web3-onboard/react';

import {ethers} from 'ethers';

// Types
type TopNavbarProps = {
    address: string | undefined;
    isConnected: boolean;
    isDarkMode: boolean;
    handleToggleDarkMode: () => void;
    handleConnect: () => void;
    handleDisconnect: () => void;
    handleMenu: (newPage: string) => void;
    handleNetwork: (chainID: string) => void;
    currentNetwork: string | undefined;
    ethersProvider: ethers.providers.Web3Provider | null | undefined;
    getBalance: (address: string) => void;
}

interface NavItemProps {
    item: string;
}

export const navLinks = [
    { 
        name: "Home", 
        path: "/" 
    },
    { 
        name: "Send", 
        path: "/send" 
    },
    { 
        name: "Receive", 
        path: "/receive" 
    },
    { 
        name: "Contract", 
        path: "/contract" 
    },
    {
        name: "Knowledge",
        path: "/knowledge"
    },
    {
        name: "Connection",
        path: "/connection"
    }
];

const TopNavbar: React.FC<TopNavbarProps> = ({ 
    address,
    isConnected, 
    isDarkMode, 
    handleToggleDarkMode,
    handleConnect,
    handleDisconnect,
    handleMenu,
    handleNetwork,
    currentNetwork,
    ethersProvider,
    getBalance
}) => {

    return (
        <Navbar maxWidth={"fluid"}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>

                <Grid.Container gap={0.5}>
                {navLinks.map(({ name, path }) => (
                    <Grid key={name}>
                        <Button 
                            auto 
                            type="button"
                            onPress={() => handleMenu(name)}
                        >
                        {name}
                        </Button>
                    </Grid>
                ))}
                </Grid.Container>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                
                <Grid.Container gap={0.5}>
                    <Grid>
                        <Switch checked={isDarkMode} onChange={handleToggleDarkMode} />
                    </Grid>
                    <Grid>
                        <Dropdown>
                        <Dropdown.Button>
                            {currentNetwork}
                        </Dropdown.Button>
                        <Dropdown.Menu aria-label="Static Actions">
                            {chains.map(({id, label}) => (
                                <Dropdown.Item
                                    key={label}
                                >
                                    <Button size='xs'
                                        onPress={() => handleNetwork(id)}
                                    >
                                        {label}
                                    </Button>
                                </Dropdown.Item>
                            ))}
                            
                        </Dropdown.Menu>
                        </Dropdown>
                    </Grid>
                    <Grid>
                        <ConnectWallet 
                            address={address}
                            isConnected={isConnected}
                            handleConnect={handleConnect}
                            handleDisconnect={handleDisconnect}
                        />
                    </Grid>
                    
                </Grid.Container>
                
            </div>
            
        </Navbar>
    );
  };

export default TopNavbar;