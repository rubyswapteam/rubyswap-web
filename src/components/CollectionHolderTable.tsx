import React from 'react';

interface Props {
  holderCounts: any[];
  total: number;
}

const CollectionHolderTable: React.FC<Props> = ({
  holderCounts,
  total,
}): JSX.Element => {
  return (
    <table className="overflow-auto inline-block w-full h-full border-r-2 border-gray-100 dark:border-white/10">
      <thead className="flex w-full">
        <tr className="flex w-full">
          <div className="w-[25%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            >
              NFTs Per Wallet
            </th>
          </div>
          <div className="w-[25%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            >
              Wallets
            </th>
          </div>
          <div className="w-[25%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            >
              Total
            </th>
          </div>
          <div className="w-[25%]">
            <th
              scope="col"
              className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
            >
              Collection %
            </th>
          </div>
        </tr>
      </thead>
      <tbody className="h-full overflow-scroll bg-white dark:bg-white/5 block w-full">
        {holderCounts &&
          Object.keys(holderCounts)
            .slice(0)
            .reverse()
            .map((count: any) => (
              <tr
                key={count}
                className="flex hover:bg-black/5 dark:hover:bg-black/75"
              >
                <div className="w-[25%]">
                  <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                    {count}
                  </td>
                </div>
                <div className="w-[25%]">
                  <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                    {holderCounts[count]}
                  </td>
                </div>
                <div className="w-[25%]">
                  <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                    {parseInt(count) * holderCounts[count]}
                  </td>{' '}
                </div>
                <div className="w-[25%]">
                  <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                    {(
                      (100 * parseInt(count) * holderCounts[count]) /
                      total
                    ).toFixed(2)}
                  </td>
                </div>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default CollectionHolderTable;
