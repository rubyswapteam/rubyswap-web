import axios from 'axios';
import { ethers } from 'ethers';
import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
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
  const [userTrades, setUserTrades] = useState<any>(undefined);
  // const x2y2Token = '38d74028-ca13-48df-ab81-bdfa4f3ab834';

  async function getUserTrades(user = '', contract = '') {
    const user_address = user != undefined ? '=' + user : '';
    const contract_address = contract != undefined ? '=' + contract : '';
    // const API_URL = `https://rubynft.netlify.app/.netlify/functions/getTradesByContract?from${from_address}&to${to_address}&contract${contract_address}`;
    const salesUrl = `/.netlify/functions/getTradesByContract?from${user_address}&to&contract${contract_address}`;
    const purchasesUrl = `/.netlify/functions/getTradesByContract?from&to${user_address}&contract${contract_address}`;

    const salesRaw = await (
      await fetch(salesUrl, { method: 'GET', redirect: 'follow' })
    ).json();
    const purchasesRaw = await (
      await fetch(purchasesUrl, { method: 'GET', redirect: 'follow' })
    ).json();

    const sales = salesRaw.data.map((sale: any) => {
      return {
        timestamp: sale.order.updated_at,
        price: ethers.utils.formatEther(sale.order.price),
        contract: sale.token.contract,
        tokenId: sale.token.token_id,
        txn: sale.tx,
      };
    });

    console.log(salesRaw.data);

    const purchases = purchasesRaw.data.map((sale: any) => {
      return {
        timestamp: sale.order.updated_at,
        price: ethers.utils.formatEther(sale.order.price),
        contract: sale.token.contract,
        tokenId: sale.token.token_id,
        txn: sale.tx,
      };
    });

    setUserTrades({ sales: sales, purchases: purchases });
  }

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
