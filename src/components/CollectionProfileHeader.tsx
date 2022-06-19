import React from 'react';
import VerifiedBadgeIcon from '@/components/VerifiedBadgeIcon';
import EthereumIcon from '@/components/EthereumIcon';

interface Props {
  image: string;
  name: string;
  items: number;
  floor: number;
  oneDayVolume: number;
}

const CollectionProfileHeader: React.FC<Props> = ({
  image,
  name,
  items,
  floor,
  oneDayVolume,
}): JSX.Element => {
  return (
    <>
      <div className="mb-4 border-b border-gray-200 md:mb-0 flex-col bg-white w-full bg-white z-5 pb-6">
        <div className="flex flex-col md:flex-row items-start lg:items-center gap-2 justify-between">
          <div className="flex flex-col">
            <div className="flex items-center flex-shrink-1 truncate">
              <div className="flex-shrink-0 flex items-center justify-center bg-blue rounded-full">
                <img
                  className="h-12 w-12 rounded-full"
                  src={image}
                  alt={name}
                />
              </div>
              <div className="truncate text-2xl font-semibold text-gray-700 ml-2">
                {name}
              </div>
              <span className="ml-2">
                <div className="h-6 w-6 flex-shrink-0 flex items-center justify-center bg-blue rounded-full">
                  <VerifiedBadgeIcon height={30} width={30} />
                </div>
              </span>
            </div>
            <div className="flex my-2 h-4 md:mb-0 text-xs">
              <span className="flex">
                <span className="font-medium text-gray-500">Items:&nbsp;</span>
                <span className="flex items-center text-gray-600">{items}</span>
              </span>
              <div className="mx-2 border border-gray-300" />
              <span className="flex">
                <span className="font-medium text-gray-500">Floor:&nbsp;</span>
                <span className="flex items-center text-gray-600">
                  {floor?.toFixed(2)}&nbsp;
                  <EthereumIcon height={14} width={14} />
                </span>
              </span>
              <div className="mx-2 border border-gray-300" />
              <span className="flex">
                <span className="font-medium text-gray-500">
                  24h Volume:&nbsp;
                </span>
                <span className="flex items-center text-gray-600">
                  {oneDayVolume?.toFixed(2)}&nbsp;
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
