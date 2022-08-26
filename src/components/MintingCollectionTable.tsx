import moment from 'moment';
import { useEffect, useState } from 'react';
import MintingCollectionTableBody from './MintingCollectionTableBody';

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
      body: JSON.stringify({ mins: 60 }),
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
                        >
                          {data && data.length > 0 && (
                            <MintingCollectionTableBody data={data} />
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
