import { useEffect, useState } from 'react';
import { EthPriceTracker } from './EthPriceTracker';
import { GasTracker } from './GasTracker';
import ThemeToggle from './ThemeToggle';

export function DashboardSidebarFooter() {
  const [item, setItem] = useState<any>(undefined);

  const fetchData = () => {
    fetch('/.netlify/functions/getDbEthMetrics').then((res) =>
      res.json().then((result: any[]) => {
        setItem(result[0]);
      }),
    );
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {item && (
        <>
          <EthPriceTracker item={item?.ethPrice} />
          <div className="h-4 border-l border-gray-200 border-0.5" />
        </>
      )}
      {item && (
        <>
          <GasTracker item={item?.gasPrice} />
          <div className="h-4 border-l border-gray-200 border-0.5" />
        </>
      )}
      <ThemeToggle />
    </>
  );
}
