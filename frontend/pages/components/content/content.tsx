// // React Import
// import React, { useState, FC } from 'react';

// // Next Import
// import Router, { useRouter } from 'next/router'

// // Local Imports

// // CONTENT
// const ContentPage:React.FC<{page: string, setPage: (s: string) => void, address: string}> = ({ 
//     page, 
//     setPage,
//     address,
// }) => {
//     console.log(page);
//     console.log(address);
//     if (page === "Landing") {
//         return <LandingPage />;
//     } else if (page === "Send") {
//         return <Send 
//             page={page}
//             setPage={setPage}
//             address={address}
//         />;
//     } else if (page === "Address") {
//         return <Address 
//             page={page}
//             setPage={setPage}
//             address={address}
//         />;
//     }
// }
    
// export default Content;