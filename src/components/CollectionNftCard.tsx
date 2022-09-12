import React, { useState } from 'react';
import { NftMarketplace } from '@/utils/nftUtils';
import OpenSeaIcon from '@/components/OpenseaIcon';
import PlusIcon from '@/components/PlusIcon';
import EthereumIcon from '@/components/EthereumIcon';
import X2Y2Icon from './X2Y2Icon';
import LooksRareIcon from './LooksRareIcon';
import 'react-loading-skeleton/dist/skeleton.css';
import PendingTxnsSpinner from './PendingTxnsSpinner';

interface Props {
  selectedNft: any;
  collectionName?: string;
  chainId?: number;
  handleNftClick?: any;
  selectDisabled?: boolean;
}

const CollectionNftCard: React.FC<Props> = ({
  selectedNft,
  collectionName,
  chainId,
  handleNftClick,
  selectDisabled = false,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const handleName = () => {
    if (selectedNft && selectedNft?.name) {
      if (selectedNft?.length > 20) {
        return selectedNft?.substring(0, 20) + '...';
      } else {
        return selectedNft?.name;
      }
    } else {
      return undefined;
    }
  };

  return (
    <div
      onClick={() => {
        if (handleNftClick) handleNftClick(selectedNft);
        setIsActive(!isActive);
      }}
      className={
        'group relative rounded-xl transition-all' +
        (isActive && !selectDisabled && ' bg-theme-gradient bg-cover p-1')
      }
    >
      <div
        className={
          'transistion-all drop-shadow-md rounded-xl text-sm bg-white dark:bg-white/5 hover:drop-shadow-xl' +
          (isActive && !selectDisabled && ' dark:bg-black')
        }
      >
        <div
          className={
            'w-full min-h-80 flex flex-col relative aspect-square overflow-hidden lg:h-50 lg:aspect-none cursor-pointer rounded-t-xl'
          }
        >
          {isLoading && (
            <a className="w-full h-full bg-black/90 hover:scale-110 text-white bg-cover object-center text-center my-auto flex flex-grow flex-col justify-around p-14">
              Loading...
            </a>
          )}
          {
            <img
              src={selectedNft?.image}
              alt={selectedNft?.imageAlt}
              className={`w-full h-full transition-all hover:scale-110 object-center object-cover ${
                isLoading ? 'hidden' : 'block'
              }`}
              onLoad={() => setIsLoading(false)}
              onDragStart={(event) => event.preventDefault()}
            />
          }
          <a
            target="_blank"
            rel="_ noreferrer"
            className="absolute left-3 top-3 w-12 h-12"
          >
            {selectedNft?.marketplace === NftMarketplace.OPENSEA && (
              <div className="rounded-full">
                <OpenSeaIcon height={28} width={28} />
              </div>
            )}
            {selectedNft?.marketplace === NftMarketplace.LOOKSRARE && (
              <div className="rounded-full">
                <LooksRareIcon height={28} width={28} />
              </div>
            )}
            {selectedNft?.marketplace === NftMarketplace.X2Y2 && (
              <div className="rounded-full">
                <X2Y2Icon height={28} width={28} />
              </div>
            )}
            {selectedNft?.marketplace === NftMarketplace.NFTRADE && (
              <div className="rounded-full">
                <OpenSeaIcon height={28} width={28} />
              </div>
            )}
            {selectedNft?.marketplace === NftMarketplace.SEAPORT && (
              <div className="rounded-full">
                <OpenSeaIcon height={28} width={28} />
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
            <div>#&nbsp;{selectedNft?.rarityScore || selectedNft?.tokenId}</div>
          </span>
        </div>
        <div className="p-2">
          <div className="justify-between flex py-2 mb-2 border-b border-gray-50">
            <div className="text-[10px] font-bold flex self-center">
              <div className="pt-0.5">
                {collectionName || selectedNft?.collectionName}
              </div>
              {selectedNft?.pendingTxns?.length > 0 && (
                <PendingTxnsSpinner txns={selectedNft.pendingTxns} />
              )}
            </div>

            <div className="px-2 pt-[2px] border border-gray-100 dark:bg-black rounded-md transition-all hover:bg-gray-100 dark:hover:bg-theme-gradient dark:bg-cover cursor-pointer">
              <div className="text-[10px] font-bold text-transparent dark:text-white bg-clip-text bg-cover bg-theme-gradient">
                Details
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs">
            <div className="pt-1">
              {handleName() || '#'.concat(selectedNft?.tokenId)}
            </div>
            <div className="flex place-items-center">
              <div className="pt-1">
                {selectedNft?.price || selectedNft?.currentEthPrice}
              </div>
              {(chainId == 1 || selectedNft?.chainId == 1) && (
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
