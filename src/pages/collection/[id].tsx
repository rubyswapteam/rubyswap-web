import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import Tab from '@/components/Tab';
import { useRouter } from 'next/router';
import CollectionAnnouncementBanner from '@/components/CollectionAnnouncementBanner';
import { rangeTabs } from '@/utils/nftUtils';
import { useNftProvider } from '@/contexts/NftProviderContext';
import { useEffect } from 'react';
import CollectionProfileHeader from '@/components/CollectionProfileHeader';
import StatsBoxList from '@/components/StatsBoxList';
import CollectionTitleHeader from '@/components/CollectionTitleHeader';
import CollectionList from '@/components/CollectionList';
import CollectionListSingleRow from '@/components/CollectionListSingleRow';
import BreakHorizontal from '@/components/BreakHorizontal';
import CollectionUpdate from '../../components/CollectionUpdate';
import RefreshButton from '@/components/RefreshButton';

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

  const stats = [
    {
      name: 'Floor Price',
      value: nftCollection?.floor && `${(nftCollection?.floor).toFixed(2)} ETH`,
    },
    {
      name: '30 Day Volume',
      value:
        nftCollection?.thirtyDayVolume &&
        `${(nftCollection?.thirtyDayVolume).toFixed(2)} ETH`,
    },
    {
      name: 'Supply',
      value: nftCollection?.count && `${nftCollection?.count}`,
    },
    {
      name: 'Unique Ownership',
      value: `${((nftCollection?.owners / nftCollection?.count) * 100).toFixed(
        2,
      )}%`,
    },
  ];

  function setBody() {
    if (!tab) {
      return (
        <>
          <CollectionAnnouncementBanner />
          <StatsBoxList stats={stats} />
          <BreakHorizontal />
          <CollectionTitleHeader
            title={'New Listings'}
            buttonText={'See More'}
            route={`/collection/${id}?tab=listings`}
          />
          <CollectionListSingleRow selectedNfts={nfts && nfts.slice(0, 10)} />
          <BreakHorizontal />
          <CollectionTitleHeader
            title={'Recent Sales'}
            buttonText={'See More'}
            route={`/collection/${id}?tab=analytics`}
          />
          <CollectionListSingleRow
            selectedNfts={nfts && [...nfts.slice(6, 10), ...nfts.slice(0, 6)]}
          />
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
          <div className="-mt-6">
            <CollectionUpdate collectionUpdates={collectionUpdates} />
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
        />
      </Layout>
    </>
  );
}
