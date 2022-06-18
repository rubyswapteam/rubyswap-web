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
    <>
      {sidebarNavigation.map((item: any) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? 'bg-indigo-800 text-white'
              : 'text-white hover:bg-indigo-600 hover:bg-opacity-75',
            'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
          )}
        >
          {item.name}
        </a>
      ))}
    </>
  );
};

export default DashboardSidebar;
