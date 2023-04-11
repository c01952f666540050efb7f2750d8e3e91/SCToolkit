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
    wallet: WalletState | null;
    isDarkMode: boolean;
    handleToggleDarkMode: () => void;
    handleConnect: () => void;
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
    wallet, 
    isDarkMode, 
    handleToggleDarkMode,
    handleConnect
}) => {


    return (
        <Navbar variant={"static"} maxWidth={"fluid"}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>

                <Grid.Container gap={1}>
                    <Grid>
                        <Link href={navLinks[0].path}>
                            <Button auto type="button">Home</Button>
                        </Link>
                    </Grid>
                    <Grid>
                        <Link href="/send">
                            <Button auto type="button">Send</Button>
                        </Link>
                    </Grid>
                    <Grid>
                        <Link href="/receive">
                            <Button auto type="button">Receive</Button>
                        </Link>
                    </Grid>
                    <Grid>
                        <Link href="/contract">
                            <Button auto type="button">Contract</Button>
                        </Link>
                    </Grid>
                </Grid.Container>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                
                <Grid.Container gap={1}>
                    <Grid>
                        <Switch checked={isDarkMode} onChange={handleToggleDarkMode} />
                    </Grid>
                    <Grid>
                        <ConnectWallet 
                            wallet={wallet}
                            handleConnect={handleConnect}
                        />
                    </Grid>
                    
                </Grid.Container>
                
            </div>
            
        </Navbar>
    );
  };

export default TopNavbar;