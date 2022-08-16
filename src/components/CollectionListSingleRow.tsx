import { INft } from '@/utils/nftUtils';
import React from 'react';
import CollectionNftCard from './CollectionNftCard';
import { motion } from 'framer-motion';
import { animations } from '@/utils/framerAnimations';

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
          <motion.div
            variants={animations.stagger}
            className="w-full grid grid-cols-6 gap-y-10 gap-x-5 grid-cols-6"
          >
            {[...selectedNfts].map((selectedNft: any) => (
              <CollectionNftCard
                key={selectedNft?.contract + selectedNft?.tokenId}
                selectedNft={selectedNft}
                collectionName={collectionName}
                chainId={chainId}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CollectionListSingleRow;
