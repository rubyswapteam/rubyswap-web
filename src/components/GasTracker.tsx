import { useEffect, useState } from 'react';
import GasIcon from './GasIcon';

export function GasTracker() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState('');

  const fetchData = () => {
    fetch(
      'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=SY2NX9JWTZMSJWDD68G3NXMJT7SAJBF34J',
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result.result.SafeGasPrice);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-4 p-2 text-xs font-medium text-gray-600">
      {error && <div>Error: {error.message}</div>}
      {!error && !isLoaded && <div>Loading...</div>}
      {!error && isLoaded && (
        <div className="flex items-center">
          <GasIcon height={15} width={15} />
          <div className="pt-1">{item}</div>
        </div>
      )}
    </div>
  );
}
