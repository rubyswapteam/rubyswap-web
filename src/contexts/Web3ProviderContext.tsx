import { INft, NftChainId } from '@/utils/nftUtils';
import axios from 'axios';
import { ethers } from 'ethers';
import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const Web3ProviderContext = React.createContext<any>({});

export const Web3Provider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [activeNfts, setActiveNfts] = useState<INft[]>([]);

  function getCollectionNfts() {
    const x = 1;
  }

  const contextValue = useMemo(
    () => ({
      getCollectionNfts,
      activeNfts,
      setActiveNfts,
    }),
    [getCollectionNfts, activeNfts, setActiveNfts],
  );

  return (
    <Web3ProviderContext.Provider value={contextValue}>
      {children}
    </Web3ProviderContext.Provider>
  );
};

export const useWalletProvider = () => useContext(Web3ProviderContext);
