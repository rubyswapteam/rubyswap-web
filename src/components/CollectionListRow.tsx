import React from 'react';
import { INft, NftMarketplace } from '@/utils/nftUtils';
import OpenSeaIcon from '@/components/OpenseaIcon';
import PlusIcon from '@/components/PlusIcon';
import EthereumIcon from '@/components/EthereumIcon';

interface Props {
  selectedNfts: INft[];
}

const CollectionListRow: React.FC<Props> = ({ selectedNfts }): JSX.Element => {
  return (
    <div>
      <div className="mt-6 w-full flex flex-col items-start flex-1">
        {selectedNfts && (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 pb-6">
            {selectedNfts.map((selectedNft: INft) => (
              <div className="group relative" key={selectedNft.id}>
                <div
                  className={
                    'w-full min-h-80 flex flex-col relative aspect-square overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none cursor-pointer'
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
                        <OpenSeaIcon height={30} width={30} />
                      </div>
                    )}
                    {selectedNft.marketplace === NftMarketplace.LOOKSRARE && (
                      <div className="rounded-full">
                        <OpenSeaIcon height={30} width={30} />
                      </div>
                    )}
                    {selectedNft.marketplace === NftMarketplace.X2Y2 && (
                      <div className="rounded-full">
                        <OpenSeaIcon height={30} width={30} />
                      </div>
                    )}
                    {selectedNft.marketplace === NftMarketplace.NFTRADE && (
                      <div className="rounded-full">
                        <OpenSeaIcon height={30} width={30} />
                      </div>
                    )}
                    {selectedNft.marketplace === NftMarketplace.SEAPORT && (
                      <div className="rounded-full">
                        <OpenSeaIcon height={30} width={30} />
                      </div>
                    )}
                  </a>
                  <div className="absolute right-3 top-3 w-6 h-6 flex items-center justify-center group-hover:opacity-100 duration-200 transition opacity-0">
                    <div className="absolute opacity-20 rounded-full w-full h-full left-0 top-0 bg-white" />
                    <div className="w-3 h-3">
                      <PlusIcon />
                    </div>
                  </div>
                  <span className="border-2 border-white rounded-md absolute left-3 bottom-3 bg-white text-black h-6 px-2 font-bold text-xs flex items-center justify-center">
                    <div>#&nbsp;{selectedNft.tokenId}</div>
                  </span>
                </div>
                <div
                  className={
                    'border-2 border-gray-100 -mt-6 pt-8 pb-3 px-3 rounded-xl text-sm'
                  }
                >
                  <div className="font-bold">{selectedNft.name}</div>
                  <div className="flex items-center">
                    {selectedNft?.price
                      ? (
                        selectedNft?.price /
                        Math.pow(10, 18)
                      ).toFixed(1)
                      : "0.0"}{' '}
                    {selectedNft.chainId ==
                    1 && (
                      <>
                        <div className="pl-1">
                          <EthereumIcon
                            width={18}
                            height={18}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionListRow;
