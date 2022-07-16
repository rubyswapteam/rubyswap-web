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

const MarketplaceProviderContext = React.createContext<any>({});

export const MarketplaceProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [userTrades, setUserTrades] = useState<any>({});
  // const x2y2Token = '38d74028-ca13-48df-ab81-bdfa4f3ab834';

  const getUserTrades = useCallback(
    async (user: string, collection?: string) => {
      // let sales = {};
      // let purchases = {};
      // const contractString = collection ? '=' + collection : '';
      axios
        .get(
          'https://rubynft.netlify.app/.netlify/functions/getData',
          // `https://api.x2y2.org/v1/events?type=sale&from_address=${user}&to_address&contract${contractString}`,
          // {
          //   headers: { 'X-API-KEY': x2y2Token },
          // },
        )
        .then((res) => {
          // sales = res;
          setUserTrades({ i: res });
        });
      // axios
      //   .get(
      //     `https://api.x2y2.org/v1/events?type=sale&from_address&to_address=${user}&contract${contractString}`,
      //     {
      //       headers: { 'X-API-KEY': x2y2Token },
      //     },
      //   )
      //   .then((res) => {
      //     purchases = res;
      //   });
      // setUserTrades({ sales: sales, purchases: purchases });
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      userTrades,
      setUserTrades,
      getUserTrades,
    }),
    [userTrades, setUserTrades, getUserTrades],
  );

  return (
    <MarketplaceProviderContext.Provider value={contextValue}>
      {children}
    </MarketplaceProviderContext.Provider>
  );
};

export const useMarketplaceProvider = () =>
  useContext(MarketplaceProviderContext);
