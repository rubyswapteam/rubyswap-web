import React, { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter } from 'next/router';
import { CollectionHoldersOverlapCard } from './CollectionHoldersOverlapCard';
import { ReactSortable } from 'react-sortablejs';
import { url } from 'inspector';

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
  const [targetData, setTargetData] = useState<any>();
  useEffect(() => {
    if (targetHolders) {
      setTargetData(
        targetHolders
          .map((x) => ({
            ...x,
            id: `${activeCollection?.contractAddress}-${holders[0]?.contract}-${x?.contract}-ruby-choc`,
            filtered: activeCollection?.contractAddress === x?.contract,
          }))
          .filter((x) => !x.filtered),
      );
    }
  }, [targetHolders, holders, activeCollection]);

  return (
    <div className="flex flex-wrap w-full h-full -m-2 justify-center">
      {targetData && (
        <ReactSortable
          className="w-full flex-wrap justify-center contents"
          list={targetData}
          setList={setTargetData}
          animation={350}
        >
          {activeCollection &&
            activeCollection.contractAddress &&
            holders &&
            holders[0] &&
            holders[0]?.contract &&
            activeCollection.contractAddress === holders[0].contract &&
            targetData?.map((data: any) => (
              <div className="sm:w-full lg:w-1/3 xl:w-1/4 p-2" key={data?.id}>
                <CollectionHoldersOverlapCard
                  key={`${data?.id}-inner`}
                  holders={holders}
                  targetHolders={data}
                  activeCollection={activeCollection}
                />
              </div>
            ))}
        </ReactSortable>
      )}
      <div className="sm:w-full lg:w-1/3 xl:w-1/4 p-2">
        <div
          style={{
            backgroundImage: `url('${activeCollection?.bannerImageUrl}')`,
          }}
          className="rounded-md h-full text-sm hover:bg-white/[.15] cursor-pointer transition-all p-auto flex min-h-[15rem] bg-contain"
        >
          <div className="w-full h-full flex">
            <div className="justify-center self-center items-center text-center m-auto flex-col">
              <button className="mt-4 px-3 pt-2 pb-1.5 bg-black/80 hover:bg-black/[.85] rounded-md">
                Add collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
