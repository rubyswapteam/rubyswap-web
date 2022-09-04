import React from 'react';
import VerifiedBadgeIcon from '@/components/VerifiedBadgeIcon';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import EthereumIcon from './EthereumIcon';

interface Props {
  name?: string;
  wallet?: string;
  image?: string;
  walletDetails?: any;
}

const UserProfileHeader: React.FC<Props> = ({
  name,
  wallet,
  image = '',
  walletDetails,
}): JSX.Element => {
  return (
    <>
      <div className="mb-4 md:mb-0 flex-col w-full z-5 pb-6">
        <div className="flex flex-col md:flex-row items-start lg:items-center gap-2 justify-between">
          <div className="flex flex-col w-full">
            <div className="flex w-full justify-between">
              <div className="flex items-center flex-shrink-1 truncate">
                <div className="flex-shrink-0 flex items-center justify-center bg-blue rounded-full">
                  {wallet && (
                    <Jazzicon diameter={50} seed={jsNumberForAddress(wallet)} />
                  )}
                </div>
                <div className="ml-2">
                  <div className="flex">
                    <div className="truncate text-2xl font-semibold text-gray-700 dark:text-white">
                      {name}
                    </div>
                    <span className="ml-2">
                      <div className="h-6 w-6 flex-shrink-0 flex items-center justify-center bg-blue rounded-full">
                        <VerifiedBadgeIcon height={30} width={30} />
                      </div>
                    </span>
                  </div>
                  <div className="flex my-2 h-4 md:mb-0 text-xs">
                    <span className="flex">
                      <span className="font-medium text-gray-500 dark:text-white/60">
                        {wallet}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-3">
                {walletDetails?.eth_value && (
                  <div className="flex text-right rounded-md p-2 border-white/20 border self-center">
                    <div className="text-sm dark:text-white/75 flex">
                      {'NFT Valuation ≈'}
                      <div className="text-white ml-1">
                        {Math.floor(walletDetails?.eth_value * 1000) / 1000}
                      </div>
                      <EthereumIcon height={15} width={15} />
                    </div>
                  </div>
                )}
                <button className="block text-right rounded-md p-2 border-white/20 border self-center dark:hover:bg-white/10">
                  <div className="flex">
                    <div className="text-sm">Add To Watchlist</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileHeader;
