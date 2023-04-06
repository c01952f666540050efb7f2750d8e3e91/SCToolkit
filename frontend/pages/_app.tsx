import '@/styles/globals.css'
import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'


import TopNavbar from './components/navbar/navbar';

// Web3 onbaord
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import { Web3OnboardProvider, useConnectWallet } from '@web3-onboard/react';
import init from '@web3-onboard/core';



export default function App({ Component, pageProps }: AppProps) {

  return (
      <Component {...pageProps} />
  )
}