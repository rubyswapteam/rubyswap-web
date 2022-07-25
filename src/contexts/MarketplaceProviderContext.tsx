import { INftCollection, NftChainId } from '@/utils/nftUtils';
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
  const [userTradesFiltered, setUserTradesFiltered] = useState<any>(undefined);
  const [tradeFilters, setTradeFilters] = useState<any>({
    marketplace: '',
    contract: '',
  });
  const [activeCollection, setActiveCollection] = useState<any>(undefined);
  // const x2y2Token = '38d74028-ca13-48df-ab81-bdfa4f3ab834';

  async function getTradesX2Y2(user = '', contract = '') {
    const user_address = user != undefined ? '=' + user : '';
    const contract_address = contract != undefined ? '=' + contract : '';
    // const API_URL = `https://rubynft.netlify.app/.netlify/functions/getTradesByContract?from${from_address}&to${to_address}&contract${contract_address}`;
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

    // console.log(salesRaw.data);

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

  async function getTradesLooksRare(user = '', contract = '') {
    const user_address = user != undefined ? '=' + user : '';
    const contract_address =
      contract && contract.length > 1 ? '&contract=' + contract : '';
    const salesUrl = `/.netlify/functions/getTradesLooksRare?${
      user ? 'from' + user_address : ''
    }${contract_address}`;
    const purchasesUrl = `/.netlify/functions/getTradesLooksRare?${
      user ? 'to' + user_address : ''
    }${user_address}${contract_address}`;

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
          timestamp: sale.createdAt,
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

  async function getUserTrades(user = '', contract = '') {
    const [x2y2res, looksRes] = await Promise.all([
      getTradesX2Y2(user, contract),
      getTradesLooksRare(user, contract),
    ]);
    const aggregateTrades = getAggregateTrades(x2y2res, looksRes);
    setUserTrades(aggregateTrades);
    applyTradeFilters(aggregateTrades, tradeFilters);
  }

  async function getCollectionTrades(user = '', contract = '') {
    const [x2y2res, looksRes] = await Promise.all([
      getTradesX2Y2(user, contract),
      getTradesLooksRare(user, contract),
    ]);
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

  async function getCollectionBySlugOS(slug: string) {
    const collectionRaw = await (
      await fetch(`https://api.opensea.io/api/v1/collection/${slug}`, {
        method: 'GET',
        redirect: 'follow',
      })
    ).json();
    const nftCollection: INftCollection = {
      contractAddress:
        collectionRaw.collection.primary_asset_contracts[0].address,
      tokenStandard:
        collectionRaw.collection.primary_asset_contracts[0].schema_name,
      description: collectionRaw.collection.description,
      isVerified:
        collectionRaw.collection.safelist_request_status == 'verified',
      image: collectionRaw.collection.image_url,
      bannerImage: collectionRaw.collection.banner_image_url,
      slug: collectionRaw.collection.slug,
      name: collectionRaw.collection.name,
      chainId: NftChainId.ETHEREUM,
      oneDayVolume: collectionRaw.collection.stats.one_day_volume,
      oneDaySales: collectionRaw.collection.stats.one_day_sales,
      oneDayAveragePrice: collectionRaw.collection.stats.one_day_average_price,
      sevenDayVolume: collectionRaw.collection.stats.seven_day_volume,
      sevenDaySales: collectionRaw.collection.stats.seven_day_sales,
      thirtyDaySales: collectionRaw.collection.stats.thirty_day_sales,
      thirtyDayVolume: collectionRaw.collection.stats.thirty_day_volume,
      floor: collectionRaw.collection.stats.floor_price,
      owners: collectionRaw.collection.stats.num_owners,
      count: collectionRaw.collection.stats.count,
      supply: collectionRaw.collection.stats.total_supply,
    };
    setActiveCollection(nftCollection);
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
      getCollectionBySlugOS,
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
      getCollectionBySlugOS,
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
