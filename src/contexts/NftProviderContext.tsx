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
  INftCollectionUpdate,
  NftChainId,
} from '@/utils/nftUtils';
import { SampleTrending } from '@/data/dummy-data/sampleTrending';
import { SampleSweeps } from '@/data/dummy-data/sampleSweeps';
import { SampleCollection } from '@/data/dummy-data/sampleCollection';
import { SampleCollectionOS } from '@/data/dummy-data/sampleCollectionOS';
import { SampleNfts } from '@/data/dummy-data/sampleNfts';
import { SampleCollectionUpdates } from '@/data/dummy-data/sampleCollectionUpdates';
import Collection from '../pages/wallet/[id]';

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
  const [collectionUpdates, setNftCollectionUpdates] = useState<
    INftCollectionUpdate[] | null | undefined
  >();
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
      contractAddress:
        SampleCollectionOS.collection.primary_asset_contracts[0].address,
      tokenStandard:
        SampleCollectionOS.collection.primary_asset_contracts[0].schema_name,
      description: SampleCollectionOS.collection.description,
      isVerified:
        SampleCollectionOS.collection.safelist_request_status == 'verified',
      image: SampleCollectionOS.collection.image_url,
      bannerImage: SampleCollectionOS.collection.banner_image_url,
      slug: SampleCollectionOS.collection.slug,
      name: SampleCollectionOS.collection.name,
      chainId: NftChainId.ETHEREUM,
      oneDayVolume: SampleCollectionOS.collection.stats.one_day_volume,
      oneDaySales: SampleCollectionOS.collection.stats.one_day_sales,
      oneDayAveragePrice:
        SampleCollectionOS.collection.stats.one_day_average_price,
      sevenDayVolume: SampleCollectionOS.collection.stats.seven_day_volume,
      sevenDaySales: SampleCollectionOS.collection.stats.seven_day_sales,
      thirtyDaySales: SampleCollectionOS.collection.stats.thirty_day_sales,
      thirtyDayVolume: SampleCollectionOS.collection.stats.thirty_day_volume,
      floor: SampleCollectionOS.collection.stats.floor_price,
      owners: SampleCollectionOS.collection.stats.num_owners,
      count: SampleCollectionOS.collection.stats.count,
      supply: SampleCollectionOS.collection.stats.total_supply,
    };
    setNftCollection(nftCollection);
  }, []);

  const fetchNftCollectionUpdates = useCallback(async () => {
    const collectionUpdates: INftCollectionUpdate[] = [];
    for (let i = 0; i < SampleCollectionUpdates.length; i++) {
      const collectionUpdate: INftCollectionUpdate = {
        id: SampleCollectionUpdates[i].id,
        username: SampleCollectionUpdates[i].username,
        userAddress: SampleCollectionUpdates[i].userAddress,
        posted: SampleCollectionUpdates[i].posted,
        collectionName: SampleCollectionUpdates[i].collectionName,
        imageUrl: SampleCollectionUpdates[i].imageUrl,
        smallImageUrl: SampleCollectionUpdates[i].smallImageUrl,
        holdersOnly: SampleCollectionUpdates[i].holdersOnly,
        updateType: SampleCollectionUpdates[i].updateType,
        title: SampleCollectionUpdates[i].title,
        message: SampleCollectionUpdates[i].message,
        likes: SampleCollectionUpdates[i].likes,
      };
      collectionUpdates.push(collectionUpdate);
    }
    setNftCollectionUpdates(collectionUpdates);
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
        name: SampleNfts[i].name,
        price: SampleNfts[i].currentBasePrice,
        marketplace: SampleNfts[i].market,
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
        isVerified: SampleTrending[i].isVerified,
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
        isVerified: SampleSweeps[i].collections[0].isVerified,
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
      collectionUpdates,
      fetchNftCollectionUpdates,
      setNftCollectionUpdates,
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
      collectionUpdates,
      fetchNftCollectionUpdates,
      setNftCollectionUpdates,
    ],
  );

  return (
    <NftProviderContext.Provider value={contextValue}>
      {children}
    </NftProviderContext.Provider>
  );
};

export const useNftProvider = () => useContext(NftProviderContext);
