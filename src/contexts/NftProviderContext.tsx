import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { INft, INftCollection, NftChainId } from '@/utils/nftConsts';
import { SampleTrendingNftCollection } from '@/data/sampleTrendingNftCollection';

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
  const [nftCollections, setNftCollections] = useState<
    INftCollection[] | null | undefined
  >();

  const fetchAllTrendingNftCollections = useCallback(async () => {
    const nftCollections = [];
    for (let i = 0; i < SampleTrendingNftCollection.length; i++) {
      const nftCollection: INftCollection = {
        id: SampleTrendingNftCollection[i]._id,
        image: SampleTrendingNftCollection[i].imageUrl,
        slug: SampleTrendingNftCollection[i].slug,
        name: SampleTrendingNftCollection[i].name,
        chainId: NftChainId.ETHEREUM,
        oneDayVolume: SampleTrendingNftCollection[i].stats.one_day_volume,
        floor: SampleTrendingNftCollection[i].stats.floor_price,
        oneDaySales: SampleTrendingNftCollection[i].stats.one_day_sales,
        oneDayAveragePrice: SampleTrendingNftCollection[i].stats.one_day_average_price,
        owners: SampleTrendingNftCollection[i].stats.num_owners,
      };
      nftCollections.push(nftCollection);
    }
    setNftCollections(nftCollections);
  }, []);

  const contextValue = useMemo(
    () => ({
      nfts,
      nftCollections,
      fetchAllTrendingNftCollections,
    }),
    [nfts, nftCollections, fetchAllTrendingNftCollections],
  );

  return (
    <NftProviderContext.Provider value={contextValue}>
      {children}
    </NftProviderContext.Provider>
  );
};

export const useNftProvider = () => useContext(NftProviderContext);
