// React Import
import React, { useState, FC, ReactElement } from 'react';

// Next Import
import Router, { useRouter } from 'next/router'

// Local Imports
import Contract from './contract';
import Landing from './landing';
import Receive from './receive';

// Type
interface contentProps {
    page: string,
    address: string
}

// CONTENT
const Content:React.FC<contentProps> = ({ 
    page, 
    address,
}) => {
    
    if (page === "Landing") {
        return <Landing />;
    } else if (page === "Send") {
        return <Receive />;
    } else {
        return <div>Not Found 404!</div>
    }
}
    
export default Content;