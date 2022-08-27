import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MintingCollectionTableBody from './MintingCollectionTableBody';

export default function MintingCollectionTable() {
  const router = useRouter();
  const { range } = router.query;
  const [data, setData] = useState<undefined | any[]>(undefined);
  const [lastFetch, setLastFetch] = useState<any>({});
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchData();
  }, [range, counter]);

  function fetchData() {
    console.log('fetchData');
    const lastFetchSS = sessionStorage.getItem('r-mct-lf')
      ? JSON.parse(sessionStorage.getItem('r-mct-lf') || '')
      : {};
    const refreshTime = moment().unix() - 14;
    console.log('lastFetchSS');
    console.log(lastFetchSS);
    console.log('lastFetch');
    console.log(lastFetch);
    console.log('refreshTime');
    console.log(refreshTime);
    console.log('range');
    console.log(range);
    if (
      !lastFetchSS[(range as string) || ''] ||
      (lastFetchSS[(range as string) || ''] as number) < refreshTime
    ) {
      console.log('fetchData-1');
      try {
        fetchDbData();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('fetchData-2');
      const collectionString = sessionStorage.getItem(
        'r-mct-d' + (range || ''),
      );
      const collections = collectionString
        ? JSON.parse(collectionString)
        : null;
      if (collections && collections.length > 0) {
        const time = Number(sessionStorage.getItem('r-mct-lf') as string);
        applyUpdate(collections, time, false);
      } else {
        sessionStorage.removeItem('r-mct-lf');
        sessionStorage.removeItem('r-mct-d' + (range || ''));
        fetchDbData();
      }
    }
  }

  function fetchDbData() {
    fetch('/.netlify/functions/getDbMints', {
      method: 'POST',
      body: JSON.stringify({ mins: getMins() }),
      redirect: 'follow',
    }).then((res) =>
      res.json().then((result) => {
        const time = moment().unix();
        if (result && result.length > 0) {
          applyUpdate(result, time);
        }
      }),
    );
  }

  function getMins() {
    const dict: any = {
      '1m': 1,
      '5m': 5,
      '15m': 15,
      '30m': 30,
      '1h': 60,
      '6h': 360,
      '24h': 1440,
      '7d': 10080,
    };
    console.log('getMins range');
    console.log(range);
    return !range ? 60 : dict[(range as string) || ''];
  }

  function applyUpdate(dataIn: any, time: number, persist = true) {
    const newData = dataIn.slice(0, 50);
    const newLastFetch = { ...lastFetch, [(range as string) || '']: time };
    setData(newData);
    setLastFetch(newLastFetch);
    if (persist && newData.length > 0) {
      sessionStorage.setItem(
        'r-mct-d' + (range || ''),
        JSON.stringify(newData),
      );
      sessionStorage.setItem('r-mct-lf', JSON.stringify(newLastFetch));
    }
  }

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="inline-block min-w-full align-middle">
          <div className="md:rounded-lg">
            {data && (
              <div className="mt-1 flex flex-col">
                <div className="">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <div className=" md:rounded-lg">
                      <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                          <tr className="flex">
                            <th
                              scope="col"
                              className="font-semibold py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 dark:text-white sm:pl-6 w-[5%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              &nbsp;
                            </th>
                            <th
                              scope="col"
                              className="font-semibold py-3.5 text-left text-sm text-gray-900 dark:text-white w-[5%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              &nbsp;
                            </th>
                            <th
                              scope="col"
                              className="font-semibold py-3.5 pr-3 text-left text-sm text-gray-900 dark:text-white w-[20%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Collection
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Socials
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Chain
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              New Mints
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Total Mints
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Unique Minters
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Unique Holders
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Rank
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-blackish"
                          id="scrollableTarget"
                          key={
                            'MCT' +
                            counter.toString() +
                            data[0]?.total?.toString() +
                            data[0]?.address +
                            data[1]?.total?.toString() +
                            data[1]?.address +
                            data[2]?.total?.toString() +
                            data[2]?.address +
                            (range || '')
                          }
                        >
                          {data && data.length > 0 && (
                            <MintingCollectionTableBody
                              data={data}
                              keyPrefix={
                                'MCT' +
                                counter.toString() +
                                data[0]?.total?.toString() +
                                data[0]?.address +
                                data[1]?.total?.toString() +
                                data[1]?.address +
                                data[2]?.total?.toString() +
                                data[2]?.address +
                                +(range || '')
                              }
                            />
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
