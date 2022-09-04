import { INft, NftChainId } from '@/utils/nftUtils';
import axios from 'axios';
import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { addAbortSignal } from 'stream';

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
    summary: any;
    totalCount: number;
  }>();
  const [collectionNames, setCollectionNames] = useState<{
    [key: string]: string;
  }>({});
  const [userNftCollections, setUserNftCollections] = useState<any[]>();
  const [userNftsByCollection, setUserNftsByCollection] = useState<any[]>();
  const [walletDetails, setWalletDetails] = useState<any[]>();
  const [activeNfts, setActiveNfts] = useState<{
    collection: string;
    nfts: INft[];
  }>({
    collection: '',
    nfts: [],
  });

  const fetchCollectionNames = useCallback(async (contractAddress: string) => {
    const activeMapping = collectionNames;
    if (!collectionNames[contractAddress]) {
      axios
        .get(
          `https://eth-mainnet.g.alchemy.com/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getContractMetadata/?contractAddress=${contractAddress}`,
        )
        .then((contractRes) => {
          activeMapping[contractAddress] =
            contractRes.data.contractMetadata.name?.trim();
          setCollectionNames({ ...activeMapping });
        });
    }
  }, []);

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
      summary: any[];
      totalCount: number;
    } = {
      ownedNfts: [],
      summary: [],
      totalCount: 0,
    };
    if (user) {
      do {
        await axios
          .get(
            `https://eth-mainnet.alchemyapi.io/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getNFTs/?owner=${user}${pageKey}`,
          )
          .then(async (res) => {
            Array.prototype.push.apply(userNfts.ownedNfts, res.data.ownedNfts);
            userNfts.totalCount = res.data.totalCount;
            pageKey = res.data.pageKey ? '&pageKey=' + res.data.pageKey : '';

            const summary: { contract: string; count: number }[] =
              userNfts.summary;

            await res.data.ownedNfts.forEach(async (element: any) => {
              const activeContract = element.contract.address;
              const index = summary.findIndex(
                (collection: { contract: string; count: number }) => {
                  return collection.contract == activeContract;
                },
              );
              if (index !== -1) {
                summary[index].count++;
              } else {
                summary.push({
                  contract: activeContract,
                  count: 1,
                });
              }

              await fetchCollectionNames(activeContract);
            });
            summary.sort((a, b) => {
              const nameA = collectionNames[a.contract]?.toLowerCase();
              const nameB = collectionNames[b.contract]?.toLowerCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            });
            userNfts.summary = [...summary];
          })
          .finally(() => {
            const newUserNfts = { ...userNfts };
            const newSummary = newUserNfts.summary.sort((a, b) => {
              const nameA = collectionNames[a.contract]?.toLowerCase();
              const nameB = collectionNames[b.contract]?.toLowerCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            });
            newUserNfts.summary = [...newSummary];
            setUserNfts({ ...newUserNfts });
          });
      } while (pageKey !== '');
    }
  };

  function getCollectionNfts(contractAddress: string) {
    if (userNfts) {
      setActiveNfts({ collection: '', nfts: [] });
      const filteredNfts = userNfts.ownedNfts.filter(
        (x: { contract: { address: string } }) =>
          x.contract.address === contractAddress,
      );
      const nfts: INft[] = [];
      filteredNfts?.forEach(
        (nft: {
          id: any;
          media: any;
          metadata: { image: string };
          title: string;
          description: string;
        }) => {
          const newNFT: INft = {
            tokenId: Number(nft.id.tokenId).toString(),
            collectionName: collectionNames[contractAddress],
            contractAddress: contractAddress,
            image: optimisedImageLinks([
              nft?.media[0]?.raw,
              nft?.media[0]?.gateway,
              nft?.media[0]?.thumbnail,
              nft.metadata.image,
            ]),
            chainId: NftChainId.ETHEREUM,
            imageAlt: nft.title + ' - ' + nft.description,
            name: nft.title || '#'.concat(Number(nft.id.tokenId).toString()),
          };
          nfts.push(newNFT);
        },
      );
      setActiveNfts({ collection: contractAddress, nfts: nfts });
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

  const fetchUserNftsByCollection = useCallback(
    async (user: string, contract: string) => {
      axios
        .get(
          `https://eth-mainnet.alchemyapi.io/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getNFTs/?owner=${user}&contractAddresses[]=${contract}`,
        )
        .then((res) => {
          const userNfts = res.data.ownedNfts;
          setUserNftsByCollection(userNfts);
        });
    },
    [],
  );

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
      collectionNames,
      setCollectionNames,
      fetchCollectionNames,
      userNftCollections,
      setUserNftCollections,
      fetchUserNftCollections,
      userNftsByCollection,
      setUserNftsByCollection,
      fetchUserNftsByCollection,
      getCollectionNfts,
      activeNfts,
      setActiveNfts,
      fetchWallet,
      walletDetails,
    }),
    [
      userNfts,
      setUserNfts,
      fetchUserNfts,
      collectionNames,
      setCollectionNames,
      fetchCollectionNames,
      userNftCollections,
      setUserNftCollections,
      fetchUserNftCollections,
      userNftsByCollection,
      setUserNftsByCollection,
      fetchUserNftsByCollection,
      getCollectionNfts,
      activeNfts,
      setActiveNfts,
      fetchWallet,
      walletDetails,
    ],
  );

  return (
    <WalletProviderContext.Provider value={contextValue}>
      {children}
    </WalletProviderContext.Provider>
  );
};

export const useWalletProvider = () => useContext(WalletProviderContext);
