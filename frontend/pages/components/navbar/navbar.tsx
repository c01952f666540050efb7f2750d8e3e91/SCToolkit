// React Import
import React, { useState } from 'react';

// NextJS/NextUI Import
import { Navbar, Button, Grid, Switch, useTheme, changeTheme } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Web3 Import
import { WalletState } from '@web3-onboard/core';

import { ethers } from 'ethers';

// Local Import
import ConnectWallet from './connectwallet/ConnectWallet';

// Types
type TopNavbarProps = {
    address: string | undefined;
    isConnected: boolean;
    isDarkMode: boolean;
    handleToggleDarkMode: () => void;
    handleConnect: () => void;
    handleDisconnect: () => void;
    handleMenu: (newPage: string) => void;
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
];

const TopNavbar: React.FC<TopNavbarProps> = ({ 
    address,
    isConnected, 
    isDarkMode, 
    handleToggleDarkMode,
    handleConnect,
    handleDisconnect,
    handleMenu,
}) => {


    return (
        <Navbar variant={"static"} maxWidth={"fluid"}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>

                <Grid.Container gap={1}>
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
                
                <Grid.Container gap={1}>
                    <Grid>
                        <Switch checked={isDarkMode} onChange={handleToggleDarkMode} />
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