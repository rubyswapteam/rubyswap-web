import { ethers } from 'ethers';
import moment from 'moment';
import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from 'react';

const MarketplaceProviderContext = React.createContext<any>({});

export const MarketplaceProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [userTrades, setUserTrades] = useState<any>(undefined);
  const [collectionTrades, setCollectionTrades] = useState<any>(undefined);
  const [userTradesFiltered, setUserTradesFiltered] = useState<any>(undefined);
  const [recentTrades, setRecentTrades] = useState<any>(undefined);
  const [tradeFilters, setTradeFilters] = useState<any>({
    marketplace: '',
    contract: '',
  });
  const [activeCollection, setActiveCollection] = useState<any>(undefined);
  const [tokenRanks, setTokenRanks] = useState<any>(undefined);
  const [activeListings, setActiveListings] = useState<any[]>();
  const [totalListings, setTotalListings] = useState<number>(0);
  const [marketplaces] = useState(['Opensea', 'Seaport', 'X2Y2', 'LooksRare']);
  async function fetchGet(url: string) {
    const res = await (
      await fetch(url, { method: 'GET', redirect: 'follow' })
    ).json();
    return res;
  }

  function mapTrades(obj: any, marketplace: string) {
    return obj[marketplace]?.trades?.map((trade: any) => ({
      timestamp: parseInt(trade.timestamp),
      price: parseFloat(trade.priceETH),
      contract: trade?.collection?.id || 'unknown',
      tokenId: trade.tokenId.toString(),
      txn: trade.transactionHash.toString(),
      marketplace: marketplace,
      from: trade?.seller || '',
      to: trade?.buyer || '',
      chainId: 1,
    }));
  }

  async function getTrades(user = '', contract = '', includeMints = false) {
    const user_address = user != undefined ? '=' + user : '';
    const contract_address =
      contract && contract.length > 1 ? '&contract=' + contract : '';
    const salesUrl = `/.netlify/functions/getTrades?order=desc&from${user_address}${contract_address}`;
    const purchasesUrl = `/.netlify/functions/getTrades?order=desc&to${user_address}${contract_address}`;
    const salesRaw = await fetchGet(salesUrl);
    const purchasesRaw = await fetchGet(purchasesUrl);
    let sales: any[] = [];
    let purchases: any[] = [];
    for (let i = 0; i < marketplaces.length; i++) {
      const marketplace = marketplaces[i];
      if (salesRaw && salesRaw)
        sales = [...sales, ...mapTrades(salesRaw, marketplace)];
      if (purchasesRaw)
        purchases = [...purchases, ...mapTrades(purchasesRaw, marketplace)];
    }
    return { sales: sales, purchases: purchases };
  }

  async function fetchCollectionTrades(contract = '', baseTimeFilter = '') {
    const contract_address =
      !!contract && contract.length > 1 ? contract : undefined;
    let repeat = false;
    if (!contract_address) return;
    let adj = baseTimeFilter;
    let finalResult: any = [];
    do {
      const res = await fetchGet(
        `/.netlify/functions/getTrades?contract=${contract_address}${adj}`,
      );
      let resArr: any = [];
      const marketplaces: string[] = Object.keys(res);
      repeat = false;
      adj = '';
      for (let i = 0; i < marketplaces.length; i++) {
        const marketplace = marketplaces[i];
        const mappedTrades = mapTrades(res, marketplace);
        if (mappedTrades) {
          resArr = [...resArr, ...mappedTrades];
        }
        repeat = repeat || !!res[marketplace]?.last;
        adj =
          adj +
          (res[marketplace]?.last
            ? `&${marketplace}=${res[marketplace]?.last.timestamp}`
            : `&${marketplace}=0`);
      }
      finalResult = [...finalResult, ...resArr];
    } while (repeat);

    return finalResult;
  }

  async function getUserTrades(user = '', contract = '') {
    const trades = await getTrades(user, contract);
    setUserTrades(trades);
    applyTradeFilters(trades, tradeFilters);
  }

  async function getCollectionTradesfromDb(contractAddress: string) {
    const collection = await (
      await fetch(
        `/.netlify/functions/getDbTradesByContract?contract=${contractAddress}`,
        {
          method: 'GET',
          redirect: 'follow',
        },
      )
    ).json();
    return collection;
  }

  async function getTokenRanks(contract = '', slug = '') {
    const suffix = contract ? `contract=${contract}` : `slug=${slug}`;

    const ranks = await (
      await fetch(`/.netlify/functions/getDbRarity?${suffix}`, {
        method: 'GET',
        redirect: 'follow',
      })
    ).json();
    if (ranks && ranks?.length == 1) {
      const contract = ranks[0].contractAddress;
      const tokenRanks = JSON.parse(ranks[0].ranks);
      const supply = Object.keys(tokenRanks).length;
      const tiers = [
        Math.floor(supply / 100),
        Math.floor(supply / 10),
        Math.floor(supply / 2),
      ];
      setTokenRanks({ contract: contract, ranks: tokenRanks, tiers: tiers });
    } else {
      setTokenRanks(undefined);
    }
    return ranks;
  }

  function getBasetimeByMarketplace(trades: any) {
    const unixNow = moment().unix() - 60 * 60 * 24 * 30;
    let baseTimeFilter = '';
    for (let i = 0; i < marketplaces.length; i++) {
      const marketplace = marketplaces[i];
      const basetime = Math.max(
        Math.max(
          ...trades
            .filter((txn: any) => txn.marketplace == marketplace)
            .map((txn: any) => txn.timestamp),
        ),
        unixNow,
      );
      baseTimeFilter = baseTimeFilter + `&${marketplace}=${basetime}`;
    }
    return baseTimeFilter;
  }

  async function getCollectionTrades(
    collection = activeCollection?.contractAddress,
  ) {
    if (!collection) return;
    let dbTrades = await getCollectionTradesfromDb(collection);
    if (!Array.isArray(dbTrades)) dbTrades = [];
    const baseTimeFilter = getBasetimeByMarketplace(dbTrades);
    let newTrades = await fetchCollectionTrades(collection, baseTimeFilter);
    newTrades = newTrades.filter(
      (y: any) =>
        !dbTrades.some((x: any) =>
          ['txn', 'tokenId', 'contract', 'from', 'to', 'price'].every(
            (key) => x[key] == y[key],
          ),
        ),
    );
    //remove duplicates
    newTrades = newTrades.filter(
      (elem: any, index: number, self: any) =>
        self.findIndex(
          (t: any) =>
            t.txn == elem.txn &&
            t.price == elem.price &&
            t.tokenId == elem.tokenId &&
            t.contract == elem.contract &&
            t.from == elem.from &&
            t.to == elem.to,
        ) === index,
    );

    if (newTrades) dbTrades = [...dbTrades, ...newTrades];
    setCollectionTrades(dbTrades);

    const recentTrades = [...dbTrades]
      .sort((a: any, b: any) => a.timestamp - b.timestamp)
      .slice(-6);

    for (let i = 0; i < recentTrades.length; i++) {
      const trade = recentTrades[i];
      if (!trade.image) {
        const url = `/.netlify/functions/getNftLooksRare?contract=${trade.contract}&tokenId=${trade.tokenId}`;
        const tokenMetadata = await (
          await fetch(url, { method: 'GET', redirect: 'follow' })
        ).json();
        recentTrades[i] = {
          ...trade,
          ...{
            image: tokenMetadata.data?.imageURI,
            name: tokenMetadata.data?.name,
          },
        };
      }
    }
    setRecentTrades([...recentTrades]);

    const dbPostUrl = '/.netlify/functions/postHistoricalTradesToDb';
    const promiseArray: any[] = [];
    let index = 0;
    const size = 1000;
    const loopLimit = newTrades.length / size + 1;
    for (let i = 0; i < loopLimit; i++) {
      promiseArray.push(
        fetch(dbPostUrl, {
          method: 'POST',
          body: JSON.stringify(newTrades.slice(index, index + size)),
          redirect: 'follow',
        }),
      );
      index += size;
    }
    await Promise.all(promiseArray);
  }

  function applyTradeFilters(
    trades: { sales: any; purchases: any },
    newFilter: any,
  ) {
    trades = typeof trades !== 'undefined' ? trades : { ...userTrades };
    newFilter =
      typeof newFilter !== 'undefined' ? newFilter : { ...tradeFilters };
    const filters = { ...tradeFilters, ...newFilter };
    setTradeFilters(filters);
    if (filters.marketplace == '' && filters.contract == '') {
      setUserTradesFiltered(undefined);
    } else {
      let sales = trades.sales;
      let purchases = trades.purchases;
      sales = applyTradeFilter(sales, 'contract', filters);
      sales = applyTradeFilter(sales, 'marketplace', filters);
      purchases = applyTradeFilter(purchases, 'contract', filters);
      purchases = applyTradeFilter(purchases, 'marketplace', filters);
      setUserTradesFiltered({ sales: sales, purchases: purchases });
    }
  }

  function applyTradeFilter(obj: any[], field: string, filters: any) {
    return filters[field] !== ''
      ? obj.filter((order) => order[field] === filters[field])
      : obj;
  }

  function getAggregateTrades(arr: { sales: any[]; purchases: any[] }[]) {
    let userSales: any[] = [];
    let userPurchases: any[] = [];
    for (let i = 0; i < arr.length; i++) {
      const res = arr[i];
      if (res.sales && res.sales.length > 0)
        userSales = [...userSales, ...res.sales];
      if (res.purchases && res.purchases.length > 0)
        userPurchases = [...userPurchases, ...res.purchases];
    }
    return { sales: userSales, purchases: userPurchases };
  }

  async function fetchActiveListings(
    contractAddress: string,
    limit = 1000,
    offset = 0,
  ) {
    let listings: any = [];
    try {
      const listingsRaw = await fetch('/.netlify/functions/getListings', {
        method: 'POST',
        body: JSON.stringify({
          contractAddress: contractAddress,
          offset: offset,
          limit: limit,
        }),
      });
      listings = await listingsRaw.json();
      setTotalListings(listings.total);
      listings = listings.data.map((item: any) => {
        return {
          timestamp: item.orderCreatedAt,
          price: (item.currentEthPrice * 10 ** -18).toFixed(3),
          contract: item.address,
          tokenId: item.id,
          txn: undefined,
          marketplace: item.market || item.marketplace,
          looksRareId: undefined,
          from: item.owner,
          to: undefined,
          chainId: 1,
          image: item.imageUrl,
          name: item.name,
          traits: item.traits,
          rarityScore: item.rarityScore,
          pendingTxns: item?.pendingTrxs,
        };
      });
    } catch {
      listings = {};
    }

    setActiveListings(listings);

    return listings;
  }

  async function fetchCollectionFromDb(query: string) {
    let collection: any = {};
    const url = query.toLowerCase().startsWith('0x')
      ? `/.netlify/functions/getDbCollectionByContract?contract=${query}`
      : `/.netlify/functions/getDbCollectionBySlug?slug=${query}`;
    try {
      collection = (
        await (
          await fetch(url, {
            method: 'GET',
            redirect: 'follow',
          })
        ).json()
      )[0];
    } catch {
      collection = false;
    }

    return collection;
  }

  async function getCollection(
    query = '',
    getTrades = false,
    setActive = true,
    persist = false,
  ) {
    if (!query || query.length < 3 || query === undefined || query == '')
      return false;
    let collection: any = undefined;
    collection = await fetchCollectionFromDb(query);
    if (collection && collection?.contractAddress) {
      if (setActive) setActiveCollection(collection);
      if (getTrades) {
        getCollectionTrades(collection.contractAddress);
      }
      return collection;
    } else {
      return false;
    }
  }

  const contextValue = useMemo(
    () => ({
      userTrades,
      setUserTrades,
      getUserTrades,
      tradeFilters,
      setTradeFilters,
      applyTradeFilters,
      userTradesFiltered,
      setUserTradesFiltered,
      activeCollection,
      getCollection,
      collectionTrades,
      getCollectionTrades,
      recentTrades,
      fetchActiveListings,
      activeListings,
      totalListings,
      getTokenRanks,
      tokenRanks,
    }),
    [
      userTrades,
      setUserTrades,
      getUserTrades,
      tradeFilters,
      setTradeFilters,
      applyTradeFilters,
      userTradesFiltered,
      setUserTradesFiltered,
      activeCollection,
      getCollection,
      collectionTrades,
      getCollectionTrades,
      recentTrades,
      fetchActiveListings,
      activeListings,
      totalListings,
      getTokenRanks,
      tokenRanks,
    ],
  );

  return (
    <MarketplaceProviderContext.Provider value={contextValue}>
      {children}
    </MarketplaceProviderContext.Provider>
  );
};

export const useMarketplaceProvider = () =>
  useContext(MarketplaceProviderContext);
