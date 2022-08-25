import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MintingCollectionTable() {
  const [data, setData] = useState<undefined | any[]>(undefined);
  const [lastFetch, setLastFetch] = useState<number>(0);

  useEffect(() => {
    console.log('useEffect');
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    const lastFetchSS = Number(sessionStorage.getItem('r-tnct-lf'));
    const refreshTime = moment().unix() - 30;
    if ((lastFetchSS && lastFetchSS < refreshTime) || lastFetch < refreshTime) {
      try {
        fetchDbData();
      } catch (error) {
        console.log(error);
      }
    } else {
      const collectionString = sessionStorage.getItem('r-tnct-ftc');
      const collections = collectionString
        ? JSON.parse(collectionString)
        : null;
      if (collections) {
        const time = Number(sessionStorage.getItem('r-tnct-lf') as string);
        applyUpdate(collections, time, false);
      } else {
        sessionStorage.removeItem('r-tnct-lf');
        sessionStorage.removeItem('r-tnct-ftc');
        fetchDbData();
      }
    }
  };

  function fetchDbData() {
    fetch('/.netlify/functions/getDbMints', {
      method: 'POST',
      body: JSON.stringify({ mins: 30 }),
      redirect: 'follow',
    }).then((res) =>
      res.json().then((result) => {
        const time = moment().unix();
        applyUpdate(result, time);
      }),
    );
  }

  function applyUpdate(dataIn: any, time: number, persist = true) {
    setData(dataIn.slice(0, 50));
    setLastFetch(time);
    if (persist) {
      sessionStorage.setItem('r-mct-di', JSON.stringify(data));
      sessionStorage.setItem('r-mct-lf', time.toString());
    }
  }

  return (
    <div className="flex flex-col">
      {data && (
        <div>
          {data.map((row, i) => (
            <Link
              key={row.address}
              href={`/collection/${row.slug}`}
              prefetch={false}
            >
              <div className="flex hover:bg-gray-100 dark:hover:bg-white/5 p-3 gap-x-3">
                <img src={row.imageUrl} className="h-5 w-5" />
                <div>{row.name}</div>
                <div>{row.address}</div>
                <div>{`minted: ${row.total}`}</div>
                <div>{`change: ${row.total / row.prev}`}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
