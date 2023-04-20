// React Import
import React, { useState, FC, ReactElement } from 'react';

// Next Import
// import Router, { useRouter } from 'next/router'

// Local Imports
import Contract from './contract';
import Landing from './landing';
import Receive from './receive';
import Send from './send';
import SendForm from '../sendform/sendetherform';
import SendERC20Form from '../sendform/senderc20form';
import ContractDropdown from '../sendform/testdrop';

// Type
interface contentProps {
    currentPage: string;
    address: string | undefined;
    setAddress: (address: string) => void;
    sendEther: (address: string, amount: string) => Promise<void>;
    sendERC20: (contractAddress:string, abi: string, spender:string, recipientAddress:string, amount:string) => Promise<void>;
}

// CONTENT
const Content:React.FC<contentProps> = ({ 
    currentPage,
    address,
    setAddress,
    sendEther,
    sendERC20
}) => {
    const tabs = [
        {
            label: "Ether",
            content: <SendForm 
                address={address}
                setAddress={setAddress}
                sendEther={sendEther}
            />,
        },
        {
            label: "ERC20",
            content: <SendERC20Form
                address={address}
                setAddress={setAddress}
                sendERC20={sendERC20}
            />,
        },
        {
            label: "ERC721",
            content: <div>
                Content for Tab 3
                < ContractDropdown />
            </div>,
        },
        {
            label: "ERC1155",
            content: <div>Content for Tab 3</div>,
        },
    ];
    
    
    if (currentPage === "Home") {
        return <Landing 
            address={address}
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
    } else {
        return <div>Not Found 404!</div>
    }
}
    
export default Content;