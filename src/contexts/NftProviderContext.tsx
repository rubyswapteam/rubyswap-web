import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  getTrimmedAddressEllipsisMiddle,
  INft,
  INftCollection,
  INftSweepCollection,
  NftChainId,
} from '@/utils/nftConsts';
import { SampleTrending } from '@/data/sampleTrending';
import { SampleSweeps } from '@/data/sampleSweeps';

const NftProviderContext = React.createContext<any>({});

export const NftProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [nfts] = useState<INft[] | null | undefined>();
  const [trendingNftCollections, setTrendingNftCollections] = useState<
    INftCollection[] | null | undefined
  >();
  const [sweepNftCollections, setSweepNftCollections] = useState<
    INftSweepCollection[] | null | undefined
  >();

  const fetchAllTrendingNftCollections = useCallback(async () => {
    const nftCollections = [];
    for (let i = 0; i < SampleTrending.length; i++) {
      const nftCollection: INftCollection = {
        id: SampleTrending[i]._id,
        image: SampleTrending[i].imageUrl,
        slug: SampleTrending[i].slug,
        name: SampleTrending[i].name,
        chainId: NftChainId.ETHEREUM,
        oneDayVolume: SampleTrending[i].stats.one_day_volume,
        floor: SampleTrending[i].stats.floor_price,
        oneDaySales: SampleTrending[i].stats.one_day_sales,
        oneDayAveragePrice: SampleTrending[i].stats.one_day_average_price,
        owners: SampleTrending[i].stats.num_owners,
      };
      nftCollections.push(nftCollection);
    }
    setTrendingNftCollections(nftCollections);
  }, []);

  const fetchAllSweepNftCollections = useCallback(async () => {
    const nftSweepCollections = [];
    for (let i = 0; i < SampleSweeps.length; i++) {
      const nftSweepCollection: INftSweepCollection = {
        id: SampleSweeps[i].collections[0]._id,
        collectionAddress: SampleSweeps[i].collectionsBought[0],
        image: SampleSweeps[i].collections[0].imageUrl,
        name: SampleSweeps[i].collections[0].name,
        chainId: NftChainId.ETHEREUM,
        value: SampleSweeps[i].totalEthSpent,
        sales: SampleSweeps[i].numItemsBought,
        buyer: getTrimmedAddressEllipsisMiddle(SampleSweeps[i].buyer),
        transaction: getTrimmedAddressEllipsisMiddle(SampleSweeps[i].transactionHash),
        timestamp: SampleSweeps[i].timestamp,
      };
      nftSweepCollections.push(nftSweepCollection);
    }
    setSweepNftCollections(nftSweepCollections);
  }, []);

  const contextValue = useMemo(
    () => ({
      nfts,
      trendingNftCollections,
      fetchAllTrendingNftCollections,
      sweepNftCollections,
      fetchAllSweepNftCollections,
    }),
    [
      nfts,
      trendingNftCollections,
      fetchAllTrendingNftCollections,
      sweepNftCollections,
      fetchAllSweepNftCollections,
    ],
  );

  return (
    <NftProviderContext.Provider value={contextValue}>
      {children}
    </NftProviderContext.Provider>
  );
};

export const useNftProvider = () => useContext(NftProviderContext);
