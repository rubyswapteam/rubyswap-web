import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { trimHex } from '../utils/nftUtils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useModalProvider } from '@/contexts/ModalContext';

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
  const { setModal, setModalData } = useModalProvider();
  const [details, setDetails] = useState<any>();
  function getAddressList(raw: any): string[] {
    return raw?.data?.map(
      (x: { ownerAddress: string; tokenBalance: number }) => x.ownerAddress,
    );
  }

  useEffect(() => {
    console.log('effect');
    if (tab == 'holders' && targetHolders) {
      const targetCollectionAddressList = getAddressList(targetHolders);
      const filteredHolders = holders[0].data
        .filter((holder: IHolder) =>
          targetCollectionAddressList.includes(holder?.ownerAddress),
        )
        .map((holder: IHolder) => ({
          ...holder,
          targetCollectionBalance: targetHolders.data.find(
            (x: IHolder) => x.ownerAddress === holder?.ownerAddress,
          ).tokenBalance,
        }));
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

  useEffect(() => {
    if (
      activeCollection &&
      filteredHolders !== undefined &&
      targetHolders &&
      totalSourceNfts !== undefined &&
      totalTargetNfts !== undefined
    ) {
      getDetails();
    }
  }, [
    filteredHolders,
    targetHolders,
    totalSourceNfts,
    totalTargetNfts,
    activeCollection,
  ]);

  function getDetails() {
    const targetCollection = { ...targetHolders };
    delete targetCollection.data;
    const addressCount = filteredHolders?.length || 0;

    const res: any = {
      sourceName: activeCollection.name,
      targetName: targetCollection.name,
      filteredHolders: filteredHolders,
      sourceHolderPc: (100 * addressCount) / holders[0]?.data?.length,
      targetHolderPc: (100 * addressCount) / targetHolders?.data?.length,
      sourceNfts: totalSourceNfts,
      targetNfts: totalTargetNfts,
      sourceNftsPc:
        totalSourceNfts &&
        (100 * totalSourceNfts) / activeCollection.totalSupply,
      targetNftsPc:
        totalTargetNfts &&
        (100 * totalTargetNfts) / targetCollection.totalSupply,
      sourceCollection: activeCollection,
      targetCollection: targetCollection,
    };
    res.score = getOverall(res);
    setDetails(res);
  }

  function viewDetails() {
    if (details) {
      setModalData({
        holderComparisonData: details,
      });
      setModal('holder-comparison-details');
    }
  }

  function getOverall(res: any) {
    const highestHolderPc = Math.max(res.sourceHolderPc, res.targetHolderPc);
    const highestNftPc = Math.max(res.sourceNftsPc, res.targetNftsPc);
    const holderPenalty = Math.min(res.filteredHolders.length / 100, 1);
    const score =
      holderPenalty * (highestHolderPc * 0.25 + highestNftPc * 0.75);
    console.log(res);
    return score < 1.5 || !filteredHolders || filteredHolders.length == 0
      ? '⚪️ Low Overlap'
      : score < 7.5
      ? '🟠 Decent Overlap'
      : score < 15
      ? '🔴 High Overlap'
      : '🔥 Massive Overlap';
  }

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
        <div className="bg-black/70 rounded-md inline-flex px-2 py-1 -mt-5 gap-x-2 items-center">
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
        <div className="mt-4 space-between justify-between self-center flex">
          <button
            onClick={viewDetails}
            className="text-xs px-3 pt-2 pb-1.5 bg-white/10 hover:bg-white/[.15] rounded-md"
          >
            View Details
          </button>
          <button className="text-xs self-center h-full rounded-md px-2 py-1 w-max grid gap-x-1 gap-y-2">
            <div>{details?.score}</div>
          </button>
        </div>
      </div>
    </div>
  );
};
