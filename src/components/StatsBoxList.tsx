import Link from 'next/link';
import React from 'react';

interface Props {
  stats: {
    name: string;
    value: string;
  }[];
  route?: string;
}

const StatsBoxList: React.FC<Props> = ({ stats, route }): JSX.Element => {
  return (
    <Link href={route || ''} passHref>
      <div className="px-4 sm:px-6 md:px-8">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-5">
          {stats.map((item: any) => (
            <div
              key={item.name}
              className="text-center px-2 py-3 bg-white drop-shadow-md rounded-lg overflow-hidden sm:p-4 hover:bg-gray-50 cursor-pointer"
            >
              <dt className="text-base font-medium truncate text-transparent bg-clip-text bg-cover text-gray-600">
                {item.name}
              </dt>
              <dd className="mt-1 text-base font-semibold text-gray-900">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  );
};

export default StatsBoxList;
