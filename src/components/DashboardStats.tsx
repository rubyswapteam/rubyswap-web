import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { DashboardStatsPriceAndChange } from './DashboardStatsPriceAndChange';
import { DashboardStatsStandardItem } from './DashboardStatsStandardItem';

interface Props {
  collection?: any;
  listings?: any[];
  totalListings?: number;
}

export const DashboardStats: React.FC<Props> = ({
  collection,
  listings,
  totalListings,
}): JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 flex-col h-full">
      <DashboardStatsStandardItem
        name="First Mint"
        value={moment.unix(collection?.firstMint).fromNow()}
        id={collection?.contractAddress}
      />
      <DashboardStatsPriceAndChange
        name="Unique Ownership"
        value={collection?.numOwners}
        percent={Number(
          ((collection?.numOwners / collection?.totalSupply) * 100).toFixed(2),
        )}
        id={collection?.contractAddress}
        color={false}
      />
      <DashboardStatsStandardItem
        name="First Mint"
        value={moment.unix(collection?.firstMint).fromNow()}
        id={collection?.contractAddress}
      />
      <DashboardStatsPriceAndChange
        name="1d Volume"
        value={collection?.osOneDayVolume.toFixed(2).toString()}
        percent={collection?.osOneDayChange.toFixed(2)}
        id={collection?.contractAddress}
      />
      <DashboardStatsPriceAndChange
        name="7d Volume"
        value={collection?.osSevenDayVolume.toFixed(2).toString()}
        percent={collection?.osSevenDayChange.toFixed(2)}
        id={collection?.contractAddress}
      />
      <DashboardStatsPriceAndChange
        name="30d Volume"
        value={collection?.osThirtyDayVolume.toFixed(2).toString()}
        percent={collection?.osThirtyDayChange.toFixed(2)}
        id={collection?.contractAddress}
      />
      <DashboardStatsPriceAndChange
        name="1d Avg Price vs Sales"
        value={(collection?.osOneDayVolume / collection?.osOneDaySales).toFixed(
          2,
        )}
        percent={collection?.osThirtyDayChange.toFixed(2)}
        id={collection?.contractAddress}
      />
      <DashboardStatsStandardItem
        name="7d Avg Price vs Sales"
        value={moment.unix(collection?.firstMint).fromNow()}
        id={collection?.contractAddress}
      />
      <DashboardStatsStandardItem
        name="30d Avg Price vs Sales"
        value={moment.unix(collection?.firstMint).fromNow()}
        id={collection?.contractAddress}
      />
      <DashboardStatsStandardItem
        name="Highest Offer"
        value={moment.unix(collection?.firstMint).fromNow()}
        id={collection?.contractAddress}
      />
      <DashboardStatsPriceAndChange
        name="Active Listings"
        value={totalListings?.toString() || ''}
        percent={
          totalListings &&
          Number(((totalListings / collection?.totalSupply) * 100).toFixed(2))
        }
        color={false}
        id={collection?.contractAddress}
      />
      <DashboardStatsStandardItem
        name="Floor Price"
        value={
          (listings && listings[0]?.price) ||
          collection?.osFloorPrice?.toFixed(2)
        } //include eth logo
        id={collection?.contractAddress}
      />
    </div>
  );
};
