import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import EthereumIcon from './EthereumIcon';
import NftCollectionTableStandardCell from './NftCollectionTableStandardCell';
import StarIcon from './StarIcon';
import TableProgressBar from './TableProgressBar';

interface Props {
  trendingCollections: any[];
}

export default function TrendingNftCollectionTableBody(props: Props) {
  const [renderedData, setRenderedData] = useState<any[]>(
    props.trendingCollections.slice(0, 50),
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [newlyMintedTimestamp] = useState<number>(
    moment().unix() - 60 * 60 * 24 * 7,
  );

  const fetchMoreData = () => {
    if (props.trendingCollections && renderedData) {
      if (
        props.trendingCollections.length > 0 &&
        renderedData?.length >= props.trendingCollections?.length
      ) {
        setHasMore(false);
        return renderedData;
      }
      let newRenderedData = Object.assign(renderedData);
      newRenderedData = newRenderedData.concat(
        props.trendingCollections.slice(
          newRenderedData.length,
          newRenderedData.length + 30,
        ),
      );
      setRenderedData(newRenderedData);
      return newRenderedData;
    } else {
      return;
    }
  };

  return (
    <InfiniteScroll
      dataLength={renderedData.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      height={window.document.body.clientHeight}
      scrollThreshold={0.5}
      scrollableTarget="scrollableTarget"
      className="w-full"
    >
      {renderedData.map(
        (nftCollection) =>
          nftCollection.imageUrl && (
            <React.Fragment key={nftCollection.index + nftCollection.slug}>
              <Link
                key={nftCollection.id}
                href={`/collection/${nftCollection.slug}`}
                prefetch={false}
              >
                <tr
                  className="hover:bg-gray-50 dark:hover:bg-white/[.02] transition-colors cursor-pointer flex"
                  key={nftCollection.id}
                >
                  <>
                    <td className="py-3 pl-4 pr-7 text-sm sm:pl-6 w-[5%] self-center">
                      <div className="flex items-center">
                        <StarIcon />
                        {/* <StarIcon
                          className="text-black/10 dark:text-white/10 hover:bg-black/10 dark:hover:bg-white/10"
                          height={20}
                          width={20}
                        /> */}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 text-sm w-[5%] self-center">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={nftCollection.imageUrl}
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap w-[20%] self-center lg:flex">
                      <div className="text-gray-700 dark:text-white/90 flex items-center text-sm font-medium">
                        <div className="pt-1 whitespace-normal">
                          {nftCollection.name}
                        </div>
                        {nftCollection.osVerificationState == 'true' && (
                          <img
                            src="https://www.genie.xyz/svgs/verifiedBadge.svg"
                            className="ml-1"
                            style={{
                              height: '16px',
                              width: '16px',
                            }}
                            alt="verified badge"
                          />
                        )}
                        {nftCollection.firstmint &&
                          nftCollection.firstmint > newlyMintedTimestamp && (
                            <div
                              className="h-min self-center bg-gradient-to-r from-green-600 to-green-600/10 hover:to-green-600/50 ml-2 px-2 py-0.5 rounded-lg text-xs"
                              onClick={(event) => {
                                event.stopPropagation();
                              }}
                            >
                              New Mint
                            </div>
                          )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-700 dark:text-white/75 w-[10%] self-center">
                      <EthereumIcon width={16} height={16} />
                    </td>
                    <NftCollectionTableStandardCell
                      value={nftCollection.osOneDayVolume?.toFixed(2)}
                      includeIcon={true}
                    />
                    <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-700 dark:text-white/75 w-[10%] self-center">
                      <div className="flex items-center mt-1">
                        <div
                          className={
                            'pt-1 pb-0.5 px-3 rounded-full text-white ' +
                            (nftCollection.osOneDayChange > 0
                              ? 'bg-green-200 text-green-800 dark:bg-green-200/90'
                              : nftCollection.osOneDayChange == 0
                              ? 'bg-gray-200 text-gray-800 dark:bg-gray-200/90'
                              : 'bg-red-200 text-red-800 dark:bg-red-200/90')
                          }
                        >
                          {nftCollection.osOneDayChange > 10000
                            ? '> 9999%+'
                            : nftCollection.osOneDayChange
                                .toFixed(2)
                                .toString() + '%'}
                        </div>
                      </div>
                    </td>
                    <NftCollectionTableStandardCell
                      value={nftCollection.osFloorPrice?.toFixed(2)}
                      includeIcon={true}
                    />
                    <NftCollectionTableStandardCell
                      value={(
                        nftCollection.osOneDayVolume /
                        nftCollection.osOneDaySales
                      )?.toFixed(2)}
                      includeIcon={true}
                    />
                    <NftCollectionTableStandardCell
                      value={nftCollection.osOneDaySales}
                    />
                    <td className="whitespace-nowrap w-[10%] px-3 py-3 self-center">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium">
                        <div className="pt-1 whitespace-normal">
                          {nftCollection.numOwners}
                        </div>
                        {nftCollection?.totalSupply && (
                          <TableProgressBar
                            value={nftCollection.numOwners}
                            maxValue={nftCollection.totalSupply}
                          />
                        )}
                      </div>
                    </td>
                  </>
                </tr>
              </Link>
            </React.Fragment>
          ),
      )}
    </InfiniteScroll>
  );
}
