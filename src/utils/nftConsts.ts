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
