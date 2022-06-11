import Link from 'next/link';
import React from 'react';

interface Props {
  sidebarNavigation: any;
  classNames: any;
}

const DashboardSidebar: React.FC<Props> = ({
  sidebarNavigation,
  classNames,
}): JSX.Element => {
  return (
    <div className="relative w-20 flex flex-col p-3 space-y-3">
      {sidebarNavigation.map((item: any) => (
        <Link href={item.href} key={item.key} passHref>
          <a
            className={classNames(
              item.current
                ? 'bg-white text-gray-400 hover:text-black'
                : 'text-black',
              'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg',
            )}
          >
            <span className="sr-only">{item.name}</span>
            <item.icon className="h-6 w-6" aria-hidden="true" />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default DashboardSidebar;
