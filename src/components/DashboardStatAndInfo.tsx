import Link from 'next/link';
import React from 'react';
import EthereumIcon from './EthereumIcon';

interface Props {
  id: string;
  name: string;
  value: string;
  info: string;
  ethIcon?: boolean;
}

export const DashboardStatsPriceAndInfo: React.FC<Props> = ({
  id,
  name,
  value,
  info,
  ethIcon = true,
}): JSX.Element => {
  return (
    <div
      key={id + '-' + name}
      className="transition-colors text-sm text-left px-2 py-3 bg-white dark:bg-white/[.07] dark:hover:bg-white/[.12] drop-shadow-md rounded-lg overflow-hidden sm:p-4 hover:bg-gray-50 cursor-pointer self-center items-center"
    >
      <div className="font-medium truncate text-transparent bg-clip-text bg-cover text-gray-600 dark:text-white/80 mb-2">
        {name}
      </div>
      <div className="flex gap-x-2 w-full self-center items-center">
        <div className="flex self-center items-center">
          <div className="pt-1 font-semibold text-gray-900 dark:text-white">
            {value}
          </div>
          {ethIcon && <EthereumIcon width={14} height={14} />}
        </div>
        <div
          className={
            'pt-1 font-semibold flex text-xs text-gray-600 dark:text-gray-200 bg-white/10 rounded-lg px-1.5 py-1'
          }
        >
          {info}
        </div>
      </div>
    </div>
  );
};
