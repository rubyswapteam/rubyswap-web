import Link from 'next/link';
import React from 'react';

interface Props {
  id: string;
  name: string;
  value: string;
}

export const DashboardStatsStandardItem: React.FC<Props> = ({
  id,
  name,
  value,
}): JSX.Element => {
  return (
    <div
      key={id + '-' + name}
      className="transition-colors text-sm text-left px-2 py-3 bg-white dark:bg-white/[.07] dark:hover:bg-white/[.12] drop-shadow-md rounded-lg overflow-hidden sm:p-4 hover:bg-gray-50 cursor-pointer  self-center items-center"
    >
      <dt className="font-medium truncate text-transparent bg-clip-text bg-cover text-gray-600 dark:text-white/80 mb-2">
        {name}
      </dt>
      <dd className="mt-1 font-semibold text-gray-900 dark:text-white">
        {value}
      </dd>
    </div>
  );
};
