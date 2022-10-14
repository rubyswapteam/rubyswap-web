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
        <div className="w-full gap-x-2 flex">
          <EthPriceTracker item={item?.ethPrice} />
          <GasTracker item={item?.gasPrice} />
        </div>
      )}
    </>
  );
}
