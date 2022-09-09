export interface INft {
  id?: string;
  tokenId: string;
  chainId?: number;
  collectionName?: string;
  contractAddress: string;
  name: string | null;
  image: string;
  imageAlt?: string;
  price?: number;
  marketplace?: string | NftMarketplace;
}

export interface INftCollection {
  id?: string;
  contractAddress?: string;
  tokenStandard?: string;
  description?: string;
  isVerified?: boolean;
  image: string | undefined | null;
  bannerImage?: string | undefined | null;
  slug: string | undefined | null;
  name: string | undefined | null;
  chainId: number;
  oneDayVolume: number | undefined | null;
  oneDaySales: number | undefined | null;
  floor: number | undefined | null;
  oneDayAveragePrice: number | undefined | null;
  sevenDayVolume?: number | undefined | null;
  sevenDaySales?: number | undefined | null;
  thirtyDaySales?: number | undefined | null;
  thirtyDayVolume?: number | undefined | null;
  supply?: number;
  count?: number;
  owners: number | undefined | null;
  traits?: any;
}

export interface INftCollectionUpdate {
  id: string;
  username: string;
  userAddress: string;
  posted: number;
  collectionName: string;
  imageUrl: string;
  smallImageUrl: string;
  holdersOnly: boolean;
  updateType: string;
  title: string;
  message: string;
  likes: number | null;
}

export interface INftSweepCollection {
  id: string;
  collectionAddress: string;
  image: string | undefined | null;
  isVerified?: boolean;
  name: string | undefined | null;
  chainId: number;
  value: number | undefined | null;
  sales: number | undefined | null;
  buyer: string | undefined | null;
  transaction: string | undefined | null;
  timestamp: number | undefined | null;
}

export enum NftMarketplace {
  NFTRADE = 'nftrade',
  OPENSEA = 'opensea',
  LOOKSRARE = 'looksrare',
  SEAPORT = 'seaport',
  X2Y2 = 'x2y2',
}

export enum NftChainId {
  ETHEREUM = 1,
  BINANCE_SMART_CHAIN = 56,
  AVALANCHE = 43114,
}

export const rangeMapping = {
  '5m': '5 minutes',
  '15m': '15 minutes',
  '30m': '30 minutes',
  '1h': '1 hour',
  '6h': '6 hour',
  '24h': '24 hour',
  '7d': '7 day',
  '30d': '30 day',
};

export function trimHex(val: string, length?: number) {
  if (!val) return '...';
  if (length) {
    return (
      val.substring(0, length) +
      '...' +
      val.substring(val.length - length, val.length)
    );
  }
  return (
    val.substring(0, 5) + '...' + val.substring(val.length - 4, val.length)
  );
}

export const rangeTabs = (
  tab: any,
  range: any,
  route?: string,
  defaultRange = '24h',
  tabLabels = ['5m', '15m', '30m', '1h', '6h', '24h', '7d', '30d'],
) => {
  const tabObj: { name: string; href: string; current: boolean }[] = [];
  tabLabels.forEach((rng) => {
    const activeHref = getRangeHref(tab, rng, route, defaultRange);
    const activeTab = {
      name: rng,
      href: activeHref,
      current: range == rng || (rng == defaultRange && range == undefined),
    };
    tabObj.push(activeTab);
  });
  return tabObj;
};

function getRangeHref(
  tab: any,
  range: any,
  route?: string,
  defaultRange = '24h',
) {
  const baseRoute = route || '';
  const tabSuffix = tab ? `tab=${tab}` : '';
  const rangeSuffix = range && range !== defaultRange ? `range=${range}` : '';
  const baseSuffix = tabSuffix || rangeSuffix ? '?' : '';
  const conjunction = tabSuffix && rangeSuffix ? '&' : '';
  return `${baseRoute}${baseSuffix}${tabSuffix}${conjunction}${rangeSuffix}`;
}

export const listingDistrbutionArray = [
  0, 0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.009, 0.01, 0.02,
  0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.9, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4,
  0.45, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22.5, 25, 27.5, 30, 35, 40, 45,
  50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
];
