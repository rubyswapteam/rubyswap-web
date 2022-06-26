import { useNftProvider } from '@/contexts/NftProviderContext';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { INftSweepCollection } from '@/utils/nftUtils';
import { StarIcon } from '@heroicons/react/outline';
import EthereumIcon from './EthereumIcon';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function SweepsNftCollectionTable() {
  const { sweepNftCollections, fetchAllSweepNftCollections } = useNftProvider();

  useEffect(() => {
    if (!sweepNftCollections) {
      fetchAllSweepNftCollections();
    }
  }, [sweepNftCollections]);

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle md:px-3 lg:px-4">
            <div className="overflow-hidden md:rounded-lg">
              {sweepNftCollections && (
                <div className="mt-1 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-100">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6 w-[5%]"
                              >
                                &nbsp;
                              </th>
                              <th
                                scope="col"
                                className="py-3.5 text-left text-sm text-gray-900 w-[5%]"
                              >
                                &nbsp;
                              </th>
                              <th
                                scope="col"
                                className="py-3.5 pr-3 text-left text-sm text-gray-900 w-[20%]"
                              >
                                Collection
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm text-gray-900 w-[10%]"
                              >
                                Chain
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm text-gray-900 w-[10%]"
                              >
                                Value
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm text-gray-900 w-[10%]"
                              >
                                Sales
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm text-gray-900 w-[10%]"
                              >
                                Buyer
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm text-gray-900 w-[10%]"
                              >
                                Transaction
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm text-gray-900 w-[10%]"
                              >
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 bg-white">
                            {sweepNftCollections.map(
                              (nftSweepCollection: INftSweepCollection) =>
                                nftSweepCollection.image && (
                                  <React.Fragment key={nftSweepCollection.id}>
                                    <Link
                                      key={nftSweepCollection.id}
                                      href={`/collection/${nftSweepCollection.collectionAddress}`}
                                    >
                                      <tr
                                        className="hover:bg-gray-50 cursor-pointer"
                                        key={nftSweepCollection.id}
                                      >
                                        <td className="whitespace-nowrap py-4 pl-4 pr-7 text-sm sm:pl-6">
                                          <div className="flex items-center">
                                            <StarIcon height={20} width={20} />
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap py-4 text-sm">
                                          <div className="flex items-center">
                                            <img
                                              className="h-12 w-12 rounded-full"
                                              src={nftSweepCollection.image}
                                              alt=""
                                            />
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap">
                                          <div className="text-gray-900 flex items-center">
                                            {nftSweepCollection.name}
                                            <img
                                              src="https://www.genie.xyz/svgs/verifiedBadge.svg"
                                              className="ml-1"
                                              style={{
                                                height: '16px',
                                                width: '16px',
                                              }}
                                              alt="verified badge"
                                            />
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          {nftSweepCollection.chainId == 1 && (
                                            <>
                                              <EthereumIcon
                                                width={16}
                                                height={16}
                                              />
                                            </>
                                          )}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div className="flex items-center">
                                            {nftSweepCollection?.value
                                              ? (
                                                  nftSweepCollection?.value /
                                                  Math.pow(10, 18)
                                                ).toFixed(4)
                                              : '0.0000'}{' '}
                                            {nftSweepCollection.chainId ==
                                              1 && (
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
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div className="flex items-center">
                                            {nftSweepCollection.sales}
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div className="flex items-center">
                                            {nftSweepCollection.buyer}
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div className="flex items-center">
                                            {nftSweepCollection.transaction}
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div className="flex items-center">
                                            {dayjs(
                                              Number(
                                                nftSweepCollection.timestamp,
                                              ) * 1000,
                                            ).fromNow()}
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
