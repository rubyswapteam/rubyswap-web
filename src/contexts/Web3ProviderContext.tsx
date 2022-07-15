import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import WalletConnectProvider from '@walletconnect/web3-provider';

const Web3ProviderContext = React.createContext<any>({});

export const Web3Provider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: 'https://eth-mainnet.g.alchemy.com/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1',
        },
      },
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: 'My Awesome App',
        rpc: 'https://eth-mainnet.g.alchemy.com/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1',
      },
    },
  };

  const [provider, setProvider] = useState<any>(undefined);
  const [activeWallet, setActiveWallet] = useState<any>(undefined);
  useEffect(() => {
    if (provider) {
      setListener();
    }
  }, [provider]);

  async function connectWallet() {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(
        web3ModalInstance,
      );
      setProvider(web3ModalProvider);
      setActiveWallet((web3ModalProvider.provider as any).selectedAddress);
      console.log(provider);
    } catch (error) {
      console.error(error);
    }
  }

  function setListener() {
    provider.provider.on('accountsChanged', (accounts: any[]) => {
      console.log('listener called');
      setActiveWallet(accounts[0]);
    });
  }

  const contextValue = useMemo(
    () => ({
      provider,
      setProvider,
      connectWallet,
      activeWallet,
      setActiveWallet,
    }),
    [provider, setProvider, connectWallet, activeWallet, setActiveWallet],
  );

  return (
    <Web3ProviderContext.Provider value={contextValue}>
      {children}
    </Web3ProviderContext.Provider>
  );
};

export const useWeb3Provider = () => useContext(Web3ProviderContext);
