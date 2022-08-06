import React, { useState } from 'react';
import { INft, NftMarketplace } from '@/utils/nftUtils';
import OpenSeaIcon from '@/components/OpenseaIcon';
import PlusIcon from '@/components/PlusIcon';
import EthereumIcon from '@/components/EthereumIcon';
import X2Y2Icon from './X2Y2Icon';
import LooksRareIcon from './LooksRareIcon';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  selectedNft: any;
  collectionName?: string;
  chainId?: number;
}

const CollectionNftCard: React.FC<Props> = ({
  selectedNft,
  collectionName,
  chainId,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="group relative">
      <div
        className={
          'drop-shadow-md rounded-xl text-sm bg-white dark:bg-white/5 hover:drop-shadow-xl'
        }
      >
        <div
          className={
            'w-full min-h-80 flex flex-col relative aspect-square overflow-hidden lg:h-50 lg:aspect-none cursor-pointer rounded-t-xl'
          }
        >
          {(
            <img
              src={selectedNft.image}
              alt={selectedNft.imageAlt}
              className="w-full h-full transition-all hover:scale-110 object-center object-cover"
              style={{ display: isLoading ? 'none' : 'block' }}
              onLoadStart={() => setIsLoading(true)}
              onLoad={() => setIsLoading(false)}
            />
          ) || <Skeleton />}
          <a
            target="_blank"
            rel="_ noreferrer"
            className="absolute left-3 top-3 w-12 h-12"
          >
            {selectedNft.marketplace === NftMarketplace.OPENSEA && (
              <div className="rounded-full">
                <OpenSeaIcon height={20} width={20} />
              </div>
            )}
            {selectedNft.marketplace === NftMarketplace.LOOKSRARE && (
              <div className="rounded-full">
                <LooksRareIcon height={20} width={20} />
              </div>
            )}
            {selectedNft.marketplace === NftMarketplace.X2Y2 && (
              <div className="rounded-full">
                <X2Y2Icon height={20} width={20} />
              </div>
            )}
            {selectedNft.marketplace === NftMarketplace.NFTRADE && (
              <div className="rounded-full">
                <OpenSeaIcon height={20} width={20} />
              </div>
            )}
            {selectedNft.marketplace === NftMarketplace.SEAPORT && (
              <div className="rounded-full">
                <OpenSeaIcon height={20} width={20} />
              </div>
            )}
          </a>
          <div className="absolute right-2 top-2 w-5 h-5 flex items-center justify-center group-hover:opacity-100 transition-opacity duration-200 transition opacity-0">
            <div className="absolute opacity-20 rounded-full w-full h-full left-0 top-0 bg-white" />
            <div className="w-3 h-3">
              <PlusIcon />
            </div>
          </div>
          {/* This should be the rarity (where it's known) */}
          <span className="border-2 border-white rounded-md absolute left-3 bottom-3 dark:bg-black dark:text-white bg-white text-black h-6 px-2 font-bold text-xs flex items-center justify-center">
            <div>#&nbsp;{selectedNft.rarityScore || selectedNft.tokenId}</div>
          </span>
        </div>
        <div className="p-2">
          <div className="justify-between flex py-2 mb-2 border-b border-gray-50">
            <div className="text-[10px] font-bold">
              {collectionName || selectedNft.collectionName}
            </div>
            <div className="px-2 pt-[2px] border border-gray-100 rounded-md transition-colors hover:bg-gray-100 cursor-pointer">
              <div className="text-[10px] font-bold text-transparent bg-clip-text bg-cover bg-theme-gradient">
                Details
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs">
            <div className="pt-1">
              {selectedNft.name || '#'.concat(selectedNft.tokenId)}
            </div>
            <div className="flex place-items-center">
              <div className="pt-1">{selectedNft.price}</div>
              {(chainId == 1 || selectedNft.chainId == 1) && (
                <>
                  <EthereumIcon width={12} height={12} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionNftCard;
