import { INft } from '@/utils/nftUtils';
import React from 'react';
import CollectionNftCard from './CollectionNftCard';

interface Props {
  selectedNfts: INft[];
}

const CollectionList: React.FC<Props> = ({ selectedNfts }): JSX.Element => {
  return (
    <div>
      <div className="mt-6 w-full flex flex-col items-start flex-1 px-4 sm:px-6 md:px-8">
        {selectedNfts && (
          <div className="grid grid-cols-1 gap-y-10 gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-4">
            {selectedNfts.map((selectedNft: INft) => (
              <CollectionNftCard
                key={selectedNft.id}
                selectedNft={selectedNft}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionList;
