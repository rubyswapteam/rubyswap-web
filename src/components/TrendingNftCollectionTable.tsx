import moment from 'moment';
import { useEffect, useState } from 'react';
import TrendingNftCollectionTableBody from './TrendingNftCollectionTableBody';

export default function TrendingNftCollectionTable() {
  const [fullTrendingCollections, setFullTrendingCollections] = useState<
    undefined | any[]
  >(undefined);
  const [trendingCollections, setTrendingCollections] = useState<
    undefined | any[]
  >(undefined);
  const [lastFetch, setLastFetch] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const lastFetchSS = Number(sessionStorage.getItem('r-tnct-lf'));
    const refreshTime = moment().unix() - 600;
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
    fetch('/.netlify/functions/getDbTrendingCollections').then((res) =>
      res.json().then((result) => {
        const time = moment().unix();
        applyUpdate(result, time);
      }),
    );
  }

  function applyUpdate(collections: any, time: number, persist = true) {
    setFullTrendingCollections(collections);
    console.log(collections);
    setTrendingCollections(
      collections.filter((collection: any) => collection.period === 'one_day'),
    );
    setLastFetch(time);
    if (persist) {
      sessionStorage.setItem('r-tnct-ftc', JSON.stringify(collections));
      sessionStorage.setItem('r-tnct-lf', time.toString());
    }
  }

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="inline-block min-w-full align-middle">
          <div className="md:rounded-lg">
            {trendingCollections && (
              <div className="mt-1 flex flex-col">
                <div className="">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <div className=" md:rounded-lg">
                      <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                          <tr className="flex">
                            <th
                              scope="col"
                              className="font-semibold py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 dark:text-white sm:pl-6 w-[5%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              &nbsp;
                            </th>
                            <th
                              scope="col"
                              className="font-semibold py-3.5 text-left text-sm text-gray-900 dark:text-white w-[5%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              &nbsp;
                            </th>
                            <th
                              scope="col"
                              className="font-semibold py-3.5 pr-3 text-left text-sm text-gray-900 dark:text-white w-[20%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Collection
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Socials
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Chain
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Volume
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Floor
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Average Price
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Sales
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Unique Holders
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          className="divide-y divide-gray-100 dark:divide-gray-800"
                          id="scrollableTarget"
                        >
                          {trendingCollections &&
                            trendingCollections.length > 0 && (
                              <TrendingNftCollectionTableBody
                                trendingCollections={trendingCollections}
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
