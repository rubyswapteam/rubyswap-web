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
      // fetchAllSweepNftCollections();
    }
  }, [sweepNftCollections]);

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="inline-block min-w-full align-middle">
          <div className="md:rounded-lg">
            {sweepNftCollections && (
              <div className="mt-1 flex flex-col">
                <div className="">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <div className=" md:rounded-lg">
                      <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="font-semibold py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6 w-[5%] top-0 sticky bg-white border-b border-gray-100"
                            >
                              &nbsp;
                            </th>
                            <th
                              scope="col"
                              className="font-semibold py-3.5 text-left text-sm text-gray-900 w-[5%] top-0 sticky bg-white border-b border-gray-100"
                            >
                              &nbsp;
                            </th>
                            <th
                              scope="col"
                              className="font-semibold py-3.5 pr-3 text-left text-sm text-gray-900 w-[25%] top-0 sticky bg-white border-b border-gray-100"
                            >
                              Collection
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 w-[15%] top-0 sticky bg-white border-b border-gray-100"
                            >
                              Chain
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100"
                            >
                              Value
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100"
                            >
                              Sales
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100"
                            >
                              Buyer
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100"
                            >
                              Transactions
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100"
                            >
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {sweepNftCollections.map(
                            (nftCollection: INftSweepCollection, i: number) =>
                              nftCollection.image && (
                                <React.Fragment key={i}>
                                  <Link
                                    key={nftCollection.id}
                                    href={`/collection/${nftCollection.collectionAddress}`}
                                  >
                                    <tr
                                      className="hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100"
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
                                        <div className="text-gray-700 flex items-center text-sm font-medium">
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
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700">
                                        {nftCollection.chainId == 1 && (
                                          <>
                                            <EthereumIcon
                                              width={16}
                                              height={16}
                                            />
                                          </>
                                        )}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 circularstdbook">
                                        <div className="flex items-center">
                                          <div className="pt-1">
                                            {nftCollection?.value
                                              ? (
                                                  nftCollection?.value /
                                                  Math.pow(10, 18)
                                                ).toFixed(4)
                                              : '0.0000'}{' '}
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
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 circularstdbook">
                                        <div className="flex items-center">
                                          <div className="pt-1">
                                            {nftCollection.sales}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 circularstdbook">
                                        <div className="flex items-center">
                                          <div className="pt-1">
                                            {nftCollection.buyer}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 circularstdbook">
                                        <div className="flex items-center">
                                          {nftCollection.transaction}
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 circularstdbook">
                                        <div className="flex items-center">
                                          {dayjs(
                                            Number(nftCollection.timestamp) *
                                              1000,
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
  );
}
