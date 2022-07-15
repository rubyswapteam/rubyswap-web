import { INft } from '@/utils/nftUtils';
import React from 'react';
import { Transition } from 'react-transition-group';
import CollectionNftCard from './CollectionNftCard';

interface Props {
  selectedNfts: INft[];
  scroll?: boolean;
}

const CollectionList: React.FC<Props> = ({
  selectedNfts,
  scroll,
}): JSX.Element => {
  const duration = 200; // ms
  const delay = 100;
  const animStr = (i: number) =>
    `fadeIn ${duration}ms ease-out ${delay}ms forwards`;
  return (
    <div className="w-full overflow-scroll h-inherit">
      <div className="mt-6 w-full flex flex-col items-start flex-1 px-4 sm:px-6 md:px-8">
        {selectedNfts && (
          <div className="grid grid-cols-1 gap-y-10 gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-4 pb-80">
            {selectedNfts.map((selectedNft: INft, i: number) => (
              <div
                className="opacity-0"
                key={i}
                style={{ animation: animStr(i) }}
              >
                <CollectionNftCard selectedNft={selectedNft} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionList;
