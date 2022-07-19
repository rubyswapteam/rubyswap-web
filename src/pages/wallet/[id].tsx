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
import { useEffect, useRef } from 'react';
import AveragePriceVolumeChart from '../../components/AveragePriceVolumeChart';
import RightArrow from '../../components/RightArrow';
import UserCollectionSidebarFilter from '../../components/UserCollectionSidebarFilter';
import UserProfileHeader from '../../components/UserProfileHeader';
import { useWalletProvider } from '../../contexts/WalletProviderContext';
import { useMarketplaceProvider } from '../../contexts/MarketplaceProviderContext';
import UserTradeHistoryChart from '@/components/UserTradeHistoryChart';
import UserAnalyticsMarketplaceFilter from '@/components/UserAnalyticsMarketplaceFilter';
import X2Y2Icon from '@/components/X2Y2Icon';

export default function Collection() {
  const router = useRouter();
  const { id, tab, range } = router.query;
  const primaryTabs = [
    {
      name: 'Assets',
      href: id ? `/wallet/${id}` : '/',
      current: tab == undefined,
      border: true,
    },
    {
      name: 'Listings',
      href: id ? `/wallet/${id}?tab=listings` : '/',
      current: tab == 'listings',
      border: true,
    },
    {
      name: 'Portfolio',
      href: id ? `/wallet/${id}?tab=portfolio` : '/',
      current: tab == 'updates',
      border: true,
    },
    {
      name: 'Analytics',
      href: id ? `/wallet/${id}?tab=analytics` : '/',
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

  const marketplaceOptions = [
    {
      name: 'X2Y2',
      icon: (
        <div
          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        >
          <X2Y2Icon></X2Y2Icon>
        </div>
      ),
    },
  ];

  const marketplaceDropdownDefault = {
    name: 'Marketplace',
    icon: undefined,
  };

  const tradeOptions = [
    {
      name: 'Purchases',
    },
    {
      name: 'Sales',
    },
  ];

  const tradeDropdownDefault = {
    name: 'Trades',
  };

  const timePeriodOptions = [
    {
      name: 'Purchases',
    },
    {
      name: 'Sales',
    },
  ];

  const timePeriodDropdownDefault = {
    name: 'Trades',
  };

  const contractOptions: {
    name: string;
    icon?: any | undefined;
  }[] = [];
  Object.keys(collectionNames).forEach((name) => {
    contractOptions.push({ name: name });
  });

  console.log(Object.values(collectionNames));
  console.log(contractOptions);

  const contractDropdownDefault = {
    name: 'Collections',
  };

  const { userTrades, getUserTrades } = useMarketplaceProvider();

  useEffect(() => {
    id ? getUserTrades(id) : '';
    fetchUserNfts(id?.toString());
    setActiveNfts({ collection: '', nfts: [] });
  }, [id?.toString()]);

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
            <div className="flex justify-between px-4 sm:px-6 md:px-8">
              <CollectionTitleHeader title={'Summary Stats'} />
              <div className="flex gap-x-2">
                <UserAnalyticsMarketplaceFilter
                  options={marketplaceOptions}
                  defaultValue={marketplaceDropdownDefault}
                />
                <UserAnalyticsMarketplaceFilter
                  options={tradeOptions}
                  defaultValue={tradeDropdownDefault}
                />
                <UserAnalyticsMarketplaceFilter
                  options={contractOptions}
                  defaultValue={contractDropdownDefault}
                />
              </div>
            </div>
            <div className="px-4 sm:px-6 md:px-8 py-20 bg-gray-50">
              <div className="w-full mt-5 rounded-xl overflow-hidden">
                <UserTradeHistoryChart
                  chart={{ height: '30%' }}
                  userTrades={userTrades}
                />
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
