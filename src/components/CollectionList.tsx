import { motion } from 'framer-motion';
import React from 'react';
import CollectionNftCard from './CollectionNftCard';

interface Props {
  selectedNfts: any;
  scroll?: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.03,
    },
  },
};

const listItem = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const CollectionList: React.FC<Props> = ({
  selectedNfts,
  scroll,
}): JSX.Element => {
  return (
    <motion.div
      // exit={{ opacity: 0 }}
      initial={{ opacity: 'initial' }}
      animate={{ opacity: 'animate' }}
      className="w-full overflow-scroll h-inherit"
    >
      <div className="mt-6 w-full flex flex-col items-start flex-1 px-4 sm:px-6 md:px-8">
        {selectedNfts && selectedNfts.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap w-full pb-80"
            key={selectedNfts[0].contractAddress}
          >
            {selectedNfts.map((nft: any) => (
              <motion.div
                className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2"
                variants={listItem}
                key={nft.tokenId + nft.chainId + nft?.name}
              >
                <CollectionNftCard selectedNft={nft} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CollectionList;
