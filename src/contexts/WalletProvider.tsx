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

const WalletProviderContext = React.createContext<any>({});

export const WalletProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [userNfts, setUserNfts] = useState<{ rawData: any[]; summary: any }>();
  const [collectionNames, setCollectionNames] = useState<any>({});
  const [userNftCollections, setUserNftCollections] = useState<any[]>();
  const [userNftsByCollection, setUserNftsByCollection] = useState<any[]>();
  const [activeNfts, setActiveNfts] = useState<INft[]>([]);

  const fetchCollectionNames = useCallback(async (contractAddress: string) => {
    const activeMapping = collectionNames;
    if (!collectionNames[contractAddress]) {
      axios
        .get(
          `https://eth-mainnet.g.alchemy.com/nft/v2/demo/getContractMetadata/?contractAddress=${contractAddress}`,
        )
        .then((contractRes) => {
          activeMapping[contractAddress] =
            contractRes.data.contractMetadata.name;
          setCollectionNames({ ...activeMapping });
        });
    }
  }, []);

  const fetchUserNfts = async (user: string) => {
    if (user) {
      const userNfts: { rawData: any[]; summary: any } = {
        rawData: [],
        summary: undefined,
      };
      await axios
        .get(
          `https://eth-mainnet.alchemyapi.io/nft/v2/demo/getNFTs/?owner=${user}`,
        )
        .then(async (res) => {
          userNfts.rawData = res.data.ownedNfts;

          const summary: { contract: string; count: number }[] = [];

          await userNfts.rawData.forEach(async (element: any) => {
            const activeContract = element.contract.address;
            const index = summary.findIndex(
              (collection: { contract: string; count: number }) => {
                return collection.contract == activeContract;
              },
            );
            if (index !== -1) {
              summary[index].count = summary[index].count + 1;
            } else {
              summary.push({
                contract: activeContract,
                count: 1,
              });
            }

            await fetchCollectionNames(activeContract);
          });
          userNfts.summary = summary;
        })
        .finally(() => {
          setUserNfts({ ...userNfts });
        });
    }
  };

  function getCollectionNfts(contractAddress: string) {
    if (userNfts) {
      const filteredNfts = userNfts.rawData.filter(
        (x) => x.contract.address === contractAddress,
      );
      const nfts: INft[] = [];
      filteredNfts?.forEach((nft) => {
        const newNFT: INft = {
          tokenId: Number(nft.id.tokenId).toString(),
          collectionName: collectionNames[contractAddress],
          contractAddress: contractAddress,
          image: nft?.media[0]?.gateway || nft.metadata.image,
          chainId: NftChainId.ETHEREUM,
          imageAlt: nft.title + ' - ' + nft.description,
          name: nft.title || '#'.concat(Number(nft.id.tokenId).toString()),
        };
        nfts.push(newNFT);
      });
      setActiveNfts(nfts);
    }
  }

  const fetchUserNftsByCollection = useCallback(
    async (user: string, contract: string) => {
      axios
        .get(
          `https://eth-mainnet.alchemyapi.io/nft/v2/demo/getNFTs/?owner=${user}&contractAddresses[]=${contract}`,
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
        `https://eth-mainnet.alchemyapi.io/nft/v2/demo/getNFTs/?owner=${user}&withMetadata=False`,
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
    ],
  );

  return (
    <WalletProviderContext.Provider value={contextValue}>
      {children}
    </WalletProviderContext.Provider>
  );
};

export const useWalletProvider = () => useContext(WalletProviderContext);
