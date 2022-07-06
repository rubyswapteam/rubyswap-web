import Link from 'next/link';
import React from 'react';

interface Props {
  tabs: any;
  condense?: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Tab: React.FC<Props> = ({ tabs, condense }): JSX.Element => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        >
          {tabs.map((tab: any) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className={condense ? 'flex space-x-2' : 'flex space-x-2'}
          aria-label="Tabs"
        >
          {tabs.map((tab: any) => (
            <Link key={tab.name} href={tab.href} prefetch={false}>
              <a
                className={classNames(
                  tab.current
                    ? 'text-white bg-cover bg-theme-gradient bg-gray-100'
                    : 'text-gray-900 hover:bg-gray-100',
                  tab.border ? 'bg-white drop-shadow' : 'bg-white drop-shadow text-xs',
                  'text-sm px-3 py-1 font-medium self-center rounded-md',
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tab;
