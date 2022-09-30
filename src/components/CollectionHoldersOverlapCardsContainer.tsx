import React, { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { CollectionHoldersOverlapCard } from './CollectionHoldersOverlapCard';

interface Props {
  holders: any;
  targetHolders: any[];
  activeCollection: any;
}

export const CollectionHoldersOverlapCardsContainer: React.FC<Props> = ({
  holders,
  targetHolders,
  activeCollection,
}): JSX.Element => {
  const [holderAddressList, setHolderAddressList] = useState<string[]>();
  const [targetCollectionsAddressList, setTargetCollectionsAddressList] =
    useState<string[][] | undefined>(undefined);

  function getAddressList(raw: any): string[] {
    return raw?.data?.map(
      (x: { ownerAddress: string; tokenBalance: number }) => x.ownerAddress,
    );
  }

  useEffect(() => {
    setHolderAddressList(getAddressList(holders[0]));
  }, [holders]);

  return (
    <div className="flex flex-wrap w-full h-full -m-2">
      {activeCollection &&
        holderAddressList &&
        targetHolders &&
        targetHolders.map((targetHolder: any, i: number) => (
          <div
            className="sm:w-full xl:w-1/3 p-2"
            key={`${activeCollection?.contractAddress}-${targetHolder?.contract}-${i}-ruby-choc`}
          >
            <CollectionHoldersOverlapCard
              key={`${activeCollection?.contractAddress}-${targetHolder?.contract}-${i}-ruby-choc-inner`}
              holders={holders}
              targetHolders={targetHolder}
              activeCollection={activeCollection}
              holderAddressList={holderAddressList}
              getAddressList={getAddressList}
            />
          </div>
        ))}
    </div>
  );
};
