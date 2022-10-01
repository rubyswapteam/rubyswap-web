import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { trimHex } from '../utils/nftUtils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
  holders: any;
  targetHolders: any;
  activeCollection: any;
}

interface IHolder {
  ownerAddress: string;
  tokenBalance: number;
}

export const CollectionHoldersOverlapCard: React.FC<Props> = ({
  holders,
  targetHolders,
  activeCollection,
}): JSX.Element => {
  const [filteredHolders, setFilteredHolders] = useState<IHolder[]>();
  const [totalSourceNfts, setTotalSourceNfts] = useState<number>();
  const [totalTargetNfts, setTotalTargetNfts] = useState<number>();
  const [counter, setCounter] = useState<number>(0);
  const { tab } = useRouter().query;

  function getAddressList(raw: any): string[] {
    return raw?.data?.map(
      (x: { ownerAddress: string; tokenBalance: number }) => x.ownerAddress,
    );
  }

  useEffect(() => {
    console.log('effect');
    if (tab == 'holders' && targetHolders) {
      const targetCollectionAddressList = getAddressList(targetHolders);
      const filteredHolders = holders[0].data.filter((holder: IHolder) =>
        targetCollectionAddressList.includes(holder?.ownerAddress),
      );
      setTotalSourceNfts(
        filteredHolders.reduce(
          (prev: number, curr: IHolder) => prev + curr?.tokenBalance,
          0,
        ),
      );
      setTotalTargetNfts(
        filteredHolders.reduce(
          (prev: number, curr: IHolder) =>
            prev +
            targetHolders.data.find(
              (x: IHolder) => x?.ownerAddress == curr?.ownerAddress,
            ).tokenBalance,
          0,
        ),
      );

      setFilteredHolders(filteredHolders);
      setCounter((prev) => prev + 1);
      console.log('run');
    }
  }, [targetHolders, activeCollection, tab]);

  return (
    <div
      key={targetHolders?.name + activeCollection?.name + 'comparison'}
      className="overflow-auto bg-white/10 rounded-md h-full text-sm hover:bg-white/[.15] cursor-pointer transition-all"
    >
      <div
        style={{ backgroundImage: `url('${targetHolders?.bannerImageUrl}')` }}
        className="rounded-md flex w-full h-32 bg-cover"
      />
      <div className="px-5 inline-flex text-xl">
        <div className="bg-black/70 inline-flex px-2 py-1 -mt-5 gap-x-2 items-center">
          <img
            className="h-[40px] w-[40px] flex-grow block rounded-full self-center"
            src={targetHolders?.imageUrl}
          />
          {'x'}
          <img
            className="h-[40px] w-[40px] flex-grow block rounded-full self-center"
            src={activeCollection?.imageUrl}
          />
        </div>
      </div>
      <div className="p-5">
        <div className="font-bold">{targetHolders?.name}</div>
        <div className="dark:text-white/75">
          {trimHex(targetHolders?.contract)}
        </div>
        <div className="mt-4 gap-y-2 flex flex-col text-xs">
          <div className="bg-white/10 rounded-md px-2 py-1 w-fit">
            <span className="font-bold">{filteredHolders?.length}</span>
            {' overlapping holders own:'}
          </div>
          <div className="">
            <span className="font-bold">{totalTargetNfts}</span>
            {` ${targetHolders?.name} NFTs`}
          </div>
          <div className="">
            <span className="font-bold">{totalSourceNfts}</span>
            {` ${activeCollection?.name} NFTs`}
          </div>
        </div>
        <button className="mt-4 px-3 pt-2 pb-1.5 bg-white/10 hover:bg-white/[.15] rounded-md">
          View Details
        </button>
      </div>
    </div>
  );
};
