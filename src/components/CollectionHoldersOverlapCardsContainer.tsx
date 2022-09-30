import React, { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter } from 'next/router';
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
  useState<string[][] | undefined>(undefined);

  return (
    <div className="flex flex-wrap w-full h-full -m-2 justify-center">
      {activeCollection &&
        targetHolders &&
        holders &&
        holders[0] &&
        activeCollection.contractAddress === holders[0].contract &&
        targetHolders.map(
          (targetHolder: any, i: number) =>
            targetHolder.contract !== holders[0].contract && (
              <div
                className="sm:w-full lg:w-1/3 xl:w-1/4 p-2"
                key={`${activeCollection?.contractAddress}-${holders[0]?.contract}-${targetHolder?.contract}-${i}-ruby-choc`}
              >
                <CollectionHoldersOverlapCard
                  key={`${activeCollection?.contractAddress}-${holders[0]?.contract}-${targetHolder?.contract}-${i}-ruby-choc-inner`}
                  holders={holders}
                  targetHolders={targetHolder}
                  activeCollection={activeCollection}
                />
              </div>
            ),
        )}
    </div>
  );
};
