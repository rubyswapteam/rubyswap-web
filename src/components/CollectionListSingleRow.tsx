import { INft } from '@/utils/nftUtils';
import React from 'react';
import CollectionNftCard from './CollectionNftCard';

interface Props {
  selectedNfts: INft[];
}

const CollectionListSingleRow: React.FC<Props> = ({
  selectedNfts,
}): JSX.Element => {
  return (
    <div>
      <div className="mt-6 w-full flex flex-col items-start flex-1 overflow-scroll px-4 sm:px-6 md:px-8">
        {selectedNfts && (
          <div className="w-[250%] lg:w-[200%] xl:w-[166%] grid grid-cols-1 gap-y-10 gap-x-3 grid-cols-10">
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

export default CollectionListSingleRow;
