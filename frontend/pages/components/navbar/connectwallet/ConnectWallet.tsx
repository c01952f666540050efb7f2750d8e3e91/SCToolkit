import React from 'react';
import { Button } from '@nextui-org/react';


interface ConnectWalletProps {
    address: string | undefined;
    isConnected: boolean;
    handleConnect: () => void;
    handleDisconnect: () => void;
}

function shortenAddress(fullAddress: string | undefined) {
    if (fullAddress) {
        return (
            fullAddress.slice(0, 6) + "..." + fullAddress.slice(-4)
        )
    } else {
        return ""
    }
    
}


const ConnectWallet: React.FC<ConnectWalletProps> = ({
    address,
    isConnected,
    handleConnect,
    handleDisconnect
}) => {

    // If we're already connected
    if (isConnected) {
        return (<Button
            onPress={handleDisconnect}
        >
            Disconnect // {shortenAddress(address)}
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