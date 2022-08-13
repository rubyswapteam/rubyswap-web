import { SampleSweeps } from '@/data/dummy-data/sampleSweeps';
import {
  getTrimmedAddressEllipsisMiddle,
  INftSweepCollection,
  NftChainId,
} from '@/utils/nftUtils';
import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const NftProviderContext = React.createContext<any>({});

export const NftProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [sweepNftCollections, setSweepNftCollections] = useState<
    INftSweepCollection[] | null | undefined
  >();

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
      sweepNftCollections,
      fetchAllSweepNftCollections,
    }),
    [sweepNftCollections, fetchAllSweepNftCollections],
  );

  return (
    <NftProviderContext.Provider value={contextValue}>
      {children}
    </NftProviderContext.Provider>
  );
};

export const useNftProvider = () => useContext(NftProviderContext);
