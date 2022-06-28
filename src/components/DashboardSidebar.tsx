import Link from 'next/link';
import React from 'react';
import SearchModal from './SearchModal';

interface Props {
  sidebarNavigation: any;
  classNames: any;
}

const DashboardSidebar: React.FC<Props> = ({
  sidebarNavigation,
  classNames,
}): JSX.Element => {
  return (
    <>
      {sidebarNavigation.map((item: any) =>
        item.header ? (
          <a
            key={item.name}
            className="text-gray-400 group flex items-center px-2 py-2 text-sm font-medium rounded-md mt-5"
          >
            {item.name}
          </a>
        ) : item.search ? (
          <a
            key={item.name}
            className="text-gray-gray-900 hover:bg-gray-100 hover:bg-opacity-75group flex items-center px-2 py-2 text-sm font-medium rounded-md mt-5"
          >
            {item.name}
          </a>
        ) : (
          <Link key={item.name} href={item.href} passHref>
            <a
              className={classNames(
                item.current
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-900 hover:bg-gray-100 hover:bg-opacity-75',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              )}
            >
              {item.name}
            </a>
          </Link>
        ),
      )}
    </>
  );
};

export default DashboardSidebar;
