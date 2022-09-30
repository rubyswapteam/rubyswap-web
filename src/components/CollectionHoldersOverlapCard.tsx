import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { trimHex } from '../utils/nftUtils';
import { useEffect, useState } from 'react';

interface Props {
  holders: any;
  targetHolders: any;
  activeCollection: any;
  holderAddressList: string[];
  getAddressList: (raw: any) => string[];
}

export const CollectionHoldersOverlapCard: React.FC<Props> = ({
  holders,
  targetHolders,
  activeCollection,
  holderAddressList,
  getAddressList,
}): JSX.Element => {
  const [targetCollectionAddressList, setTargetCollectionAddressList] =
    useState<string[]>();
  const [addressIntersect, setAddressIntersect] = useState<string[]>();

  useEffect(() => {
    const targetAddresssList = getAddressList(targetHolders);
    setTargetCollectionAddressList(targetAddresssList);
    setAddressIntersect(
      holderAddressList?.filter((holder) =>
        targetAddresssList.includes(holder),
      ),
    );
  }, [holderAddressList, targetHolders]);

  return (
    <div className="bg-white/10 p-3 rounded h-full text-xs hover:bg-white/20 cursor-pointer">
      <div className="inline-flex gap-x-2 items-center text-xl mb-4">
        <img
          className="h-[40px] w-[40px] flex-grow block rounded-full self-center"
          src={targetHolders.imageUrl}
        />
        {'x'}
        <img
          className="h-[40px] w-[40px] flex-grow block rounded-full self-center"
          src={activeCollection.imageUrl}
        />
      </div>
      <div className="font-bold">{targetHolders.name}</div>
      <div className="dark:text-white/75">
        {trimHex(targetHolders.contract)}
      </div>
      <div className="mt-4">
        <div className="">
          <span>{addressIntersect?.length}</span>
          {' holders own both.'}
        </div>
        <div className="">{`xxx ${targetHolders.name} NFTs held.`}</div>
        <div className="">{'xxx holders own both.'}</div>
      </div>
    </div>
  );
};
