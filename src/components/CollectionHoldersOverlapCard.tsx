import React, { useState } from 'react';
import { NftMarketplace } from '@/utils/nftUtils';
import OpenSeaIcon from '@/components/OpenseaIcon';
import PlusIcon from '@/components/PlusIcon';
import EthereumIcon from '@/components/EthereumIcon';
import X2Y2Icon from './X2Y2Icon';
import LooksRareIcon from './LooksRareIcon';
import 'react-loading-skeleton/dist/skeleton.css';
import PendingTxnsSpinner from './PendingTxnsSpinner';
import { SudoswapIcon } from './SudoswapIcon';
import { NFTXIcon } from './NFTXIcon';

interface Props {
  collectionName?: string;
}

export const CollectionHoldersOverlapCard: React.FC<Props> = ({
  collectionName,
}): JSX.Element => {
  return <div></div>;
};
