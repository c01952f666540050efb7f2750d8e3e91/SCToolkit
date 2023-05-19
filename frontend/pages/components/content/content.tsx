// React Import
import React, { useState, FC, ReactElement } from 'react';

// Next Import
// import Router, { useRouter } from 'next/router'

// Local Imports
import Contract from './contract';
import Landing from './landing';
import Receive from './receive';
import Send from './send';
import Connection from './connection';
import KnowledgeForm from './knowledge';
import SendEtherForm from './send-components/sendetherform';
import SendERC20Form from './send-components/senderc20form';
import SendERC721Form from './send-components/senderc721form';
import SendERC1155Form from './send-components/senderc1155form';

import { ethers } from 'ethers';

// Type
interface contentProps {
    currentPage: string;
    address: string | undefined;
    setAddress: (address: string) => void;
    sendEther: (address: string, amount: string) => Promise<void>;
    sendERC20: (contractAddress:string, spender:string, recipientAddress:string, amount:string) => Promise<void>;
    sendERC721: (contractAddress:string, spender:string, recipientAddress:string, amount:string) => Promise<void>;
    ethersProvider: ethers.providers.Web3Provider | null | undefined;
    getBalance: (address: string) => void;
}

// CONTENT
const Content:React.FC<contentProps> = ({ 
    currentPage,
    address,
    setAddress,
    sendEther,
    sendERC20,
    sendERC721,
    ethersProvider,
    getBalance
}) => {
    const tabs = [
        {
            label: "Ether",
            content: <SendEtherForm 
                address={address}
                sendEther={sendEther}
            />,
        },
        {
            label: "ERC20",
            content: <SendERC20Form
                address={address}
                ethersProvider={ethersProvider}
            />,
        },
        {
            label: "ERC721",
            content: <SendERC721Form
            address={address}
            setAddress={setAddress}
            sendERC721={sendERC721}
        />,
        },
        {
            label: "ERC1155",
            content: <SendERC1155Form
            address={address}
            setAddress={setAddress}
            sendERC1155={sendERC721} // TODO - to change
            / >
        },
    ];
    
    
    if (currentPage === "Home") {
        return <Landing 
            address={address}
            ethersProvider={ethersProvider}
            // getBalance={getBalance}
        />;
    } else if (currentPage === "Send") {
        return (
            <Send
                tabs={tabs}
            />
        );
    } else if (currentPage === "Receive") {
        return <Receive />;
    } else if (currentPage == "Contract") {
        return <Contract />;
    } else if (currentPage == "Knowledge") {
        return <KnowledgeForm 
                    // address="test" 
                />;
    } else if (currentPage == "Connection") {
        return <Connection 
            ethersProviders={ethersProvider}
            address={address}
            getBalance={getBalance}
        />;
    } else {
        return <div>Not Found 404!</div>
    }
}
    
export default Content;