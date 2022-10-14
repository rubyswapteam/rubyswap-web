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

export enum NftMarketplace {
  NFTRADE = 'nftrade',
  OPENSEA = 'opensea',
  LOOKSRARE = 'looksrare',
  NFTX = 'nftx',
  SEAPORT = 'seaport',
  SUDOSWAP = 'sudoswap',
  X2Y2 = 'x2y2',
}
export interface IUserNftSummary {
  name: string;
  contractAddress: string;
  balance: number;
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

export const listingDistributionArray = [
  0, 0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.009, 0.01, 0.02,
  0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14, 0.15,
  0.16, 0.17, 0.18, 0.19, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.7, 0.8,
  0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.2, 2.4, 2.6, 2.8, 3,
  3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22.5, 25, 27.5, 30, 35, 40, 45,
  50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
  250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000,
];
