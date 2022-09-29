import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CollectionNftCard from './CollectionNftCard';
import { motion } from 'framer-motion';

interface Props {
  selectedNfts: any;
  totalListings: number;
  keyPrefix: any;
  collectionName?: string;
  tokenRanks: any;
}

const CollectionListings: React.FC<Props> = ({
  selectedNfts,
  totalListings = 0,
  keyPrefix = '',
  collectionName = '',
  tokenRanks = undefined,
}): JSX.Element => {
  // const duration = 200; // ms
  // const delay = 100;
  const [nfts, setNfts] = useState<any[]>(selectedNfts?.slice(0, 50));
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [height, setHeight] = useState(0);
  const router = useRouter();
  const { tab } = router.query;
  const ref = useRef(null);
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

  useEffect(() => {
    if (ref && ref?.current) {
      setHeight((ref.current as any).clientHeight);
    }
  });

  useEffect(
    () => () => {
      setNfts([]);
    },
    [],
  );

  useEffect(() => {
    setNfts([]);
    fetchMoreData([]);
  }, [tab]);

  const fetchMoreData = (varIn: any[] = nfts) => {
    if (
      selectedNfts.length > 0 &&
      nfts.length >= totalListings &&
      nfts.length >= selectedNfts.length &&
      nfts?.length == varIn?.length
    ) {
      setHasMore(false);
      return nfts;
    }
    let newHolders = Object.assign(varIn);
    newHolders = newHolders
      .concat(selectedNfts.slice(newHolders.length, newHolders.length + 50))
      .filter((x: any) => x.contract == selectedNfts[0].contract);
    setNfts(newHolders);
    return newHolders;
  };

  // const animStr = () => `fadeIn ${duration}ms ease-out ${delay}ms forwards`;

  return (
    <div
      className="w-full overflow-scroll max-h-screen h-screen mt-2 flex flex-col items-start flex-1"
      ref={ref}
      id="scroller"
      key={`nft-listings-${collectionName}`}
    >
      {selectedNfts && (
        <InfiniteScroll
          dataLength={nfts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="w-full justify-center flex my-5 py-5 border-t border-white/10">
              <button
                className="py-2 px-8 text-center rounded-md dark:bg-white/10 self-center"
                onClick={() => fetchMoreData()}
              >
                Load More
              </button>
            </div>
          }
          height={height - 100}
          className={
            'w-full flex flex-wrap h-full oveflow-visible pb-80 px-4 sm:px-6 md:px-8'
          }
          scrollableTarget="scroller"
          endMessage={
            <div className="w-full justify-center flex my-5 py-5 border-t border-white/10">
              <div className="py-2 px-8 text-center rounded-md dark:bg-white/10 self-center">
                End of Listings
              </div>
            </div>
          }
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={'flex flex-wrap w-full'}
            key={`clmd-${collectionName}`}
            // key={`${keyPrefix}-${collectionName}`}
          >
            {nfts &&
              nfts.map((nft: any, i: number) => (
                <motion.div
                  variants={listItem}
                  key={`${keyPrefix}-${nft?.tokenId}-${nft?.contract}-${nft?.chainId}-${nft?.name}-${i}`}
                  // style={{ animation: animStr(i) }}
                  className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2"
                >
                  <CollectionNftCard
                    selectedNft={nft}
                    collectionName={collectionName}
                    rank={
                      tokenRanks &&
                      tokenRanks?.ranks &&
                      tokenRanks?.ranks[nft.tokenId]
                    }
                    rankColor={
                      tokenRanks &&
                      tokenRanks?.ranks &&
                      tokenRanks?.ranks[nft?.tokenId] &&
                      tokenRanks?.ranks[nft?.tokenId] > tokenRanks?.tiers[2]
                        ? 'rgba(70, 70, 70, 1)'
                        : tokenRanks?.ranks[nft?.tokenId] > tokenRanks?.tiers[1]
                        ? 'rgba(0, 0, 0, 1)'
                        : tokenRanks?.ranks[nft?.tokenId] > tokenRanks?.tiers[0]
                        ? 'rgba(249, 115, 22, 1)'
                        : 'rgba(239, 68, 68, 1)'
                    }
                  />
                </motion.div>
              ))}
          </motion.div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default CollectionListings;
