export interface INft {
  id?: string;
  tokenId: string;
  chainId?: number;
  collectionName: string;
  contractAddress: string;
  name: string | null;
  image: string;
  imageAlt?: string;
  price?: number;
  marketplace?: string | NftMarketplace;
}

export interface INftCollection {
  id: string;
  contractAddress?: string;
  contractAddressStandard?: string;
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

export function getTrimmedAddressEllipsisMiddle(val: string, length?: number) {
  if (!val) return '...';
  if (length) {
    return (
      val.substring(0, length - 1) +
      '...' +
      val.substring(val.length - 4, val.length)
    );
  }
  return (
    val.substring(0, 5) + '...' + val.substring(val.length - 4, val.length)
  );
}

export const rangeTabs = (tab: any, range: any, route?: string) => {
  const tabObj: { name: string; href: string; current: boolean }[] = [];
  ['5m', '15m', '30m', '1h', '6h', '24h', '7d', '30d'].forEach((rng) => {
    const activeHref = getRangeHref(tab, rng, route);
    const activeTab = {
      name: rng,
      href: activeHref,
      current: range == rng || (rng == '24h' && range == undefined),
    };
    tabObj.push(activeTab);
  });
  return tabObj;
};



function getRangeHref(tab: any, range: any, route?: string) {
  const baseRoute = route || '';
  const tabSuffix = tab ? `tab=${tab}` : '';
  const rangeSuffix = range && range !== '24h' ? `range=${range}` : '';
  const baseSuffix = tabSuffix || rangeSuffix ? '?' : '';
  const conjunction = tabSuffix && rangeSuffix ? '&' : '';
  return `${baseRoute}${baseSuffix}${tabSuffix}${conjunction}${rangeSuffix}`;
}
