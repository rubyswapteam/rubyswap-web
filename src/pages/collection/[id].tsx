import BreakHorizontal from '@/components/BreakHorizontal';
import CollectionAnnouncementBanner from '@/components/CollectionAnnouncementBanner';
import CollectionList from '@/components/CollectionList';
import CollectionListSingleRow from '@/components/CollectionListSingleRow';
import CollectionProfileHeader from '@/components/CollectionProfileHeader';
import CollectionTitleHeader from '@/components/CollectionTitleHeader';
import Dashboard from '@/components/Dashboard';
import Layout from '@/components/Layout';
import RefreshButton from '@/components/RefreshButton';
import SalesHistoryChart from '@/components/SalesHistoryChart';
import StatsBoxList from '@/components/StatsBoxList';
import Tab from '@/components/Tab';
import { useNftProvider } from '@/contexts/NftProviderContext';
import { rangeTabs } from '@/utils/nftUtils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AveragePriceVolumeChart from '../../components/AveragePriceVolumeChart';
import CollectionUpdate from '../../components/CollectionUpdate';

export default function Collection() {
  const router = useRouter();
  const { id, tab, range } = router.query;
  const { nftCollection, fetchNftCollection } = useNftProvider();
  const { nfts, fetchNfts } = useNftProvider();
  const { collectionUpdates, fetchNftCollectionUpdates } = useNftProvider();

  useEffect(() => {
    if (!nftCollection) {
      fetchNftCollection();
    }
    if (!nfts) {
      fetchNfts();
    }
    if (!collectionUpdates) {
      fetchNftCollectionUpdates();
    }
  }, [nftCollection, nfts, collectionUpdates]);

  const primaryTabs = [
    {
      name: 'Overview',
      href: `/collection/${id}`,
      current: tab == undefined,
      border: true,
    },
    {
      name: 'Listings',
      href: `/collection/${id}?tab=listings`,
      current: tab == 'listings',
      border: true,
    },
    {
      name: 'Updates',
      href: `/collection/${id}?tab=updates`,
      current: tab == 'updates',
      border: true,
    },
    {
      name: 'Analytics',
      href: `/collection/${id}?tab=analytics`,
      current: tab == 'analytics',
      border: true,
    },
    {
      name: 'Traits',
      href: `/collection/${id}?tab=traits`,
      current: tab == 'traits',
      border: true,
    },
  ];
  const refreshButtonTabs = [undefined, 'listings', 'analytics'];
  const rangeButtonsTabs = [undefined, 'analytics'];

  function getStats() {
    const rng = range ? range?.toString() : '24h';
    return [
      {
        name: 'Floor Price',
        value:
          nftCollection?.floor && `${(nftCollection?.floor).toFixed(2)} ETH`,
      },
      {
        name: `${rng} Volume`,
        value:
          nftCollection?.thirtyDayVolume &&
          `${(nftCollection?.thirtyDayVolume).toFixed(2)} ETH`,
      },
      {
        name: `${rng} Day Sales`,
        value:
          nftCollection?.thirtyDaySales && `${nftCollection?.thirtyDaySales}`,
      },
      {
        name: 'Supply',
        value: nftCollection?.count && `${nftCollection?.count}`,
      },
      {
        name: 'Unique Ownership',
        value: `${(nftCollection?.owners / nftCollection?.count) * 100}%`,
      },
    ];
  }

  function setBody() {
    if (!tab) {
      return (
        <>
          <div className="my-4">
            <CollectionAnnouncementBanner
              route={`/collection/${id}?tab=updates`}
              message={collectionUpdates && collectionUpdates[0].title}
            />
          </div>
          <div className="py-8 bg-gray-100 w-full">
            <div className="my-8">
              <StatsBoxList
                stats={getStats()}
                route={`/collection/${id}?tab=analytics`}
              />
            </div>
            <div className="flex mx-8">
              <div className="w-full mr-2 mt-5 rounded-xl drop-shadow-md overflow-hidden">
                <SalesHistoryChart></SalesHistoryChart>
              </div>
              <div className="w-full ml-2 mt-5 rounded-xl drop-shadow-md overflow-hidden">
                <AveragePriceVolumeChart></AveragePriceVolumeChart>
              </div>
            </div>
          </div>
          {/* <BreakHorizontal /> */}
          <div className="my-8 my-14">
            <CollectionTitleHeader
              title={'New Listings'}
              buttonText={'See More'}
              route={`/collection/${id}?tab=listings`}
            />
            <CollectionListSingleRow selectedNfts={nfts && nfts.slice(0, 10)} />
          </div>
          {/* <BreakHorizontal /> */}
          <div className="mb-8 my-14">
            <CollectionTitleHeader
              title={'Recent Sales'}
              buttonText={'See More'}
              route={`/collection/${id}?tab=analytics`}
            />
            <CollectionListSingleRow
              selectedNfts={nfts && [...nfts.slice(6, 10), ...nfts.slice(0, 6)]}
            />
          </div>
        </>
      );
    }
    if (tab == 'listings') {
      return (
        <>
          <div className="-mt-6">
            <CollectionList selectedNfts={nfts && nfts} />
          </div>
        </>
      );
    }
    if (tab == 'updates') {
      return (
        <>
          <div className="mt-6 px-4 sm:px-6 md:px-8">
            <CollectionUpdate collectionUpdates={collectionUpdates} />
          </div>
        </>
      );
    }
    if (tab == 'analytics') {
      return (
        <>
          <div>
            <CollectionTitleHeader title={'Summary Stats'} />
            <StatsBoxList
              stats={getStats()}
              route={`/collection/${id}?tab=analytics`}
            />
            <BreakHorizontal />
            <div className="px-4 sm:px-6 md:px-8">
              <div className="w-full mt-5 rounded-xl overflow-hidden">
                <SalesHistoryChart chart={{ height: '30%' }} />
              </div>
              <div className="w-full mt-5 rounded-xl overflow-hidden">
                <AveragePriceVolumeChart chart={{ height: '30%' }} Ï />
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  function setRefreshButton() {
    if (refreshButtonTabs.includes(tab?.toString())) {
      return <RefreshButton />;
    }
  }

  function setSecondaryTabs() {
    if (rangeButtonsTabs.includes(tab?.toString())) {
      return (
        <>
          <Tab
            tabs={rangeTabs(tab, range, `/collection/${id}`)}
            condense={true}
          />
        </>
      );
    }
  }

  return (
    <>
      <Layout>
        <Dashboard
          title={
            <CollectionProfileHeader
              image={nftCollection?.image}
              name={nftCollection?.name}
              items={nftCollection?.supply}
              floor={nftCollection?.floor}
              oneDayVolume={nftCollection?.oneDayVolume}
            />
          }
          primaryTabs={<Tab tabs={primaryTabs} />}
          secondaryTabs={setSecondaryTabs()}
          refresh={setRefreshButton()}
          body={setBody()}
          banner={nftCollection?.bannerImage}
        />
      </Layout>
    </>
  );
}
