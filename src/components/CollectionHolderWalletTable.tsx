import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import InfiniteScroll from 'react-infinite-scroll-component';
interface Props {
  holdersIn: any[];
  total: number;
}

const CollectionHolderWalletTable: React.FC<Props> = ({
  holdersIn,
  total,
}): JSX.Element => {
  const [holders, setHolders] = useState<any[]>(holdersIn.slice(0, 50));
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  const fetchMoreData = () => {
    if (holdersIn.length > 0 && holders.length >= holdersIn.length) {
      setHasMore(false);
      return holders;
    }
    let newHolders = Object.assign(holders);
    newHolders = newHolders.concat(
      holdersIn.slice(newHolders.length, newHolders.length + 50),
    );
    setHolders(newHolders);
    return newHolders;
  };

  const addToWatchlist = (address: string) => {
    console.log(address);
  };

  useEffect(() => {
    if (ref && ref?.current) {
      setHeight((ref.current as any).clientHeight);
    }
  });

  return (
    <table className="overflow-hidden inline-block w-full h-full border-r-2 border-gray-100 dark:border-white/10">
      <thead className="flex w-full">
        <tr className="flex w-full">
          <div className="w-[5%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            >
              {' '}
            </th>
          </div>
          <div className="w-[40%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            >
              Wallet
            </th>
          </div>
          <div className="w-[10%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            >
              NFT Count
            </th>
          </div>
          <div className="w-[10%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            >
              Collection %
            </th>
          </div>
          <div className="w-[35%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            ></th>
          </div>
        </tr>
      </thead>
      <tbody
        id="chwt-tb"
        ref={ref}
        className="h-full overflow-scroll bg-white dark:bg-white/5 block w-full"
      >
        {holders && (
          <InfiniteScroll
            dataLength={holders.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollThreshold={0.5}
            scrollableTarget={'chwt-tb'}
            endMessage={
              <p className="text-center pb-80 pt-4">
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {holders.map((holder: any) => (
              <tr
                key={holder.ownerAddress}
                className="flex hover:bg-black/5 dark:hover:bg-black/75"
              >
                <div className="w-[5%] self-center">
                  <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                    <Jazzicon
                      diameter={20}
                      seed={jsNumberForAddress(holder.ownerAddress)}
                    />
                  </td>
                </div>
                <div className="w-[40%] self-center">
                  <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                    {holder.ownerAddress}
                  </td>
                </div>
                <div className="w-[10%] self-center">
                  <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                    {holder.tokenBalance}
                  </td>
                </div>
                <div className="w-[10%] self-center">
                  <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                    {((holder.tokenBalance / total) * 100).toFixed(2)}%
                  </td>
                </div>
                <div className="w-[35%] self-center">
                  <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80 flex justify-evenly">
                    <button
                      className={
                        'text-gray-500 hover:text-gray-700 x-3 py-2 font-medium text-sm rounded-md ml-8'
                      }
                      onClick={() => {
                        addToWatchlist(holder.ownerAddress);
                      }}
                    >
                      {'Add to Watchlist'}
                    </button>
                    <Link href={`/wallet/${holder.ownerAddress}`} passHref>
                      <a
                        className={
                          'text-gray-500 hover:text-gray-700 x-3 py-2 font-medium text-sm rounded-md'
                        }
                      >
                        {'View Wallet'}
                      </a>
                    </Link>
                  </td>
                </div>
              </tr>
            ))}
          </InfiniteScroll>
        )}
      </tbody>
    </table>
  );
};

export default CollectionHolderWalletTable;
