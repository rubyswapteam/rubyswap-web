import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import EthereumIcon from './EthereumIcon';
import NftCollectionTableStandardCell from './NftCollectionTableStandardCell';
import StarIcon from './StarIcon';
import TableProgressBar from './TableProgressBar';
import TableChevronUp from './TableChevronUp';
import TableChevronDown from './TableChevronDown';
import EtherscanLogo from './EtherscanLogo';
import WebsiteIcon from './WebsiteIcon';
import DiscordLogo from './DiscordLogo';
import TwitterLogo from './TwitterLogo';
import SocialsWrapper from './SocialsWrapper';

interface Props {
  data: any[];
}

export default function MintingCollectionTableBody(props: Props) {
  const [renderedData, setRenderedData] = useState<any[]>(
    props.data.slice(0, 50),
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const fetchMoreData = () => {
    if (props.data && renderedData) {
      if (props.data.length > 0 && renderedData?.length >= props.data?.length) {
        setHasMore(false);
        return renderedData;
      }
      let newRenderedData = Object.assign(renderedData);
      newRenderedData = newRenderedData.concat(
        props.data.slice(newRenderedData.length, newRenderedData.length + 30),
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
        (row) =>
          row.imageUrl && (
            <React.Fragment key={row.index + row.slug}>
              <Link
                key={row.id}
                href={`/collection/${row.slug}`}
                prefetch={false}
              >
                <tr
                  className="hover:bg-gray-50 dark:hover:bg-white/[.02] transition-colors cursor-pointer flex"
                  key={row.id}
                >
                  <>
                    <td className="py-3 pl-4 pr-7 text-sm sm:pl-6 w-[5%] self-center">
                      <div className="flex items-center">
                        <StarIcon />
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 text-sm w-[5%] self-center">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={row.imageUrl}
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap w-[20%] self-center">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium">
                        <div className="pt-1 whitespace-normal">{row.name}</div>
                        <div className="text-xs dark:text-white/60">
                          {row.firstMint
                            ? moment.unix(row.firstMint).fromNow()
                            : '-'}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-700 dark:text-white/75 w-[10%] self-center flex gap-x-2">
                      <SocialsWrapper
                        link={
                          row.address &&
                          `https://etherscan.io/address/${row.address}`
                        }
                      >
                        <EtherscanLogo />
                      </SocialsWrapper>
                      <SocialsWrapper link={row.website}>
                        <WebsiteIcon />
                      </SocialsWrapper>
                      <SocialsWrapper link={row.discordUrl}>
                        <DiscordLogo />
                      </SocialsWrapper>
                      <SocialsWrapper
                        link={
                          row.twitterUsername &&
                          `https://twitter.com/${row.twitterUsername}`
                        }
                      >
                        <TwitterLogo />
                      </SocialsWrapper>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-700 dark:text-white/75 w-[10%] self-center">
                      <EthereumIcon width={16} height={16} />
                    </td>

                    <td className="whitespace-nowrap w-[10%] px-3 py-3 self-center">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium">
                        <div className="pt-1 whitespace-normal">
                          {row.total}
                        </div>
                        <div
                          className={
                            'w-fit text-white text-xs flex ' +
                            (row?.total == row?.prevtotal || !row?.prevtotal
                              ? ' text-gray-600 dark:text-gray-200/90'
                              : row?.total > row?.prevtotal
                              ? ' text-green-600 dark:text-green-200/90'
                              : ' text-red-600 dark:text-red-200/90')
                          }
                        >
                          {!row?.prevtotal
                            ? '-'
                            : row?.total / row?.prevtotal > 100
                            ? '> 9999%'
                            : ((row?.total / row?.prevtotal - 1) * 100)
                                ?.toFixed(2)
                                .toString() + '%'}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap w-[10%] px-3 py-3 self-center">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium">
                        <div className="pt-1 whitespace-normal">
                          {row.totalSupply || row.total + row.prevtotal}
                          {row.maxSupply && (
                            <div className="text-xs">
                              {'(' +
                                Math.floor(
                                  ((row.totalSupply ||
                                    row.total + row.prevtotal) /
                                    row.maxSupply) *
                                    100,
                                ) +
                                '%) of '}
                              {row.maxSupply}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap w-[10%] px-3 py-3 self-center">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium">
                        <div className="pt-1 whitespace-normal">
                          {row.totalUniqueMinters}
                        </div>
                        <TableProgressBar
                          value={row?.totalUniqueMinters}
                          maxValue={row?.totalSupply}
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap w-[10%] px-3 py-3 self-center">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium">
                        <div className="pt-1 whitespace-normal">
                          {row.numOwners}
                        </div>
                        <TableProgressBar
                          value={row.numOwners}
                          maxValue={row?.totalSupply}
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-700 dark:text-white/75 w-[10%] self-center">
                      {!row.prevRank || row.currRank < row.prevRank ? (
                        <TableChevronUp />
                      ) : (
                        <TableChevronDown />
                      )}
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
