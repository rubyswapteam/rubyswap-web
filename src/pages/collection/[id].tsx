import CollectionAnnouncementBanner from '@/components/CollectionAnnouncementBanner';
import CollectionListings from '@/components/CollectionListings';
import CollectionListSingleRow from '@/components/CollectionListSingleRow';
import CollectionProfileHeader from '@/components/CollectionProfileHeader';
import CollectionTitleHeader from '@/components/CollectionTitleHeader';
import Dashboard from '@/components/Dashboard';
import HolderDistrbutionChart from '@/components/HolderDistributionChart';
import Layout from '@/components/Layout';
import RefreshButton from '@/components/RefreshButton';
import SalesHistoryChart from '@/components/SalesHistoryChart';
import StatsBoxList from '@/components/StatsBoxList';
import Tab from '@/components/Tab';
import { rangeTabs } from '@/utils/nftUtils';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AveragePriceVolumeChart from '../../components/AveragePriceVolumeChart';
import CollectionUpdates from '../../components/CollectionUpdates';
import RightArrow from '../../components/RightArrow';
import TraitsSidebarFilter from '../../components/TraitsSidebarFilter';
import { useMarketplaceProvider } from '../../contexts/MarketplaceProviderContext';
import { motion } from 'framer-motion';
import moment from 'moment';

export default function Collection(props: any) {
  const router = useRouter();
  const { id, tab, range } = router.query;
  const { theme } = useTheme();
  const [isLoadingCollection, setIsLoadingCollection] = useState<boolean>(true);
  const [isLoadingCollectionTrades, setIsLoadingCollectionTrades] =
    useState<boolean>(true);
  const [isLoadingRecentTrades, setIsLoadingRecentTrades] =
    useState<boolean>(true);
  const [collectionUpdates, setCollectionUpdates] = useState<any[]>([]);
  const [recentListings, setRecentListings] = useState<any[]>([]);
  const [isBubbleAvailable, setIsBubbleAvailable] = useState(false);
  const [isLoadingCollectionUpdates, setIsLoadingCollectionUpdates] =
    useState(false);
  const {
    activeCollection,
    getCollectionBySlug,
    collectionTrades,
    recentTrades,
    activeListings,
    fetchActiveListings,
    totalListings,
  } = useMarketplaceProvider();

  useEffect(() => {
    if (
      !activeCollection ||
      !activeCollection.collection ||
      activeCollection.collection.slug.toString().toLowerCase() !==
        id?.toString().toLowerCase()
    ) {
      setLoading(true);
      getCollectionBySlug(id, true).then((res: any) => {
        setIsLoadingCollection(false);
        setIsLoadingCollectionTrades(false);
        setIsLoadingRecentTrades(false);
      });
    }
  }, [id]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async (contractAddress: string) => {
      let collection: any = {};
      try {
        collection = await (
          await fetch(
            `/.netlify/functions/getDbCollectionUpdatesByContract?contract=${contractAddress}`,
            {
              method: 'GET',
              redirect: 'follow',
            },
          )
        )
          .json()
          .then((res) => {
            res = res.map((item: any) => {
              return { ...item, ...{ data: JSON.parse(item.data) } };
            });
            setCollectionUpdates(res);
          });
      } catch {
        collection = [];
      }

      return collection;
    };

    setIsLoadingCollectionUpdates(true);

    const delayDebounceFn = setTimeout(() => {
      fetchData(activeCollection?.contractAddress).catch(console.error);
      setIsLoadingCollectionUpdates(false);
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
      isSubscribed = false;
    };
  }, [activeCollection?.contractAddress]);

  useEffect(() => {
    if (
      (tab == 'listings' && activeCollection?.contractAddress) ||
      (activeCollection?.contractAddress && tab == undefined)
    ) {
      const limit = tab == undefined ? 25 : 1000;
      fetchActiveListings(activeCollection.contractAddress, limit).then(
        (listings: any[]) => {
          const recentListings = [];
          for (let i = 0; i < 6; i++) {
            recentListings.push(listings[i]);
          }
          setRecentListings(recentListings);
        },
      );
    }
  }, [activeCollection?.contractAddress, tab]);

  useEffect(() => {
    setIsLoadingCollectionTrades(false);
  }, [collectionTrades]);

  useEffect(() => {
    setIsLoadingRecentTrades(false);
  }, [recentTrades]);

  function setLoading(state: boolean) {
    setIsLoadingCollection(state);
    setIsLoadingCollectionTrades(state);
    setIsLoadingRecentTrades(state);
  }

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

  function getStatsTop() {
    return [
      {
        name: 'Supply',
        value:
          activeCollection?.totalSupply && `${activeCollection?.totalSupply}`,
      },
      {
        name: 'Unique Ownership',
        value: `${(
          (activeCollection?.numOwners / activeCollection?.totalSupply) *
          100
        ).toFixed(2)}%`,
      },
      {
        name: 'First Deployed',
        value: `${
          activeCollection.firstMint
            ? moment.unix(activeCollection?.firstMint).fromNow()
            : 'tbd'
        }`,
      },
    ];
  }

  function getStatsBot() {
    const rng = range || '24h';
    return [
      {
        name: `${rng} Volume`,
        value:
          activeCollection?.osThirtyDayVolume &&
          `${(activeCollection?.osThirtyDayVolume).toFixed(2)} ETH`,
      },
      {
        name: `${rng} Sales`,
        value:
          activeCollection?.osThirtyDaySales &&
          `${activeCollection?.osThirtyDaySales}`,
      },
      {
        name: 'Floor Price',
        value:
          activeCollection?.osFloorPrice &&
          `${(activeCollection?.osFloorPrice).toFixed(2)} ETH`,
      },
    ];
  }

  function setBody() {
    if (!tab) {
      return (
        activeCollection?.contractAddress && (
          <div
            className="h-inherit overflow-scroll pb-80"
            key={'collection-page-' + activeCollection?.contractAddress}
          >
            <div className="my-4">
              {collectionUpdates && collectionUpdates.length > 1 && (
                <CollectionAnnouncementBanner
                  route={`/collection/${id}?tab=updates`}
                  message={
                    collectionUpdates[0].data.content.substring(0, 80) + '...'
                  }
                />
              )}
            </div>
            <div className="py-8 bg-gray-100 dark:bg-black w-full">
              <div className="my-8">
                <StatsBoxList
                  stats={getStatsTop()}
                  route={`/collection/${id}?tab=analytics`}
                />
              </div>
              <div className="block xl:flex mx-8">
                <div className="w-full mr-2 mt-5 rounded-xl drop-shadow-md overflow-hidden">
                  {collectionTrades && !isLoadingCollectionTrades && (
                    <SalesHistoryChart
                      data={collectionTrades}
                    ></SalesHistoryChart>
                  )}
                </div>
              </div>
              <div className="my-8">
                <StatsBoxList
                  stats={getStatsBot()}
                  route={`/collection/${id}?tab=analytics`}
                />
              </div>
              <div className="block xl:flex mx-8">
                <div className="w-full ml-2 mt-5 rounded-xl drop-shadow-md overflow-hidden">
                  {collectionTrades && !isLoadingCollectionTrades && (
                    <AveragePriceVolumeChart
                      data={collectionTrades}
                    ></AveragePriceVolumeChart>
                  )}
                </div>
              </div>
            </div>
            <div className="my-14">
              <div className="max-w-8xl mx-auto pb-4 px-4 sm:px-6 md:px-8">
                <CollectionTitleHeader
                  title={'New Listings'}
                  buttonText={'See More'}
                  route={`/collection/${id}?tab=listings`}
                />
              </div>
              <CollectionListSingleRow
                selectedNfts={recentListings}
                collectionName={activeCollection?.name}
                chainId={activeCollection?.chainId}
                keyPrefix={'newListings'}
              />
            </div>
            <div className="my-14">
              <div className="max-w-8xl mx-auto pb-4 px-4 sm:px-6 md:px-8">
                <CollectionTitleHeader
                  title={'Recent Sales'}
                  buttonText={'See More'}
                  route={`/collection/${id}?tab=analytics`}
                />
              </div>
              <CollectionListSingleRow
                selectedNfts={recentTrades}
                collectionName={activeCollection?.name}
                chainId={activeCollection?.chainId}
                keyPrefix={'recentTrades'}
              />
            </div>
          </div>
        )
      );
    }
    if (tab == 'listings') {
      return (
        <>
          {/* <div className="-mt-6"> */}
          {activeListings && activeListings.length > 0 && (
            <CollectionListings
              selectedNfts={activeListings && [...activeListings]}
              totalListings={totalListings}
            />
          )}
          {/* </div> */}
        </>
      );
    }
    if (tab == 'updates') {
      return (
        <>
          <div className="mt-6 h-inherit overflow-scroll">
            {activeCollection?.contractAddress && (
              <CollectionUpdates
                updates={collectionUpdates}
                isLoading={isLoadingCollectionUpdates}
              />
            )}
          </div>
        </>
      );
    }
    if (tab == 'analytics') {
      return (
        <div className="h-inherit overflow-scroll pb-80">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
            <CollectionTitleHeader title={'Summary Stats'} />
          </div>
          <StatsBoxList
            stats={getStatsTop()}
            route={`/collection/${id}?tab=analytics`}
          />
          <div className="bg-gray-50 dark:bg-white/[.02] my-12 py-16 px-4 sm:px-6 md:px-8">
            <div className="flex w-full">
              <div className="w-full rounded-xl overflow-hidden mr-8">
                {collectionTrades && (
                  <SalesHistoryChart
                    data={collectionTrades}
                  ></SalesHistoryChart>
                )}
              </div>
              <div className="w-full rounded-xl overflow-hidden">
                {collectionTrades && (
                  <AveragePriceVolumeChart
                    data={collectionTrades}
                  ></AveragePriceVolumeChart>
                )}
              </div>
            </div>
          </div>
          <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
            <HolderDistrbutionChart
              contractAddress={activeCollection?.contractAddress}
            ></HolderDistrbutionChart>
          </div>
          <div className="bg-gray-50 dark:bg-white/[.02]">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
              <CollectionTitleHeader
                title={'Bubble Chart - Holder Relationships'}
              />
            </div>
            <div className="w-full my-10 px-4 sm:px-6 md:px-8 rounded-xl overflow-hidden">
              {activeCollection && activeCollection.contractAddress && (
                <iframe
                  className="w-full h-[50vh] rounded-xl"
                  src={`https://app.bubblemaps.io/eth/token/${
                    activeCollection.contractAddress
                  }?theme=${theme == 'light' ? 'gemxyz' : 'dark'}`}
                />
              )}
            </div>
          </div>
        </div>
      );
    }
    if (tab == 'traits') {
      return (
        <div className="flex w-full justify-between flex-col h-inherit">
          <div className="flex w-full justify-between flex-row h-inherit">
            <div className="w-full">
              {' '}
              <div className="items-center mt-[30vh] justify-center mx-auto text-gray-500 flex">
                <div className="pt-1 mr-2">Please select a trait</div>
                <RightArrow height={16} width={16} />
              </div>
            </div>
            <TraitsSidebarFilter
              traits={
                activeCollection?.traits && JSON.parse(activeCollection?.traits)
              }
            />
          </div>
        </div>
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
          title={<CollectionProfileHeader collection={activeCollection} />}
          primaryTabs={<Tab tabs={primaryTabs} />}
          secondaryTabs={setSecondaryTabs()}
          refresh={setRefreshButton()}
          body={setBody()}
          banner={activeCollection?.bannerImageUrl}
        />
      </Layout>
    </motion.div>
  );
}
