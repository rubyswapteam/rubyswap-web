import { useNftProvider } from '@/contexts/NftProviderContext';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { INftCollection } from '@/utils/nftUtils';
import { StarIcon } from '@heroicons/react/outline';
import EthereumIcon from './EthereumIcon';
import { Transition } from '@headlessui/react';

export default function TrendingNftCollectionTable() {
  const { trendingNftCollections, fetchAllTrendingNftCollections } =
    useNftProvider();

  useEffect(() => {
    if (!trendingNftCollections) {
      fetchAllTrendingNftCollections();
    }
  }, [trendingNftCollections]);

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="inline-block min-w-full align-middle">
          <div className="md:rounded-lg">
            {trendingNftCollections && (
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
                          {trendingNftCollections.map(
                            (nftCollection: INftCollection) =>
                              nftCollection.image && (
                                <React.Fragment key={nftCollection.id}>
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
                                            src={nftCollection.image}
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
                                        {nftCollection.chainId == 1 && (
                                          <>
                                            <EthereumIcon
                                              width={16}
                                              height={16}
                                            />
                                          </>
                                        )}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook">
                                        <div className="flex items-center">
                                          <div className="pt-1">
                                            {nftCollection.oneDayVolume?.toFixed(
                                              2,
                                            )}{' '}
                                          </div>
                                          {nftCollection.chainId == 1 && (
                                            <>
                                              <div className="pl-1">
                                                <EthereumIcon
                                                  width={16}
                                                  height={16}
                                                />
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook">
                                        <div className="flex items-center">
                                          <div className="flex items-center">
                                            <div className="pt-1">
                                              {nftCollection.floor?.toFixed(2)}{' '}
                                            </div>
                                            {nftCollection.chainId == 1 && (
                                              <>
                                                <div className="pl-1">
                                                  <EthereumIcon
                                                    width={16}
                                                    height={16}
                                                  />
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook">
                                        <div className="flex items-center">
                                          <div className="flex items-center">
                                            <div className="pt-1">
                                              {nftCollection.oneDayAveragePrice?.toFixed(
                                                2,
                                              )}{' '}
                                            </div>
                                            {nftCollection.chainId == 1 && (
                                              <>
                                                <div className="pl-1">
                                                  <EthereumIcon
                                                    width={16}
                                                    height={16}
                                                  />
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook">
                                        <div className="flex items-center">
                                          {nftCollection.oneDaySales}
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook">
                                        <div className="flex items-center">
                                          {nftCollection.owners}
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
