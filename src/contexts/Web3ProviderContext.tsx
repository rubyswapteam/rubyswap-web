import coinbaseWalletModule from '@web3-onboard/coinbase';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import mixpanel from 'mixpanel-browser';
import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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

  // useEffect(() => {
  //   const connectWalletOnPageLoad = async () => {
  //     if (
  //       !!localStorage &&
  //       !!localStorage.getItem('isWalletConnectedRuby') &&
  //       (localStorage.getItem('isWalletConnectedRuby') || '').length > 10
  //     ) {
  //       try {
  //         const cachedData = JSON.parse(
  //           localStorage.getItem('isWalletConnectedRuby') || '',
  //         );
  //         setActiveWallet(cachedData.wallet);
  //         setChainId(cachedData.chainId);
  //         setProvider(cachedData.provider);
  //       } catch (ex) {
  //         console.log(ex);
  //       }
  //     }
  //   };
  //   connectWalletOnPageLoad();
  // }, []);

  useEffect(() => {
    loadPreviouslyConnectedWallet().then((res) => setActiveWallet(res));
  }, []);

  async function loadPreviouslyConnectedWallet() {
    const previouslyConnectedWallets = JSON.parse(
      localStorage.getItem('connectedWallets') || '{}',
    );
    if (previouslyConnectedWallets) {
      console.log('autoconnect');
      await onboard.connectWallet({
        autoSelect: {
          label: previouslyConnectedWallets[0],
          disableModals: true,
        },
      });
    }
    const wallet = await onboard.state.get().wallets[0].accounts[0].address;
    console.table({ previousWallet: wallet });
    console.log(onboard.state);
    return wallet;
  }

  async function connectWallet() {
    const walletsSub = onboard.state.select('wallets');
    const { unsubscribe } = walletsSub.subscribe((wallets) => {
      console.log(wallets);
      const connectedWallets = wallets.map(({ label }) => label);
      window.localStorage.setItem(
        'connectedWallets',
        JSON.stringify(connectedWallets),
      );
    });
    try {
      const wallets = await onboard.connectWallet();
      setIsLoading(true);
      const { accounts, chains, provider } = wallets[0];
      setActiveWallet(accounts[0].address);
      mixpanel.track('Connect Wallet', {
        address: accounts[0].address,
      });
      fetchEthBalance(accounts[0]);
      setChainId(chains[0].id);
      setProvider(provider);
      localStorage.setItem(
        `isWalletConnectedRuby-${chains[0].id}`,
        JSON.stringify({
          wallet: accounts[0].address,
          chainId: chains[0].id,
        }),
      );
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

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

  const toHex = (num: any) => {
    const val = Number(num);
    return '0x' + val.toString(16);
  };

  function fetchEthBalance(account: any) {
    if (account && account.balance) {
      setEthBalance(Number(account.balance.ETH).toFixed(3));
    }
  }

  const contextValue = useMemo(
    () => ({
      provider,
      setProvider,
      connectWallet,
      activeWallet,
      setActiveWallet,
      ethBalance,
      disconnect,
    }),
    [
      provider,
      setProvider,
      connectWallet,
      activeWallet,
      setActiveWallet,
      ethBalance,
      disconnect,
    ],
  );

  return (
    <Web3ProviderContext.Provider value={contextValue}>
      {children}
    </Web3ProviderContext.Provider>
  );
};

export const useWeb3Provider = () => useContext(Web3ProviderContext);
