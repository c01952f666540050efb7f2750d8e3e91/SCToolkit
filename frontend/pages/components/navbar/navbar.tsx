// React Import
import React, { useState } from 'react';

// NextJS/NextUI Import
import { Navbar, Button, Grid, Switch, useTheme, changeTheme } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Local Import
import ConnectWallet from './connectwallet/ConnectWallet';

// Web3
import { useConnectWallet, useWallets } from '@web3-onboard/react';

// ethers
import { ethers } from 'ethers';


// Types
type TopNavbarProps = {
    isDarkMode: boolean
    handleToggleDarkMode: () => void
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
    isDarkMode, handleToggleDarkMode
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
                            // wallet={wallet}
                        />
                    </Grid>
                    
                </Grid.Container>
                
            </div>
            
        </Navbar>
    );
  };

export default TopNavbar;