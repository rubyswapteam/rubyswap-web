import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CollectionNftCard from './CollectionNftCard';

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
      className="w-full overflow-scroll h-inherit mt-6 flex flex-col items-start flex-1 pb-96"
      ref={ref}
      id="scroller"
    >
      {selectedNfts && (
        <InfiniteScroll
          dataLength={nfts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<button onClick={() => fetchMoreData()}>Load More</button>}
          height={height - 100}
          className={
            'w-full px-4 sm:px-6 md:px-8 grid grid-cols-1 gap-y-10 gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-4 h-full oveflow-visible pb-80"'
          }
          scrollableTarget="scroller"
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {nfts &&
            nfts.map((nft: any, i: number) => (
              <div
                // className={'opacity-0 ' + display}
                key={nft?.tokenId + nft?.contract + nft?.chainId + nft?.name}
                style={{ animation: animStr(i) }}
              >
                <CollectionNftCard selectedNft={nft} />
              </div>
            ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default CollectionListings;
