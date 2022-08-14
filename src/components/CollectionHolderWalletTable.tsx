import Link from 'next/link';
import React from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
interface Props {
  holders: any[];
  total: number;
}

const CollectionHolderWalletTable: React.FC<Props> = ({
  holders,
  total,
}): JSX.Element => {
  return (
    <table className="overflow-auto inline-block w-full h-full border-r-2 border-gray-100 dark:border-white/10">
      <thead className="flex w-full">
        <tr className="flex w-full">
          <div className="w-[5%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            >
              {' '}
            </th>
          </div>
          <div className="w-[40%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            >
              Wallet
            </th>
          </div>
          <div className="w-[10%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            >
              NFT Count
            </th>
          </div>
          <div className="w-[10%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            >
              Collection %
            </th>
          </div>
          <div className="w-[35%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            ></th>
          </div>
        </tr>
      </thead>
      <tbody className="h-full overflow-scroll bg-white dark:bg-white/5 block w-full">
        {holders &&
          holders.map((holder: any) => (
            <tr
              key={holder.ownerAddress}
              className="flex hover:bg-black/5 dark:hover:bg-black/75"
            >
              <div className="w-[5%] self-center">
                <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                  <Jazzicon
                    diameter={20}
                    seed={jsNumberForAddress(holder.ownerAddress)}
                  />
                </td>
              </div>
              <div className="w-[40%] self-center">
                <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                  {holder.ownerAddress}
                </td>
              </div>
              <div className="w-[10%] self-center">
                <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                  {holder.tokenBalance}
                </td>
              </div>
              <div className="w-[10%] self-center">
                <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                  {((holder.tokenBalance / total) * 100).toFixed(2)}%
                </td>
              </div>
              <div className="w-[35%] self-center">
                <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80 flex justify-evenly">
                  <button
                    className={
                      'text-gray-500 hover:text-gray-700 x-3 py-2 font-medium text-sm rounded-md ml-8'
                    }
                    onClick={() => {}}
                  >
                    {'Add to Watchlist'}
                  </button>
                  <Link href={`/wallet/${holder.ownerAddress}`} passHref>
                    <a
                      className={
                        'text-gray-500 hover:text-gray-700 x-3 py-2 font-medium text-sm rounded-md'
                      }
                      onClick={() => {}}
                    >
                      {'View Wallet'}
                    </a>
                  </Link>
                </td>
              </div>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CollectionHolderWalletTable;
