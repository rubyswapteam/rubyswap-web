import { StarIcon } from '@heroicons/react/outline';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import EthereumIcon from './EthereumIcon';

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
    // TO BE MOVED TO CONTEXT PROVIDER TO STOP RELOADING / STORE IN SESSION STORAGE
    if (!trendingCollections || lastFetch < moment().unix() - 600) {
      console.log('!trendingCollections');
      console.log(!trendingCollections);
      console.log('lastFetch');
      console.log(lastFetch);
      console.log('lastFetch < moment().unix() - 600');
      console.log(lastFetch < moment().unix() - 600);
      try {
        fetch('/.netlify/functions/getDbTrendingCollections').then((res) =>
          res.json().then((result) => {
            setFullTrendingCollections(result);
            setTrendingCollections(
              result.filter(
                (collection: any) => collection.period === 'one_day',
              ),
            );
            setLastFetch(moment().unix());
            console.log(result);
          }),
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                          <tr>
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
                              className="font-semibold py-3.5 pr-3 text-left text-sm text-gray-900 dark:text-white w-[25%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Collection
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[15%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Chain
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Volume
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Floor
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Average Price
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Sales
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20"
                            >
                              Owners
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-blackish">
                          {trendingCollections.map(
                            (nftCollection) =>
                              nftCollection.imageUrl && (
                                <React.Fragment
                                  key={nftCollection.index + nftCollection.slug}
                                >
                                  <Link
                                    key={nftCollection.id}
                                    href={`/collection/${nftCollection.slug}`}
                                    prefetch={false}
                                  >
                                    <tr
                                      className="hover:bg-gray-50 dark:hover:bg-white/[.02] transition-colors cursor-pointer border-b border-gray-100 dark:border-white/20"
                                      key={nftCollection.id}
                                    >
                                      <td className="py-5 pl-4 pr-7 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                          <StarIcon height={20} width={20} />
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap py-3 text-sm">
                                        <div className="flex items-center">
                                          <img
                                            className="h-8 w-8 rounded-full"
                                            src={nftCollection.imageUrl}
                                            alt=""
                                          />
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap">
                                        <div className="text-gray-700 dark:text-white/90 flex items-center text-sm font-medium">
                                          <div className="pt-1">
                                            {nftCollection.name}
                                          </div>
                                          {nftCollection.isVerified == true && (
                                            <img
                                              src="https://www.genie.xyz/svgs/verifiedBadge.svg"
                                              className="ml-1"
                                              style={{
                                                height: '16px',
                                                width: '16px',
                                              }}
                                              alt="verified badge"
                                            />
                                          )}
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75">
                                        <EthereumIcon width={16} height={16} />
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook">
                                        <div className="flex items-center">
                                          <div className="pt-1">
                                            {nftCollection.osOneDayVolume?.toFixed(
                                              2,
                                            )}{' '}
                                          </div>
                                          <div className="pl-1">
                                            <EthereumIcon
                                              width={16}
                                              height={16}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook">
                                        <div className="flex items-center">
                                          <div className="flex items-center">
                                            <div className="pt-1">
                                              {nftCollection.osFloorPrice?.toFixed(
                                                2,
                                              )}{' '}
                                            </div>
                                            <div className="pl-1">
                                              <EthereumIcon
                                                width={16}
                                                height={16}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook">
                                        <div className="flex items-center">
                                          <div className="flex items-center">
                                            <div className="pt-1">
                                              {(
                                                nftCollection.osOneDayVolume /
                                                nftCollection.osOneDaySales
                                              )?.toFixed(2)}{' '}
                                            </div>
                                            <div className="pl-1">
                                              <EthereumIcon
                                                width={16}
                                                height={16}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook">
                                        <div className="flex items-center">
                                          {nftCollection.osOneDaySales}
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook">
                                        <div className="flex items-center">
                                          {nftCollection.numOwners}
                                        </div>
                                      </td>
                                    </tr>
                                  </Link>
                                </React.Fragment>
                              ),
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
