import BreakHorizontal from '@/components/BreakHorizontal';
import CollectionList from '@/components/CollectionList';
import CollectionTitleHeader from '@/components/CollectionTitleHeader';
import Dashboard from '@/components/Dashboard';
import Layout from '@/components/Layout';
import RefreshButton from '@/components/RefreshButton';
import SalesHistoryChart from '@/components/SalesHistoryChart';
import Tab from '@/components/Tab';
import { rangeTabs } from '@/utils/nftUtils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AveragePriceVolumeChart from '../../components/AveragePriceVolumeChart';
import UserCollectionSidebarFilter from '../../components/UserCollectionSidebarFilter';
import UserProfileHeader from '../../components/UserProfileHeader';
import {
  useWalletProvider,
  WalletProvider,
} from '../../contexts/WalletProviderContext';

export default function Collection() {
  const router = useRouter();
  const { id, tab, range } = router.query;
  const primaryTabs = [
    {
      name: 'Assets',
      href: `/wallet/${id}`,
      current: tab == undefined,
      border: true,
    },
    {
      name: 'Listings',
      href: `/wallet/${id}?tab=listings`,
      current: tab == 'listings',
      border: true,
    },
    {
      name: 'Portfolio',
      href: `/wallet/${id}?tab=portfolio`,
      current: tab == 'updates',
      border: true,
    },
    {
      name: 'Analytics',
      href: `/wallet/${id}?tab=analytics`,
      current: tab == 'analytics',
      border: true,
    },
  ];
  const {
    userNfts,
    fetchUserNfts,
    collectionNames,
    activeNfts,
    getCollectionNfts,
  } = useWalletProvider();

  useEffect(() => {
    const isMounted = true;
    if (isMounted) {
      fetchUserNfts(id?.toString());
    }
  }, [id]);

  const refreshButtonTabs: (string | undefined)[] = [];
  const rangeButtonsTabs: (string | undefined)[] = [];

  function setBody() {
    if (!tab) {
      return (
        <div className="flex w-full justify-between flex-col h-full">
          <div className="flex w-full justify-between flex-row h-full">
            {!activeNfts && <div className="w-9/12" />}
            {activeNfts && (
              <div className="w-9/12">
                <CollectionList selectedNfts={activeNfts} />
              </div>
            )}
            <UserCollectionSidebarFilter
              userNfts={userNfts}
              collectionNames={collectionNames}
              getCollectionNfts={getCollectionNfts}
            />
          </div>
        </div>
      );
    }
    if (tab == 'analytics') {
      return (
        <>
          <div>
            <CollectionTitleHeader title={'Summary Stats'} />
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
            <UserProfileHeader name={id?.toString()} wallet={id?.toString()} />
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
