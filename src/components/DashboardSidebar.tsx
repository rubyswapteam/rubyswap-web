import Link from 'next/link';
import React from 'react';
import SearchModal from './SearchModal';

interface Props {
  sidebarNavigation: any;
  classNames: any;
  setSearchModalState: any;
}

const DashboardSidebar: React.FC<Props> = ({
  sidebarNavigation,
  classNames,
  setSearchModalState,
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
            className="text-gray-900 dark:text-white hover:bg-gray-100/75 dark:hover:bg-gray-900/50 group flex items-center px-2 py-2 text-sm font-medium rounded-md mt-5"
            onClick={() => {
              setSearchModalState(true);
            }}
          >
            {item.name}
          </a>
        ) : (
          <Link key={item.name} href={item.href} passHref>
            <a
              className={classNames(
                item.current
                  ? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
                  : 'text-gray-900 hover:bg-gray-100/75 dark:hover:bg-white/[.02] dark:text-white',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md my-1',
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
