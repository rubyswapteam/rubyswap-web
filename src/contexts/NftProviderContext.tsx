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
  NftMarketplace,
} from '@/utils/nftUtils';
import { SampleTrending } from '@/data/sampleTrending';
import { SampleSweeps } from '@/data/sampleSweeps';
import { SampleCollection } from '@/data/sampleCollection';
import { SampleNfts } from '@/data/sampleNfts';

const NftProviderContext = React.createContext<any>({});

export const NftProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [nfts, setNfts] = useState<INft[] | null | undefined>();
  const [trendingNftCollections, setTrendingNftCollections] = useState<
    INftCollection[] | null | undefined
  >();
  const [sweepNftCollections, setSweepNftCollections] = useState<
    INftSweepCollection[] | null | undefined
  >();
  const [nftCollection, setNftCollection] = useState<
    INftCollection | null | undefined
  >();

  const fetchNftCollection = useCallback(async () => {
    const nftCollection: INftCollection = {
      id: SampleCollection[0]._id,
      contractAddress: SampleCollection[0].addresses[0].address,
      contractAddressStandard: SampleCollection[0].addresses[0].standard,
      description: SampleCollection[0].description,
      isVerified: SampleCollection[0].isVerified,
      image: SampleCollection[0].imageUrl,
      slug: SampleCollection[0].slug,
      name: SampleCollection[0].name,
      chainId: NftChainId.ETHEREUM,
      oneDayVolume: SampleCollection[0].stats.one_day_volume,
      oneDaySales: SampleCollection[0].stats.one_day_sales,
      floor: SampleCollection[0].stats.floor_price,
      oneDayAveragePrice: SampleCollection[0].stats.one_day_average_price,
      thirtyDayVolume: SampleCollection[0].stats.thirty_day_volume,
      owners: SampleCollection[0].stats.num_owners,
      count: SampleCollection[0].stats.count,
      supply: SampleCollection[0].stats.total_supply,
    };
    setNftCollection(nftCollection);
  }, []);

  const fetchNfts = useCallback(async () => {
    const nfts: INft[] = [];
    for (let i = 0; i < SampleNfts.length; i++) {
      const nft: INft = {
        id: SampleNfts[i]._id,
        tokenId: SampleNfts[i].id,
        collectionName: SampleNfts[i].collectionName,
        contractAddress: SampleNfts[i].address,
        image: SampleNfts[i].imageUrl,
        chainId: NftChainId.ETHEREUM,
        imageAlt: SampleNfts[i].collectionName,
        name: SampleNfts[i].collectionName,
        price: SampleNfts[i].currentBasePrice,
        marketplace: SampleNfts[i].marketplace as unknown as NftMarketplace,
      };
      nfts.push(nft);
    }
    setNfts(nfts);
  }, []);

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
        transaction: getTrimmedAddressEllipsisMiddle(
          SampleSweeps[i].transactionHash,
        ),
        timestamp: SampleSweeps[i].timestamp,
      };
      nftSweepCollections.push(nftSweepCollection);
    }
    setSweepNftCollections(nftSweepCollections);
  }, []);

  const contextValue = useMemo(
    () => ({
      nfts,
      setNfts,
      fetchNfts,
      trendingNftCollections,
      fetchAllTrendingNftCollections,
      sweepNftCollections,
      fetchAllSweepNftCollections,
      nftCollection,
      setNftCollection,
      fetchNftCollection,
    }),
    [
      nfts,
      setNfts,
      fetchNfts,
      trendingNftCollections,
      fetchAllTrendingNftCollections,
      sweepNftCollections,
      fetchAllSweepNftCollections,
      nftCollection,
      setNftCollection,
      fetchNftCollection,
    ],
  );

  return (
    <NftProviderContext.Provider value={contextValue}>
      {children}
    </NftProviderContext.Provider>
  );
};

export const useNftProvider = () => useContext(NftProviderContext);
