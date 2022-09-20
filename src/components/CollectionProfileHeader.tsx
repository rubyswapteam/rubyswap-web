import React, { useState } from 'react';
import VerifiedBadgeIcon from '@/components/VerifiedBadgeIcon';
import EthereumIcon from '@/components/EthereumIcon';
import DiscordLogo from './DiscordLogo';
import EtherscanLogo from './EtherscanLogo';
import SocialsWrapper from './SocialsWrapper';
import TwitterLogo from './TwitterLogo';
import WebsiteIcon from './WebsiteIcon';

interface Props {
  collection: any;
  listingPrice?: any;
}

const CollectionProfileHeader: React.FC<Props> = ({
  collection,
  listingPrice,
}): JSX.Element => {
  function handleWatchlist() {
    // collection?.contractAddress;
  }
  const [seeMore, setSeeMore] = useState(false);

  return (
    <>
      <div className="mb-4 md:mb-0 flex-col w-full z-5 pb-2">
        <div className="flex flex-col md:flex-row items-start lg:items-center gap-5 justify-between">
          <div className="flex w-full justify-between">
            <div className="flex w-[70%] flex-col bg-white/75 dark:bg-black/75 p-4 rounded drop-shadow-md">
              <div className="flex items-center flex-shrink-1 truncate gap-x-4">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center bg-blue rounded-full">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={collection?.imageUrl}
                      alt={collection?.name}
                    />
                  </div>
                  <div className="truncate text-2xl font-semibold text-gray-700 dark:text-gray-200 ml-2 pt-2">
                    {collection?.name}
                  </div>
                  {['true', 'verified'].includes(
                    collection?.osVerificationState,
                  ) && (
                    <span className="ml-2">
                      <div className="h-6 w-6 flex-shrink-0 flex items-center justify-center bg-blue rounded-full">
                        <VerifiedBadgeIcon height={30} width={30} />
                      </div>
                    </span>
                  )}
                </div>
                <div className="flex gap-x-2 self-center">
                  <SocialsWrapper
                    link={
                      collection?.contractAddress &&
                      `https://etherscan.io/address/${collection?.contractAddress}`
                    }
                  >
                    <EtherscanLogo />
                  </SocialsWrapper>
                  <SocialsWrapper link={collection?.website}>
                    <WebsiteIcon />
                  </SocialsWrapper>
                  <SocialsWrapper link={collection?.discordUrl}>
                    <DiscordLogo />
                  </SocialsWrapper>
                  <SocialsWrapper
                    link={
                      collection?.twitterUsername &&
                      `https://twitter.com/${collection?.twitterUsername}`
                    }
                  >
                    <TwitterLogo />
                  </SocialsWrapper>
                </div>
                <div className="flex h-4 md:mb-0 text-xs self-center pt-0.5">
                  <span className="flex">
                    <span className="font-medium text-gray-500 dark:text-white">
                      Items:&nbsp;
                    </span>
                    <span className="flex items-center text-gray-600 dark:text-gray-100">
                      {collection?.totalSupply}
                    </span>
                  </span>
                  <div className="mx-2 border border-gray-300" />
                  <span className="flex">
                    <span className="font-medium text-gray-500 dark:text-white">
                      Floor:&nbsp;
                    </span>
                    <span className="flex items-center text-gray-600 dark:text-gray-100">
                      {(listingPrice && Number(listingPrice)?.toFixed(2)) ||
                        collection?.osFloorPrice?.toFixed(2)}
                      &nbsp;
                      <EthereumIcon height={14} width={14} />
                    </span>
                  </span>
                  <div className="mx-2 border border-gray-300" />
                  <span className="flex">
                    <span className="font-medium text-gray-500 dark:text-white">
                      24h Volume:&nbsp;
                    </span>
                    <span className="flex items-center text-gray-600 dark:text-gray-100">
                      {collection?.osOneDayVolume?.toFixed(2)}&nbsp;
                      <EthereumIcon height={14} width={14} />
                    </span>
                  </span>
                </div>
              </div>
              {collection?.description && (
                <div className="text-xs mt-4 mb-2">
                  {collection?.description?.length > 150 && !seeMore ? (
                    <div className="">
                      {collection?.description.substring(0, 150) + '...'}
                      <a
                        className="ml-2 text-blue-400 cursor-pointer"
                        onClick={() => setSeeMore(true)}
                      >
                        see more
                      </a>
                    </div>
                  ) : (
                    <>
                      {collection?.description}
                      {seeMore && (
                        <a
                          className="ml-2 text-blue-400 cursor-pointer"
                          onClick={() => setSeeMore(false)}
                        >
                          see less
                        </a>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-x-3">
              <button className="block text-right rounded-md p-2 border-white/20 border self-center dark:hover:bg-white/10">
                <div className="flex">
                  <div onClick={handleWatchlist} className="text-sm">
                    Add To Watchlist
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionProfileHeader;
