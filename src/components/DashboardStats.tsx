import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { DashboardStatsPriceAndChange } from './DashboardStatAndChange';
import { DashboardStatsPriceAndInfo } from './DashboardStatAndInfo';
import { DashboardStatSocials } from './DashboardStatSocials';
import { DashboardStatStandard } from './DashboardStatStandard';
import { DashboardStatSocialsBasic } from './DashboardStatSocialsBasic';

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
      <DashboardStatStandard
        name="First Mint"
        value={
          collection?.firstMint
            ? moment.unix(collection?.firstMint).fromNow()
            : 'tbd'
        }
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
        ethIcon={false}
      />
      <DashboardStatSocialsBasic
        name="First Mint"
        value={
          collection?.firstMint
            ? moment.unix(collection?.firstMint).fromNow()
            : 'tbd'
        }
        id={collection?.contractAddress}
        discord={collection?.discordUrl}
        twitter={collection?.twitterUsername}
        website={collection?.website}
        contract={collection?.contractAddress}
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
      <DashboardStatsPriceAndInfo
        name="1d Avg Price vs Sales"
        value={(collection?.osOneDayVolume / collection?.osOneDaySales).toFixed(
          2,
        )}
        info={`${collection?.osOneDaySales} sales`}
        id={collection?.contractAddress}
      />
      <DashboardStatsPriceAndInfo
        name="7d Avg Price vs Sales"
        value={(
          collection?.osSevenDayVolume / collection?.osSevenDaySales
        ).toFixed(2)}
        info={`${collection?.osSevenDaySales} sales`}
        id={collection?.contractAddress}
      />
      <DashboardStatsPriceAndInfo
        name="30d Avg Price vs Sales"
        value={(
          collection?.osThirtyDayVolume / collection?.osThirtyDaySales
        ).toFixed(2)}
        info={`${collection?.osThirtyDaySales} sales`}
        id={collection?.contractAddress}
      />
      <DashboardStatStandard
        name="Highest Offer"
        value={
          collection?.firstMint
            ? moment.unix(collection?.firstMint).fromNow()
            : 'tbd'
        }
        id={collection?.contractAddress}
      />
      <DashboardStatsPriceAndInfo
        name="Active Listings"
        value={totalListings?.toString() || ''}
        info={`${
          totalListings &&
          Number(((totalListings / collection?.totalSupply) * 100).toFixed(2))
        }%`}
        id={collection?.contractAddress}
        ethIcon={false}
      />
      <DashboardStatStandard
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
