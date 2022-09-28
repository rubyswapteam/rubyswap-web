import CollectionList from '@/components/CollectionList';
import CollectionTitleHeader from '@/components/CollectionTitleHeader';
import Dashboard from '@/components/Dashboard';
import Layout from '@/components/Layout';
import RefreshButton from '@/components/RefreshButton';
import Tab from '@/components/Tab';
import UserAnalyticsMarketplaceFilter from '@/components/UserAnalyticsFilter';
import UserTradeHistoryChart from '@/components/UserTradeHistoryChart';
import X2Y2Icon from '@/components/X2Y2Icon';
import { rangeTabs } from '@/utils/nftUtils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LooksRareIcon from '../../components/LooksRareIcon';
import OpenSeaIcon from '../../components/OpenseaIcon';
import RightArrow from '../../components/RightArrow';
import UserCollectionSidebarFilter from '../../components/UserCollectionSidebarFilter';
import UserProfileHeader from '../../components/UserProfileHeader';
import { useMarketplaceProvider } from '../../contexts/MarketplaceProviderContext';
import { useWalletProvider } from '../../contexts/WalletProviderContext';
import { motion } from 'framer-motion';
import UserActivityTable from '@/components/UserActivityTable';

export default function Collection(props: any) {
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
      name: 'Activity',
      href: id ? `/wallet/${id}?tab=activity` : '/',
      current: tab == 'activity',
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
    fetchWallet,
    walletDetails,
  } = useWalletProvider();

  const marketplaceOptions = [
    {
      name: 'X2Y2',
      icon: (
        <div
          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        >
          <X2Y2Icon />
        </div>
      ),
    },
    {
      name: 'LooksRare',
      icon: (
        <div
          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        >
          <LooksRareIcon />
        </div>
      ),
    },
    {
      name: 'Opensea',
      icon: (
        <div
          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        >
          <OpenSeaIcon />
        </div>
      ),
    },
  ];

  const marketplaceDropdownDefault = {
    name: 'Marketplace',
    icon: undefined,
  };

  const contractOptions: {
    name: string;
    icon?: any | undefined;
  }[] = [];
  Object.values(
    collectionNames as {
      [key: string]: string;
    },
  ).forEach((name) => {
    if (name) {
      contractOptions.push({ name: name });
    }
  });

  const contractDropdownDefault = {
    name: 'Collections',
  };

  const { userTrades, userTradesFiltered, getUserTrades } =
    useMarketplaceProvider();

  useEffect(() => {
    fetchUserNfts(id?.toString());
    fetchWallet(id);
    setActiveNfts({ collection: '', nfts: [] });
    id ? getUserTrades(id) : '';
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
                  filter={'marketplace'}
                  collectionNames={collectionNames}
                />
                <UserAnalyticsMarketplaceFilter
                  options={contractOptions}
                  defaultValue={contractDropdownDefault}
                  filter={'contract'}
                  collectionNames={collectionNames}
                />
              </div>
            </div>
            <div className="px-4 sm:px-6 md:px-8 py-20 bg-gray-50 dark:bg-white/[.02]">
              <div className="w-full mt-5 rounded-xl overflow-hidden">
                <UserTradeHistoryChart
                  chart={{ height: '30%' }}
                  userTrades={userTradesFiltered || userTrades}
                />
              </div>
            </div>
          </div>
        </>
      );
    } else if (tab == 'activity') {
      return (
        <UserActivityTable
          trades={userTradesFiltered || userTrades}
          user={id}
          collectionNames={collectionNames}
        />
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
    <motion.div exit={{ opacity: 0 }} initial={'initial'} animate={'animate'}>
      <Layout>
        <Dashboard
          setSearchModalState={props.setSearchModalState}
          title={
            <UserProfileHeader
              name={id?.toString()}
              wallet={id?.toString()}
              walletDetails={walletDetails}
            />
          }
          primaryTabs={<Tab tabs={primaryTabs} />}
          secondaryTabs={setSecondaryTabs()}
          liveView={setRefreshButton()}
          body={setBody()}
        />
      </Layout>
    </motion.div>
  );
}
