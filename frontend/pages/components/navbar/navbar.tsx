import { Navbar, Link, Button, Grid, Switch, useTheme, changeTheme } from '@nextui-org/react';
import { useState } from 'react';
import ConnectWallet from './connectwallet/ConnectWallet';


const TopNavbar = () => {

    const theme = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        changeTheme(isDarkMode ? 'light' : 'dark');
    };

    return (
        <Navbar variant={"static"} maxWidth={"fluid"}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Grid.Container gap={1}>
                    <Grid>
                        <Link href="/">
                            <Button auto >Home</Button>
                        </Link>
                    </Grid>
                    <Grid>
                        <Link href="/send">
                            <Button auto>Send</Button>
                        </Link>
                    </Grid>
                    <Grid>
                        <Link href="/receive">
                            <Button auto>Receive</Button>
                        </Link>
                    </Grid>
                    <Grid>
                        <Link href="/contract">
                            <Button auto>Contract</Button>
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
                        <ConnectWallet />
                    </Grid>
                    
                </Grid.Container>
                
            </div>
        </Navbar>
    );
  };

export default TopNavbar;