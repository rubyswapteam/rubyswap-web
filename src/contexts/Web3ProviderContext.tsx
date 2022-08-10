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
  const [provider, setProvider] = useState<any>(undefined);
  const [activeWallet, setActiveWallet] = useState<any>(undefined);
  const [ethBalance, setEthBalance] = useState<string | undefined>(undefined);
  const [chainId, setChainId] = useState<number>(-1);

  useEffect(() => {
    if (provider) {
      setListener();
    }
  }, [provider]);

  async function connectWallet() {
    try {
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

      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions, // required
      });
      const web3ModalInstance = await web3Modal.connect();
      console.log(web3ModalInstance);
      const web3ModalProvider = new ethers.providers.Web3Provider(
        web3ModalInstance,
      );
      const accounts = await web3ModalProvider.listAccounts();
      const network = await web3ModalProvider.getNetwork();
      setChainId(network.chainId);
      setProvider(web3ModalProvider);
      if (accounts) setActiveWallet(accounts[0]);
      setActiveWallet((web3ModalProvider.provider as any).selectedAddress);
      console.log((web3ModalProvider.provider as any).selectedAddress);
    } catch (error) {
      console.error(error);
    }
  }

  // async function connectWallet() {
  //   try {
  //     const web3ModalInstance = await web3Modal.connect();
  //     console.log(web3ModalInstance);
  //     const web3ModalProvider = new ethers.providers.Web3Provider(
  //       web3ModalInstance,
  //     );
  //     console.log(web3ModalProvider);
  //     setProvider(web3ModalProvider);
  //     setActiveWallet((web3ModalProvider.provider as any).selectedAddress);
  //     console.log((web3ModalProvider.provider as any).selectedAddress);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  function setListener() {
    provider.provider.on('accountsChanged', (accounts: any[]) => {
      setActiveWallet(accounts[0]);
    });
  }

  function fetchEthBalance(address: string) {
    if (provider && provider.provider) {
      provider.getBalance(address).then((balance: ethers.BigNumberish) => {
        const balanceInEth = ethers.utils.formatEther(balance);
        setEthBalance(balanceInEth);
      });
    }
  }

  const contextValue = useMemo(
    () => ({
      provider,
      setProvider,
      connectWallet,
      activeWallet,
      setActiveWallet,
      fetchEthBalance,
      ethBalance,
    }),
    [
      provider,
      setProvider,
      connectWallet,
      activeWallet,
      setActiveWallet,
      fetchEthBalance,
      ethBalance,
    ],
  );

  return (
    <Web3ProviderContext.Provider value={contextValue}>
      {children}
    </Web3ProviderContext.Provider>
  );
};

export const useWeb3Provider = () => useContext(Web3ProviderContext);
