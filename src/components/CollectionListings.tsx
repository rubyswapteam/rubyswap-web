import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CollectionNftCard from './CollectionNftCard';
import { motion } from 'framer-motion';
import { animations } from '@/utils/framerAnimations';

interface Props {
  selectedNfts: any;
  totalListings: number;
  scroll?: boolean;
}

const CollectionListings: React.FC<Props> = ({
  selectedNfts,
  totalListings = 0,
  scroll,
}): JSX.Element => {
  const duration = 200; // ms
  const delay = 100;
  const [nfts, setNfts] = useState<any[]>(selectedNfts?.slice(0, 50));
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [height, setHeight] = useState(0);
  const router = useRouter();
  const { tab } = router.query;
  const ref = useRef(null);

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

  const animStr = (i: number) =>
    `fadeIn ${duration}ms ease-out ${delay}ms forwards`;
  return (
    <div
      className="w-full overflow-scroll h-inherit mt-2 flex flex-col items-start flex-1 pb-96"
      ref={ref}
      id="scroller"
    >
      {selectedNfts && (
        <InfiniteScroll
          dataLength={nfts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="w-full justify-center flex my-5 py-5 border-t border-white/10">
              <button
                className="py-2 px-8 text-center rounded-md dark:bg-white/10"
                onClick={() => fetchMoreData()}
              >
                Load More
              </button>
            </div>
          }
          height={height - 100}
          className={'w-full flex flex-wrap h-full oveflow-visible pb-80'}
          scrollableTarget="scroller"
          endMessage={
            <div className="w-full justify-center flex my-5 py-5 border-t border-white/10">
              <div className="py-2 px-8 text-center rounded-md dark:bg-white/10">
                End of Listings
              </div>
            </div>
          }
        >
          <motion.div
            variants={animations.stagger}
            className={'flex flex-wrap w-full'}
          >
            {nfts &&
              nfts.map((nft: any, i: number) => (
                <motion.div
                  variants={animations.fadeInUp}
                  key={nft?.tokenId + nft?.contract + nft?.chainId + nft?.name}
                  style={{ animation: animStr(i) }}
                  className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2"
                >
                  <CollectionNftCard selectedNft={nft} />
                </motion.div>
              ))}
          </motion.div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default CollectionListings;
