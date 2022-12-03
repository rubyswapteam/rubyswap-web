import { trimHex } from '@/utils/nftUtils';
import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import DiscordLogo from './DiscordLogo';
import EthereumIcon from './EthereumIcon';
import EtherscanLogo from './EtherscanLogo';
import NftCollectionTableStandardCell from './NftCollectionTableStandardCell';
import SocialsWrapper from './SocialsWrapper';
import StarIcon from './StarIcon';
import TableProgressBar from './TableProgressBar';
import TwitterLogo from './TwitterLogo';
import WebsiteIcon from './WebsiteIcon';
import VerifiedBadgeIcon from '@/components/VerifiedBadgeIcon';

interface Props {
  userCollections: any[];
}

export default function OwnedNftCollectionTableBody(props: Props) {
  const [renderedData, setRenderedData] = useState<any[]>(
    props.userCollections
      .slice(0, 150)
      .sort((a, b) => b.stats.one_day_volume - a.stats.one_day_volume),
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [newlyMintedTimestamp] = useState<number>(
    moment().unix() - 60 * 60 * 24 * 7,
  );

  const fetchMoreData = () => {
    if (props.userCollections && renderedData) {
      if (
        props.userCollections.length > 0 &&
        renderedData?.length >= props.userCollections?.length
      ) {
        setHasMore(false);
        return renderedData;
      }
      let newRenderedData = Object.assign(renderedData);
      newRenderedData = newRenderedData.concat(
        props.userCollections.slice(
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
      className="w-full pb-80"
    >
      {renderedData.map(
        (collection) =>
          collection?.image_url &&
          collection?.primary_asset_contracts[0]?.address && (
            <React.Fragment key={collection.index + collection.slug}>
              <Link
                key={collection.id}
                href={`/collection/${collection.slug}`}
                prefetch={false}
              >
                <tr
                  className="hover:bg-gray-50 dark:hover:bg-white/[.05] transition-all cursor-pointer flex"
                  key={collection.id}
                >
                  <>
                    <td className="py-1 pl-4 pr-7 text-sm sm:pl-6 w-[5%] self-center">
                      <div className="flex items-center">
                        <StarIcon />
                        {/* <StarIcon
                          className="text-black/10 dark:text-white/10 hover:bg-black/10 dark:hover:bg-white/10"
                          height={20}
                          width={20}
                        /> */}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-1 text-sm w-[5%] self-center">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={collection.image_url}
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap w-[20%] self-center lg:flex">
                      <div className="text-gray-700 dark:text-white/90 flex items-center text-sm font-medium">
                        <div>
                          <div className="flex items-center">
                            <div className="pt-1 whitespace-normal">
                              {collection.name}
                            </div>
                            {collection.safelist_request_status ==
                              'verified' && (
                              <div className="ml-1">
                                <VerifiedBadgeIcon height={16} width={16} />
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-white/70">
                            {trimHex(
                              collection?.primary_asset_contracts[0]?.address,
                            )}
                          </div>
                        </div>
                        {collection.firstmint &&
                          collection.firstmint > newlyMintedTimestamp && (
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
                    <td className="whitespace-normal flex-wrap gap-y-2 px-3 py-1 text-sm font-medium text-gray-700 dark:text-white/75 w-[10%] self-center flex gap-x-2">
                      <SocialsWrapper
                        link={
                          collection.primary_asset_contracts[0].address &&
                          `https://etherscan.io/address/${collection.primary_asset_contracts[0].address}`
                        }
                      >
                        <EtherscanLogo />
                      </SocialsWrapper>
                      <SocialsWrapper link={collection.external_url}>
                        <WebsiteIcon />
                      </SocialsWrapper>
                      <SocialsWrapper link={collection.discord_url}>
                        <DiscordLogo />
                      </SocialsWrapper>
                      <SocialsWrapper
                        link={
                          collection.twitterUsername &&
                          `https://twitter.com/${collection.twitter_username}`
                        }
                      >
                        <TwitterLogo />
                      </SocialsWrapper>
                    </td>
                    <td className="whitespace-nowrap px-3 py-1 text-sm font-medium text-gray-700 dark:text-white/75 w-[10%] self-center">
                      <EthereumIcon width={16} height={16} />
                    </td>
                    <td className="whitespace-nowrap w-[10%] px-3 py-1 self-center">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium">
                        <div className="pt-1 whitespace-normal flex">
                          {collection.stats.one_day_volume.toFixed(2)}
                          <EthereumIcon width={16} height={16} />
                        </div>
                        <div
                          className={
                            'w-fit text-white text-xs flex ' +
                            (collection?.stats.one_day_change == 0
                              ? ' text-gray-600 dark:text-gray-200/90'
                              : collection?.stats.one_day_change > 0
                              ? ' text-green-600 dark:text-green-200/90'
                              : ' text-red-600 dark:text-red-200/90')
                          }
                        >
                          {collection.stats.one_day_change > 10000
                            ? '> 9999%+'
                            : collection.stats.one_day_change
                                .toFixed(2)
                                .toString() + '%'}
                        </div>
                      </div>
                    </td>
                    <NftCollectionTableStandardCell
                      value={collection.stats.average_price?.toFixed(2)}
                      includeIcon={true}
                    />
                    <NftCollectionTableStandardCell
                      value={collection.stats.one_day_sales}
                    />
                    <NftCollectionTableStandardCell
                      value={collection.owned_asset_count}
                    />
                    <td className="whitespace-nowrap w-[10%] px-3 py-1 self-center">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-sm font-medium">
                        <div className="pt-1 whitespace-normal">
                          {collection?.stats?.num_owners}
                        </div>
                        {collection?.stats?.total_supply && (
                          <TableProgressBar
                            value={collection?.stats?.num_owners}
                            maxValue={collection?.stats?.total_supply}
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
