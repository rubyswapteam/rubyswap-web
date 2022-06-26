import { useNftProvider } from '@/contexts/NftProviderContext';
import Link from 'next/link';
import { useEffect } from 'react';
import { INftCollection } from '@/utils/nftUtils';
import { StarIcon } from '@heroicons/react/outline';
import React from 'react';
import EthereumIcon from './EthereumIcon';

export default function TrendingNftCollectionTable() {
  const { trendingNftCollections, fetchAllTrendingNftCollections } =
    useNftProvider();

  useEffect(() => {
    if (!trendingNftCollections) {
      fetchAllTrendingNftCollections();
    }
  }, [trendingNftCollections]);

  return (
    <>
      <div className="flex flex-col px-4 sm:px-6 md:px-8">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle md:px-3 lg:px-4">
            <div className="md:rounded-lg">
              {trendingNftCollections && (
                <div className="mt-1 flex flex-col">
                  <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className=" md:rounded-lg">
                        <table className="min-w-full border-separate">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6 w-[5%] top-0 sticky bg-white border-b border-gray-100"
                              >
                                &nbsp;
                              </th>
                              <th
                                scope="col"
                                className="py-3.5 text-left text-sm text-gray-900 w-[5%] top-0 sticky bg-white border-b border-gray-100"
                              >
                                &nbsp;
                              </th>
                              <th
                                scope="col"
                                className="py-3.5 pr-3 text-left text-sm text-gray-900 w-[25%] top-0 sticky bg-white border-b border-gray-100"
                              >
                                Collection
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm text-gray-900 w-[15%] top-0 sticky bg-white border-b border-gray-100"
                              >
                                Chain
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100"
                              >
                                Volume
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100"
                              >
                                Floor
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100"
                              >
                                Average Price
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100"
                              >
                                Sales
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100"
                              >
                                Owners
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 bg-white">
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
                                        className="hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                                        key={nftCollection.id}
                                      >
                                        <td className="py-3 pl-4 pr-7 text-sm sm:pl-6">
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
                                          <div className="text-gray-900 flex items-center text-sm font-bold">
                                            {nftCollection.name}
                                            {nftCollection.isVerified ==
                                              true && (
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
                                        <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900">
                                          {nftCollection.chainId == 1 && (
                                            <>
                                              <EthereumIcon
                                                width={18}
                                                height={18}
                                              />
                                            </>
                                          )}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 circularstdbook">
                                          <div className="flex items-center">
                                            {nftCollection.oneDayVolume?.toFixed(
                                              2,
                                            )}{' '}
                                            {nftCollection.chainId == 1 && (
                                              <>
                                                <div className="pl-1">
                                                  <EthereumIcon
                                                    width={18}
                                                    height={18}
                                                  />
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 circularstdbook">
                                          <div className="flex items-center">
                                            <div className="flex items-center">
                                              {nftCollection.floor?.toFixed(2)}{' '}
                                              {nftCollection.chainId == 1 && (
                                                <>
                                                  <div className="pl-1">
                                                    <EthereumIcon
                                                      width={18}
                                                      height={18}
                                                    />
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 circularstdbook">
                                          <div className="flex items-center">
                                            <div className="flex items-center">
                                              {nftCollection.oneDayAveragePrice?.toFixed(
                                                2,
                                              )}{' '}
                                              {nftCollection.chainId == 1 && (
                                                <>
                                                  <div className="pl-1">
                                                    <EthereumIcon
                                                      width={18}
                                                      height={18}
                                                    />
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 circularstdbook">
                                          <div className="flex items-center">
                                            {nftCollection.oneDaySales}
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 circularstdbook">
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
    </>
  );
}
