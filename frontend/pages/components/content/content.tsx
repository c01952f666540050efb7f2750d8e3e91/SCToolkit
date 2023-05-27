// React Import
import React, { useState, FC, ReactElement } from 'react';

// Next Import
// import Router, { useRouter } from 'next/router'

// Local Imports
import Contract from './contract';
import Landing from './landing';
import Assets from './assets';
import Ledger from './ledger';
import KnowledgeForm from './knowledge';


import { ethers } from 'ethers';

// Type
interface contentProps {
    currentPage: string;
    address: string | undefined;
    ethersProvider: ethers.providers.Web3Provider | null | undefined;
    
}

// CONTENT
const Content:React.FC<contentProps> = ({ 
    currentPage,
    address,
    ethersProvider
}) => {    
    
    if (currentPage === "Home") {
        return <Landing 
            address={address}
            ethersProvider={ethersProvider}
            // getBalance={getBalance}
        />;
    } else if (currentPage === "Assets") {
        return (
            <Assets
                address={address}
                ethersProvider={ethersProvider}
                // transactionTabs={}
            />
        );
    } else if (currentPage == "Contract") {
        return <Contract />;
    } else if (currentPage == "Knowledge") {
        return <KnowledgeForm 
                    // address="test" 
                />;
    } else if (currentPage == "Ledger") {
        return <Ledger 
            ethersProviders={ethersProvider}
            address={address}
        />;
    } else {
        return <div>Not Found 404!</div>
    }
}
export default Content;