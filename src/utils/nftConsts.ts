export interface INft {
  id: string;
  tokenId: string;
  chainId: number;
  contractName: string;
  contractAddress: string;
  name: string;
  image: string;
  imageAlt: string;
  price: number;
  marketplace: string | NftMarketplace;
}

export interface INftCollection {
  id: string;
  image: string | undefined | null;
  slug: string | undefined | null;
  name: string | undefined | null;
  chainId: number;
  oneDayVolume: number | undefined | null;
  oneDaySales: number | undefined | null;
  floor: number | undefined | null;
  oneDayAveragePrice: number | undefined | null;
  owners: number | undefined | null;
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
