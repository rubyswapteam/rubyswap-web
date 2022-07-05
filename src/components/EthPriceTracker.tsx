import { _fetchData } from 'ethers/lib/utils';
import { useState, useEffect, useRef } from 'react';
import EthereumIcon from './EthereumIcon';

export function EthPriceTracker() {
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  const fetchData = () => {
    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result.ethereum.usd);
        },
        (error: { message: string }) => {
          setIsLoaded(true);
          setError(error.message);
        },
      );
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-4 p-2 text-xs font-medium text-gray-600">
      {error && <div>Error: {error}</div>}
      {!error && !isLoaded && <div>Loading...</div>}
      {!error && isLoaded && (
        <div className="flex items-center">
          <EthereumIcon height={15} width={15} />
          <div className="pt-1">{item}</div>
        </div>
      )}
    </div>
  );
}
