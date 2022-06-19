import React from 'react';

interface Props {
  stats: {
    name: string,
    value: string,
  }[];
}

const StatsBoxList: React.FC<Props> = ({ stats }): JSX.Element => {
  return (
    <div>
      <dl className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-4">
        {stats.map((item: any) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default StatsBoxList;
