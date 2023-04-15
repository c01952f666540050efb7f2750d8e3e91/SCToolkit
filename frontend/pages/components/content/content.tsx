// React Import
import React, { useState, FC, ReactElement } from 'react';

// Next Import
// import Router, { useRouter } from 'next/router'

// Local Imports
import Contract from './contract';
import Landing from './landing';
import Receive from './receive';
import Send from './send';

// Type
interface contentProps {
    currentPage: string;
    address: string;
    setAddress: (address: string) => void;
    sendEther: (address: string, amount: string) => Promise<void>;
}

// CONTENT
const Content:React.FC<contentProps> = ({ 
    currentPage,
    address,
    setAddress,
    sendEther
}) => {
    
    if (currentPage === "Home") {
        return <Landing 
            address={address}
        />;
    } else if (currentPage === "Send") {
        return (
            <Send 
                address={address}
                setAddress={setAddress}
                sendEther={sendEther}
            />
        );
    } else if (currentPage === "Receive") {
        return <Receive />;
    } else if (currentPage == "Contract") {
        return <Contract />;
    } else {
        return <div>Not Found 404!</div>
    }
}
    
export default Content;