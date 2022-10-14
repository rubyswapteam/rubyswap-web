import { NftChainId } from '@/utils/nftUtils';
import axios from 'axios';
import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ethers } from 'ethers';
import { IUserNftSummary } from '../utils/nftUtils';

const WalletProviderContext = React.createContext<any>({});

export const WalletProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [userNfts, setUserNfts] = useState<{
    ownedNfts: any[];
    summary: IUserNftSummary[];
    totalCount: number;
  }>();
  const [collectionNames, setCollectionNames] =
    useState<{ name: string; contractAddress: string }[]>();
  const [userCollections, setUserCollections] = useState<any[]>();
  const [userNftCollections, setUserNftCollections] = useState<any[]>();
  const [walletDetails, setWalletDetails] = useState<any[]>();
  const [activeNfts, setActiveNfts] = useState<{
    collection: string;
    nfts: any[];
    name?: string;
    totalSupply?: number;
    collectionData?: any;
  }>({
    collection: '',
    nfts: [],
  });

  function fetchCollectionNames() {
    if (userNfts) {
      const collections = userNfts.summary.map((x: IUserNftSummary) => ({
        name: x.name,
        contractAddress: x.contractAddress,
      }));
      fetch('/.netlify/functions/getDbCollectionNames').then((rawRes: any) =>
        rawRes
          .json()
          .then((res: { name: string; contractAddress: string }[]) => {
            Array.prototype.push.apply(collections, res);
            console.table({ res: res, collections: collections });
            const data: any = {};
            collections.forEach((x) => (data[x.contractAddress] = x.name));
            setCollectionNames(data);
          }),
      );
    }
  }

  const fetchWallet = useCallback(async (address: string) => {
    if (address) {
      fetch(`/.netlify/functions/getWalletOverview?address=${address}`).then(
        (res: any) =>
          res.json().then((jsonRes: any) => {
            setWalletDetails(jsonRes.data.wallet[0]);
          }),
      );
    }
  }, []);

  const fetchUserNfts = async (user: string) => {
    let pageKey = '';
    const userNfts: {
      ownedNfts: any[];
      summary: IUserNftSummary[];
      totalCount: number;
    } = {
      ownedNfts: [],
      summary: [] as unknown as IUserNftSummary[],
      totalCount: 0,
    };
    if (user) {
      do {
        await axios
          .get(`/.netlify/functions/getUserNfts?user=${user}${pageKey}`)
          .then(async (res) => {
            Array.prototype.push.apply(userNfts.ownedNfts, res.data.ownedNfts);
            userNfts.totalCount = res.data.totalCount;
            pageKey = res.data.pageKey ? '&pageKey=' + res.data.pageKey : '';
          });
      } while (pageKey !== '');
      const arrCount = userNfts.ownedNfts.length;
      const summary: IUserNftSummary[] = [] as unknown as IUserNftSummary[];
      for (let i = 0; i < arrCount; i++) {
        const nft = userNfts.ownedNfts[i];
        const index = summary.findIndex(
          (x: IUserNftSummary) => x?.contractAddress === nft.contract.address,
        );
        index == -1
          ? summary.push({
              name: nft?.contractMetadata?.name
                ? nft?.contractMetadata?.name
                : nft.contract.address ==
                  '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85'
                ? 'ENS Domains'
                : 'Unknown',
              contractAddress: nft.contract.address,
              balance: parseInt(nft.balance),
            })
          : (summary[index].balance =
              summary[index].balance + parseInt(nft.balance));
      }
      summary.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase()
          ? -1
          : a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : 0,
      );
      userNfts.summary = summary;
    }
    setUserNfts(userNfts);
  };

  function getCollectionNfts(contractAddress: string) {
    if (userNfts) {
      console.table({ userNfts: userNfts, contractAddress: contractAddress });
      setActiveNfts({ collection: '', nfts: [] });
      const filteredNfts = userNfts.ownedNfts.filter(
        (x: { contract: { address: string } }) =>
          x.contract.address === contractAddress,
      );
      const nfts: any[] = [];
      filteredNfts?.forEach(
        (nft: {
          id: any;
          media: any;
          metadata: any;
          title: string;
          description: string;
        }) => {
          const newNFT: any = {
            tokenId: BigInt(nft.id.tokenId).toString(),
            // collectionName: collectionNames[contractAddress],
            contractAddress: contractAddress,
            image: optimisedImageLinks([
              nft?.media[0]?.raw,
              nft?.media[0]?.gateway,
              nft?.media[0]?.thumbnail,
              nft.metadata.image,
            ]),
            traits: nft.metadata.attributes,
            chainId: NftChainId.ETHEREUM,
            imageAlt: nft.title + ' - ' + nft.description,
            name: nft.title || '#'.concat(BigInt(nft.id.tokenId).toString()),
          };
          nfts.push(newNFT);
        },
      );
      setActiveNfts({
        collection: contractAddress,
        nfts: nfts,
        name: filteredNfts[0]?.contractMetadata.name,
        totalSupply: filteredNfts[0]?.contractMetadata.totalSupply,
      });
    }
  }

  function optimisedImageLinks(links: string[]) {
    const scores = links.map((link) => {
      let score = 0;
      link && link.length > 1 ? score++ : (score = -100);
      if (!link?.includes('ipfs')) score++;
      if (!link?.includes('https://ipfs.io')) score++;
      return score;
    });
    const index = scores.findIndex((score) => score == Math.max(...scores));
    return links[index].replace('ipfs://', 'https://ipfs.io/ipfs/');
  }

  const fetchUserCollections = useCallback(async (user: string) => {
    fetch(`/.netlify/functions/getUserCollections?wallet=${user}`).then(
      (res) => {
        res.json().then((resJson) => {
          console.table({ resJson: resJson });
          setUserCollections(resJson);
          return resJson;
        });
      },
    );
  }, []);

  const fetchUserNftCollections = useCallback(async (user: string) => {
    axios
      .get(
        `https://eth-mainnet.alchemyapi.io/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getNFTs/?owner=${user}&withMetadata=False`,
      )
      .then((res) => {
        const userNfts = res.data.ownedNfts;
        setUserNftCollections(userNfts);
      });
  }, []);

  const contextValue = useMemo(
    () => ({
      userNfts,
      setUserNfts,
      fetchUserNfts,
      userNftCollections,
      setUserNftCollections,
      fetchUserNftCollections,
      getCollectionNfts,
      activeNfts,
      setActiveNfts,
      fetchWallet,
      walletDetails,
      userCollections,
      fetchUserCollections,
      collectionNames,
      fetchCollectionNames,
    }),
    [
      userNfts,
      setUserNfts,
      fetchUserNfts,
      userNftCollections,
      setUserNftCollections,
      fetchUserNftCollections,
      getCollectionNfts,
      activeNfts,
      setActiveNfts,
      fetchWallet,
      walletDetails,
      userCollections,
      fetchUserCollections,
      collectionNames,
      fetchCollectionNames,
    ],
  );

  return (
    <WalletProviderContext.Provider value={contextValue}>
      {children}
    </WalletProviderContext.Provider>
  );
};

export const useWalletProvider = () => useContext(WalletProviderContext);
