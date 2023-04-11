import React from 'react';
import { Button } from '@nextui-org/react';


interface ConnectWalletProps {
    isConnected: boolean;
    handleConnect: () => void;
    handleDisconnect: () => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({
    isConnected,
    handleConnect,
    handleDisconnect
}) => {

    // If we're already connected
    if (isConnected) {
        return (<Button
            onPress={handleDisconnect}
        >
            Disconnect
        </Button>)
    }

    // If not connected
    return (
        <Button
            onPress={handleConnect}
        >
            Connect
        </Button>
    )

    
}

export default ConnectWallet;