import { Navbar, Link, Button, Grid } from '@nextui-org/react';


const TopNavbar = () => {
    return (
        <Navbar variant={"static"} maxWidth={"fluid"}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Grid.Container gap={1}>
                    <Grid>
                        <Link href="/">
                            <Button auto>Home</Button>
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
                <Button auto>Connect Wallet</Button>
            </div>
        </Navbar>
    );
  };

export default TopNavbar;