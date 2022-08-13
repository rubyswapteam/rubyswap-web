import { INft } from '@/utils/nftUtils';
import React from 'react';
import CollectionNftCard from './CollectionNftCard';

interface Props {
  selectedNfts: any[];
  collectionName?: string;
  chainId?: number;
}

const CollectionListSingleRow: React.FC<Props> = ({
  selectedNfts,
  collectionName,
  chainId,
}): JSX.Element => {
  return (
    <div>
      <div className="w-full flex flex-col items-start flex-1 overflow-hidden py-8 px-4 sm:px-6 md:px-8">
        {selectedNfts && (
          <div className="w-full grid grid-cols-6 gap-y-10 gap-x-5 grid-cols-10">
            {[...selectedNfts].map((selectedNft: any) => (
              <CollectionNftCard
                key={selectedNft?.contract + selectedNft?.tokenId}
                selectedNft={selectedNft}
                collectionName={collectionName}
                chainId={chainId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionListSingleRow;
