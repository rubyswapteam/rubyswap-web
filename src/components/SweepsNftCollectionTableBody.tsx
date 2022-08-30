import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import DiscordLogo from './DiscordLogo';
import EthereumIcon from './EthereumIcon';
import EtherscanLogo from './EtherscanLogo';
import SocialsWrapper from './SocialsWrapper';
import StarIcon from './StarIcon';
import TableChevronDown from './TableChevronDown';
import TableChevronFlat from './TableChevronFlat';
import TableChevronUp from './TableChevronUp';
import TableProgressBar from './TableProgressBar';
import TwitterLogo from './TwitterLogo';
import WebsiteIcon from './WebsiteIcon';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { getTrimmedAddressEllipsisMiddle } from '@/utils/nftUtils';

interface Props {
  data: any[];
  keyPrefix: string;
}

export default function SweepsNftCollectionTableBody(props: Props) {
  const [renderedData, setRenderedData] = useState<any[]>(
    props.data.slice(0, 50),
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [newlyMintedTimestamp] = useState<number>(
    moment().unix() - 60 * 60 * 24 * 7,
  );
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
            <React.Fragment
              key={
                props.keyPrefix +
                row.address +
                row.index +
                row.slug +
                'fragment'
              }
            >
              <Link
                key={
                  props.keyPrefix + row.address + row.index + row.slug + 'link'
                }
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
                    <td className="whitespace-nowrap w-[20%] self-center lg:flex">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium">
                        <div className="pt-1 whitespace-normal">{row.name}</div>
                        <div className="text-xs dark:text-white/60">
                          {row.txnTime
                            ? moment.unix(row.txnTime).fromNow()
                            : '-'}
                        </div>
                      </div>
                      {row.firstmint && row.firstmint > newlyMintedTimestamp && (
                        <div
                          className="h-min self-center bg-gradient-to-r from-green-600 to-green-600/10 hover:to-green-600/50 ml-2 px-2 py-0.5 rounded-lg text-xs"
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          New Mint
                        </div>
                      )}
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
                    <td className="whitespace-nowrap w-[10%] px-3 py-3 self-center">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium">
                        <div className="pt-1 whitespace-normal">
                          {row.numItems + ' items'}
                          <div className="text-xs flex">
                            <div className="">
                              {Math.floor(row.cost * 1000) / 1000}
                            </div>
                            <div className="pl-0.5">
                              <EthereumIcon width={12} height={12} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap w-[10%] px-3 py-3 self-center">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium lg: flex">
                        <Jazzicon
                          diameter={20}
                          seed={jsNumberForAddress(row.buyer)}
                        />
                        <div className="pt-1 lg:pl-1 whitespace-normal">
                          {getTrimmedAddressEllipsisMiddle(row.buyer, 4)}
                        </div>
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
                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-700 dark:text-white/75 w-[10%] self-center">
                      {!row.prevRank || row.currRank < row.prevRank ? (
                        <TableChevronUp
                          class={'text-green-600 dark:text-green-300/95'}
                        />
                      ) : row.currRank > row.prevRank ? (
                        <TableChevronDown
                          class={'text-red-600 dark:text-red-300/95'}
                        />
                      ) : (
                        <TableChevronFlat
                          class={'text-gray-600 dark:text-gray-300/95'}
                        />
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
