import React from 'react';
import VerifiedBadgeIcon from '@/components/VerifiedBadgeIcon';
import EthereumIcon from '@/components/EthereumIcon';

interface Props {
  collection: any;
}

const CollectionProfileHeader: React.FC<Props> = ({
  collection,
}): JSX.Element => {
  return (
    <>
      <div className="mb-4 md:mb-0 flex-col w-full z-5 pb-6">
        <div className="flex flex-col md:flex-row items-start lg:items-center gap-2 justify-between">
          <div className="flex flex-col bg-white/75 dark:bg-black/75 p-4 rounded drop-shadow-md">
            <div className="flex items-center flex-shrink-1 truncate">
              <div className="flex-shrink-0 flex items-center justify-center bg-blue rounded-full">
                <img
                  className="h-12 w-12 rounded-full"
                  src={collection?.imageUrl}
                  alt={collection?.name}
                />
              </div>
              <div className="truncate text-2xl font-semibold text-gray-700 dark:text-gray-200 ml-2 pt-2">
                {collection?.name}
              </div>
              {collection?.osVerificationState == 'true' && (
                <span className="ml-2">
                  <div className="h-6 w-6 flex-shrink-0 flex items-center justify-center bg-blue rounded-full">
                    <VerifiedBadgeIcon height={30} width={30} />
                  </div>
                </span>
              )}
            </div>
            <div className="flex my-2 h-4 md:mb-0 text-xs">
              <span className="flex">
                <span className="font-medium text-gray-500 dark:text-white">
                  Items:&nbsp;
                </span>
                <span className="flex items-center text-gray-600 dark:text-gray-100">
                  {collection?.totalSupply}
                </span>
              </span>
              <div className="mx-2 border border-gray-300" />
              <span className="flex">
                <span className="font-medium text-gray-500 dark:text-white">
                  Floor:&nbsp;
                </span>
                <span className="flex items-center text-gray-600 dark:text-gray-100">
                  {collection?.osFloorPrice?.toFixed(2)}&nbsp;
                  <EthereumIcon height={14} width={14} />
                </span>
              </span>
              <div className="mx-2 border border-gray-300" />
              <span className="flex">
                <span className="font-medium text-gray-500 dark:text-white">
                  24h Volume:&nbsp;
                </span>
                <span className="flex items-center text-gray-600 dark:text-gray-100">
                  {collection?.osOneDayVolume?.toFixed(2)}&nbsp;
                  <EthereumIcon height={14} width={14} />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionProfileHeader;
