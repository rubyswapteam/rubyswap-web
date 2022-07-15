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
import RightArrow from '../../components/RightArrow';
import UserCollectionSidebarFilter from '../../components/UserCollectionSidebarFilter';
import UserProfileHeader from '../../components/UserProfileHeader';
import { useWalletProvider } from '../../contexts/WalletProviderContext';

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
    setActiveNfts,
    getCollectionNfts,
  } = useWalletProvider();

  useEffect(() => {
    fetchUserNfts(id?.toString());
    setActiveNfts({ collection: '', nfts: [] });
  }, [id]);

  const refreshButtonTabs: (string | undefined)[] = [];
  const rangeButtonsTabs: (string | undefined)[] = [];

  function setBody() {
    if (!tab) {
      return (
        <div className="flex w-full justify-between flex-col h-inherit">
          <div className="flex w-full justify-between flex-row h-inherit">
            {activeNfts.nfts.length == 0 && (
              <div className="w-full">
                {' '}
                <div className="items-center mt-[30vh] justify-center mx-auto text-gray-500 flex">
                  <div className="pt-1 mr-2">Please select a collection</div>
                  <RightArrow height={16} width={16} />
                </div>
              </div>
            )}
            {activeNfts.nfts.length != 0 && (
              <CollectionList selectedNfts={activeNfts.nfts} />
            )}
            <UserCollectionSidebarFilter
              activeCollection={activeNfts.collection}
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
          <div className="h-inherit overflow-scroll pb-80">
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
