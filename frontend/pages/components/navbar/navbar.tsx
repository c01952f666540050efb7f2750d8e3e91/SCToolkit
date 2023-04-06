// React Import
import React, { useState } from 'react';

// NextJS/NextUI Import
import { Navbar, Button, Grid, Switch, useTheme, changeTheme } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Local Import
import ConnectWallet from './connectwallet/ConnectWallet';
import { P } from 'viem/dist/parseGwei-361e8a12';
import { link } from 'fs';

// Types
type TopNavbarProps = {
    currentTheme: boolean;
    toggleTheme: () => void;
    web3wallet: any[]
    web3chains: any
    web3appMetadata: any
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

const TopNavbar: React.FC<TopNavbarProps> = ({ currentTheme, toggleTheme, web3wallet, web3chains, web3appMetadata }) => {

    const router = useRouter()
    const handleClick = (e) => {
        e.preventDefault()
        router.push("/send")
    }
    
    const NavItem: React.FC<NavItemProps> = ({ item }) => {
        const router = useRouter();
        return <>{router.pathname === "/" ? item : ""}</>;
    };

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
                        <Switch checked={currentTheme} onChange={toggleTheme} />
                    </Grid>
                    <Grid>
                        <ConnectWallet 
                            web3wallet={web3wallet} 
                            web3chains={web3chains}
                            web3appMetadata={web3appMetadata}
                        />
                    </Grid>
                    
                </Grid.Container>
                
            </div>
            
        </Navbar>
    );
  };

export default TopNavbar;