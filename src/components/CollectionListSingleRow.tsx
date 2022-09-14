import { animations } from '@/utils/framerAnimations';
import { motion } from 'framer-motion';
import React from 'react';
import CollectionNftCard from './CollectionNftCard';

interface Props {
  selectedNfts: any[];
  collectionName?: string;
  chainId?: number;
  keyPrefix?: string;
  selectDisabled?: boolean;
}

const CollectionListSingleRow: React.FC<Props> = ({
  selectedNfts,
  collectionName,
  chainId,
  keyPrefix,
  selectDisabled,
}): JSX.Element => {
  return (
    <div>
      <div className="w-full flex flex-col items-start flex-1 overflow-hidden py-8 px-4 sm:px-6 md:px-8">
        {selectedNfts && (
          <motion.div
            key={keyPrefix + selectedNfts[0]?.contract}
            variants={animations.stagger}
            className="w-full grid grid-cols-6 gap-y-10 gap-x-5 grid-cols-6"
          >
            {[...selectedNfts].map((selectedNft: any, i: number) => (
              <CollectionNftCard
                key={selectedNft?.contract + selectedNft?.tokenId + i}
                selectedNft={selectedNft}
                collectionName={collectionName}
                chainId={chainId}
                selectDisabled={selectDisabled}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CollectionListSingleRow;
