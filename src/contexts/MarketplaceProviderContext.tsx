import { INft, NftChainId } from '@/utils/nftUtils';
import axios from 'axios';
import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { addAbortSignal } from 'stream';

const MarketplaceProviderContext = React.createContext<any>({});

export const MarketplaceProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [userNfts, setUserNfts] = useState<{
    ownedNfts: any[];
    summary: any;
    totalCount: number;
  }>();
  const [collectionNames, setCollectionNames] = useState<any>({});

  const fetchUserSales = useCallback(async (contractAddress: string) => {
    const activeMapping = collectionNames;
    if (!collectionNames[contractAddress]) {
      axios
        .get(
          `https://eth-mainnet.g.alchemy.com/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getContractMetadata/?contractAddress=${contractAddress}`,
        )
        .then((contractRes) => {
          activeMapping[contractAddress] =
            contractRes.data.contractMetadata.name?.trim();
          setCollectionNames({ ...activeMapping });
        });
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      userNfts,
      setUserNfts,
      fetchCollectionNames,
    }),
    [userNfts, setUserNfts, fetchCollectionNames],
  );

  return (
    <MarketplaceProviderContext.Provider value={contextValue}>
      {children}
    </MarketplaceProviderContext.Provider>
  );
};

export const useMarketplaceProvider = () =>
  useContext(MarketplaceProviderContext);
