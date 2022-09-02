import { getTrimmedAddressEllipsisMiddle } from '@/utils/nftUtils';
import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import DiscordLogo from './DiscordLogo';
import EthereumIcon from './EthereumIcon';
import EtherscanLogo from './EtherscanLogo';
import SocialsWrapper from './SocialsWrapper';
import StarIcon from './StarIcon';
import TableProgressBar from './TableProgressBar';
import TwitterLogo from './TwitterLogo';
import WebsiteIcon from './WebsiteIcon';

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
          row.txn && (
            <React.Fragment
              key={
                props.keyPrefix +
                row.collections[0] +
                row.index +
                row.slug +
                'fragment'
              }
            >
              <Link
                key={
                  props.keyPrefix + row.address + row.index + row.slug + 'link'
                }
                href={`/collection/${row.slug || row.collections[0]}`}
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
                        {row.imageUrl || row.collectionImageUrl ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={row?.imageUrl || row?.collectionImageUrl}
                            alt=""
                          />
                        ) : (
                          <Jazzicon
                            diameter={28}
                            seed={jsNumberForAddress(row.buyer)}
                          />
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap w-[20%] self-center lg:flex">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium">
                        <div className="pt-1 whitespace-normal">
                          {row.name || row.collectionName}
                        </div>
                        <div className="text-xs dark:text-white/60">
                          {getTrimmedAddressEllipsisMiddle(
                            row.contractAddress || row.collections[0],
                          )}
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
                    <td className="whitespace-normal flex-wrap gap-y-2 px-3 py-3 text-sm font-medium text-gray-700 dark:text-white/75 w-[10%] self-center flex gap-x-2">
                      <SocialsWrapper
                        link={
                          (row.contractAddress || row.collections[0]) &&
                          `https://etherscan.io/address/${
                            row.contractAddress || row.collections[0]
                          }`
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
                        <div className="pt-1 lg:pl-1 whitespace-normal hover:text-yellow-300/90">
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
                          {row.txnTime
                            ? moment.unix(row.txnTime).fromNow()
                            : '-'}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap w-[20%] px-3 py-3 self-center">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium">
                        <button
                          className="hover:bg-white/5 border-white/50 border bg-purple/30  dark:hover:bg-purple/20 px-1.5 py-1 rounded-lg"
                          onClick={(event) => event.stopPropagation()}
                        >
                          Details
                        </button>
                        <div className="inline-block">
                          <SocialsWrapper
                            link={
                              row.txn && `https://etherscan.io/tx/${row.txn}`
                            }
                          >
                            <button
                              className="hover:bg-black/10 bg-black/20 dark:bg-white/20  dark:hover:bg-white/10 px-1.5 py-1 rounded-lg ml-2"
                              onClick={(event) => event.stopPropagation()}
                            >
                              Etherscan
                            </button>
                          </SocialsWrapper>
                        </div>
                        <Link href={`/collection/${row.slug}?tab=listings`}>
                          <button
                            className="hover:bg-black/20 bg-blue-600/50 dark:hover:bg-blue-600/40 px-1.5 py-1 rounded-lg ml-2"
                            onClick={(event) => event.stopPropagation()}
                          >
                            Listings
                          </button>
                        </Link>
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
