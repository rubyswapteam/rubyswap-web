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
                ? 'bg-gray-100 text-gray-600'
                : 'text-gray-600 hover:bg-gray-100 hover:bg-opacity-75',
              'group flex items-center px-2 py-1 text-xs font-medium rounded-md',
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
