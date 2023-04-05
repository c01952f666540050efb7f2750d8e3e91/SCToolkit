import { Navbar, Button, Grid, Switch, useTheme, changeTheme } from '@nextui-org/react';

import Link from 'next/link';
import { useState } from 'react';
import ConnectWallet from './connectwallet/ConnectWallet';

type TopNavbarProps = {
    currentTheme: boolean;
    toggleTheme: () => void;
}

function TopNavbar ({ currentTheme, toggleTheme }: TopNavbarProps)  {

    return (
        <Navbar variant={"static"} maxWidth={"fluid"}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Grid.Container gap={1}>
                    <Grid>
                        <Link href="/">
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
                        <ConnectWallet />
                    </Grid>
                    
                </Grid.Container>
                
            </div>
        </Navbar>
    );
  };

export default TopNavbar;