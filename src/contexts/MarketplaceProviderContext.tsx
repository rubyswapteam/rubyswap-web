import { INftCollection, NftChainId } from '@/utils/nftUtils';
import { ethers } from 'ethers';
import { cp } from 'fs';
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

  async function getTradesX2Y2(user = '', contract = '') {
    const user_address = user != undefined ? '=' + user : '';
    const contract_address = contract != undefined ? '=' + contract : '';
    const salesUrl = `/.netlify/functions/getTradesX2Y2?from${user_address}&to&contract${contract_address}`;
    const purchasesUrl = `/.netlify/functions/getTradesX2Y2?from&to${user_address}&contract${contract_address}`;

    const salesRaw = await (
      await fetch(salesUrl, { method: 'GET', redirect: 'follow' })
    ).json();
    const purchasesRaw = await (
      await fetch(purchasesUrl, { method: 'GET', redirect: 'follow' })
    ).json();

    const sales = salesRaw.data.map((sale: any) => {
      return {
        timestamp: sale.order.updated_at,
        price: ethers.utils.formatEther(sale.order.price),
        contract: sale.token.contract,
        tokenId: sale.token.token_id,
        txn: sale.tx,
        marketplace: 'X2Y2',
      };
    });

    const purchases = purchasesRaw.data.map((purchase: any) => {
      return {
        timestamp: purchase.order.updated_at,
        price: ethers.utils.formatEther(purchase.order.price),
        contract: purchase.token.contract,
        tokenId: purchase.token.token_id,
        txn: purchase.tx,
        marketplace: 'X2Y2',
      };
    });

    return { sales: sales, purchases: purchases };
  }

  async function getCollectionTradesX2Y2(contract = '') {
    const contract_address =
      !!contract && contract.length > 1 ? contract : undefined;
    if (!contract_address) return;

    let cursor = '';
    let resArr: any[] = [];
    let isFinished = false;

    do {
      const url = `/.netlify/functions/getTradesX2Y2?contract=${contract_address}${cursor}`;

      const res = await (
        await fetch(url, { method: 'GET', redirect: 'follow' })
      ).json();

      if (!res.data) return;

      let filteredResultArray = [];

      filteredResultArray = res.data.map((trade: any) => {
        return {
          timestamp: parseInt(trade.order.updated_at),
          price: parseFloat(ethers.utils.formatEther(trade.order.price)),
          contract: trade.token.contract,
          tokenId: trade.token.token_id.toString(),
          txn: trade.tx,
          marketplace: 'X2Y2',
          from: trade.from_address,
          to: trade.to_address,
          chainId: 1,
        };
      });
      resArr = [...resArr, ...filteredResultArray];

      if (res.next && res.next.length > 1) {
        cursor = '&cursor=' + res.next;
      } else {
        isFinished = true;
      }
    } while (!isFinished);

    return resArr;
  }

  async function getTradesLooksRare(user = '', contract = '') {
    const user_address = user != undefined ? '=' + user : '';
    const contract_address =
      contract && contract.length > 1 ? '&contract=' + contract : '';
    const salesUrl = `/.netlify/functions/getTradesLooksRare?from${user_address}${contract_address}`;
    const purchasesUrl = `/.netlify/functions/getTradesLooksRare?to${user_address}${contract_address}`;

    const salesRaw = await (
      await fetch(salesUrl, { method: 'GET', redirect: 'follow' })
    ).json();
    const purchasesRaw = await (
      await fetch(purchasesUrl, { method: 'GET', redirect: 'follow' })
    ).json();

    let sales = [];
    let purchases = [];

    if (salesRaw.data) {
      sales = salesRaw.data?.map((sale: any) => {
        return {
          timestamp: moment(sale.createdAt).unix(),
          price: ethers.utils.formatEther(sale.order.price),
          contract: sale.collection.address,
          tokenId: sale.token.tokenId,
          txn: sale.hash,
          marketplace: 'LooksRare',
        };
      });
    }

    if (purchasesRaw.data) {
      purchases = purchasesRaw.data?.map((purchase: any) => {
        return {
          timestamp: moment(purchase.createdAt).unix(),
          price: ethers.utils.formatEther(purchase.order.price),
          contract: purchase.collection.address,
          tokenId: purchase.token.tokenId,
          txn: purchase.hash,
          marketplace: 'LooksRare',
        };
      });
    }

    return { sales: sales, purchases: purchases };
  }

  async function getCollectionTradesLooksRare(contract = '') {
    const contract_address =
      !!contract && contract.length > 1 ? contract : undefined;
    if (!contract_address) return;

    const url = `/.netlify/functions/getTradesLooksRare?contract=${contract_address}`;

    const res = await (
      await fetch(url, { method: 'GET', redirect: 'follow' })
    ).json();

    let filteredResultArray = [];

    if (res.data) {
      filteredResultArray = res.data?.map((trade: any) => {
        return {
          timestamp: moment(trade.createdAt).unix(),
          price: parseFloat(ethers.utils.formatEther(trade.order.price)),
          contract: trade.collection.address,
          tokenId: trade.token.tokenId.toString(),
          txn: trade.hash,
          marketplace: 'LooksRare',
          from: trade.from,
          to: trade.to,
          chainId: 1,
        };
      });
    }

    return filteredResultArray;
  }

  async function getUserTrades(user = '', contract = '') {
    // const [x2y2res, looksRes] = await Promise.all([
    const x2y2res = await getTradesX2Y2(user, contract);
    const looksRes = await getTradesLooksRare(user, contract);
    // ]);
    const aggregateTrades = getAggregateTrades(x2y2res, looksRes);
    setUserTrades(aggregateTrades);
    applyTradeFilters(aggregateTrades, tradeFilters);
  }

  async function getCollectionTrades(
    collection = activeCollection?.contractAddress,
  ) {
    if (!collection) return;
    const [x2y2res, looksRes] = await Promise.all([
      getCollectionTradesX2Y2(collection),
      getCollectionTradesLooksRare(collection),
    ]);
    let trades: any[] = [];
    if (x2y2res) trades = [...trades, ...x2y2res];
    if (looksRes) trades = [...trades, ...looksRes];

    setCollectionTrades(trades);

    const recentTrades = trades
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(-10);

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
    setRecentTrades(recentTrades);

    // while (index < trades.length) {
    //   promiseArray.push(
    //     await fetch(dbPostUrl, {
    //       method: 'POST',
    //       body: JSON.stringify(trades.slice(index, index + size)),
    //       redirect: 'follow',
    //     }).then((response) => response.json()),
    //   );
    //   index += size;
    // }
    // Promise.all(promiseArray);

    // const test = await fetch(dbPostUrl, {
    //   method: 'POST',
    //   body: JSON.stringify(trades.splice(-200)),
    //   redirect: 'follow',
    // });
    const dbPostUrl = '/.netlify/functions/postHistoricalTradesToDb';
    const promiseArray: any[] = [];
    let index = 0;
    const size = 2;
    const loopLimit = trades.length / size + 1;
    for (let i = 0; i < loopLimit; i++) {
      console.log(trades.slice(index, index + size));
      // setTimeout(function timer() {
      promiseArray.push(
        fetch(dbPostUrl, {
          method: 'POST',
          body: JSON.stringify(trades.slice(index, index + size)),
          redirect: 'follow',
        }),
      );
      index += size;
    }
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

  function getAggregateTrades(
    x2y2res: { sales: any[]; purchases: any[] },
    looksRes: { sales: any[]; purchases: any[] },
  ) {
    let userSales: any[] = [];
    let userPurchases: any[] = [];
    if (x2y2res.sales && x2y2res.sales.length > 0)
      userSales = [...userSales, ...x2y2res.sales];
    if (x2y2res.purchases && x2y2res.purchases.length > 0)
      userPurchases = [...userPurchases, ...x2y2res.purchases];
    if (looksRes.sales && looksRes.sales.length > 0)
      userSales = [...userSales, ...looksRes.sales];
    if (looksRes.purchases && looksRes.purchases.length > 0)
      userPurchases = [...userPurchases, ...looksRes.purchases];

    return { sales: userSales, purchases: userPurchases };
  }

  async function fetchCollectionFromDb(slug: string) {
    let collection: any = {};
    try {
      collection = (
        await (
          await fetch(
            `/.netlify/functions/getDbCollectionBySlug?slug=${slug}`,
            {
              method: 'GET',
              redirect: 'follow',
            },
          )
        ).json()
      )[0];
    } catch {
      collection = false;
    }

    return collection;
  }

  async function getCollectionBySlug(
    slug = '',
    getTrades = false,
    setActive = true,
    persist = false,
  ) {
    if (!slug || slug.length < 3) return false;
    console.log('getCollectionBySlug');
    console.log(slug);
    let collection: any = await fetchCollectionFromDb(slug);
    const isStored = collection && collection.contractAddress;
    try {
      console.log(!isStored);
      if (!isStored) {
        const collectionRaw = await (
          await fetch(`https://api.opensea.io/api/v1/collection/${slug}`, {
            method: 'GET',
            redirect: 'follow',
          })
        ).json();
        console.log(collectionRaw);
        if (slug.length > 1 && collectionRaw && collectionRaw.collection) {
          collection = {
            contractAddress:
              collectionRaw.collection.primary_asset_contracts[0].address,
            editors: collectionRaw.collection.editors,
            slug: collectionRaw.collection.slug,
            imageUrl: collectionRaw.collection.image_url,
            largeImageUrl: collectionRaw.collection.large_image_url,
            bannerImageUrl: collectionRaw.collection.banner_image_url,
            schemaName:
              collectionRaw.collection.primary_asset_contracts[0].schema_name,
            description: collectionRaw.collection.description,
            osVerificationState:
              collectionRaw.collection.safelist_request_status == 'verified',
            name: collectionRaw.collection.name,
            website: collectionRaw.collection.external_url,
            discordUrl: collectionRaw.collection.discord_url,
            twitterUsername: collectionRaw.collection.twitter_username,
            instagramUsername: collectionRaw.collection.instagram_username,
            chainId: NftChainId.ETHEREUM,
            osOneDayVolume: collectionRaw.collection.stats.one_day_volume,
            osOneDaySales: collectionRaw.collection.stats.one_day_sales,
            osOneDayChange: collectionRaw.collection.stats.one_day_change,
            osSevenDayVolume: collectionRaw.collection.stats.seven_day_volume,
            osSevenDaySales: collectionRaw.collection.stats.seven_day_sales,
            osSevenDayChange: collectionRaw.collection.stats.seven_day_change,
            osThirtyDaySales: collectionRaw.collection.stats.thirty_day_sales,
            osThirtyDayVolume: collectionRaw.collection.stats.thirty_day_volume,
            osThirtyDayChange: collectionRaw.collection.stats.thirty_day_change,
            osTotalVolume: collectionRaw.collection.stats.total_volume,
            osTotalSales: collectionRaw.collection.stats.total_sales,
            osFloorPrice: collectionRaw.collection.stats.floor_price,
            numOwners: collectionRaw.collection.stats.num_owners,
            totalSupply: collectionRaw.collection.stats.total_supply,
            traits: JSON.stringify(collectionRaw.collection.traits),
            updatedAt: moment().unix(),
            osStatsUpdatedAt: moment().unix(),
          };
          console.log(collection);
        }
        if (persist || !isStored) {
          const dbPostUrl = '/.netlify/functions/postCollectionToDb';
          fetch(dbPostUrl, {
            method: 'POST',
            body: JSON.stringify(collection),
            redirect: 'follow',
          });
        }
      }
      if (setActive) setActiveCollection(collection);
      if (getTrades) {
        getCollectionTrades(collection.contractAddress);
      }
      return collection;
    } catch {
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
      getCollectionBySlug,
      collectionTrades,
      getCollectionTrades,
      recentTrades,
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
      getCollectionBySlug,
      collectionTrades,
      getCollectionTrades,
      recentTrades,
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
