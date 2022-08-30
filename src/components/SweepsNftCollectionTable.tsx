import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MintingCollectionTableBody from './SweepsNftCollectionTableBody';

export default function SweepsNftCollectionTable() {
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
    const lastFetchSS = sessionStorage.getItem('r-snct-lf')
      ? JSON.parse(sessionStorage.getItem('r-snct-lf') || '')
      : {};
    const refreshTime = moment().unix() - 14;
    if (
      !lastFetchSS[(range as string) || ''] ||
      (lastFetchSS[(range as string) || ''] as number) < refreshTime
    ) {
      try {
        fetchDbData();
      } catch (error) {
        console.log(error);
      }
    } else {
      const collectionString = sessionStorage.getItem(
        'r-snct-d' + (range || ''),
      );
      const collections = collectionString
        ? JSON.parse(collectionString)
        : null;
      if (collections && collections.length > 0) {
        const time = Number(sessionStorage.getItem('r-snct-lf') as string);
        applyUpdate(collections, time, false);
      } else {
        sessionStorage.removeItem('r-snct-lf');
        sessionStorage.removeItem('r-snct-d' + (range || ''));
        fetchDbData();
      }
    }
  }

  function fetchDbData() {
    fetch('/.netlify/functions/getDbSweeps', {
      method: 'POST',
      body: JSON.stringify({}),
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

  function applyUpdate(dataIn: any, time: number, persist = true) {
    const newLastFetch = { ...lastFetch, [(range as string) || '']: time };
    setData(dataIn);
    setLastFetch(newLastFetch);
    if (persist && dataIn.length > 0) {
      sessionStorage.setItem(
        'r-snct-d' + (range || ''),
        JSON.stringify(dataIn),
      );
      sessionStorage.setItem('r-snct-lf', JSON.stringify(newLastFetch));
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
                              Collections
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
                              Details
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Buyer
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
                            'snct' +
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
                                'snct' +
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
