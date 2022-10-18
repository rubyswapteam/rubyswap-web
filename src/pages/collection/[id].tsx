import CollectionAnnouncementBanner from '@/components/CollectionAnnouncementBanner';
import { CollectionHoldersOverlapCardsContainer } from '@/components/CollectionHoldersOverlapCardsContainer';
import CollectionListings from '@/components/CollectionListings';
import CollectionListSingleRow from '@/components/CollectionListSingleRow';
import CollectionProfileHeader from '@/components/CollectionProfileHeader';
import CollectionTitleHeader from '@/components/CollectionTitleHeader';
import Dashboard from '@/components/Dashboard';
import { DashboardStats } from '@/components/DashboardStats';
import HolderDistrbutionChart from '@/components/HolderDistributionChart';
import Layout from '@/components/Layout';
import ListingRanksChart from '@/components/ListingRanksChart';
import RefreshButton from '@/components/RefreshButton';
import SalesHistoryChart from '@/components/SalesHistoryChart';
import Tab from '@/components/Tab';
import { useModalProvider } from '@/contexts/ModalContext';
import { rangeTabs } from '@/utils/nftUtils';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AveragePriceVolumeChart from '../../components/AveragePriceVolumeChart';
import CollectionUpdates from '../../components/CollectionUpdates';
import ListingDistributionChart from '../../components/ListingDistributionChart';
import RightArrow from '../../components/RightArrow';
import TraitsSidebarFilter from '../../components/TraitsSidebarFilter';
import { useMarketplaceProvider } from '../../contexts/MarketplaceProviderContext';

export default function Collection(props: any) {
  const router = useRouter();
  const { id, tab, range } = router.query;
  const { theme } = useTheme();
  const [counter, setCounter] = useState<number>(0);
  const [isLoadingCollectionTrades, setIsLoadingCollectionTrades] =
    useState<boolean>(true);
  const [collectionUpdates, setCollectionUpdates] = useState<any[]>([]);
  const [recentListings, setRecentListings] = useState<any[]>([]);
  const [pauseListings, setPauseListings] = useState(false);
  const [activeTrait, setActiveTrait] = useState<any>();
  const [showBubbleMap, setShowBubbleMap] = useState(false);
  const [showListingCharts, setShowListingCharts] = useState<boolean>(false);
  const [isLoadingCollectionUpdates, setIsLoadingCollectionUpdates] =
    useState(false);
  const {
    activeCollection,
    getCollection,
    collectionTrades,
    recentTrades,
    activeListings,
    fetchActiveListings,
    getTokenRanks,
    tokenRanks,
    totalListings,
    getFirstMint,
    collectionHolders,
    getCollectionHolders,
    comparisonCollectionHolders,
    setComparisonCollectionHolders,
  } = useMarketplaceProvider();
  const { loadingData, setLoadingData } = useModalProvider();
  useEffect(() => {
    if (
      !loadingData &&
      tab &&
      !['activity', 'traits', 'updates'].includes(tab.toString())
    ) {
      if (
        (tab === 'listings' && !activeListings) ||
        (tab === 'holders' &&
          (!collectionHolders || !comparisonCollectionHolders)) ||
        ((!tab || tab == 'analytics') &&
          (!activeListings || !collectionTrades || !activeCollection))
      ) {
        setLoadingData(true);
      }
    }
  }, [activeCollection, tab]);

  useEffect(() => {
    if (loadingData) {
      if (tab === 'listings' && activeListings) setLoadingData(false);
      else if (
        tab === 'holders' &&
        collectionHolders &&
        comparisonCollectionHolders
      )
        setLoadingData(false);
      else if (
        (!tab || tab == 'analytics') &&
        activeListings &&
        collectionTrades &&
        activeCollection
      )
        setLoadingData(false);
      else if (
        tab &&
        ['activity', 'traits', 'updates'].includes(tab?.toString())
      )
        setLoadingData(false);
    }
  }, [
    tab,
    activeListings,
    collectionTrades,
    activeCollection,
    comparisonCollectionHolders,
    collectionHolders,
  ]);

  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    if (
      !activeCollection ||
      !activeCollection.collection ||
      activeCollection.collection.slug.toString().toLowerCase() !==
        id?.toString().toLowerCase()
    ) {
      setLoading(true);
      getCollection(id, true).then((res: any) => {
        setIsLoadingCollectionTrades(false);
      });
    }
  }, [id]);

  function camelize(str: string) {
    return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase(),
    );
  }

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async (contractAddress: string) => {
      let collection: any = {};
      try {
        collection = await (
          await fetch(
            `/.netlify/functions/getDbCollectionUpdatesByContract?contract=${contractAddress}`,
            {
              signal: signal,
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
            controller.abort();
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
    console.log('useEffect listings');
    console.log(
      ((tab == 'holders' && activeCollection?.contractAddress) ||
        (tab == 'analytics' && activeCollection?.contractAddress)) &&
        (!collectionHolders ||
          activeCollection?.contractAddress !== collectionHolders[0]?.contract),
    );
    if (
      ((tab == 'analytics' && activeCollection?.contractAddress) ||
        (tab == 'listings' && activeCollection?.contractAddress) ||
        (activeCollection?.contractAddress && tab == undefined)) &&
      !pauseListings
    ) {
      const limit = 3000;
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
    if (
      ((tab == 'holders' && activeCollection?.contractAddress) ||
        (tab == 'analytics' && activeCollection?.contractAddress)) &&
      (!collectionHolders ||
        activeCollection?.contractAddress !== collectionHolders[0]?.contract)
    ) {
      getCollectionHolders(activeCollection?.contractAddress, true).then(() =>
        controller.abort(),
      );
    }
    console.log('cond');
    if (
      tab == 'holders' &&
      activeCollection?.contractAddress &&
      !comparisonCollectionHolders
    ) {
      console.log('cond success');
      getCollectionHolders(undefined, false, true).then((res: any) =>
        setComparisonCollectionHolders(res),
      );
    }
  }, [activeCollection?.contractAddress, tab]);

  useEffect(() => {
    setPauseListings(false);
    fetch(
      'https://europe-west1-cryptos-tools.cloudfunctions.net/get-bubble-map-availability?chain=bsc&token=0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95',
    ).then((res: any) =>
      setShowBubbleMap(res?.availability && res?.status == 'OK'),
    );
    const interval = setInterval(() => {
      if (!pauseListings) {
        setPauseListings((prev) => {
          if (!prev) {
            setCounter((prev) => prev + 1);
          }
          return prev;
        });
      }
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      tab == 'listings' &&
      activeCollection?.contractAddress &&
      !pauseListings
    ) {
      fetchActiveListings(activeCollection.contractAddress, 3000);
    }
  }, [counter]);

  useEffect(() => {
    if (activeCollection?.contractAddress) {
      getTokenRanks(activeCollection.contractAddress);
      if (!activeCollection?.firstMint)
        getFirstMint(activeCollection.contractAddress);
    }
  }, [activeCollection?.contractAddress]);

  useEffect(() => {
    setIsLoadingCollectionTrades(false);
  }, [collectionTrades]);

  function setLoading(state: boolean) {
    setIsLoadingCollectionTrades(state);
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
      name: 'Activity',
      href: `/collection/${id}?tab=activity`,
      current: tab == 'activity',
      border: true,
    },
    {
      name: 'Holders',
      href: `/collection/${id}?tab=holders`,
      current: tab == 'holders',
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
            <div className="py-8 w-full">
              <div className="mx-8">
                <CollectionTitleHeader
                  title={'Summary Stats'}
                  buttonText={'See More'}
                  route={`/collection/${id}?tab=analytics`}
                />
                <div className="mt-4 block xl:flex">
                  <div className="w-full mb-8 xl:mb-0 rounded-xl drop-shadow-md overflow-hidden">
                    {collectionTrades && !isLoadingCollectionTrades && (
                      <SalesHistoryChart
                        activeContract={activeCollection?.contractAddress}
                        data={collectionTrades}
                        tokenRanks={tokenRanks}
                      ></SalesHistoryChart>
                    )}
                  </div>
                  <div className="w-full ml-0 xl:ml-4 rounded-xl drop-shadow-md overflow-hidden">
                    {collectionTrades && !isLoadingCollectionTrades && (
                      <AveragePriceVolumeChart
                        activeContract={activeCollection?.contractAddress}
                        data={collectionTrades}
                      ></AveragePriceVolumeChart>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="block xl:flex mx-8 gap-x-4">
              <div className="w-full overflow-hidden">
                <DashboardStats
                  collection={activeCollection}
                  listings={activeListings}
                  totalListings={totalListings}
                />
              </div>
              <div className="w-full mt-8 xl:mt-0 rounded-xl drop-shadow-md overflow-hidden">
                {activeListings && activeListings.length > 0 && (
                  <ListingDistributionChart
                    activeContract={activeCollection?.contractAddress}
                    data={activeListings}
                  />
                )}
              </div>
            </div>
            {activeListings && tokenRanks && (
              <div className="block xl:flex mx-8 gap-x-4 pt-8">
                <div className="w-full overflow-hidden rounded-xl">
                  <ListingRanksChart
                    activeContract={activeCollection?.contractAddress}
                    data={activeListings}
                    tokenRanks={tokenRanks}
                  />
                </div>
              </div>
            )}
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
                selectDisabled={true}
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
            <div
              className="h-inherit"
              // key={`${activeCollection?.contractAddress}-${counter}-outer`}
              key={`${activeCollection?.contractAddress}-outer`}
              onMouseEnter={() => {
                setPauseListings(true);
                console.log('on');
              }}
              onMouseLeave={() => {
                setPauseListings(false);
                console.log('off');
              }}
            >
              <CollectionListings
                collectionName={activeCollection?.name}
                selectedNfts={activeListings && [...activeListings]}
                totalListings={totalListings}
                tokenRanks={
                  tokenRanks &&
                  tokenRanks?.contract == activeCollection?.contractAddress &&
                  tokenRanks
                }
                keyPrefix={`${activeCollection?.contractAddress}-${counter}`}
              />
            </div>
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
          <div className="py-8 w-full">
            <div className="block xl:flex mx-8">
              <div className="w-full mb-8 xl:mb-0 rounded-xl drop-shadow-md overflow-hidden">
                {collectionTrades && !isLoadingCollectionTrades && (
                  <SalesHistoryChart
                    activeContract={activeCollection?.contractAddress}
                    data={collectionTrades}
                    tokenRanks={tokenRanks}
                  ></SalesHistoryChart>
                )}
              </div>
              <div className="w-full ml-0 xl:ml-4 rounded-xl drop-shadow-md overflow-hidden">
                {collectionTrades && !isLoadingCollectionTrades && (
                  <AveragePriceVolumeChart
                    activeContract={activeCollection?.contractAddress}
                    data={collectionTrades}
                  ></AveragePriceVolumeChart>
                )}
              </div>
            </div>
          </div>
          <div className="block xl:flex mx-8 gap-x-4">
            <div className="w-full overflow-hidden">
              <DashboardStats
                collection={activeCollection}
                listings={activeListings}
                totalListings={totalListings}
              />
            </div>
            <div className="w-full mt-8 xl:mt-0 rounded-xl drop-shadow-md overflow-hidden">
              {activeListings && activeListings.length > 0 && (
                <ListingDistributionChart
                  activeContract={activeCollection?.contractAddress}
                  data={activeListings}
                ></ListingDistributionChart>
              )}
            </div>
          </div>

          {activeListings && tokenRanks && (
            <div className="block xl:flex mx-8 gap-x-4 pt-8">
              <div className="w-full overflow-hidden rounded-xl">
                <ListingRanksChart
                  activeContract={activeCollection?.contractAddress}
                  data={activeListings}
                  tokenRanks={tokenRanks}
                />
              </div>
            </div>
          )}

          <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
            <HolderDistrbutionChart
              contractAddress={activeCollection?.contractAddress}
              holders={collectionHolders}
            ></HolderDistrbutionChart>
          </div>
          {!showBubbleMap && (
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
          )}
        </div>
      );
    }
    if (tab == 'holders') {
      return (
        <div className="mt-0 h-inherit overflow-scroll px-8 pb-80">
          <div className="pb-4">
            <p className="text-lg text-black dark:text-white leading-6 font-medium">
              Collection Overlap Statistics
            </p>
            <p className="text-xs text-white/70 pt-2">
              Click and drag the cards to reshuffle
            </p>
          </div>
          <div className="flex">
            <CollectionHoldersOverlapCardsContainer
              key={`ruby-chocc-${activeCollection?.contractAddress}`}
              holders={collectionHolders}
              targetHolders={comparisonCollectionHolders}
              activeCollection={activeCollection}
            />
          </div>
        </div>
      );
    }
    if (tab == 'traits') {
      return (
        <div className="flex w-full justify-between flex-col h-full">
          <div className="flex w-full justify-between flex-row h-inherit px-8 gap-x-4">
            {/* <div className="w-full"> */}
            {activeTrait ? (
              <div className="border dark:border-white/5 dark:bg-white/5 p-4 sm:p-6 md:p-8 rounded-md w-full">
                {/* SORT IT */}
                <div className="flex p-2 text-sm font-bold">
                  <div className="w-[25%]">Trait</div>
                  <div className="w-[15%]">Rarity</div>
                  <div className="w-[15%]">No. of Items</div>
                  <div className="w-[15%]">% of Collection</div>
                  <div className="w-[30%]">
                    <label hidden>Buttons</label>
                  </div>
                </div>
                {Object.keys(activeTrait).map((trait: string) => (
                  <div
                    key={`${trait}-${activeTrait[trait]}-${activeCollection}`}
                    className="flex gap-x-2 items-center p-2 rounded-md text-sm hover:bg-yellow-500/5 transition-colors cursor-pointer"
                  >
                    <div className="w-[25%]">{camelize(trait)}</div>
                    <div className="w-[15%]">{'Legendary'}</div>
                    <div className="w-[15%]">{activeTrait[trait]}</div>
                    <div className="w-[15%]">
                      {`${(
                        (100 * activeTrait[trait]) /
                        activeCollection.totalSupply
                      ).toFixed(2)}%`}
                    </div>
                    <div className="w-[30%] gap-x-4 flex">
                      <button className="px-2 py-1 bg-white/5 hover:bg-white/10 transition-colors border border-white/5 rounded-md">
                        {'View Example'}
                      </button>
                      <button className="px-2 py-1 bg-white/5 hover:bg-white/10 transition-colors border border-white/5 rounded-md">
                        {'See Listings'}
                      </button>
                    </div>
                  </div>
                ))}
                {/* <div>None</div>
                <div>
                  {`${(
                    (100 * activeTrait[trait]) /
                    activeCollection.totalSupply
                  ).toFixed(2)}%`}
                </div>
                <div>
                  {activeCollection.totalSupply -
                    (Object.values(activeTrait).reduce(
                      (a: number, b: number) => a + b,
                      0
                    ) as number)}
                </div>
                <button className="px-2 py-1 bg-white/5 hover:bg-white/10 transition-colors border border-white/5 rounded-md">
                  {'View Example'}
                </button>
                <button className="px-2 py-1 bg-white/5 hover:bg-white/10 transition-colors border border-white/5 rounded-md">
                  {'See Listings'}
                </button>*/}
              </div>
            ) : (
              <div className="items-center justify-center mx-auto text-gray-500 flex flex-col">
                <div className="inline-flex items-center justify-center">
                  <div className="pt-1 mr-2">Please select a trait</div>
                  <RightArrow height={16} width={16} />
                </div>
              </div>
            )}
            {/* </div> */}
            <TraitsSidebarFilter
              camelize={camelize}
              traits={
                activeCollection?.traits && JSON.parse(activeCollection?.traits)
              }
              setActiveTrait={setActiveTrait}
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
            tabs={rangeTabs(tab, range, `/collection/${id}`, '30d')}
            condense={true}
          />
        </>
      );
    }
  }

  return (
    <motion.div
      key={`collection-${id}`}
      exit={{ opacity: 0 }}
      initial={'initial'}
      animate={'animate'}
    >
      <Layout>
        <Dashboard
          setModal={props.setModal}
          title={
            <CollectionProfileHeader
              collection={activeCollection}
              listingPrice={
                recentListings[0]?.price || recentListings[0]?.currentEthPrice
              }
            />
          }
          primaryTabs={<Tab tabs={primaryTabs} />}
          secondaryTabs={setSecondaryTabs()}
          liveView={setRefreshButton()}
          listingChartsIcon={tab == 'listings'}
          body={setBody()}
          banner={activeCollection?.bannerImageUrl}
          pauseLiveView={pauseListings}
          setShowListingCharts={setShowListingCharts}
          showListingCharts={showListingCharts}
        />
      </Layout>
    </motion.div>
  );
}
