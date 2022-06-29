export interface INft {
  id: string;
  tokenId: string;
  chainId: number;
  collectionName: string;
  contractAddress: string;
  name: string | null;
  image: string;
  imageAlt: string;
  price: number;
  marketplace: string | NftMarketplace;
}

export interface INftCollection {
  id: string;
  contractAddress?: string;
  contractAddressStandard?: string;
  description?: string;
  isVerified?: boolean;
  image: string | undefined | null;
  slug: string | undefined | null;
  name: string | undefined | null;
  chainId: number;
  oneDayVolume: number | undefined | null;
  oneDaySales: number | undefined | null;
  floor: number | undefined | null;
  oneDayAveragePrice: number | undefined | null;
  thirtyDayVolume?: number;
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
  return [
    {
      name: '5m',
      href: tab
        ? `${route ? route : ''}?tab=${tab}&range=5m`
        : `${route ? route : ''}?range=5m`,
      current: range == '5m',
    },
    {
      name: '15m',
      href: tab
        ? `${route ? route : ''}?tab=${tab}&range=15m`
        : `${route ? route : ''}?range=15m`,
      current: range == '15m',
    },
    {
      name: '30m',
      href: tab
        ? `${route ? route : ''}?tab=${tab}&range=30m`
        : `${route ? route : ''}?range=30m`,
      current: range == '30m',
    },
    {
      name: '1h',
      href: tab
        ? `${route ? route : ''}?tab=${tab}&range=1h`
        : `${route ? route : ''}?range=1h`,
      current: range == '1h',
    },
    {
      name: '6h',
      href: tab
        ? `${route ? route : ''}?tab=${tab}&range=6h`
        : `${route ? route : ''}?range=6h`,
      current: range == '6h',
    },
    {
      name: '24h',
      href: tab ? `${route ? route : ''}?tab=${tab}` : `/${route ? route : ''}`,
      current: range == undefined,
    },
    {
      name: '7d',
      href: tab
        ? `${route ? route : ''}?tab=${tab}&range=7d`
        : `${route ? route : ''}?range=7d`,
      current: range == '7d',
    },
    {
      name: '30d',
      href: tab
        ? `${route ? route : ''}?tab=${tab}&range=30d`
        : `${route ? route : ''}?range=30d`,
      current: range == '30d',
    },
  ];
};
