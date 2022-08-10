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
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import walletLinkModule from '@web3-onboard/walletlink';
import Onboard from '@web3-onboard/core';
import coinbaseWalletModule from '@web3-onboard/coinbase';

const Web3ProviderContext = React.createContext<any>({});

const injected = injectedModule();
const walletConnect = walletConnectModule();
const coinbaseWallet = coinbaseWalletModule();

const MAINNET_RPC_URL =
  'https://eth-mainnet.g.alchemy.com/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1';

const onboard = Onboard({
  wallets: [coinbaseWallet, walletConnect, injected],
  chains: [
    {
      id: '0x1', // chain ID must be in hexadecimel
      token: 'ETH', // main chain token
      namespace: 'evm',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL,
    },
  ],
  appMetadata: {
    name: 'My App',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    description: 'My app using Onboard',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
  },
  accountCenter: { desktop: { enabled: false }, mobile: { enabled: false } },
});

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
  const [chainId, setChainId] = useState<string>('');
  const [network, setNetwork] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (provider) {
      // setListener();
    }
  }, [provider]);

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (
        !!localStorage &&
        !!localStorage.getItem('isWalletConnectedRuby') &&
        (localStorage.getItem('isWalletConnectedRuby') || '').length > 10
      ) {
        try {
          const cachedData = JSON.parse(
            localStorage.getItem('isWalletConnectedRuby') || '',
          );
          setActiveWallet(cachedData.wallet);
          setChainId(cachedData.chainId);
          setProvider(cachedData.provider);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  async function connectWallet() {
    try {
      const wallets = await onboard.connectWallet();
      setIsLoading(true);
      const { accounts, chains, provider } = wallets[0];
      setActiveWallet(accounts[0].address);
      setChainId(chains[0].id);
      setProvider(provider);
      localStorage.setItem(
        'isWalletConnectedRuby',
        JSON.stringify({
          wallet: accounts[0].address,
          chainId: chains[0].id,
          provider: provider,
        }),
      );
      setIsLoading(false);
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

  const switchNetwork = async () => {
    await onboard.setChain({ chainId: toHex(network) });
  };

  const handleNetwork = (e: any) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const disconnect = async () => {
    const [primaryWallet] = await onboard.state.get().wallets;
    if (!primaryWallet) return;
    await onboard.disconnectWallet({ label: primaryWallet.label });
    refreshState();
  };

  const refreshState = () => {
    setActiveWallet('');
    setChainId('');
    setProvider(undefined);
    localStorage.setItem('isWalletConnectedRuby', 'false');
  };

  const truncateAddress = (address: string) => {
    if (!address) return 'No Account';
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/,
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  const toHex = (num: any) => {
    const val = Number(num);
    return '0x' + val.toString(16);
  };

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
