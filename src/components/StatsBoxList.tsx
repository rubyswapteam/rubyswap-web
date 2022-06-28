import React from 'react';

interface Props {
  stats: {
    name: string;
    value: string;
  }[];
}

const StatsBoxList: React.FC<Props> = ({ stats }): JSX.Element => {
  return (
    <div className="px-4 sm:px-6 md:px-8">
      <dl className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-4">
        {stats.map((item: any) => (
          <div
            key={item.name}
            className="text-center px-2 py-3 bg-white border-2 border-gray-100 rounded-lg overflow-hidden sm:p-4"
          >
            <dt className="text-sm font-medium truncate text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-800">
              {item.name}
            </dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-600">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default StatsBoxList;
