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

export default function Collection() {
  const router = useRouter();
  const { id, tab, range } = router.query;
  const { nftCollection, fetchNftCollection } = useNftProvider();
  const { nfts, fetchNfts } = useNftProvider();

  useEffect(() => {
    if (!nftCollection) {
      fetchNftCollection();
    }
    if (!nfts) {
      fetchNfts();
    }
  }, [nftCollection, nfts]);

  const primaryTabs = [
    {
      name: 'Overview',
      href: `/collection/${id}`,
      current: tab == undefined,
    },
    {
      name: 'Listings',
      href: `/collection/${id}?tab=listings`,
      current: tab == `listings`,
    },
    {
      name: 'Updates',
      href: `/collection/${id}?tab=updates`,
      current: tab == `updates`,
    },
    {
      name: 'Analytics',
      href: `/collection/${id}?tab=analytics`,
      current: tab == `analytics`,
    },
    {
      name: 'Traits',
      href: `/collection/${id}?tab=traits`,
      current: tab == `traits`,
    },
  ];

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
          <CollectionTitleHeader
            title={'New Listings'}
            buttonText={'See More'}
            route={`/collection/${id}?tab=listings`}
          />
          <CollectionList selectedNfts={nfts && nfts.slice(0, 4)} />
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
  }

  function setSecondaryTabs() {
    if (!tab) {
      return (
        <>
          <Tab tabs={rangeTabs(tab, range, `/collection/${id}`)} />
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
          body={setBody()}
        />
      </Layout>
    </>
  );
}
