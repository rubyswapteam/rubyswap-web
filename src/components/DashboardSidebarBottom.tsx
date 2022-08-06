import Link from 'next/link';
import React from 'react';
import SearchModal from './SearchModal';

interface Props {
  sidebarNavigation: any;
  classNames: any;
}

const DashboardSidebarBottom: React.FC<Props> = ({
  sidebarNavigation,
  classNames,
}): JSX.Element => {
  return (
    <>
      {sidebarNavigation.map((item: any) => (
        <Link key={item.name} href={item.href} passHref>
          <a
            className={classNames(
              item.current
                ? 'bg-gray-100 dark:bg-gray-900/75'
                : 'hover:bg-gray-100/75 dark:hover:bg-gray-900/50',
              'text-gray-600 dark:text-white/80 group flex items-center px-2 py-1 text-xs font-medium rounded-md',
            )}
          >
            {item.name}
          </a>
        </Link>
      ))}
    </>
  );
};

export default DashboardSidebarBottom;
