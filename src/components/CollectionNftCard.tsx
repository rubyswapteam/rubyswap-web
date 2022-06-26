import React from 'react';
import { INft, NftMarketplace } from '@/utils/nftUtils';
import OpenSeaIcon from '@/components/OpenseaIcon';
import PlusIcon from '@/components/PlusIcon';
import EthereumIcon from '@/components/EthereumIcon';

interface Props {
  selectedNft: INft;
}

const CollectionNftCard: React.FC<Props> = ({ selectedNft }): JSX.Element => {
  return (
    <div className="group relative">
      <div className={'border-2 border-gray-100 p-2 rounded-xl text-sm'}>
        <div
          className={
            'w-full min-h-80 flex flex-col relative aspect-square overflow-hidden group-hover:opacity-75 lg:h-50 lg:aspect-none cursor-pointer'
          }
        >
          <img
            src={selectedNft.image}
            alt={selectedNft.imageAlt}
            className="w-full h-full object-center object-cover rounded-xl"
          />
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
                <OpenSeaIcon height={20} width={20} />
              </div>
            )}
            {selectedNft.marketplace === NftMarketplace.X2Y2 && (
              <div className="rounded-full">
                <OpenSeaIcon height={20} width={20} />
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
          <div className="absolute right-2 top-2 w-5 h-5 flex items-center justify-center group-hover:opacity-100 duration-200 transition opacity-0">
            <div className="absolute opacity-20 rounded-full w-full h-full left-0 top-0 bg-white" />
            <div className="w-3 h-3">
              <PlusIcon />
            </div>
          </div>
          {/* This should be the rarity (where it's known) */}
          <span className="border-2 border-white rounded-md absolute left-3 bottom-3 bg-white text-black h-6 px-2 font-bold text-xs flex items-center justify-center">
            <div>#&nbsp;{selectedNft.tokenId}</div>
          </span>
        </div>
        <div className="justify-between flex py-2 mb-2 border-b border-gray-50">
          <div className="text-[10px] font-bold">
            {selectedNft.collectionName}
          </div>
          <div className="px-2 pt-[2px] border border-gray-100 rounded-md hover:bg-gray-100 cursor-pointer">
            <div className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-800">
              Details
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs">
          <div className="pt-1">
            {selectedNft.name || '#'.concat(selectedNft.tokenId)}
          </div>
          <div className="flex place-items-center">
            <div className="pt-1">
              {selectedNft?.price
                ? (selectedNft?.price / Math.pow(10, 18)).toFixed(1)
                : '0.0'}{' '}
            </div>
            {selectedNft.chainId == 1 && (
              <>
                <EthereumIcon width={12} height={12} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionNftCard;
